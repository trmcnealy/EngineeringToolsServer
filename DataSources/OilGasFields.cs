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
using Engineering.DataSource;
using EngineeringToolsServer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Analysis;

namespace EngineeringToolsServer.DataSources
{
    [ApiController]
    [Route("DataSource/[action]")]
    public sealed class OilGasDataSourceController : Controller
    {
        public DataSource DataSource { get; } = new OilGasFields();

        [HttpGet] //[Route("GetFieldNames")]
        public IActionResult GetFieldNames()
        {
            return Ok(DataSource.GetFields());
        }

        [HttpGet]
        public async Task<IActionResult> GetData([FromQuery] string      name,
                                                 [FromQuery] string      type,
                                                 [FromQuery] ApiNumber[] apiFilters,
                                                 [FromQuery] string[]    fields)
        {
            string sqlQuery = DataSource.GetSqlQuery(apiFilters, fields);

            string queryResult = await DatabaseService.QueryDbAsync(sqlQuery, type, fields.Any(field => field.Contains("Bottom")));

            DataManager.Instance[(name, MediaTypes.Json)] = queryResult;

            return Ok(name);
        }
    }

    public sealed class OilGasFields : DataSource
    {        
        private static readonly string[] Tables = new string[]
        {
            "Well",
            "Lease",
            "Field",
            "Company",
            "Location",
            "WellboreDetails",
            "CompletionDetails",
            "PerforationIntervals",
            "PerforationInterval",
            "ReservoirData",
            "ReservoirProperties",
            "GasProperties",
            "OilProperties",
            "MonthlyProduction"
        };
                
