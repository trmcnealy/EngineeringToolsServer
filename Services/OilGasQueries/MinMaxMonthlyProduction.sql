SELECT min("MonthlyProduction"."OilVolume") AS "min", max("MonthlyProduction"."OilVolume") AS "max"
FROM "Well"
INNER JOIN "MonthlyProduction"
ON "Well"."Id"="MonthlyProduction"."WellId"