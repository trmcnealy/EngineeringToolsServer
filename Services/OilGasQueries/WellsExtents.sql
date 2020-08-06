SELECT min("SurfaceLatitude83") AS "MinLatitude",
       max("SurfaceLatitude83") AS "MaxLatitude",
       min("SurfaceLongitude83") AS "MinLongitude",
       max("SurfaceLongitude83") AS "MaxLongitude"
FROM "ShapeFileLocation";