        private static readonly Dictionary<string,string> FieldDbNameMap = new Dictionary<string,string>
        {
            {"Api", "\"Api\""},
            {"Name", "\"Name\""},
            {"Number", "\"Number\""},
            {"Lease Name", "\"Name\""},
            {"Lease Number", "\"Number\""},
            {"Lease District", "\"District\""},
            {"Field Name", "\"Name\""},
            {"Field Number", "\"Number\""},
            {"Field District", "\"District\""},
            {"Company Name", "\"Name\""},
            {"Company Number", "\"Number\""},
            {"Surface Latitude 27", "\"SurfaceLatitude27\""},
            {"Surface Longitude 27", "\"SurfaceLongitude27\""},
            {"Bottom Latitude 27", "\"BottomLatitude27\""},
            {"Bottom Longitude 27", "\"BottomLongitude27\""},
            {"Surface Latitude 83", "\"SurfaceLatitude83\""},
            {"Surface Longitude 83", "\"SurfaceLongitude83\""},
            {"Bottom Latitude 83", "\"BottomLatitude83\""},
            {"Bottom Longitude 83", "\"BottomLongitude83\""},
            {"Surface Easting 27", "\"SurfaceEasting27\""},
            {"Surface Northing 27", "\"SurfaceNorthing27\""},
            {"Bottom Easting 27", "\"BottomEasting27\""},
            {"Bottom Northing 27", "\"BottomNorthing27\""},
            {"Surface Easting 83", "\"SurfaceEasting83\""},
            {"Surface Northing 83", "\"SurfaceNorthing83\""},
            {"Bottom Easting 83", "\"BottomEasting83\""},
            {"Bottom Northing 83", "\"BottomNorthing83\""},
            {"Elevation", "\"Elevation\""},
            {"Elevation Datum", "\"ElevationDatum\""},
            {"Total Depth", "\"TotalDepth\""},
            {"Total Length", "\"TotalLength\""},
            {"Completion Start Date", "\"StartDate\""},
            {"Completion End Date", "\"EndDate\""},
            {"Completion Reservoir Name", "\"ReservoirName\""},
            {"Completion Lateral Length", "\"LateralLength\""},
            {"Completion Treatment Count", "\"TreatmentCount\""},
            {"Completion Cluster Per Treatment Count", "\"ClusterPerTreatmentCount\""},
            {"Completion Proppant Type", "\"ProppantType\""},
            {"Completion Proppant Mesh", "\"ProppantMesh\""},
            {"Completion Max Proppant Concentration", "\"MaxProppantConcentration\""},
            {"Completion Perforation Intervals Count", "\"Count\""},
            {"Completion Perforation Intervals Start Depth", "\"StartDepth\""},
            {"Completion Perforation Intervals End Depth", "\"EndDepth\""},
            {"Reservoir Name", "\"ReservoirName\""},
            {"Reservoir Depth", "\"ReservoirDepth\""},
            {"Reservoir Drainage Length", "\"DrainageLength\""},
            {"Reservoir Drainage Width", "\"DrainageWidth\""},
            {"Reservoir Thickness", "\"Thickness\""},
            {"Reservoir Porosity", "\"Porosity\""},
            {"Reservoir Permeability", "\"Permeability\""},
            {"Reservoir Temperature", "\"Temperature\""},
            {"Reservoir Initial Pressure", "\"InitialPressure\""},
            {"Reservoir Rock Compressibility", "\"RockCompressibility\""},
            {"Reservoir Gas Saturation", "\"GasSaturation\""},
            {"Reservoir Oil Saturation", "\"OilSaturation\""},
            {"Reservoir Water Saturation", "\"WaterSaturation\""},
            {"Gas Specific Gravity", "\"GasSpecificGravity\""},
            {"Gas H2S", "\"GasH2S\""},
            {"Gas CO2", "\"GasCO2\""},
            {"Gas N2", "\"GasN2\""},
            {"Gas Visocity", "\"GasVisocity\""},
            {"Gas Compressibility", "\"GasCompressibility\""},
            {"Gas Reference Temperature", "\"GasReferenceTemperature\""},
            {"Gas Reference Pressure", "\"GasReferencePressure\""},
            {"Oil Density", "\"OilDensity\""},
            {"Oil Visocity", "\"OilVisocity\""},
            {"Oil Formation Volume Factor", "\"OilFormationVolumeFactor\""},
            {"Oil Compressibility", "\"OilCompressibility\""},
            {"Oil Reference Temperature", "\"OilReferenceTemperature\""},
            {"Oil Reference Pressure", "\"OilReferencePressure\""},
            {"Monthly Production Date", "\"Date\""},
            {"Monthly Production Gas Volume", "\"GasVolume\""},
            {"Monthly Production Oil Volume", "\"OilVolume\""},
            {"Monthly Production Condensate Volume", "\"CondensateVolume\""},
            {"Monthly Production Water Volume", "\"WaterVolume\""}
        };

        
        private static readonly Dictionary<string,string> FieldDbFullNameMap = new Dictionary<string,string>
        {
            {"Api", "Well.\"Api\""},
            {"Name", "Well.\"Name\""},
            {"Number", "Well.\"Number\""},
            {"Lease Name", "Lease.\"Name\""},
            {"Lease Number", "Lease.\"Number\""},
            {"Lease District", "Lease.\"District\""},
            {"Field Name", "Field.\"Name\""},
            {"Field Number", "Field.\"Number\""},
            {"Field District", "Field.\"District\""},
            {"Company Name", "Company.\"Name\""},
            {"Company Number", "Company.\"Number\""},
            {"Surface Latitude 27", "ShapeFileLocation.\"SurfaceLatitude27\""},
            {"Surface Longitude 27", "ShapeFileLocation.\"SurfaceLongitude27\""},
            {"Bottom Latitude 27", "ShapeFileLocation.\"BottomLatitude27\""},
            {"Bottom Longitude 27", "ShapeFileLocation.\"BottomLongitude27\""},
            {"Surface Latitude 83", "ShapeFileLocation.\"SurfaceLatitude83\""},
            {"Surface Longitude 83", "ShapeFileLocation.\"SurfaceLongitude83\""},
            {"Bottom Latitude 83", "ShapeFileLocation.\"BottomLatitude83\""},
            {"Bottom Longitude 83", "ShapeFileLocation.\"BottomLongitude83\""},
            {"Surface Easting 27", "ShapeFileLocation.\"SurfaceEasting27\""},
            {"Surface Northing 27", "ShapeFileLocation.\"SurfaceNorthing27\""},
            {"Bottom Easting 27", "ShapeFileLocation.\"BottomEasting27\""},
            {"Bottom Northing 27", "ShapeFileLocation.\"BottomNorthing27\""},
            {"Surface Easting 83", "ShapeFileLocation.\"SurfaceEasting83\""},
            {"Surface Northing 83", "ShapeFileLocation.\"SurfaceNorthing83\""},
            {"Bottom Easting 83", "ShapeFileLocation.\"BottomEasting83\""},
            {"Bottom Northing 83", "ShapeFileLocation.\"BottomNorthing83\""},
            {"Elevation", "WellboreDetails.\"Elevation\""},
            {"Elevation Datum", "WellboreDetails.\"ElevationDatum\""},
            {"Total Depth", "WellboreDetails.\"TotalDepth\""},
            {"Total Length", "WellboreDetails.\"TotalLength\""},
            {"Completion Start Date", "CompletionPerforationDetails.\"StartDate\""},
            {"Completion End Date", "CompletionPerforationDetails.\"EndDate\""},
            {"Completion Reservoir Name", "CompletionPerforationDetails.\"ReservoirName\""},
            {"Completion Lateral Length", "CompletionPerforationDetails.\"LateralLength\""},
            {"Completion Treatment Count", "CompletionPerforationDetails.\"TreatmentCount\""},
            {"Completion Cluster Per Treatment Count", "CompletionPerforationDetails.\"ClusterPerTreatmentCount\""},
            {"Completion Proppant Type", "CompletionPerforationDetails.\"ProppantType\""},
            {"Completion Proppant Mesh", "CompletionPerforationDetails.\"ProppantMesh\""},
            {"Completion Max Proppant Concentration", "CompletionPerforationDetails.\"MaxProppantConcentration\""},
            {"Completion Perforation Intervals Count", "CompletionPerforationDetails.\"Count\""},
            {"Completion Perforation Intervals Start Depth", "CompletionPerforationDetails.\"StartDepth\""},
            {"Completion Perforation Intervals End Depth", "CompletionPerforationDetails.\"EndDepth\""},
            {"Reservoir Name", "ReservoirDataProperties.\"ReservoirName\""},
            {"Reservoir Depth", "ReservoirDataProperties.\"ReservoirDepth\""},
            {"Reservoir Drainage Length", "ReservoirDataProperties.\"DrainageLength\""},
            {"Reservoir Drainage Width", "ReservoirDataProperties.\"DrainageWidth\""},
            {"Reservoir Thickness", "ReservoirDataProperties.\"Thickness\""},
            {"Reservoir Porosity", "ReservoirDataProperties.\"Porosity\""},
            {"Reservoir Permeability", "ReservoirDataProperties.\"Permeability\""},
            {"Reservoir Temperature", "ReservoirDataProperties.\"Temperature\""},
            {"Reservoir Initial Pressure", "ReservoirDataProperties.\"InitialPressure\""},
            {"Reservoir Rock Compressibility", "ReservoirDataProperties.\"RockCompressibility\""},
            {"Reservoir Gas Saturation", "ReservoirDataProperties.\"GasSaturation\""},
            {"Reservoir Oil Saturation", "ReservoirDataProperties.\"OilSaturation\""},
            {"Reservoir Water Saturation", "ReservoirDataProperties.\"WaterSaturation\""},
            {"Gas Specific Gravity", "ReservoirDataProperties.\"GasSpecificGravity\""},
            {"Gas H2S", "ReservoirDataProperties.\"GasH2S\""},
            {"Gas CO2", "ReservoirDataProperties.\"GasCO2\""},
            {"Gas N2", "ReservoirDataProperties.\"GasN2\""},
            {"Gas Visocity", "ReservoirDataProperties.\"GasVisocity\""},
            {"Gas Compressibility", "ReservoirDataProperties.\"GasCompressibility\""},
            {"Gas Reference Temperature", "ReservoirDataProperties.\"GasReferenceTemperature\""},
            {"Gas Reference Pressure", "ReservoirDataProperties.\"GasReferencePressure\""},
            {"Oil Density", "ReservoirDataProperties.\"OilDensity\""},
            {"Oil Visocity", "ReservoirDataProperties.\"OilVisocity\""},
            {"Oil Formation Volume Factor", "ReservoirDataProperties.\"OilFormationVolumeFactor\""},
            {"Oil Compressibility", "ReservoirDataProperties.\"OilCompressibility\""},
            {"Oil Reference Temperature", "ReservoirDataProperties.\"OilReferenceTemperature\""},
            {"Oil Reference Pressure", "ReservoirDataProperties.\"OilReferencePressure\""},
            {"Monthly Production Date", "MonthlyProduction.\"Date\""},
            {"Monthly Production Gas Volume", "MonthlyProduction.\"GasVolume\""},
            {"Monthly Production Oil Volume", "MonthlyProduction.\"OilVolume\""},
            {"Monthly Production Condensate Volume", "MonthlyProduction.\"CondensateVolume\""},
            {"Monthly Production Water Volume", "MonthlyProduction.\"WaterVolume\""}
        };

        
        private static readonly Dictionary<string,Type> FieldDbTypeMap = new Dictionary<string,Type>
        {
            {"Api", typeof(string)},
            {"Name", typeof(string)},
            {"Number", typeof(double)},
            {"Lease Name", typeof(string)},
            {"Lease Number", typeof(long)},
            {"Lease District", typeof(int)},
            {"Field Name", typeof(string)},
            {"Field Number", typeof(long)},
            {"Field District", typeof(int)},
            {"Company Name", typeof(string)},
            {"Company Number", typeof(long)},
            {"Surface Latitude 27", typeof(double)},
            {"Surface Longitude 27", typeof(double)},
            {"Bottom Latitude 27", typeof(double)},
            {"Bottom Longitude 27", typeof(double)},
            {"Surface Latitude 83", typeof(double)},
            {"Surface Longitude 83", typeof(double)},
            {"Bottom Latitude 83", typeof(double)},
            {"Bottom Longitude 83", typeof(double)},
            {"Surface Easting 27", typeof(double)},
            {"Surface Northing 27", typeof(double)},
            {"Bottom Easting 27", typeof(double)},
            {"Bottom Northing 27", typeof(double)},
            {"Surface Easting 83", typeof(double)},
            {"Surface Northing 83", typeof(double)},
            {"Bottom Easting 83", typeof(double)},
            {"Bottom Northing 83", typeof(double)},
            {"Elevation", typeof(double)},
            {"Elevation Datum", typeof(string)},
            {"Total Depth", typeof(double)},
            {"Total Length", typeof(double)},
            {"Completion Start Date", typeof(DateTime)},
            {"Completion End Date", typeof(DateTime)},
            {"Completion Reservoir Name", typeof(string)},
            {"Completion Lateral Length", typeof(double)},
            {"Completion Treatment Count", typeof(int)},
            {"Completion Cluster Per Treatment Count", typeof(int)},
            {"Completion Proppant Type", typeof(string)},
            {"Completion Proppant Mesh", typeof(string)},
            {"Completion Max Proppant Concentration", typeof(double)},
            {"Completion Perforation Intervals Count", typeof(int)},
            {"Completion Perforation Intervals Start Depth", typeof(double)},
            {"Completion Perforation Intervals End Depth", typeof(double)},
            {"Reservoir Name", typeof(string)},
            {"Reservoir Depth", typeof(double)},
            {"Reservoir Drainage Length", typeof(double)},
            {"Reservoir Drainage Width", typeof(double)},
            {"Reservoir Thickness", typeof(double)},
            {"Reservoir Porosity", typeof(double)},
            {"Reservoir Permeability", typeof(double)},
            {"Reservoir Temperature", typeof(double)},
            {"Reservoir Initial Pressure", typeof(double)},
            {"Reservoir Rock Compressibility", typeof(double)},
            {"Reservoir Gas Saturation", typeof(double)},
            {"Reservoir Oil Saturation", typeof(double)},
            {"Reservoir Water Saturation", typeof(double)},
            {"Gas Specific Gravity", typeof(double)},
            {"Gas H2S", typeof(double)},
            {"Gas CO2", typeof(double)},
            {"Gas N2", typeof(double)},
            {"Gas Visocity", typeof(double)},
            {"Gas Compressibility", typeof(double)},
            {"Gas Reference Temperature", typeof(double)},
            {"Gas Reference Pressure", typeof(double)},
            {"Oil Density", typeof(double)},
            {"Oil Visocity", typeof(double)},
            {"Oil Formation Volume Factor", typeof(double)},
            {"Oil Compressibility", typeof(double)},
            {"Oil Reference Temperature", typeof(double)},
            {"Oil Reference Pressure", typeof(double)},
            {"Monthly Production Date", typeof(DateTime)},
            {"Monthly Production Gas Volume", typeof(double)},
            {"Monthly Production Oil Volume", typeof(double)},
            {"Monthly Production Condensate Volume", typeof(double)},
            {"Monthly Production Water Volume", typeof(double)}
        };

