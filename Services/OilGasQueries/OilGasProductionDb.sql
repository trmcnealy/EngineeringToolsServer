
SELECT
    json_build_object('Api',DataTable."Api",
        'ReservoirName',DataTable."ReservoirName",
        'ReservoirDepth',DataTable."ReservoirDepth",
        'GasSpecificGravity',DataTable."GasSpecificGravity",
        'GasReferenceTemperature',DataTable."GasReferenceTemperature",
        'GasReferencePressure',DataTable."GasReferencePressure",
        'OilApiGravity',DataTable."OilApiGravity",
        'OilReferenceTemperature',DataTable."OilReferenceTemperature",
        'OilReferencePressure',DataTable."OilReferencePressure",
        'SurfaceEasting',DataTable."SurfaceEasting",
        'SurfaceNorthing',DataTable."SurfaceNorthing",
        'BottomEasting',DataTable."BottomEasting",
        'BottomNorthing',DataTable."BottomNorthing")
FROM  (
    SELECT *
    FROM (
            SELECT "Id", "Api", "Name", "Number", "LeaseId", "FieldId", "CompanyId"
            FROM "Well"        
    ) Well
    LEFT JOIN (
        SELECT "Id", "Date", "GasVolume", "OilVolume", "CondensateVolume", "WaterVolume", "WellId"
        FROM "MonthlyProduction"
    ) MonthlyProduction
    ON Well."Id"=MonthlyProduction."WellId"
) OilGasDb







