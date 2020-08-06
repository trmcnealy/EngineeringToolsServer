#nullable enable

// ReSharper disable RedundantLambdaParameterType

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using Engineering.DataSource;
using Engineering.DataSource.GeoSpatial;
using Engineering.DataSource.Tools;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Html;
using Microsoft.Data.Analysis;

namespace EngineeringToolsServer.Services
{
    //public static partial class ServiceExtension
    //{
    //    public static IServiceCollection AddArcGisService(this IServiceCollection services)
    //    {
    //        return services.AddSingleton<ArcGisService>(ArcGisService);
    //    }
    //}

    public sealed class ArcGisService
    {
        public DatabaseConnection DatabaseConnection { get; set; }

        private static volatile ArcGisService _instance;

        static ArcGisService()
        {
            _instance = new ArcGisService();
        }

        public static ArcGisService GetInstance()
        {
            return _instance;
        }

        private ArcGisService()
        {
            DatabaseConnection = DatabaseConnection.Default;
        }

#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
        private Extent? getExtent()
        {
            DataFrame? dataFrame = QueryDb(OilGasQueries.WellsExtents);
            //DataFrame? dataFrame = DatabaseConnection.QueryDbForExtent();

            if(dataFrame != null)
            {
                Extent extent = new Extent
                {
                    Xmin = dataFrame.Columns["MinEasting"][0].DoubleValue()  ?? 0.0,
                    Xmax = dataFrame.Columns["MaxEasting"][0].DoubleValue()  ?? 0.0,
                    Ymin = dataFrame.Columns["MinNorthing"][0].DoubleValue() ?? 0.0,
                    Ymax = dataFrame.Columns["MaxNorthing"][0].DoubleValue() ?? 0.0
                };

                return extent;
            }

            return null;
        }

#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
        private async Task<Extent?> getExtentAsync()
        {
            DataFrame? dataFrame = await QueryDbAsync(OilGasQueries.WellsExtents);
            //DataFrame? dataFrame = DatabaseConnection.QueryDbForExtentAsync().GetAwaiter().GetResult();

            if(dataFrame != null)
            {
                Extent extent = new Extent
                {
                    Xmin = dataFrame.Columns["MinEasting"][0].DoubleValue()  ?? 0.0,
                    Xmax = dataFrame.Columns["MaxEasting"][0].DoubleValue()  ?? 0.0,
                    Ymin = dataFrame.Columns["MinNorthing"][0].DoubleValue() ?? 0.0,
                    Ymax = dataFrame.Columns["MaxNorthing"][0].DoubleValue() ?? 0.0
                };

                return await Task.FromResult(extent);
            }

            return null;
        }

#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
        private DataFrame? queryDb(string sql)
        {
            return DatabaseConnection.QueryDb(sql);
        }

#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
        private async Task<DataFrame?> queryDbAsync(string sql)
        {
            return await DatabaseConnection.QueryDbAsync(sql);
        }

        private Extent? loadExtent(out string extentJson,
                                   out string spatialReferenceJson)
        {
            Extent? extent = GetExtent();

            //Extent? extent = ArcGisService.GetExtent();

            if(extent != null)
            {
                extentJson           = extent.ToJson();
                spatialReferenceJson = extent.SpatialReference.ToJson();

                //StoreSessionDataAsync("SpatialReference", extent.SpatialReference.ToJson()).GetAwaiter().GetResult();
            }
            else
            {
                extentJson           = "";
                spatialReferenceJson = "";
            }

            return extent;
        }

        private async Task<(Extent?, string, string)> loadExtentAsync()
        {
            string  extentJson;
            string  spatialReferenceJson;

            Extent? extent = await GetExtentAsync();

            //Extent? extent = ArcGisService.GetExtent();

            if(extent != null)
            {
                extentJson           = extent.ToJson();
                spatialReferenceJson = extent.SpatialReference.ToJson();

                //StoreSessionDataAsync("SpatialReference", extent.SpatialReference.ToJson()).GetAwaiter().GetResult();
            }
            else
            {
                extentJson           = "";
                spatialReferenceJson = "";
            }

            return (extent, extentJson, spatialReferenceJson);
        }

