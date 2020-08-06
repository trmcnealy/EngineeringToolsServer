#nullable enable

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Windows.Media.Imaging;

using DataStructures.GeoJsonSchema;

using EngineeringToolsServer.Services;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.Analysis;
using Microsoft.Extensions.Logging;

using GeoJson = DataStructures.GeoJsonSchema.GeoJson;

namespace EngineeringToolsServer.Pages
{
    //@if(@Model.Loading)
    //{
    //<div class="spinner">Loading...</div>
    //}
    //else
    //{
    //<div id ="plotlyDiv" class="plotlyView" style="height: 100%; margin: 0; padding: 0; width: 100%;"></div>
    //}

    public class MapboxModel : PageModel
    {
        
        private readonly ILogger<ErrorModel> _logger;

        public MapboxModel(ILogger<ErrorModel> logger)
        {
            _logger                 = logger;
        }

        public async Task OnGetAsync()
        {
            //if(!DataManager.Instance.IsValidVariable("MapboxData"))
            //{
            //    DataFrame? dataFrame = await DatabaseService.QueryDbAsync(OilGasQueries.AllWellsLocations);

            //    if(dataFrame != null)
            //    {

            //        GeoJson geoJson = new GeoJson
            //        {
            //            Type = GeoJsonKind.FeatureCollection,
            //            Features = new List<FeatureType?>((int)dataFrame.Rows.Count)
            //        };

            //        StringDataFrameColumn?           apis             = dataFrame.Columns.GetStringColumn("Api");
            //        PrimitiveDataFrameColumn<double> surfaceLongitude = dataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLongitude");
            //        PrimitiveDataFrameColumn<double> bottomLongitude  = dataFrame.Columns.GetPrimitiveColumn<double>("BottomLongitude");
            //        PrimitiveDataFrameColumn<double> surfaceLatitude  = dataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLatitude");
            //        PrimitiveDataFrameColumn<double> bottomLatitude   = dataFrame.Columns.GetPrimitiveColumn<double>("BottomLatitude");

            //        Parallel.ForEach(Partitioner.Create(0, dataFrame.Rows.Count, dataFrame.Rows.Count / Environment.ProcessorCount),
            //                         row =>
            //                         {
            //                             for(long i = row.Item1; i < row.Item2; i++)
            //                             {
            //                                 geoJson.Features.Add(new Feature
            //                                 {
            //                                     Id = i,
            //                                     Geometry = new Geometry
            //                                     {
            //                                         Type = GeometryKind.LineString,
            //                                         Coordinates = new List<CoordinateElement?>
            //                                         {
            //                                             new List<double>
            //                                             {
            //                                                 surfaceLongitude[i] ?? 0.0, surfaceLatitude[i] ?? 0.0
            //                                             },
            //                                             new List<double>
            //                                             {
            //                                                 bottomLongitude[i] ?? 0.0, bottomLatitude[i] ?? 0.0
            //                                             }
            //                                         }
            //                                     },
            //                                     Properties = new Dictionary<string, object>
            //                                     {
            //                                         {"API", apis[i]}
            //                                     }
            //                                 });
            //                             }
            //                         });

            //        //for(int i = 0; i < dataFrame.Rows.Count; ++i)
            //        //{
            //        //    longitudes.Add(new double?[]
            //        //    {
            //        //        surfaceLongitude[i], bottomLongitude[i]
            //        //    });
            //        //    latitudes.Add(new double?[]
            //        //    {
            //        //        surfaceLatitude[i], bottomLatitude[i]
            //        //    });
            //        //}

            //        await _serverEventsController.SendData(geoJson.ToJson());

            //        //DataManager.Instance[("MapboxData", MediaTypes.Json)] = geoJson.ToJson();

            //        //_logger.LogInformation($"{DataManager.Instance.BaseUrl}/data/WellLocations");
            //    }
            //}
            
            await Task.CompletedTask;
        }
    }
}

//const plotData = {
//    'data': [
//        {
//            'type': 'contourgl',
//            'z': [
//                [10, 10.625, 12.5, 15.625, 20],
//                [5.625, 6.25, 8.125, 11.25, 15.625],
//                [2.5, 3.125, 5, 8.125, 12.5],
//                [0.625, 1.25, 3.125, 6.25, 10.625],
//                [0, 0.625, 2.5, 5.625, 10]
//            ],
//            'colorscale': 'Jet',
//            'contours': {
//                'start': 2,
//                'end': 10,
//                'size': 1
//            },
//            'uid': 'ad5624',
//            'zmin': 0,
//            'zmax': 20
//        }
//    ],
//    'layout': {
//        'xaxis': {
//            'range': [
//                0,
//                4
//            ],
//            'autorange': true
//        },
//        'yaxis': {
//            'range': [
//                0,
//                4
//            ],
//            'autorange': true
//        },
//        'height': 450,
//        'width': 1000,
//        'autosize': true
//    }
//};