#nullable enable

using System.Threading.Tasks;

using Engineering.DataSource.GeoSpatial;

using Microsoft.AspNetCore.Components;
using Microsoft.Data.Analysis;

namespace EngineeringToolsServer.Services
{
    public interface IArcGisService
    {
        Extent? GetExtent();

        Task<Extent?> GetExtentAsync();

        DataFrame? QueryDb(string sql);

        Task<DataFrame?> QueryDbAsync(string sql);
        

        Extent? LoadExtent(out MarkupString extentJson,
                           out MarkupString spatialReferenceJson);

        DataFrame? LoadLocations(out string? locationsJson);
    }
}