        private DataFrame? loadLocations(out Graphic[]? locationsJson)
        {
            //DataFrame? locations = QueryDb(OilGasQueries.WellsKarnesLocations);
            DataFrame? locations = QueryDb(OilGasQueries.AllWellsLocations);

            locationsJson = null;

            if(locations != null)
            {
                List<Graphic> rows = new List<Graphic>((int)locations.Rows.Count);

                AttributeProperties attributeProperties;

                for(int i = 0; i < locations.Rows.Count; ++i)
                {
                    attributeProperties = new AttributeProperties();

                    attributeProperties.AddProperty("ObjectId", i + 1);

                    attributeProperties.AddProperty("Api", locations.Rows[i][0].StringValue());

                    rows.Add(new Graphic
                    {
                        Geometry = new Geometry
                        {
                            Type = "polyline",
                            Paths = new List<List<double>>
                            {
                                new List<double>
                                {
                                    locations.Rows[i][1].DoubleValue() ?? 0.0, locations.Rows[i][2].DoubleValue() ?? 0.0
                                },
                                new List<double>
                                {
                                    locations.Rows[i][3].DoubleValue() ?? 0.0, locations.Rows[i][4].DoubleValue() ?? 0.0
                                }
                            }
                        },
                        Attributes = attributeProperties
                    });
                }

                locationsJson = rows.ToArray();

                //locationsJson = "[" + string.Join(", ", rows) + "]";

                //ArcGisService.StoreDataAsync("WellLocations", source);
            }

            //Sequence.LinearSpacing

            //DataFrame? locations = await ArcGisService.QueryDbAsync(locationQuery);

            //if (locationsJson != null)
            //{
            //    jsInteropService.StoreSessionDataAsync("WellLocations", locationsJson).GetAwaiter().GetResult();

            //    Action? addFeaturesFromStorage = jsInteropService.BuildJsAction("window.addFeaturesFromStorage");

            //    addFeaturesFromStorage?.Invoke();
            //}

            return locations;
        }

        private async Task<(DataFrame?,Graphic[]?)> loadLocationsAsync()
        {
            //DataFrame? locations = QueryDb(OilGasQueries.WellsKarnesLocations);
            DataFrame? locations = await QueryDbAsync(OilGasQueries.AllWellsLocations);

            Graphic[]? locationsJson = null;

            if(locations != null)
            {
                List<Graphic> rows = new List<Graphic>((int)locations.Rows.Count);

                AttributeProperties attributeProperties;

                for(int i = 0; i < locations.Rows.Count; ++i)
                {
                    attributeProperties = new AttributeProperties();

                    attributeProperties.AddProperty("ObjectId", i + 1);

                    attributeProperties.AddProperty("Api", locations.Rows[i][0].StringValue());

                    rows.Add(new Graphic
                    {
                        Geometry = new Geometry
                        {
                            Type = "polyline",
                            Paths = new List<List<double>>
                            {
                                new List<double>
                                {
                                    locations.Rows[i][1].DoubleValue() ?? 0.0, locations.Rows[i][2].DoubleValue() ?? 0.0
                                },
                                new List<double>
                                {
                                    locations.Rows[i][3].DoubleValue() ?? 0.0, locations.Rows[i][4].DoubleValue() ?? 0.0
                                }
                            }
                        },
                        Attributes = attributeProperties
                    });
                }

                locationsJson = rows.ToArray();

                //locationsJson = "[" + string.Join(", ", rows) + "]";

                //ArcGisService.StoreDataAsync("WellLocations", source);
            }

            //Sequence.LinearSpacing

            //DataFrame? locations = await ArcGisService.QueryDbAsync(locationQuery);

            //if (locationsJson != null)
            //{
            //    jsInteropService.StoreSessionDataAsync("WellLocations", locationsJson).GetAwaiter().GetResult();

            //    Action? addFeaturesFromStorage = jsInteropService.BuildJsAction("window.addFeaturesFromStorage");

            //    addFeaturesFromStorage?.Invoke();
            //}

            return (locations, locationsJson);
        }

