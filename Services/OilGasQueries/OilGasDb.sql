SELECT  jsonb_agg(jsonb_build_object(
                'Well', jsonb_build_object(
                                        'Id',  Well."Id",
                                        'Api',  Well."Api",
                                        'Name',  Well."Name",
                                        'Number',  Well."Number",
                                        'LeaseId',  Well."LeaseId",
                                        'FieldId',  Well."FieldId",
                                        'CompanyId',  Well."CompanyId",
                                        'Lease',  row_to_json(Lease),
                                        'Field', row_to_json(Field),
                                        'Company', row_to_json(Company),
                                        'Location', row_to_json(ShapeFileLocation),
                                        'WellboreDetails', row_to_json(WellboreDetails),
                                        'CompletionDetails', CompletionPerforationDetails.JSON,
                                        'ReservoirData', ReservoirDataProperties.JSON
                                        )
                                )
                )
FROM (
        SELECT "Id", "Api", "Name", "Number", "LeaseId", "FieldId", "CompanyId"
        FROM "Well"
        WHERE "Well"."Api" LIKE '%-255-%'
) Well
LEFT JOIN (
    SELECT "Id", "Name", "Number", "District"
    FROM "Lease"
) Lease
ON Well."LeaseId"=Lease."Id"
LEFT JOIN (
    SELECT "Id", "Name", "Number", "District"
    FROM "Field"
) Field
ON Well."FieldId"=Field."Id"
LEFT JOIN (
    SELECT "Id", "Name", "Number"
    FROM "Company"
) Company
ON Well."CompanyId"=Company."Id"
LEFT JOIN (
    SELECT "Api", "SurfaceLatitude27", "SurfaceLongitude27", "BottomLatitude27", "BottomLongitude27", "SurfaceLatitude83", "SurfaceLongitude83", "BottomLatitude83", "BottomLongitude83", "SurfaceEasting27", "SurfaceNorthing27", "BottomEasting27", "BottomNorthing27", "SurfaceEasting83", "SurfaceNorthing83", "BottomEasting83", "BottomNorthing83"
    FROM "ShapeFileLocation"
) ShapeFileLocation
ON Well."Api"=ShapeFileLocation."Api"
LEFT JOIN (
    SELECT "Elevation", "ElevationDatum", "TotalDepth", "TotalLength", "WellId"
    FROM "WellboreDetails"
) WellboreDetails
ON Well."Id"=WellboreDetails."WellId"
LEFT JOIN (
        SELECT
        CompletionDetails."WellId",
            jsonb_build_object('Id', CompletionDetails."Id",
                                'StartDate', CompletionDetails."StartDate",
                                'EndDate', CompletionDetails."EndDate",
                                'ReservoirName', CompletionDetails."ReservoirName",
                                'LateralLength', CompletionDetails."LateralLength",
                                'TreatmentCount', CompletionDetails."TreatmentCount",
                                'ClusterPerTreatmentCount', CompletionDetails."ClusterPerTreatmentCount",
                                'ProppantType', CompletionDetails."ProppantType",
                                'ProppantMesh', CompletionDetails."ProppantMesh",
                                'MaxProppantConcentration', CompletionDetails."MaxProppantConcentration",
                                'WellId', CompletionDetails."WellId",
                                'PerforationIntervals',  jsonb_agg(jsonb_build_object('PerforationInterval', row_to_json(PerforationInterval)))) AS JSON
        FROM (
            SELECT "Id", "StartDate", "EndDate", "ReservoirName", "LateralLength", "TreatmentCount", "ClusterPerTreatmentCount", "ProppantType", "ProppantMesh", "MaxProppantConcentration", "WellId"
            FROM "CompletionDetails"
        ) CompletionDetails
        LEFT JOIN (
            SELECT "Id", "Count", "StartDepth", "EndDepth", "CompletionDetailsId"
            FROM "PerforationInterval"        
        ) PerforationInterval
        ON CompletionDetails."Id"=PerforationInterval."CompletionDetailsId"
        GROUP BY CompletionDetails."Id", CompletionDetails."StartDate",  CompletionDetails."EndDate",  CompletionDetails."ReservoirName",  CompletionDetails."LateralLength",  CompletionDetails."TreatmentCount",  CompletionDetails."ClusterPerTreatmentCount",  CompletionDetails."ProppantType",  CompletionDetails."ProppantMesh",  CompletionDetails."MaxProppantConcentration",  CompletionDetails."WellId"
) AS CompletionPerforationDetails
ON Well."Id"=CompletionPerforationDetails."WellId"
LEFT JOIN (
    SELECT
        ReservoirData."WellId",
        jsonb_build_object(
                            'Id', ReservoirData."Id",
                            'ReservoirName', ReservoirData."ReservoirName",
                            'ReservoirDepth', ReservoirData."ReservoirDepth",
                            'WellId', ReservoirData."WellId",                                     
                            'ReservoirProperties', row_to_json(ReservoirProperties),
                            'GasProperties', row_to_json(GasProperties),
                            'OilProperties', row_to_json(OilProperties),
                            'WaterProperties', row_to_json(WaterProperties)
                            ) AS JSON
    FROM (
        SELECT "Id", "ReservoirName", "ReservoirDepth", "WellId"
        FROM "ReservoirData"        
        WHERE "ReservoirData"."ReservoirName" LIKE '%EAGLE%'
    ) ReservoirData
    LEFT JOIN (
        SELECT "Id", "DrainageLength", "DrainageWidth", "Thickness", "Porosity", "Permeability", "Temperature", "InitialPressure", "RockCompressibility", "GasSaturation", "OilSaturation", "WaterSaturation", "ReservoirDataId"
        FROM "ReservoirProperties"
    ) ReservoirProperties
    ON ReservoirData."Id"=ReservoirProperties."ReservoirDataId"
    LEFT JOIN (
        SELECT "Id", "SpecificGravity", "H2S", "CO2", "N2", "Visocity", "Compressibility", "ReferenceTemperature", "ReferencePressure", "ReservoirDataId"
        FROM "GasProperties"
    ) GasProperties
    ON ReservoirData."Id"=GasProperties."ReservoirDataId"
    LEFT JOIN (
        SELECT "Id", "Density", "Visocity", "FormationVolumeFactor", "Compressibility", "ReferenceTemperature", "ReferencePressure", "ReservoirDataId"
        FROM "OilProperties"
    ) OilProperties
    ON ReservoirData."Id"=OilProperties."ReservoirDataId"
    LEFT JOIN (
        SELECT "Id", "Density", "Visocity", "FormationVolumeFactor", "Compressibility", "ReferenceTemperature", "ReferencePressure", "ReservoirDataId"
        FROM "WaterProperties"
    ) WaterProperties
    ON ReservoirData."Id"=WaterProperties."ReservoirDataId"            
) ReservoirDataProperties
ON Well."Id"=ReservoirDataProperties."WellId"
LEFT JOIN (
    SELECT
        MonthlyProduction."WellId",
         jsonb_agg(jsonb_build_object('Record', row_to_json(MonthlyProduction))) AS JSON
    FROM (
        SELECT "Id", "Date", "GasVolume", "OilVolume", "CondensateVolume", "WaterVolume", "WellId"
        FROM "MonthlyProduction"
    ) MonthlyProduction
    GROUP BY MonthlyProduction."Id", MonthlyProduction."Date", MonthlyProduction."GasVolume", MonthlyProduction."OilVolume", MonthlyProduction."CondensateVolume", MonthlyProduction."WaterVolume", MonthlyProduction."WellId"
) AS MonthlyProductionRecords
ON Well."Id"=MonthlyProductionRecords."WellId"