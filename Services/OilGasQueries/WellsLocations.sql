SELECT
    Wells."Api" AS "Api",
    "ShapeFileLocation"."SurfaceEasting83" AS "SurfaceEasting",
    "ShapeFileLocation"."SurfaceNorthing83" AS "SurfaceNorthing",
    "ShapeFileLocation"."BottomEasting83" AS "BottomEasting",
    "ShapeFileLocation"."BottomNorthing83" AS "BottomNorthing"
FROM (
    SELECT "Id", "Api"
    FROM "Well"
) Wells
LEFT JOIN "ShapeFileLocation"
ON Wells."Api"="ShapeFileLocation"."Api"
WHERE Wells."Api" IS NOT NULL AND "ShapeFileLocation"."SurfaceEasting83" IS NOT NULL AND "ShapeFileLocation"."SurfaceNorthing83" IS NOT NULL AND "ShapeFileLocation"."BottomEasting83" IS NOT NULL AND "ShapeFileLocation"."BottomNorthing83" IS NOT NULL;