        private DataFrame? loadData(out Graphic[]? dataJson)
        {
            DataFrame? data = QueryDb(OilGasQueries.WellsData);

            dataJson = null;

            if(data != null)
            {
                List<Graphic> rows = new List<Graphic>((int)data.Rows.Count);

                AttributeProperties attributeProperties;

                for(int i = 0; i < data.Rows.Count; ++i)
                {

                    attributeProperties = new AttributeProperties();
                    attributeProperties.AddProperty("ObjectId",           i + 1);
                    attributeProperties.AddProperty("Api",                data.Rows[i][0].StringValue());
                    attributeProperties.AddProperty("ReservoirName",      data.Rows[i][1].StringValue());
                    attributeProperties.AddProperty("ReservoirDepth",     data.Rows[i][2].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("GasSpecificGravity", data.Rows[i][3].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("OilApiGravity",      data.Rows[i][4].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("SurfaceEasting",     data.Rows[i][5].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("SurfaceNorthing",    data.Rows[i][6].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("BottomEasting",      data.Rows[i][7].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("BottomNorthing",     data.Rows[i][8].DoubleValue() ?? 0.0);

                    rows.Add(new Graphic
                    {
                        Geometry = new Geometry
                        {
                            Type = "point",
                            X    = data.Rows[i][5].DoubleValue() ?? 0.0,
                            Y    = data.Rows[i][6].DoubleValue() ?? 0.0
                        },
                        Attributes = attributeProperties
                    });
                }

                dataJson = rows.ToArray();

                //locationsJson = "[" + string.Join(", ", rows) + "]";

                //ArcGisService.StoreDataAsync("WellLocations", source);
            }

            //Sequence.LinearSpacing

            //DataFrame? data = await ArcGisService.QueryDbAsync(locationQuery);

            //if (locationsJson != null)
            //{
            //    jsInteropService.StoreSessionDataAsync("WellLocations", locationsJson).GetAwaiter().GetResult();

            //    Action? addFeaturesFromStorage = jsInteropService.BuildJsAction("window.addFeaturesFromStorage");

            //    addFeaturesFromStorage?.Invoke();
            //}

            return data;
        }

        private async Task<(DataFrame?,Graphic[]?)> loadDataAsync()
        {
            DataFrame? data = await QueryDbAsync(OilGasQueries.WellsData);

            Graphic[]? dataJson = null;

            if(data != null)
            {
                List<Graphic> rows = new List<Graphic>((int)data.Rows.Count);

                AttributeProperties attributeProperties;

                for(int i = 0; i < data.Rows.Count; ++i)
                {

                    attributeProperties = new AttributeProperties();
                    attributeProperties.AddProperty("ObjectId",           i + 1);
                    attributeProperties.AddProperty("Api",                data.Rows[i][0].StringValue());
                    attributeProperties.AddProperty("ReservoirName",      data.Rows[i][1].StringValue());
                    attributeProperties.AddProperty("ReservoirDepth",     data.Rows[i][2].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("GasSpecificGravity", data.Rows[i][3].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("OilApiGravity",      data.Rows[i][4].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("SurfaceEasting",     data.Rows[i][5].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("SurfaceNorthing",    data.Rows[i][6].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("BottomEasting",      data.Rows[i][7].DoubleValue() ?? 0.0);
                    attributeProperties.AddProperty("BottomNorthing",     data.Rows[i][8].DoubleValue() ?? 0.0);

                    rows.Add(new Graphic
                    {
                        Geometry = new Geometry
                        {
                            Type = "point",
                            X    = data.Rows[i][5].DoubleValue() ?? 0.0,
                            Y    = data.Rows[i][6].DoubleValue() ?? 0.0
                        },
                        Attributes = attributeProperties
                    });
                }

                dataJson = rows.ToArray();

                //locationsJson = "[" + string.Join(", ", rows) + "]";

                //ArcGisService.StoreDataAsync("WellLocations", source);
            }

            //Sequence.LinearSpacing

            //DataFrame? data = await ArcGisService.QueryDbAsync(locationQuery);

            //if (locationsJson != null)
            //{
            //    jsInteropService.StoreSessionDataAsync("WellLocations", locationsJson).GetAwaiter().GetResult();

            //    Action? addFeaturesFromStorage = jsInteropService.BuildJsAction("window.addFeaturesFromStorage");

            //    addFeaturesFromStorage?.Invoke();
            //}

            return (data, dataJson);
        }

        public static Extent? GetExtent()
        {
            return _instance.getExtent();
        }

        public static async Task<Extent?> GetExtentAsync()
        {
            return await _instance.getExtentAsync();
        }

        public static DataFrame? QueryDb(string sql)
        {
            return _instance.queryDb(sql);
        }

        public static async Task<DataFrame?> QueryDbAsync(string sql)
        {
            return await _instance.queryDbAsync(sql);
        }

        public static Extent? LoadExtent(out string extentJson,
                                         out string spatialReferenceJson)
        {
            return _instance.loadExtent(out extentJson, out spatialReferenceJson);
        }

        public static async Task<(Extent?, string, string)> LoadExtentAsync()
        {
            return await _instance.loadExtentAsync();
        }

        public static DataFrame? LoadLocations(out Graphic[]? locationsJson)
        {
            return _instance.loadLocations(out locationsJson);
        }

        public static async Task<(DataFrame?,Graphic[]?)> LoadLocationsAsync()
        {
            return await _instance.loadLocationsAsync();
        }
        
        public static DataFrame? LoadData(out Graphic[]? dataJson)
        {
            return _instance.loadData(out dataJson);
        }
        public static async Task<(DataFrame?,Graphic[]?)> LoadDataAsync()
        {
            return await _instance.loadDataAsync();
        }
    }
}