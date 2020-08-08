using System;

namespace EngineeringToolsServer.Services
{
    public class OilGasFields
    {
        
        public static readonly string[] Tables = new string[]
        {
            "Well",
            "Well.Lease",
            "Well.Field",
            "Well.Company",
            "Well.Location",
            "Well.WellboreDetails",
            "Well.CompletionDetails",
            "Well.CompletionDetails.PerforationIntervals",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval",
            "Well.ReservoirData",
            "Well.ReservoirData.ReservoirProperties",
            "Well.ReservoirData.GasProperties",
            "Well.ReservoirData.OilProperties",
            "Well.MonthlyProduction"
        };

        public static readonly string[] Available = new string[]
        {
            "Well.Id",
            "Well.Api",
            "Well.Name",
            "Well.Number",
            "Well.LeaseId",
            "Well.FieldId",
            "Well.CompanyId",
            "Well.Lease.Id",
            "Well.Lease.Name",
            "Well.Lease.Number",
            "Well.Lease.District",
            "Well.Field.Id",
            "Well.Field.Name",
            "Well.Field.Number",
            "Well.Field.District",
            "Well.Company.Id",
            "Well.Company.Name",
            "Well.Company.Number",
            "Well.Location.Api",
            "Well.Location.SurfaceLatitude27",
            "Well.Location.SurfaceLongitude27",
            "Well.Location.BottomLatitude27",
            "Well.Location.BottomLongitude27",
            "Well.Location.SurfaceLatitude83",
            "Well.Location.SurfaceLongitude83",
            "Well.Location.BottomLatitude83",
            "Well.Location.BottomLongitude83",
            "Well.Location.SurfaceEasting27",
            "Well.Location.SurfaceNorthing27",
            "Well.Location.BottomEasting27",
            "Well.Location.BottomNorthing27",
            "Well.Location.SurfaceEasting83",
            "Well.Location.SurfaceNorthing83",
            "Well.Location.BottomEasting83",
            "Well.Location.BottomNorthing83",
            "Well.WellboreDetails.Elevation",
            "Well.WellboreDetails.ElevationDatum",
            "Well.WellboreDetails.TotalDepth",
            "Well.WellboreDetails.TotalLength",
            "Well.WellboreDetails.WellId",
            "Well.CompletionDetails.Id",
            "Well.CompletionDetails.StartDate",
            "Well.CompletionDetails.EndDate",
            "Well.CompletionDetails.ReservoirName",
            "Well.CompletionDetails.LateralLength",
            "Well.CompletionDetails.TreatmentCount",
            "Well.CompletionDetails.ClusterPerTreatmentCount",
            "Well.CompletionDetails.ProppantType",
            "Well.CompletionDetails.ProppantMesh",
            "Well.CompletionDetails.MaxProppantConcentration",
            "Well.CompletionDetails.WellId",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.Id",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.Count",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.StartDepth",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.EndDepth",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.CompletionDetailsId",
            "Well.ReservoirData.Id",
            "Well.ReservoirData.ReservoirName",
            "Well.ReservoirData.ReservoirDepth",
            "Well.ReservoirData.WellId",
            "Well.ReservoirData.ReservoirProperties",
            "Well.ReservoirData.ReservoirProperties.Id",
            "Well.ReservoirData.ReservoirProperties.DrainageLength",
            "Well.ReservoirData.ReservoirProperties.DrainageWidth",
            "Well.ReservoirData.ReservoirProperties.Thickness",
            "Well.ReservoirData.ReservoirProperties.Porosity",
            "Well.ReservoirData.ReservoirProperties.Permeability",
            "Well.ReservoirData.ReservoirProperties.Temperature",
            "Well.ReservoirData.ReservoirProperties.InitialPressure",
            "Well.ReservoirData.ReservoirProperties.RockCompressibility",
            "Well.ReservoirData.ReservoirProperties.GasSaturation",
            "Well.ReservoirData.ReservoirProperties.OilSaturation",
            "Well.ReservoirData.ReservoirProperties.WaterSaturation",
            "Well.ReservoirData.ReservoirProperties.ReservoirDataId",
            "Well.ReservoirData.GasProperties.Id",
            "Well.ReservoirData.GasProperties.SpecificGravity",
            "Well.ReservoirData.GasProperties.H2S",
            "Well.ReservoirData.GasProperties.CO2",
            "Well.ReservoirData.GasProperties.N2",
            "Well.ReservoirData.GasProperties.Visocity",
            "Well.ReservoirData.GasProperties.Compressibility",
            "Well.ReservoirData.GasProperties.ReferenceTemperature",
            "Well.ReservoirData.GasProperties.ReferencePressure",
            "Well.ReservoirData.GasProperties.ReservoirDataId",
            "Well.ReservoirData.OilProperties.Id",
            "Well.ReservoirData.OilProperties.Density",
            "Well.ReservoirData.OilProperties.Visocity",
            "Well.ReservoirData.OilProperties.FormationVolumeFactor",
            "Well.ReservoirData.OilProperties.Compressibility",
            "Well.ReservoirData.OilProperties.ReferenceTemperature",
            "Well.ReservoirData.OilProperties.ReferencePressure",
            "Well.ReservoirData.OilProperties.ReservoirDataId",
            "Well.MonthlyProduction.Id",
            "Well.MonthlyProduction.Date",
            "Well.MonthlyProduction.GasVolume",
            "Well.MonthlyProduction.OilVolume",
            "Well.MonthlyProduction.CondensateVolume",
            "Well.MonthlyProduction.WaterVolume",
            "Well.MonthlyProduction.WellId"
        };

