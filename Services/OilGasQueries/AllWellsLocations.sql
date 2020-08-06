SELECT
    "ShapeFileLocation"."Api" AS "Api",
    "ShapeFileLocation"."SurfaceEasting83" AS "SurfaceEasting",
    "ShapeFileLocation"."SurfaceNorthing83" AS "SurfaceNorthing",
    "ShapeFileLocation"."BottomEasting83" AS "BottomEasting",
    "ShapeFileLocation"."BottomNorthing83" AS "BottomNorthing",
    "ShapeFileLocation"."SurfaceLatitude83" AS "SurfaceLatitude",
    "ShapeFileLocation"."SurfaceLongitude83" AS "SurfaceLongitude",
    "ShapeFileLocation"."BottomLatitude83" AS "BottomLatitude",
    "ShapeFileLocation"."BottomLongitude83" AS "BottomLongitude"
FROM "ShapeFileLocation"
LIMIT 10000;