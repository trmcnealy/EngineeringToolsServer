SELECT
    min("ShapeFileLocation"."SurfaceEasting83") AS "MinEasting",
    max("ShapeFileLocation"."SurfaceEasting83") AS "MaxEasting",
    min("ShapeFileLocation"."SurfaceNorthing83") AS "MinNorthing",
    max("ShapeFileLocation"."SurfaceNorthing83") AS "MaxNorthing"
FROM (
    SELECT "Id", "Api"
    FROM "Well"
    WHERE "Well"."Api" LIKE '%-255-%'
) Wells
LEFT JOIN "ShapeFileLocation"
ON Wells."Api"="ShapeFileLocation"."Api"
WHERE Wells."Api" IS NOT NULL AND "ShapeFileLocation"."SurfaceEasting83" IS NOT NULL AND "ShapeFileLocation"."SurfaceNorthing83" IS NOT NULL;