        public static readonly string[] Field = new string[]
        {
            "Well.Api",
            "Well.Name",
            "Well.Number",
            "Well.Lease.Name",
            "Well.Lease.Number",
            "Well.Lease.District",
            "Well.Field.Name",
            "Well.Field.Number",
            "Well.Field.District",
            "Well.Company.Name",
            "Well.Company.Number",
            "Well.Location.SurfaceLatitude27",
            "Well.Location.SurfaceLongitude27",
            "Well.Location.BottomLatitude27",
            "Well.Location.BottomLongitude27",
            "Well.Location.SurfaceLatitude83",
            "Well.Location.SurfaceLongitude83",
            "Well.Location.BottomLatitude83",
            "Well.Location.BottomLongitude83",
            "Well.Location.SurfaceEasting27",
            "Well.Location.SurfaceNorthing27",
            "Well.Location.BottomEasting27",
            "Well.Location.BottomNorthing27",
            "Well.Location.SurfaceEasting83",
            "Well.Location.SurfaceNorthing83",
            "Well.Location.BottomEasting83",
            "Well.Location.BottomNorthing83",
            "Well.WellboreDetails.Elevation",
            "Well.WellboreDetails.ElevationDatum",
            "Well.WellboreDetails.TotalDepth",
            "Well.WellboreDetails.TotalLength",
            "Well.CompletionDetails.StartDate",
            "Well.CompletionDetails.EndDate",
            "Well.CompletionDetails.ReservoirName",
            "Well.CompletionDetails.LateralLength",
            "Well.CompletionDetails.TreatmentCount",
            "Well.CompletionDetails.ClusterPerTreatmentCount",
            "Well.CompletionDetails.ProppantType",
            "Well.CompletionDetails.ProppantMesh",
            "Well.CompletionDetails.MaxProppantConcentration",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.Count",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.StartDepth",
            "Well.CompletionDetails.PerforationIntervals.PerforationInterval.EndDepth",
            "Well.ReservoirData.ReservoirName",
            "Well.ReservoirData.ReservoirDepth",
            "Well.ReservoirData.ReservoirProperties.DrainageLength",
            "Well.ReservoirData.ReservoirProperties.DrainageWidth",
            "Well.ReservoirData.ReservoirProperties.Thickness",
            "Well.ReservoirData.ReservoirProperties.Porosity",
            "Well.ReservoirData.ReservoirProperties.Permeability",
            "Well.ReservoirData.ReservoirProperties.Temperature",
            "Well.ReservoirData.ReservoirProperties.InitialPressure",
            "Well.ReservoirData.ReservoirProperties.RockCompressibility",
            "Well.ReservoirData.ReservoirProperties.GasSaturation",
            "Well.ReservoirData.ReservoirProperties.OilSaturation",
            "Well.ReservoirData.ReservoirProperties.WaterSaturation",
            "Well.ReservoirData.GasProperties.SpecificGravity",
            "Well.ReservoirData.GasProperties.H2S",
            "Well.ReservoirData.GasProperties.CO2",
            "Well.ReservoirData.GasProperties.N2",
            "Well.ReservoirData.GasProperties.Visocity",
            "Well.ReservoirData.GasProperties.Compressibility",
            "Well.ReservoirData.GasProperties.ReferenceTemperature",
            "Well.ReservoirData.GasProperties.ReferencePressure",
            "Well.ReservoirData.OilProperties.Density",
            "Well.ReservoirData.OilProperties.Visocity",
            "Well.ReservoirData.OilProperties.FormationVolumeFactor",
            "Well.ReservoirData.OilProperties.Compressibility",
            "Well.ReservoirData.OilProperties.ReferenceTemperature",
            "Well.ReservoirData.OilProperties.ReferencePressure",
            "Well.MonthlyProduction.Date",
            "Well.MonthlyProduction.GasVolume",
            "Well.MonthlyProduction.OilVolume",
            "Well.MonthlyProduction.CondensateVolume",
            "Well.MonthlyProduction.WaterVolume"
        };


