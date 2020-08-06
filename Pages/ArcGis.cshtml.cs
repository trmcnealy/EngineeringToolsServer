#nullable enable
using System;
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
    public class ArcGisModel : PageModel
    {
        public string SpatialReference
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
        }

        public string Extent
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
        }

        private readonly ILogger<ErrorModel> _logger;

        public ArcGisModel(ILogger<ErrorModel> logger)
        {
            _logger          = logger;
            SpatialReference = "";
            Extent           = "";
        }

        public async Task OnGetAsync()
        {
            //if(!DataManager.Instance.IsValidVariable("Extents") || !DataManager.Instance.IsValidVariable("SpatialReference"))
            //{
            //    (Extent? et, string extent, string spatialReference) = await ArcGisService.LoadExtentAsync();

            //    if(extent != null)
            //    {
            //        DataManager.Instance["Extents"] = extent;
            //        //_logger.LogInformation($"{DataManager.Instance.BaseUrl}/data/Extents");

            //        Extent = extent;
            //    }

            //    if(spatialReference != null)
            //    {
            //        DataManager.Instance["SpatialReference"] = spatialReference;
            //        //_logger.LogInformation($"{DataManager.Instance.BaseUrl}/data/SpatialReference");

            //        SpatialReference = spatialReference;
            //    }
            //}
            //else
            //{
            //    Extent           = (string)DataManager.Instance["Extents"];
            //    SpatialReference = (string)DataManager.Instance["SpatialReference"];
            //}

            //if(!DataManager.Instance.IsValidVariable("WellLocations"))
            //{
            //    (DataFrame? wl, Graphic[]? locationsJson) = await ArcGisService.LoadLocationsAsync();

            //    if(locationsJson != null)
            //    {
            //        DataManager.Instance["WellLocations"] = "[" + string.Join(", ", locationsJson.Select(graphic => graphic.ToJson())) + "]";
            //        //_logger.LogInformation($"{DataManager.Instance.BaseUrl}/data/WellLocations");
            //    }
            //}

            //if(!DataManager.Instance.IsValidVariable("WellData"))
            //{
            //    (DataFrame? dt, Graphic[]? dataJson) = await ArcGisService.LoadDataAsync();

            //    if(dataJson != null)
            //    {
            //        DataManager.Instance["WellData"] = "[" + string.Join(", ", dataJson.Select(graphic => graphic.ToJson())) + "]";
            //    }
            //}

            await Task.CompletedTask;
        }
    }
}