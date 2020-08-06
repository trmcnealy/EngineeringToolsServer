
-- table
--SELECT "Well"
--INNER JOIN "OilProperties"
--ON "Well"."OilPropertiesId"="OilProperties"."Id"
--INNER JOIN "Location"
--ON "Well"."LocationId"="Location"."Id"

-- extent_query
SELECT min("Location"."Easting83") AS "MinEasting", max("Location"."Easting83") AS "MaxEasting",
min("Location"."Northing83") AS "MinNorthing", max("Location"."Northing83") AS "MaxNorthing",
min("OilProperties"."Density") AS "MinOilApi", max("OilProperties"."Density") AS "MaxOilApi"
FROM "Well"
INNER JOIN "OilProperties"
ON "Well"."OilPropertiesId"="OilProperties"."Id"
INNER JOIN "Location"
ON "Well"."LocationId"="Location"."Id"
WHERE "Easting" IS NOT NULL;

-- table_query
SELECT "Well"."Api" AS "Api", "Location"."Easting83" AS "Easting", "Location"."Northing83" AS "Northing"
FROM "Well"
INNER JOIN "Location"
ON "Well"."LocationId"="Location"."Id"
WHERE "Easting" IS NOT NULL AND "Location"."County"='KARNES';

-- oilproperties_table_query
SELECT "Well"."Api" AS "Api", "OilProperties"."Density" AS "OilApi", "Location"."Easting83" AS "Easting", "Location"."Northing83" AS "Northing"
FROM "Well"
INNER JOIN "OilProperties"
ON "Well"."OilPropertiesId"="OilProperties"."Id"
INNER JOIN "Location"
ON "Well"."LocationId"="Location"."Id"
WHERE "Easting" IS NOT NULL;

-- gasproperties_table_query
SELECT "Well"."Api" AS "Api", "GasProperties"."SpecificGravity" AS "SpecificGravity", "Location"."Easting83" AS "Easting", "Location"."Northing83" AS "Northing"
FROM "Well"
INNER JOIN "GasProperties"
ON "Well"."GasPropertiesId"="GasProperties"."Id"
INNER JOIN "Location"
ON "Well"."LocationId"="Location"."Id"
WHERE "Easting" IS NOT NULL;

-- laterallength_table_query
SELECT "Well"."Api" AS "Api", "Location"."Easting83" AS "Easting", "Location"."Northing83" AS "Northing", "CompletionDetails"."LateralLength" AS "LateralLength"
FROM "Well"
INNER JOIN "Location"
ON "Well"."LocationId"="Location"."Id"
INNER JOIN "CompletionDetails"
ON "Well"."CompletionDetailsId"="CompletionDetails"."Id"
WHERE "Easting" IS NOT NULL AND "LateralLength" IS NOT NULL AND "Location"."County"='KARNES';


-- shapefile_location_karnes_extent_query
SELECT min("SurfaceEasting83") AS "MinEasting",
       max("SurfaceEasting83") AS "MaxEasting",
       min("SurfaceNorthing83") AS "MinNorthing",
       max("SurfaceNorthing83") AS "MaxNorthing"
FROM "ShapeFileLocation"
WHERE "Api" LIKE '%-255-%';


-- shapefile_location_extent_query
SELECT min("SurfaceEasting83") AS "MinEasting",
       max("SurfaceEasting83") AS "MaxEasting",
       min("SurfaceNorthing83") AS "MinNorthing",
       max("SurfaceNorthing83") AS "MaxNorthing"
FROM "ShapeFileLocation";


-- shapefile_location_karnes_utm_extent_query
SELECT min("SurfaceEasting83") AS "MinEasting",
       max("SurfaceEasting83") AS "MaxEasting",
       min("SurfaceNorthing83") AS "MinNorthing",
       max("SurfaceNorthing83") AS "MaxNorthing"
FROM "ShapeFileLocation"
WHERE "Api" LIKE '%-255-%';


-- shapefile_location_utm_extent_query
SELECT min("SurfaceEasting83") AS "MinEasting",
       max("SurfaceEasting83") AS "MaxEasting",
       min("SurfaceNorthing83") AS "MinNorthing",
       max("SurfaceNorthing83") AS "MaxNorthing"
FROM "ShapeFileLocation";


-- shapefile_location_karnes_query
SELECT
    Wells."Api",    
    ReservoirDatas."ReservoirName",
    ReservoirDatas."ReservoirDepth",    
    GasPropertiess."SpecificGravity" AS "GasSpecificGravity",
    OilPropertiess."Density" AS "OilApiGravity",
    "ShapeFileLocation"."SurfaceEasting83" AS "SurfaceEasting",
    "ShapeFileLocation"."SurfaceNorthing83" AS "SurfaceNorthing",
    "ShapeFileLocation"."BottomEasting83" AS "BottomEasting",
    "ShapeFileLocation"."BottomNorthing83" AS "BottomNorthing"
FROM (
    SELECT "Id", "Api"
    FROM "Well"
) Wells
LEFT JOIN (
    SELECT "Id", "ReservoirName", "ReservoirDepth", "WellId"
    FROM "ReservoirData"
    WHERE "ReservoirData"."ReservoirName" LIKE 'EAGLE%'
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
WHERE "ShapeFileLocation"."SurfaceEasting83" IS NOT NULL AND GasPropertiess."SpecificGravity" IS NOT NULL AND OilPropertiess."Density" IS NOT NULL


-- shapefile_location_query
SELECT "Api", "SurfaceEasting83" AS "SurfaceEasting", "SurfaceNorthing83" AS "SurfaceNorthing", "BottomEasting83" AS "BottomEasting", "BottomNorthing83" AS "BottomNorthing"
FROM "ShapeFileLocation" LIMIT(50000);






