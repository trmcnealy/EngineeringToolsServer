SELECT
    Wells."Api" AS "Api",    
    ReservoirDatas."ReservoirName" AS "ReservoirName",
    ReservoirDatas."ReservoirDepth" AS "ReservoirDepth",
    GasPropertiess."SpecificGravity" AS "GasSpecificGravity",
    OilPropertiess."Density" AS "OilApiGravity",
    "ShapeFileLocation"."SurfaceEasting83" AS "SurfaceEasting",
    "ShapeFileLocation"."SurfaceNorthing83" AS "SurfaceNorthing",
    "ShapeFileLocation"."BottomEasting83" AS "BottomEasting",
    "ShapeFileLocation"."BottomNorthing83" AS "BottomNorthing",
    "ShapeFileLocation"."SurfaceLatitude83" AS "SurfaceLatitude",
    "ShapeFileLocation"."SurfaceLongitude83" AS "SurfaceLongitude",
    "ShapeFileLocation"."BottomLatitude83" AS "BottomLatitude",
    "ShapeFileLocation"."BottomLongitude83" AS "BottomLongitude"
FROM (
    SELECT "Id", "Api"
    FROM "Well"
    WHERE "Well"."Api" LIKE '%-255-%'
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
WHERE GasPropertiess."SpecificGravity" IS NOT NULL AND OilPropertiess."Density" IS NOT NULL;