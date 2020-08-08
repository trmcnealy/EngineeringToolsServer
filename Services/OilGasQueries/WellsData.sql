
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
    SELECT
        Wells."Api" AS "Api",
        Wells."Name" AS "Name",
        Wells."Number" AS "Number",
        "Lease"."Name" AS "Lease",
        "Field"."Name" AS "Field",
        "Company"."Name" AS "Company",
        ReservoirDatas."ReservoirName" AS "ReservoirName",
        ReservoirDatas."ReservoirDepth" AS "ReservoirDepth",
        GasPropertiess."SpecificGravity" AS "GasSpecificGravity",
        OilPropertiess."Density" AS "OilApiGravity",
        "ShapeFileLocation"."SurfaceLatitude83" AS "SurfaceLatitude",
        "ShapeFileLocation"."SurfaceLongitude83" AS "SurfaceLongitude"
    FROM (
        SELECT "Id", "Api", "Name", "Number", "LeaseId", "FieldId", "CompanyId"
        FROM "Well"
    ) Wells
    LEFT JOIN "Lease"
    ON Wells."LeaseId"="Lease"."Id"
    LEFT JOIN "Field"
    ON Wells."FieldId"="Field"."Id"
    LEFT JOIN "Company"
    ON Wells."CompanyId"="Company"."Id"
    LEFT JOIN (
        SELECT "Id", "ReservoirName", "ReservoirDepth", "WellId"
        FROM "ReservoirData"
        WHERE "ReservoirData"."ReservoirName" LIKE '%EAGLE%'
    ) ReservoirDatas
    ON Wells."Id"=ReservoirDatas."WellId"
    LEFT JOIN (
        SELECT "SpecificGravity", "ReservoirDataId"
        FROM "GasProperties"
    ) GasPropertiess
    ON ReservoirDatas."Id"=GasPropertiess."ReservoirDataId"
    LEFT JOIN (
        SELECT "Density", "ReservoirDataId"
        FROM "OilProperties"
    ) OilPropertiess
    ON ReservoirDatas."Id"=OilPropertiess."ReservoirDataId"
    LEFT JOIN "ShapeFileLocation"
    ON Wells."Api"="ShapeFileLocation"."Api"
    WHERE "ShapeFileLocation"."SurfaceLatitude83" IS NOT NULL AND GasPropertiess."SpecificGravity" IS NOT NULL AND OilPropertiess."Density" IS NOT NULL
) DataTable