        public static T[] ForEach<T>(T[] array, Func<T, T> func)
        {
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = func(array[i]);
            }

            return array;
        }

        public static string WellSqlElement(params string[] fields)
        {
            string queryElement =
$@"
FROM (
        SELECT {string.Join(", ", ForEach(fields, field => $"\"{field}\""))}
        FROM ""Well""
) Well
";
            //WHERE ""Well"".""Api"" LIKE '%-255-%'

            return queryElement;
        }

        

        public static string LeaseSqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
        SELECT {string.Join(", ", ForEach(fields, field => $"\"{field}\""))}
        FROM ""Lease""
) Lease
ON Well.""LeaseId""=Lease.""Id""
";
           

            return queryElement;
        }

        

        public static string FieldSqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
        SELECT {string.Join(", ", ForEach(fields, field => $"\"{field}\""))}
        FROM ""Field""
) Field
ON Well.""FieldId""=Field.""Id""
";
           

            return queryElement;
        }

        

        public static string CompanySqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
        SELECT {string.Join(", ", ForEach(fields, field => $"\"{field}\""))}
        FROM ""Company""
) Company
ON Well.""CompanyId""=Company.""Id""
";
           

            return queryElement;
        }

        public static string LocationSqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
        SELECT {string.Join(", ", ForEach(fields, field => $"\"{field}\""))}
        FROM ""ShapeFileLocation""
) ShapeFileLocation
ON Well.""Api""=ShapeFileLocation.""Api""
";
           

            return queryElement;
        }


        public static string WellboreDetailsSqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
        SELECT {string.Join(", ", ForEach(fields, field => $"\"{field}\""))}
        FROM ""WellboreDetails""
) WellboreDetails
ON Well.""Id""=WellboreDetails.""WellId""
";
           

            return queryElement;
        }







        public static string CompletionPerforationDetailsSqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
        SELECT
        CompletionDetails.""WellId"",
            json_build_object('Id', CompletionDetails.""Id"",
                                'StartDate', CompletionDetails.""StartDate"",
                                'EndDate', CompletionDetails.""EndDate"",
                                'ReservoirName', CompletionDetails.""ReservoirName"",
                                'LateralLength', CompletionDetails.""LateralLength"",
                                'TreatmentCount', CompletionDetails.""TreatmentCount"",
                                'ClusterPerTreatmentCount', CompletionDetails.""ClusterPerTreatmentCount"",
                                'ProppantType', CompletionDetails.""ProppantType"",
                                'ProppantMesh', CompletionDetails.""ProppantMesh"",
                                'MaxProppantConcentration', CompletionDetails.""MaxProppantConcentration"",
                                'WellId', CompletionDetails.""WellId"",
                                'PerforationIntervals',  json_agg(json_build_object('PerforationInterval', row_to_json(PerforationInterval)))) AS JSON
        FROM (
            SELECT ""Id"", ""StartDate"", ""EndDate"", ""ReservoirName"", ""LateralLength"", ""TreatmentCount"", ""ClusterPerTreatmentCount"", ""ProppantType"", ""ProppantMesh"", ""MaxProppantConcentration"", ""WellId""
            FROM ""CompletionDetails""
        ) CompletionDetails
        LEFT JOIN (
            SELECT ""Id"", ""Count"", ""StartDepth"", ""EndDepth"", ""CompletionDetailsId""
            FROM ""PerforationInterval""        
        ) PerforationInterval
        ON CompletionDetails.""Id""=PerforationInterval.""CompletionDetailsId""
        GROUP BY CompletionDetails.""Id"", CompletionDetails.""StartDate"",  CompletionDetails.""EndDate"",  CompletionDetails.""ReservoirName"",  CompletionDetails.""LateralLength"",  CompletionDetails.""TreatmentCount"",  CompletionDetails.""ClusterPerTreatmentCount"",  CompletionDetails.""ProppantType"",  CompletionDetails.""ProppantMesh"",  CompletionDetails.""MaxProppantConcentration"",  CompletionDetails.""WellId""
) AS CompletionPerforationDetails
ON Well.""Id""=CompletionPerforationDetails.""WellId""
";
           

            return queryElement;
        }




        public static string ReservoirDataPropertiesSqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
    SELECT
        ReservoirData.""WellId"",
        json_build_object(
                            'Id', ReservoirData.""Id"",
                            'ReservoirName', ReservoirData.""ReservoirName"",
                            'ReservoirDepth', ReservoirData.""ReservoirDepth"",
                            'WellId', ReservoirData.""WellId"",                                     
                            'ReservoirProperties', row_to_json(ReservoirProperties),
                            'GasProperties', row_to_json(GasProperties),
                            'OilProperties', row_to_json(OilProperties),
                            'WaterProperties', row_to_json(WaterProperties)
                            ) AS JSON
    FROM (
        SELECT ""Id"", ""ReservoirName"", ""ReservoirDepth"", ""WellId""
        FROM ""ReservoirData""
        WHERE ""ReservoirData"".""ReservoirName"" LIKE '%EAGLE%'
    ) ReservoirData
    LEFT JOIN (
        SELECT ""Id"", ""DrainageLength"", ""DrainageWidth"", ""Thickness"", ""Porosity"", ""Permeability"", ""Temperature"", ""InitialPressure"", ""RockCompressibility"", ""GasSaturation"", ""OilSaturation"", ""WaterSaturation"", ""ReservoirDataId""
        FROM ""ReservoirProperties""
    ) ReservoirProperties
    ON ReservoirData.""Id""=ReservoirProperties.""ReservoirDataId""
    LEFT JOIN (
        SELECT ""Id"", ""SpecificGravity"", ""H2S"", ""CO2"", ""N2"", ""Visocity"", ""Compressibility"", ""ReferenceTemperature"", ""ReferencePressure"", ""ReservoirDataId""
        FROM ""GasProperties""
    ) GasProperties
    ON ReservoirData.""Id""=GasProperties.""ReservoirDataId""
    LEFT JOIN (
        SELECT ""Id"", ""Density"", ""Visocity"", ""FormationVolumeFactor"", ""Compressibility"", ""ReferenceTemperature"", ""ReferencePressure"", ""ReservoirDataId""
        FROM ""OilProperties""
    ) OilProperties
    ON ReservoirData.""Id""=OilProperties.""ReservoirDataId""
    LEFT JOIN (
        SELECT ""Id"", ""Density"", ""Visocity"", ""FormationVolumeFactor"", ""Compressibility"", ""ReferenceTemperature"", ""ReferencePressure"", ""ReservoirDataId""
        FROM ""WaterProperties""
    ) WaterProperties
    ON ReservoirData.""Id""=WaterProperties.""ReservoirDataId""            
) ReservoirDataProperties
ON Well.""Id""=ReservoirDataProperties.""WellId""
";
           

            return queryElement;
        }




        public static string MonthlyProductionRecordsSqlElement(params string[] fields)
        {
            string queryElement =
                $@"
LEFT JOIN (
    SELECT
        MonthlyProduction.""WellId"",
         json_agg(json_build_object('Record', row_to_json(MonthlyProduction))) AS JSON
    FROM (
        SELECT ""Id"", ""Date"", ""GasVolume"", ""OilVolume"", ""CondensateVolume"", ""WaterVolume"", ""WellId""
        FROM ""MonthlyProduction""
    ) MonthlyProduction
    GROUP BY MonthlyProduction.""Id"", MonthlyProduction.""Date"", MonthlyProduction.""GasVolume"", MonthlyProduction.""OilVolume"", MonthlyProduction.""CondensateVolume"", MonthlyProduction.""WaterVolume"", MonthlyProduction.""WellId""
) AS MonthlyProductionRecords
ON Well.""Id""=MonthlyProductionRecords.""WellId""
";
           

            return queryElement;
        }























    }
}