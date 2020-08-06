using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace EngineeringToolsServer.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly NavigationManager _navigationManager;

        public IndexModel(ILogger<IndexModel> logger,
                          NavigationManager navigationManager)
        {
            _logger = logger;
            _navigationManager = navigationManager;
        }

        public async Task<IActionResult> OnGetAsync()
        {
            //_navigationManager.NavigateTo("/ArcGis");

            //return await Task.FromResult(RedirectToPage("/ArcGis"));
            return await Task.FromResult(RedirectToPage("/Mapbox"));
        }

        //public async Task<IActionResult> OnPostAsync()
        //{
        //    return await Task.FromResult(RedirectToPage("/ArcGis"));
        //}
    }
}