        private static readonly string[] FieldAliases = new string[]
        {
            "Api",
            "Name",
            "Number",
            "Lease Name",
            "Lease Number",
            "Lease District",
            "Field Name",
            "Field Number",
            "Field District",
            "Company Name",
            "Company Number",
            "Surface Latitude 27",
            "Surface Longitude 27",
            "Bottom Latitude 27",
            "Bottom Longitude 27",
            "Surface Latitude 83",
            "Surface Longitude 83",
            "Bottom Latitude 83",
            "Bottom Longitude 83",
            "Surface Easting 27",
            "Surface Northing 27",
            "Bottom Easting 27",
            "Bottom Northing 27",
            "Surface Easting 83",
            "Surface Northing 83",
            "Bottom Easting 83",
            "Bottom Northing 83",
            "Elevation",
            "Elevation Datum",
            "Total Depth",
            "Total Length",
            "Completion Start Date",
            "Completion End Date",
            "Completion Reservoir Name",
            "Completion Lateral Length",
            "Completion Treatment Count",
            "Completion Cluster Per Treatment Count",
            "Completion Proppant Type",
            "Completion Proppant Mesh",
            "Completion Max Proppant Concentration",
            "Completion Perforation Intervals Count",
            "Completion Perforation Intervals Start Depth",
            "Completion Perforation Intervals End Depth",
            "Reservoir Name",
            "Reservoir Depth",
            "Reservoir Drainage Length",
            "Reservoir Drainage Width",
            "Reservoir Thickness",
            "Reservoir Porosity",
            "Reservoir Permeability",
            "Reservoir Temperature",
            "Reservoir Initial Pressure",
            "Reservoir Rock Compressibility",
            "Reservoir Gas Saturation",
            "Reservoir Oil Saturation",
            "Reservoir Water Saturation",
            "Gas Specific Gravity",
            "Gas H2S",
            "Gas CO2",
            "Gas N2",
            "Gas Visocity",
            "Gas Compressibility",
            "Gas Reference Temperature",
            "Gas Reference Pressure",
            "Oil Density",
            "Oil Visocity",
            "Oil Formation Volume Factor",
            "Oil Compressibility",
            "Oil Reference Temperature",
            "Oil Reference Pressure",
            "Monthly Production Date",
            "Monthly Production Gas Volume",
            "Monthly Production Oil Volume",
            "Monthly Production Condensate Volume",
            "Monthly Production Water Volume"
        };
        
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override ref readonly string[] GetFields()
        {
            return ref FieldAliases;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override TableKind GetFieldTable(string field)
        {
            switch(field)
            {
                case "Api":
                case "Name":
                case "Number":
                {
                    return TableKind.Well;
                }
                case "Lease Name":
                case "Lease Number":
                case "Lease District":
                {
                    return TableKind.Lease;
                }
                case "Field Name":
                case "Field Number":
                case "Field District":
                {
                    return TableKind.Field;
                }
                case "Company Name":
                case "Company Number":
                {
                    return TableKind.Company;
                }
                case "Surface Latitude 27":
                case "Surface Longitude 27":
                case "Bottom Latitude 27":
                case "Bottom Longitude 27":
                case "Surface Latitude 83":
                case "Surface Longitude 83":
                case "Bottom Latitude 83":
                case "Bottom Longitude 83":
                case "Surface Easting 27":
                case "Surface Northing 27":
                case "Bottom Easting 27":
                case "Bottom Northing 27":
                case "Surface Easting 83":
                case "Surface Northing 83":
                case "Bottom Easting 83":
                case "Bottom Northing 83":
                {
                    return TableKind.Location;
                }
                case "Elevation":
                case "Elevation Datum":
                case "Total Depth":
                case "Total Length":
                {
                    return TableKind.WellboreDetails;
                }
                case "Completion Start Date":
                case "Completion End Date":
                case "Completion Reservoir Name":
                case "Completion Lateral Length":
                case "Completion Treatment Count":
                case "Completion Cluster Per Treatment Count":
                case "Completion Proppant Type":
                case "Completion Proppant Mesh":
                case "Completion Max Proppant Concentration":
                {
                    return TableKind.CompletionDetails;
                }
                case "Completion Perforation Intervals Count":
                case "Completion Perforation Intervals Start Depth":
                case "Completion Perforation Intervals End Depth":
                {
                    return TableKind.PerforationInterval;
                }
                case "Reservoir Name":
                case "Reservoir Depth":
                {
                    return TableKind.ReservoirData;
                }
                case "Reservoir Drainage Length":
                case "Reservoir Drainage Width":
                case "Reservoir Thickness":
                case "Reservoir Porosity":
                case "Reservoir Permeability":
                case "Reservoir Temperature":
                case "Reservoir Initial Pressure":
                case "Reservoir Rock Compressibility":
                case "Reservoir Gas Saturation":
                case "Reservoir Oil Saturation":
                case "Reservoir Water Saturation":
                {
                    return TableKind.ReservoirProperties;
                }
                case "Gas Specific Gravity":
                case "Gas H2S":
                case "Gas CO2":
                case "Gas N2":
                case "Gas Visocity":
                case "Gas Compressibility":
                case "Gas Reference Temperature":
                case "Gas Reference Pressure":
                {
                    return TableKind.GasProperties;
                }
                case "Oil Density":
                case "Oil Visocity":
                case "Oil Formation Volume Factor":
                case "Oil Compressibility":
                case "Oil Reference Temperature":
                case "Oil Reference Pressure":
                {
                    return TableKind.OilProperties;
                }
                case "Monthly Production Date":
                case "Monthly Production Gas Volume":
                case "Monthly Production Oil Volume":
                case "Monthly Production Condensate Volume":
                case "Monthly Production Water Volume":
                {
                    return TableKind.MonthlyProduction;
                }
            }
            
            return TableKind.None;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override string GetFieldDbName(string alias)
        {
            return FieldDbNameMap[alias];
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override string GetFieldDbFullName(string alias)
        {
            return FieldDbFullNameMap[alias];
        }

        #region Queries
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        private static string WellTableQuery(ApiNumber[] apiFilters, List<string> fields)
        {
            if (apiFilters.Length > 0)
            {
                return $@"
FROM (
        SELECT ""Id"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
        FROM ""Well""
        WHERE {string.Join(" OR ", apiFilters.ForEach(apiFilter => $"\"Well\".\"Api\" = '{apiFilter}'"))}
) Well
";
            }

            return $@"
FROM (
        SELECT ""Id"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
        FROM ""Well""
        LIMIT 10
) Well
";
            //WHERE ""Well"".""Api"" LIKE '%-255-%'
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string LeaseTableQuery(List<string> fields)
        {
            return $@"
LEFT JOIN (
        SELECT ""Id"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
        FROM ""Lease""
) Lease
ON Well.""LeaseId""=Lease.""Id""
";
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string FieldTableQuery(List<string> fields)
        {
            return $@"
LEFT JOIN (
        SELECT ""Id"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
        FROM ""Field""
) Field
ON Well.""FieldId""=Field.""Id""
";
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string CompanyTableQuery(List<string> fields)
        {
            return $@"
LEFT JOIN (
        SELECT ""Id"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
        FROM ""Company""
) Company
ON Well.""CompanyId""=Company.""Id""
";
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string WellboreDetailsTableQuery(List<string> fields)
        {
            return $@"
LEFT JOIN (
        SELECT ""WellId"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
        FROM ""WellboreDetails""
) WellboreDetails
ON Well.""Id""=WellboreDetails.""WellId""
";
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string LocationTableQuery(List<string> fields)
        {
            return $@"
LEFT JOIN (
        SELECT ""Api"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
        FROM ""ShapeFileLocation""
) ShapeFileLocation
ON Well.""Api""=ShapeFileLocation.""Api""
";
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string CompletionDetailsTableQuery(List<string> completionDetailsFields, List<string> perforationIntervalFields)
        {
            if (perforationIntervalFields.Count == 0)
            {
                return $@"
LEFT JOIN (
    SELECT
        CompletionDetails.""Id"", CompletionDetails.""WellId"", {string.Join(", ", completionDetailsFields.ForEach(field => $"{field}"))}
    FROM ""CompletionDetails""
) AS CompletionPerforationDetails
ON Well.""Id""=CompletionPerforationDetails.""WellId""
";
            }

            if (completionDetailsFields.Count == 0)
            {
                return $@"
RIGHT JOIN (
        SELECT
            CompletionDetails.""WellId"",
            {string.Join(", ", perforationIntervalFields.ForEach(field => $"PerforationInterval.\"{field}\""))}
        FROM (
            SELECT ""Id"", ""WellId""
            FROM ""CompletionDetails""
        ) CompletionDetails
        RIGHT JOIN (
            SELECT ""Id"", ""CompletionDetailsId"", {string.Join(", ", perforationIntervalFields.ForEach(field => $"{field}"))}
            FROM ""PerforationInterval""        
        ) PerforationInterval
        ON CompletionDetails.""Id""=PerforationInterval.""CompletionDetailsId""        
) AS CompletionPerforationDetails
ON Well.""Id""=CompletionPerforationDetails.""WellId""
";
            }

            return $@"
RIGHT JOIN (
        SELECT
            CompletionDetails.""WellId"",
            {string.Join(", ", completionDetailsFields.ForEach(field => $"CompletionDetails.\"{field}\""))},
            {string.Join(", ", perforationIntervalFields.ForEach(field => $"PerforationInterval.\"{field}\""))}
        FROM (
            SELECT ""Id"", ""WellId"", {string.Join(", ", completionDetailsFields.ForEach(field => $"{field}"))}
            FROM ""CompletionDetails""
        ) CompletionDetails
        RIGHT JOIN (
            SELECT ""Id"", ""CompletionDetailsId"", {string.Join(", ", perforationIntervalFields.ForEach(field => $"{field}"))}
            FROM ""PerforationInterval""        
        ) PerforationInterval
        ON CompletionDetails.""Id""=PerforationInterval.""CompletionDetailsId""        
) AS CompletionPerforationDetails
ON Well.""Id""=CompletionPerforationDetails.""WellId""
";
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string ReservoirDataTableQuery(List<string> reservoirDataFields,
                                                     List<string> reservoirPropertiesFields,
                                                     List<string> gasPropertiesFields,
                                                     List<string> oilPropertiesFields,
                                                     List<string> waterPropertiesFields)
        {

            string reservoirProperties = string.Empty;

            string gasProperties = string.Empty;

            string oilProperties = string.Empty;

            string waterProperties = string.Empty;


            if (reservoirPropertiesFields.Count == 0)
            {
                reservoirProperties = $@"
LEFT JOIN (
    SELECT ""Id"", ""ReservoirDataId"", {string.Join(", ", reservoirPropertiesFields.ForEach(field => $"{field}"))}
    FROM ""ReservoirProperties""
) ReservoirProperties
ON ReservoirData.""Id""=ReservoirProperties.""ReservoirDataId""
";
            }

            if (gasPropertiesFields.Count == 0)
            {
                gasProperties = $@"
LEFT JOIN (
    SELECT ""Id"", ""ReservoirDataId"", {string.Join(", ", gasPropertiesFields.ForEach(field => $"{field}"))}
    FROM ""GasProperties""
) GasProperties
ON ReservoirData.""Id""=GasProperties.""ReservoirDataId""
";
            }

            if (oilPropertiesFields.Count == 0)
            {
                oilProperties = $@"
LEFT JOIN (
    SELECT ""Id"", ""ReservoirDataId"", {string.Join(", ", oilPropertiesFields.ForEach(field => $"{field}"))}
    FROM ""OilProperties""
) OilProperties
ON ReservoirData.""Id""=OilProperties.""ReservoirDataId""
";
            }

            if (waterPropertiesFields.Count == 0)
            {
                waterProperties = $@"
LEFT JOIN (
    SELECT ""Id"", ""ReservoirDataId"", {string.Join(", ", waterPropertiesFields.ForEach(field => $"{field}"))}
    FROM ""WaterProperties""
) WaterProperties
ON ReservoirData.""Id""=WaterProperties.""ReservoirDataId"" 
";
            }


            List<string> fields = new List<string>(reservoirDataFields.Count + reservoirPropertiesFields.Count + gasPropertiesFields.Count + oilPropertiesFields.Count + waterPropertiesFields.Count);

            fields.AddRange(reservoirDataFields.ForEach(field => $"ReservoirData.\"{field}\""));
            fields.AddRange(gasPropertiesFields.ForEach(field => $"GasProperties.\"{field}\" AS \"Gas{field}\""));
            fields.AddRange(oilPropertiesFields.ForEach(field => $"OilProperties.\"{field}\" AS \"Oil{field}\""));
            fields.AddRange(waterPropertiesFields.ForEach(field => $"WaterProperties.\"{field}\" AS \"Water{field}\""));

            if (reservoirDataFields.Count == 0)
            {
                return $@"
LEFT JOIN (
    SELECT
        ReservoirData.""WellId"",
        {string.Join(",\n", fields)}
    FROM (
        SELECT ""Id"", ""WellId""
        FROM ""ReservoirData""
    ) ReservoirData
    {reservoirProperties}{gasProperties}{oilProperties}{waterProperties}           
) ReservoirDataProperties
ON Well.""Id""=ReservoirDataProperties.""WellId""
";
            }

            return $@"
LEFT JOIN (
    SELECT
        ReservoirData.""WellId"",
        {string.Join(",\n", fields)}
    FROM (
        SELECT ""Id"", ""WellId"", {string.Join(", ", reservoirDataFields.ForEach(field => $"{field}"))}
        FROM ""ReservoirData""
    ) ReservoirData
    {reservoirProperties}{gasProperties}{oilProperties}{waterProperties}           
) ReservoirDataProperties
ON Well.""Id""=ReservoirDataProperties.""WellId""
";
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static string MonthlyProductionTableQuery(List<string> fields)
        {
            return $@"
RIGHT JOIN (
    SELECT ""Id"", ""WellId"", {string.Join(", ", fields.ForEach(field => $"{field}"))}
    FROM ""MonthlyProduction""
) AS MonthlyProductionRecords
ON Well.""Id""=MonthlyProductionRecords.""WellId""
";
        }

        #endregion

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override string GetSqlQuery(ApiNumber[] apiFilters, string[] fields)
        {

            Dictionary<TableKind, List<string>> fieldMap = new Dictionary<TableKind, List<string>>
            {
                {TableKind.Well, new List<string>()},
                {TableKind.Lease, new List<string>()},
                {TableKind.Field, new List<string>()},
                {TableKind.Company, new List<string>()},
                {TableKind.Location, new List<string>()},
                {TableKind.WellboreDetails, new List<string>()},
                {TableKind.CompletionDetails, new List<string>()},
                {TableKind.PerforationInterval, new List<string>()},
                {TableKind.ReservoirData, new List<string>()},
                {TableKind.ReservoirProperties, new List<string>()},
                {TableKind.GasProperties, new List<string>()},
                {TableKind.OilProperties, new List<string>()},
                {TableKind.WaterProperties, new List<string>()},
                {TableKind.MonthlyProduction, new List<string>()}
            };
            
            
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("SELECT");

            foreach (string field in fields)
            {
                fieldMap[GetFieldTable(field)].Add(GetFieldDbName(field));
            } 
            
            sb.AppendLine($"{string.Join(",\n", fields.ForEach(field => $"{GetFieldDbFullName(field)} AS \"{field}\""))}");

            if(fieldMap[TableKind.Lease].Count > 0)
            {
                fieldMap[TableKind.Well].Add("LeaseId");
            }

            if(fieldMap[TableKind.Field].Count > 0)
            {
                fieldMap[TableKind.Well].Add("FieldId");
            }

            if(fieldMap[TableKind.Company].Count > 0)
            {
                fieldMap[TableKind.Well].Add("CompanyId");
            }


            sb.Append(WellTableQuery(apiFilters, fieldMap[TableKind.Well]));

            if(fieldMap[TableKind.Lease].Count > 0)
            {
                sb.Append(LeaseTableQuery(fieldMap[TableKind.Lease]));
            }

            if(fieldMap[TableKind.Field].Count > 0)
            {
                sb.Append(FieldTableQuery(fieldMap[TableKind.Field]));
            }
            
            if(fieldMap[TableKind.Company].Count > 0)
            {
                sb.Append(CompanyTableQuery(fieldMap[TableKind.Company]));
            }

            if(fieldMap[TableKind.WellboreDetails].Count > 0)
            {
                sb.Append(WellboreDetailsTableQuery(fieldMap[TableKind.WellboreDetails]));
            }

            if(fieldMap[TableKind.Location].Count > 0)
            {
                sb.Append(LocationTableQuery(fieldMap[TableKind.Location]));
            }

            if(fieldMap[TableKind.CompletionDetails].Count > 0 || fieldMap[TableKind.PerforationInterval].Count > 0)
            {
                sb.Append(CompletionDetailsTableQuery(fieldMap[TableKind.CompletionDetails], fieldMap[TableKind.PerforationInterval]));
            }


            if(fieldMap[TableKind.ReservoirData].Count > 0 ||
               fieldMap[TableKind.ReservoirProperties].Count > 0 ||
               fieldMap[TableKind.GasProperties].Count > 0 ||
               fieldMap[TableKind.OilProperties].Count > 0 ||
               fieldMap[TableKind.WaterProperties].Count > 0)
            {
                sb.Append(ReservoirDataTableQuery(fieldMap[TableKind.ReservoirData],
                                                  fieldMap[TableKind.ReservoirProperties],
                                                  fieldMap[TableKind.GasProperties],
                                                  fieldMap[TableKind.OilProperties],
                                                  fieldMap[TableKind.WaterProperties]));
            }

            
            if(fieldMap[TableKind.MonthlyProduction].Count > 0)
            {
                sb.Append(MonthlyProductionTableQuery(fieldMap[TableKind.MonthlyProduction]));
            }

            return sb.ToString();
        }

    }
}


//        public static readonly string[] Available = new string[]
//        {
//            "Well.Id",
//            "Well.Api",
//            "Well.Name",
//            "Well.Number",
//            "Well.LeaseId",
//            "Well.FieldId",
//            "Well.CompanyId",
//            "Well.Lease.Id",
//            "Well.Lease.Name",
//            "Well.Lease.Number",
//            "Well.Lease.District",
//            "Well.Field.Id",
//            "Well.Field.Name",
//            "Well.Field.Number",
//            "Well.Field.District",
//            "Well.Company.Id",
//            "Well.Company.Name",
//            "Well.Company.Number",
//            "Well.Location.Api",
//            "Well.Location.SurfaceLatitude27",
//            "Well.Location.SurfaceLongitude27",
//            "Well.Location.BottomLatitude27",
//            "Well.Location.BottomLongitude27",
//            "Well.Location.SurfaceLatitude83",
//            "Well.Location.SurfaceLongitude83",
//            "Well.Location.BottomLatitude83",
//            "Well.Location.BottomLongitude83",
//            "Well.Location.SurfaceEasting27",
//            "Well.Location.SurfaceNorthing27",
//            "Well.Location.BottomEasting27",
//            "Well.Location.BottomNorthing27",
//            "Well.Location.SurfaceEasting83",
//            "Well.Location.SurfaceNorthing83",
//            "Well.Location.BottomEasting83",
//            "Well.Location.BottomNorthing83",
//            "Well.WellboreDetails.Elevation",
//            "Well.WellboreDetails.ElevationDatum",
//            "Well.WellboreDetails.TotalDepth",
//            "Well.WellboreDetails.TotalLength",
//            "Well.WellboreDetails.WellId",
//            "Well.CompletionDetails.Id",
//            "Well.CompletionDetails.StartDate",
//            "Well.CompletionDetails.EndDate",
//            "Well.CompletionDetails.ReservoirName",
//            "Well.CompletionDetails.LateralLength",
//            "Well.CompletionDetails.TreatmentCount",
//            "Well.CompletionDetails.ClusterPerTreatmentCount",
//            "Well.CompletionDetails.ProppantType",
//            "Well.CompletionDetails.ProppantMesh",
//            "Well.CompletionDetails.MaxProppantConcentration",
//            "Well.CompletionDetails.WellId",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.Id",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.Count",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.StartDepth",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.EndDepth",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.CompletionDetailsId",
//            "Well.ReservoirData.Id",
//            "Well.ReservoirData.ReservoirName",
//            "Well.ReservoirData.ReservoirDepth",
//            "Well.ReservoirData.WellId",
//            "Well.ReservoirData.ReservoirProperties",
//            "Well.ReservoirData.ReservoirProperties.Id",
//            "Well.ReservoirData.ReservoirProperties.DrainageLength",
//            "Well.ReservoirData.ReservoirProperties.DrainageWidth",
//            "Well.ReservoirData.ReservoirProperties.Thickness",
//            "Well.ReservoirData.ReservoirProperties.Porosity",
//            "Well.ReservoirData.ReservoirProperties.Permeability",
//            "Well.ReservoirData.ReservoirProperties.Temperature",
//            "Well.ReservoirData.ReservoirProperties.InitialPressure",
//            "Well.ReservoirData.ReservoirProperties.RockCompressibility",
//            "Well.ReservoirData.ReservoirProperties.GasSaturation",
//            "Well.ReservoirData.ReservoirProperties.OilSaturation",
//            "Well.ReservoirData.ReservoirProperties.WaterSaturation",
//            "Well.ReservoirData.ReservoirProperties.ReservoirDataId",
//            "Well.ReservoirData.GasProperties.Id",
//            "Well.ReservoirData.GasProperties.SpecificGravity",
//            "Well.ReservoirData.GasProperties.H2S",
//            "Well.ReservoirData.GasProperties.CO2",
//            "Well.ReservoirData.GasProperties.N2",
//            "Well.ReservoirData.GasProperties.Visocity",
//            "Well.ReservoirData.GasProperties.Compressibility",
//            "Well.ReservoirData.GasProperties.ReferenceTemperature",
//            "Well.ReservoirData.GasProperties.ReferencePressure",
//            "Well.ReservoirData.GasProperties.ReservoirDataId",
//            "Well.ReservoirData.OilProperties.Id",
//            "Well.ReservoirData.OilProperties.Density",
//            "Well.ReservoirData.OilProperties.Visocity",
//            "Well.ReservoirData.OilProperties.FormationVolumeFactor",
//            "Well.ReservoirData.OilProperties.Compressibility",
//            "Well.ReservoirData.OilProperties.ReferenceTemperature",
//            "Well.ReservoirData.OilProperties.ReferencePressure",
//            "Well.ReservoirData.OilProperties.ReservoirDataId",
//            "Well.MonthlyProduction.Id",
//            "Well.MonthlyProduction.Date",
//            "Well.MonthlyProduction.GasVolume",
//            "Well.MonthlyProduction.OilVolume",
//            "Well.MonthlyProduction.CondensateVolume",
//            "Well.MonthlyProduction.WaterVolume",
//            "Well.MonthlyProduction.WellId"
//        };

//        public static readonly string[] FieldLongName = new string[]
//        {
//            "Well.Api",
//            "Well.Name",
//            "Well.Number",
//            "Well.Lease.Name",
//            "Well.Lease.Number",
//            "Well.Lease.District",
//            "Well.Field.Name",
//            "Well.Field.Number",
//            "Well.Field.District",
//            "Well.Company.Name",
//            "Well.Company.Number",
//            "Well.Location.SurfaceLatitude27",
//            "Well.Location.SurfaceLongitude27",
//            "Well.Location.BottomLatitude27",
//            "Well.Location.BottomLongitude27",
//            "Well.Location.SurfaceLatitude83",
//            "Well.Location.SurfaceLongitude83",
//            "Well.Location.BottomLatitude83",
//            "Well.Location.BottomLongitude83",
//            "Well.Location.SurfaceEasting27",
//            "Well.Location.SurfaceNorthing27",
//            "Well.Location.BottomEasting27",
//            "Well.Location.BottomNorthing27",
//            "Well.Location.SurfaceEasting83",
//            "Well.Location.SurfaceNorthing83",
//            "Well.Location.BottomEasting83",
//            "Well.Location.BottomNorthing83",
//            "Well.WellboreDetails.Elevation",
//            "Well.WellboreDetails.ElevationDatum",
//            "Well.WellboreDetails.TotalDepth",
//            "Well.WellboreDetails.TotalLength",
//            "Well.CompletionDetails.StartDate",
//            "Well.CompletionDetails.EndDate",
//            "Well.CompletionDetails.ReservoirName",
//            "Well.CompletionDetails.LateralLength",
//            "Well.CompletionDetails.TreatmentCount",
//            "Well.CompletionDetails.ClusterPerTreatmentCount",
//            "Well.CompletionDetails.ProppantType",
//            "Well.CompletionDetails.ProppantMesh",
//            "Well.CompletionDetails.MaxProppantConcentration",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.Count",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.StartDepth",
//            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.EndDepth",
//            "Well.ReservoirData.ReservoirName",
//            "Well.ReservoirData.ReservoirDepth",
//            "Well.ReservoirData.ReservoirProperties.DrainageLength",
//            "Well.ReservoirData.ReservoirProperties.DrainageWidth",
//            "Well.ReservoirData.ReservoirProperties.Thickness",
//            "Well.ReservoirData.ReservoirProperties.Porosity",
//            "Well.ReservoirData.ReservoirProperties.Permeability",
//            "Well.ReservoirData.ReservoirProperties.Temperature",
//            "Well.ReservoirData.ReservoirProperties.InitialPressure",
//            "Well.ReservoirData.ReservoirProperties.RockCompressibility",
//            "Well.ReservoirData.ReservoirProperties.GasSaturation",
//            "Well.ReservoirData.ReservoirProperties.OilSaturation",
//            "Well.ReservoirData.ReservoirProperties.WaterSaturation",
//            "Well.ReservoirData.GasProperties.SpecificGravity",
//            "Well.ReservoirData.GasProperties.H2S",
//            "Well.ReservoirData.GasProperties.CO2",
//            "Well.ReservoirData.GasProperties.N2",
//            "Well.ReservoirData.GasProperties.Visocity",
//            "Well.ReservoirData.GasProperties.Compressibility",
//            "Well.ReservoirData.GasProperties.ReferenceTemperature",
//            "Well.ReservoirData.GasProperties.ReferencePressure",
//            "Well.ReservoirData.OilProperties.Density",
//            "Well.ReservoirData.OilProperties.Visocity",
//            "Well.ReservoirData.OilProperties.FormationVolumeFactor",
//            "Well.ReservoirData.OilProperties.Compressibility",
//            "Well.ReservoirData.OilProperties.ReferenceTemperature",
//            "Well.ReservoirData.OilProperties.ReferencePressure",
//            "Well.MonthlyProduction.Date",
//            "Well.MonthlyProduction.GasVolume",
//            "Well.MonthlyProduction.OilVolume",
//            "Well.MonthlyProduction.CondensateVolume",
//            "Well.MonthlyProduction.WaterVolume"
//        };
        
//        public static readonly string[] FieldName = new string[]
//        {
//            "Api",
//            "Name",
//            "Number",
//            "Lease.Name",
//            "Lease.Number",
//            "Lease.District",
//            "Field.Name",
//            "Field.Number",
//            "Field.District",
//            "Company.Name",
//            "Company.Number",
//            "Location.SurfaceLatitude27",
//            "Location.SurfaceLongitude27",
//            "Location.BottomLatitude27",
//            "Location.BottomLongitude27",
//            "Location.SurfaceLatitude83",
//            "Location.SurfaceLongitude83",
//            "Location.BottomLatitude83",
//            "Location.BottomLongitude83",
//            "Location.SurfaceEasting27",
//            "Location.SurfaceNorthing27",
//            "Location.BottomEasting27",
//            "Location.BottomNorthing27",
//            "Location.SurfaceEasting83",
//            "Location.SurfaceNorthing83",
//            "Location.BottomEasting83",
//            "Location.BottomNorthing83",
//            "WellboreDetails.Elevation",
//            "WellboreDetails.ElevationDatum",
//            "WellboreDetails.TotalDepth",
//            "WellboreDetails.TotalLength",
//            "CompletionDetails.StartDate",
//            "CompletionDetails.EndDate",
//            "CompletionDetails.ReservoirName",
//            "CompletionDetails.LateralLength",
//            "CompletionDetails.TreatmentCount",
//            "CompletionDetails.ClusterPerTreatmentCount",
//            "CompletionDetails.ProppantType",
//            "CompletionDetails.ProppantMesh",
//            "CompletionDetails.MaxProppantConcentration",
//            "CompletionDetails.PerforationIntervals.PerforationInterval.Count",
//            "CompletionDetails.PerforationIntervals.PerforationInterval.StartDepth",
//            "CompletionDetails.PerforationIntervals.PerforationInterval.EndDepth",
//            "ReservoirData.ReservoirName",
//            "ReservoirData.ReservoirDepth",
//            "ReservoirData.ReservoirProperties.DrainageLength",
//            "ReservoirData.ReservoirProperties.DrainageWidth",
//            "ReservoirData.ReservoirProperties.Thickness",
//            "ReservoirData.ReservoirProperties.Porosity",
//            "ReservoirData.ReservoirProperties.Permeability",
//            "ReservoirData.ReservoirProperties.Temperature",
//            "ReservoirData.ReservoirProperties.InitialPressure",
//            "ReservoirData.ReservoirProperties.RockCompressibility",
//            "ReservoirData.ReservoirProperties.GasSaturation",
//            "ReservoirData.ReservoirProperties.OilSaturation",
//            "ReservoirData.ReservoirProperties.WaterSaturation",
//            "ReservoirData.GasProperties.SpecificGravity",
//            "ReservoirData.GasProperties.H2S",
//            "ReservoirData.GasProperties.CO2",
//            "ReservoirData.GasProperties.N2",
//            "ReservoirData.GasProperties.Visocity",
//            "ReservoirData.GasProperties.Compressibility",
//            "ReservoirData.GasProperties.ReferenceTemperature",
//            "ReservoirData.GasProperties.ReferencePressure",
//            "ReservoirData.OilProperties.Density",
//            "ReservoirData.OilProperties.Visocity",
//            "ReservoirData.OilProperties.FormationVolumeFactor",
//            "ReservoirData.OilProperties.Compressibility",
//            "ReservoirData.OilProperties.ReferenceTemperature",
//            "ReservoirData.OilProperties.ReferencePressure",
//            "MonthlyProduction.Date",
//            "MonthlyProduction.GasVolume",
//            "MonthlyProduction.OilVolume",
//            "MonthlyProduction.CondensateVolume",
//            "MonthlyProduction.WaterVolume"
//        };


//        #region Static Methods
//        public static string WellSqlElement(params string[] fields)
//        {
//            string queryElement = $@"
//SELECT
//FROM (
//        SELECT {
//                    string.Join(", ", fields.ForEach(field => $"\"{field}\""))
//                }
//        FROM ""Well""
//) Well
//";
//            //WHERE ""Well"".""Api"" LIKE '%-255-%'

//            return queryElement;
//        }

//        public static string LeaseSqlQuery()
//        {
//            string queryElement = @"
//SELECT
//    Well.""Api"" AS ""Api"",
//    Well.""Name"" AS ""Name"",
//    Well.""Number"" AS ""Number"",
//    Lease.""Name"" AS ""Lease"",
//    Lease.""Number"" AS ""LeaseNumber"",
//    Lease.""District"" AS ""District""
//FROM (
//    SELECT ""Id"", ""Api"", ""Name"", ""Number"", ""LeaseId""
//    FROM ""Well""
//) Well
//LEFT JOIN (
//        SELECT ""Id"", ""Name"", ""Number"", ""District""
//        FROM ""Lease""
//) Lease
//ON Well.""LeaseId""=Lease.""Id""
//";

//            return queryElement;
//        }

//        public static string FieldSqlQuery()
//        {
//            string queryElement = @"
//SELECT
//    Well.""Api"" AS ""Api"",
//    Well.""Name"" AS ""Name"",
//    Well.""Number"" AS ""Number"",
//    Field.""Name"" AS ""Field"",
//    Field.""Number"" AS ""FieldNumber"",
//    Field.""District"" AS ""District""
//FROM (
//    SELECT ""Id"", ""Api"", ""Name"", ""Number"", ""FieldId""
//    FROM ""Well""
//) Well
//LEFT JOIN (
//        SELECT ""Id"", ""Name"", ""Number"", ""District""
//        FROM ""Field""
//) Field
//ON Well.""FieldId""=Field.""Id""
//";

//            return queryElement;
//        }

//        public static string CompanySqlQuery()
//        {
//            string queryElement = @"
//SELECT
//    Well.""Api"" AS ""Api"",
//    Well.""Name"" AS ""Name"",
//    Well.""Number"" AS ""Number"",
//    Company.""Name"" AS ""Company"",
//    Company.""Number"" AS ""CompanyNumber""
//FROM (
//    SELECT ""Id"", ""Api"", ""Name"", ""Number"", ""CompanyId""
//    FROM ""Well""
//) Well
//LEFT JOIN (
//        SELECT ""Id"", ""Name"", ""Number""
//        FROM ""Company""
//) Company
//ON Well.""CompanyId""=Company.""Id""
//";

//            return queryElement;
//        }

//        public static string LocationSqlElement(params string[] fields)
//        {
//            string queryElement =
//                $@"
//LEFT JOIN (
//        SELECT {string.Join(", ", fields.ForEach(field => $"\"{field}\""))}
//        FROM ""ShapeFileLocation""
//) ShapeFileLocation
//ON Well.""Api""=ShapeFileLocation.""Api""
//";


//            return queryElement;
//        }


//        public static string WellboreDetailsSqlElement(params string[] fields)
//        {
//            string queryElement =
//                $@"
//LEFT JOIN (
//        SELECT {string.Join(", ", fields.ForEach(field => $"\"{field}\""))}
//        FROM ""WellboreDetails""
//) WellboreDetails
//ON Well.""Id""=WellboreDetails.""WellId""
//";


//            return queryElement;
//        }







//        public static string CompletionPerforationDetailsSqlElement(params string[] fields)
//        {
//            string queryElement =
//                $@"
//LEFT JOIN (
//        SELECT
//        CompletionDetails.""WellId"",
//            json_build_object('Id', CompletionDetails.""Id"",
//                                'StartDate', CompletionDetails.""StartDate"",
//                                'EndDate', CompletionDetails.""EndDate"",
//                                'ReservoirName', CompletionDetails.""ReservoirName"",
//                                'LateralLength', CompletionDetails.""LateralLength"",
//                                'TreatmentCount', CompletionDetails.""TreatmentCount"",
//                                'ClusterPerTreatmentCount', CompletionDetails.""ClusterPerTreatmentCount"",
//                                'ProppantType', CompletionDetails.""ProppantType"",
//                                'ProppantMesh', CompletionDetails.""ProppantMesh"",
//                                'MaxProppantConcentration', CompletionDetails.""MaxProppantConcentration"",
//                                'WellId', CompletionDetails.""WellId"",
//                                'PerforationIntervals',  json_agg(json_build_object('PerforationInterval', row_to_json(PerforationInterval)))) AS JSON
//        FROM (
//            SELECT ""Id"", ""StartDate"", ""EndDate"", ""ReservoirName"", ""LateralLength"", ""TreatmentCount"", ""ClusterPerTreatmentCount"", ""ProppantType"", ""ProppantMesh"", ""MaxProppantConcentration"", ""WellId""
//            FROM ""CompletionDetails""
//        ) CompletionDetails
//        LEFT JOIN (
//            SELECT ""Id"", ""Count"", ""StartDepth"", ""EndDepth"", ""CompletionDetailsId""
//            FROM ""PerforationInterval""        
//        ) PerforationInterval
//        ON CompletionDetails.""Id""=PerforationInterval.""CompletionDetailsId""
//        GROUP BY CompletionDetails.""Id"", CompletionDetails.""StartDate"",  CompletionDetails.""EndDate"",  CompletionDetails.""ReservoirName"",  CompletionDetails.""LateralLength"",  CompletionDetails.""TreatmentCount"",  CompletionDetails.""ClusterPerTreatmentCount"",  CompletionDetails.""ProppantType"",  CompletionDetails.""ProppantMesh"",  CompletionDetails.""MaxProppantConcentration"",  CompletionDetails.""WellId""
//) AS CompletionPerforationDetails
//ON Well.""Id""=CompletionPerforationDetails.""WellId""
//";


//            return queryElement;
//        }




//        public static string ReservoirDataPropertiesSqlElement(params string[] fields)
//        {
//            string queryElement =
//                $@"
//LEFT JOIN (
//    SELECT
//        ReservoirData.""WellId"",
//        json_build_object(
//                            'Id', ReservoirData.""Id"",
//                            'ReservoirName', ReservoirData.""ReservoirName"",
//                            'ReservoirDepth', ReservoirData.""ReservoirDepth"",
//                            'WellId', ReservoirData.""WellId"",                                     
//                            'ReservoirProperties', row_to_json(ReservoirProperties),
//                            'GasProperties', row_to_json(GasProperties),
//                            'OilProperties', row_to_json(OilProperties),
//                            'WaterProperties', row_to_json(WaterProperties)
//                            ) AS JSON
//    FROM (
//        SELECT ""Id"", ""ReservoirName"", ""ReservoirDepth"", ""WellId""
//        FROM ""ReservoirData""
//        WHERE ""ReservoirData"".""ReservoirName"" LIKE '%EAGLE%'
//    ) ReservoirData
//    LEFT JOIN (
//        SELECT ""Id"", ""DrainageLength"", ""DrainageWidth"", ""Thickness"", ""Porosity"", ""Permeability"", ""Temperature"", ""InitialPressure"", ""RockCompressibility"", ""GasSaturation"", ""OilSaturation"", ""WaterSaturation"", ""ReservoirDataId""
//        FROM ""ReservoirProperties""
//    ) ReservoirProperties
//    ON ReservoirData.""Id""=ReservoirProperties.""ReservoirDataId""
//    LEFT JOIN (
//        SELECT ""Id"", ""SpecificGravity"", ""H2S"", ""CO2"", ""N2"", ""Visocity"", ""Compressibility"", ""ReferenceTemperature"", ""ReferencePressure"", ""ReservoirDataId""
//        FROM ""GasProperties""
//    ) GasProperties
//    ON ReservoirData.""Id""=GasProperties.""ReservoirDataId""
//    LEFT JOIN (
//        SELECT ""Id"", ""Density"", ""Visocity"", ""FormationVolumeFactor"", ""Compressibility"", ""ReferenceTemperature"", ""ReferencePressure"", ""ReservoirDataId""
//        FROM ""OilProperties""
//    ) OilProperties
//    ON ReservoirData.""Id""=OilProperties.""ReservoirDataId""
//    LEFT JOIN (
//        SELECT ""Id"", ""Density"", ""Visocity"", ""FormationVolumeFactor"", ""Compressibility"", ""ReferenceTemperature"", ""ReferencePressure"", ""ReservoirDataId""
//        FROM ""WaterProperties""
//    ) WaterProperties
//    ON ReservoirData.""Id""=WaterProperties.""ReservoirDataId""            
//) ReservoirDataProperties
//ON Well.""Id""=ReservoirDataProperties.""WellId""
//";


//            return queryElement;
//        }




//        public static string MonthlyProductionRecordsSqlElement(params string[] fields)
//        {
//            string queryElement =
//                $@"
//LEFT JOIN (
//    SELECT
//        MonthlyProduction.""WellId"",
//         json_agg(json_build_object('Record', row_to_json(MonthlyProduction))) AS JSON
//    FROM (
//        SELECT ""Id"", ""Date"", ""GasVolume"", ""OilVolume"", ""CondensateVolume"", ""WaterVolume"", ""WellId""
//        FROM ""MonthlyProduction""
//    ) MonthlyProduction
//    GROUP BY MonthlyProduction.""Id"", MonthlyProduction.""Date"", MonthlyProduction.""GasVolume"", MonthlyProduction.""OilVolume"", MonthlyProduction.""CondensateVolume"", MonthlyProduction.""WaterVolume"", MonthlyProduction.""WellId""
//) AS MonthlyProductionRecords
//ON Well.""Id""=MonthlyProductionRecords.""WellId""
//";


//            return queryElement;
//        } 
//        #endregion
