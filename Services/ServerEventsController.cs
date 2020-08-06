#nullable enable
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using DataStructures.GeoJsonSchema;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Analysis;

namespace EngineeringToolsServer.Services
{
    public interface IServerEventsController
    {
        bool Loading { get; set; }

        Task Get();

        Task SendData(string json);
    }

    public sealed class MapboxData
    {
        [JsonPropertyName("WellLocations")]
        public string? Location { get; set; }

        [JsonPropertyName("ReservoirData")]
        public string? ReservoirData { get; set; }

        [JsonPropertyName("GasProperties")]
        public string? GasProperties { get; set; }

        [JsonPropertyName("OilProperties")]
        public string? OilProperties { get; set; }

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, GeoJsonConverter.Settings);
        }

        public static MapboxData FromJson(string json)
        {
            return JsonSerializer.Deserialize<MapboxData>(json, GeoJsonConverter.Settings);
        }
    }

    [ApiController]
    [Route("api/sse")]
    public sealed class ServerEventsController : Controller, IServerEventsController
    {
        public bool Loading
        {
#if NETSTANDARD
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
            [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
            get;
#if NETSTANDARD
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
            [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
            set;
        } = true;

        [HttpGet]
        public async Task Get()
        {
            MapboxData mapboxData = new MapboxData
            {
                Location      = "MapboxData.WellLocations",
                ReservoirData = "MapboxData.WellProperties.ReservoirData",
                GasProperties = "MapboxData.WellProperties.GasProperties",
                OilProperties = "MapboxData.WellProperties.OilProperties"
            };

            if(!DataManager.Instance.IsValidVariable(mapboxData.Location))
            {
                DataFrame? allWellsLocationsDataFrame = await DatabaseService.QueryDbAsync(OilGasQueries.AllWellsLocations);

                if(allWellsLocationsDataFrame != null)
                {
                    DataStructures.GeoJsonSchema.GeoJson locationGeoJson = new DataStructures.GeoJsonSchema.GeoJson
                    {
                        Type = GeoJsonKind.FeatureCollection, Features = new List<FeatureType?>((int)allWellsLocationsDataFrame.Rows.Count)
                    };

                    StringDataFrameColumn?           apis             = allWellsLocationsDataFrame.Columns.GetStringColumn("Api");
                    PrimitiveDataFrameColumn<double> surfaceLongitude = allWellsLocationsDataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLongitude");
                    PrimitiveDataFrameColumn<double> surfaceLatitude  = allWellsLocationsDataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLatitude");
                    PrimitiveDataFrameColumn<double> bottomLongitude  = allWellsLocationsDataFrame.Columns.GetPrimitiveColumn<double>("BottomLongitude");
                    PrimitiveDataFrameColumn<double> bottomLatitude   = allWellsLocationsDataFrame.Columns.GetPrimitiveColumn<double>("BottomLatitude");

                    Parallel.ForEach(Partitioner.Create(0, allWellsLocationsDataFrame.Rows.Count, allWellsLocationsDataFrame.Rows.Count / Environment.ProcessorCount),
                                     row =>
                                     {
                                         for(long i = row.Item1; i < row.Item2; i++)
                                         {
                                             locationGeoJson.Features.Add(new Feature
                                             {
                                                 Id = i,
                                                 Geometry = new Geometry
                                                 {
                                                     Type = GeometryKind.LineString,
                                                     Coordinates = new List<CoordinateElement?>
                                                     {
                                                         new List<double>
                                                         {
                                                             surfaceLongitude[i] ?? 0.0, surfaceLatitude[i] ?? 0.0
                                                         },
                                                         new List<double>
                                                         {
                                                             bottomLongitude[i] ?? 0.0, bottomLatitude[i] ?? 0.0
                                                         }
                                                     }
                                                 },
                                                 Properties = new Dictionary<string, object?>
                                                 {
                                                     {
                                                         "API", apis[i]
                                                     }
                                                 }
                                             });
                                         }
                                     });

                    DataManager.Instance[(mapboxData.Location, MediaTypes.Json)] = locationGeoJson.ToJson();
                }
            }

            if(!DataManager.Instance.IsValidVariable(mapboxData.ReservoirData) ||
               !DataManager.Instance.IsValidVariable(mapboxData.GasProperties) ||
               !DataManager.Instance.IsValidVariable(mapboxData.OilProperties))
            {
                DataFrame? wellsDataFrame = await DatabaseService.QueryDbAsync(OilGasQueries.WellsData);

                if(wellsDataFrame != null)
                {
                    DataStructures.GeoJsonSchema.GeoJson reservoirDataGeoJson = new DataStructures.GeoJsonSchema.GeoJson
                    {
                        Type = GeoJsonKind.FeatureCollection, Features = new List<FeatureType?>((int)wellsDataFrame.Rows.Count)
                    };

                    DataStructures.GeoJsonSchema.GeoJson gasPropertiesGeoJson = new DataStructures.GeoJsonSchema.GeoJson
                    {
                        Type = GeoJsonKind.FeatureCollection, Features = new List<FeatureType?>((int)wellsDataFrame.Rows.Count)
                    };

                    DataStructures.GeoJsonSchema.GeoJson oilPropertiesGeoJson = new DataStructures.GeoJsonSchema.GeoJson
                    {
                        Type = GeoJsonKind.FeatureCollection, Features = new List<FeatureType?>((int)wellsDataFrame.Rows.Count)
                    };

                    StringDataFrameColumn?           apis               = wellsDataFrame.Columns.GetStringColumn("Api");
                    StringDataFrameColumn?           name               = wellsDataFrame.Columns.GetStringColumn("Name");
                    StringDataFrameColumn?           number             = wellsDataFrame.Columns.GetStringColumn("Number");
                    StringDataFrameColumn?           lease              = wellsDataFrame.Columns.GetStringColumn("Lease");
                    StringDataFrameColumn?           field              = wellsDataFrame.Columns.GetStringColumn("Field");
                    StringDataFrameColumn?           company            = wellsDataFrame.Columns.GetStringColumn("Company");
                    StringDataFrameColumn?           reservoirName      = wellsDataFrame.Columns.GetStringColumn("ReservoirName");
                    PrimitiveDataFrameColumn<double> reservoirDepth     = wellsDataFrame.Columns.GetPrimitiveColumn<double>("ReservoirDepth");
                    PrimitiveDataFrameColumn<double> gasSpecificGravity = wellsDataFrame.Columns.GetPrimitiveColumn<double>("GasSpecificGravity");
                    PrimitiveDataFrameColumn<double> oilApiGravity      = wellsDataFrame.Columns.GetPrimitiveColumn<double>("OilApiGravity");
                    PrimitiveDataFrameColumn<double> surfaceLongitude   = wellsDataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLongitude");
                    PrimitiveDataFrameColumn<double> surfaceLatitude    = wellsDataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLatitude");

                    Parallel.ForEach(Partitioner.Create(0, wellsDataFrame.Rows.Count, wellsDataFrame.Rows.Count / Environment.ProcessorCount),
                                     row =>
                                     {
                                         for(long i = row.Item1; i < row.Item2; i++)
                                         {
                                             reservoirDataGeoJson.Features.Add(new Feature
                                             {
                                                 Id = i,
                                                 Geometry = new Geometry
                                                 {
                                                     Type = GeometryKind.Point,
                                                     Coordinates = new List<CoordinateElement?>
                                                     {
                                                         surfaceLongitude[i] ?? 0.0, surfaceLatitude[i] ?? 0.0
                                                     }
                                                 },
                                                 Properties = new Dictionary<string, object?>
                                                 {
                                                     {
                                                         "API", apis[i]
                                                     },
                                                     {
                                                         "Name", name[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Number", number[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Lease", lease[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Field", field[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Company", company[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "ReservoirName", reservoirName[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "ReservoirDepth", reservoirDepth[i]
                                                     }
                                                 }
                                             });

                                             gasPropertiesGeoJson.Features.Add(new Feature
                                             {
                                                 Id = i,
                                                 Geometry = new Geometry
                                                 {
                                                     Type = GeometryKind.Point,
                                                     Coordinates = new List<CoordinateElement?>
                                                     {
                                                         surfaceLongitude[i] ?? 0.0, surfaceLatitude[i] ?? 0.0
                                                     }
                                                 },
                                                 Properties = new Dictionary<string, object?>
                                                 {
                                                     {
                                                         "API", apis[i]
                                                     },
                                                     {
                                                         "Name", name[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Number", number[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Lease", lease[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Field", field[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Company", company[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "GasSpecificGravity", gasSpecificGravity[i]
                                                     }
                                                 }
                                             });

                                             oilPropertiesGeoJson.Features.Add(new Feature
                                             {
                                                 Id = i,
                                                 Geometry = new Geometry
                                                 {
                                                     Type = GeometryKind.Point,
                                                     Coordinates = new List<CoordinateElement?>
                                                     {
                                                         surfaceLongitude[i] ?? 0.0, surfaceLatitude[i] ?? 0.0
                                                     }
                                                 },
                                                 Properties = new Dictionary<string, object?>
                                                 {
                                                     {
                                                         "API", apis[i]
                                                     },
                                                     {
                                                         "Name", name[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Number", number[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Lease", lease[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Field", field[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "Company", company[i]?.Replace("\"", "\\\"")!
                                                     },
                                                     {
                                                         "OilApiGravity", oilApiGravity[i]
                                                     }
                                                 }
                                             });
                                         }
                                     });

                    DataManager.Instance[(mapboxData.ReservoirData, MediaTypes.Json)] = reservoirDataGeoJson.ToJson();
                    DataManager.Instance[(mapboxData.GasProperties, MediaTypes.Json)] = gasPropertiesGeoJson.ToJson();
                    DataManager.Instance[(mapboxData.OilProperties, MediaTypes.Json)] = oilPropertiesGeoJson.ToJson();

                    //_logger.LogInformation($"{DataManager.Instance.BaseUrl}/data/WellLocations");
                }
            }

            await SendData(mapboxData.ToJson());

            //else
            //{
            //    await SendData((string)DataManager.Instance[("MapboxData", MediaTypes.Json)]);
            //}

            await Task.CompletedTask;
        }

        public async Task SendData(string json)
        {
            Response.Headers.Add("Content-Type", "text/event-stream");

            string item = $"data: {json}\n\n";

            byte[] dataItemBytes = Encoding.ASCII.GetBytes(item);

            await Response.Body.WriteAsync(dataItemBytes, 0, dataItemBytes.Length);

            await Response.Body.FlushAsync();
        }
    }
}