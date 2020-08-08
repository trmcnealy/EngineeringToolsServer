#nullable enable
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using Engineering.DataSource.GeoSpatial;

using EngineeringToolsServer.Services;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.Analysis;
using Microsoft.Extensions.Logging;

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

    public class PlotlyModel : PageModel
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

        private readonly ILogger<ErrorModel> _logger;

        public PlotlyModel(ILogger<ErrorModel> logger)
        {
            _logger = logger;
        }

        //public async Task OnGetAsync()
        //{
        //    Loading = true;

        //    if(!DataManager.Instance.IsValidVariable("PlotlyData"))
        //    {
        //        DataFrame? dataFrame = await DatabaseService.QueryDbAsync(OilGasQueries.AllWellsLocations);

        //        if(dataFrame != null)
        //        {
        //            string[] plotlyLineDatas = new string[dataFrame.Rows.Count];

        //            StringDataFrameColumn?           apis             = dataFrame.Columns.GetStringColumn("Api");
        //            PrimitiveDataFrameColumn<double> surfaceLongitude = dataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLongitude");
        //            PrimitiveDataFrameColumn<double> bottomLongitude  = dataFrame.Columns.GetPrimitiveColumn<double>("BottomLongitude");
        //            PrimitiveDataFrameColumn<double> surfaceLatitude  = dataFrame.Columns.GetPrimitiveColumn<double>("SurfaceLatitude");
        //            PrimitiveDataFrameColumn<double> bottomLatitude   = dataFrame.Columns.GetPrimitiveColumn<double>("BottomLatitude");

        //            Parallel.ForEach(Partitioner.Create(0, dataFrame.Rows.Count, dataFrame.Rows.Count / Environment.ProcessorCount),
        //                             row =>
        //                             {
        //                                 for(long i = row.Item1; i < row.Item2; i++)
        //                                 {
        //                                     plotlyLineDatas[i] = new PlotlyLineData($"API: {apis[i]}",
        //                                                                             new double?[]
        //                                                                             {
        //                                                                                 surfaceLongitude[i], bottomLongitude[i]
        //                                                                             },
        //                                                                             new double?[]
        //                                                                             {
        //                                                                                 surfaceLatitude[i], bottomLatitude[i]
        //                                                                             },
        //                                                                             1.0,
        //                                                                             2,
        //                                                                             "rgba(255,0,0,255)").ToJson();
        //                                 }
        //                             });

        //            //for(int i = 0; i < dataFrame.Rows.Count; ++i)
        //            //{
        //            //    longitudes.Add(new double?[]
        //            //    {
        //            //        surfaceLongitude[i], bottomLongitude[i]
        //            //    });
        //            //    latitudes.Add(new double?[]
        //            //    {
        //            //        surfaceLatitude[i], bottomLatitude[i]
        //            //    });
        //            //}

        //            DataManager.Instance[("PlotlyData", MediaTypes.Json)] = "[" + string.Join(", ", plotlyLineDatas) + "]";

        //            //_logger.LogInformation($"{DataManager.Instance.BaseUrl}/data/WellLocations");
        //        }
        //    }

        //    Loading = false;
        //}
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