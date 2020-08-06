SELECT
    Wells."Api" AS "Api",
    MonthlyProductions."Date" AS "Date",
    MonthlyProductions."GasVolume" AS "GasVolume",
    MonthlyProductions."OilVolume" AS "OilVolume",
    MonthlyProductions."CondensateVolume" AS "CondensateVolume",
    MonthlyProductions."WaterVolume" AS "WaterVolume"
FROM (
    SELECT "Id", "Api"
    FROM "Well"
) Wells
LEFT JOIN (
    SELECT "Id", "Date", "GasVolume", "OilVolume", "CondensateVolume", "WaterVolume", "WellId"
    FROM "MonthlyProduction"
) MonthlyProductions
ON Wells."Id"=MonthlyProductions."WellId";
