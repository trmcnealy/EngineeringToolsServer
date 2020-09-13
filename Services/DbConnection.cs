#nullable enable
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;

using DataStructures.GeoJsonSchema;

using PostgreSql;

using static PostgreSql.NativeLibrary;

using Timer = System.Timers.Timer;

namespace EngineeringToolsServer.Services
{
    public sealed class PostgreSqlUser
    {
        public Timer Timer { get; }

        public Guid Uid { get; }

        public string Name { get; }

        public string Password { get; }

        public string DbName { get; }

        public pg_conn Connection { get; }

        public PostgreSqlUser(string              name,
                              string              password,
                              string              dbName,
                              pg_conn             connection,
                              ElapsedEventHandler disconnectUser)
        {
            Uid = Guid.NewGuid();

            Name     = name;
            Password = password;
            DbName   = dbName;

            Connection = connection;

            Timer = new Timer
            {
                Interval = 1 * 60 * 1000
            };

            Timer.Elapsed += disconnectUser;
        }

        ~PostgreSqlUser()
        {
            if(Connection.Handle != IntPtr.Zero)
            {
                Disconnect();
            }
        }

        private void Disconnect()
        {
            PQfinish(Connection);
        }
    }

    public class DbConnection
    {
        private const string default_host   = "timothyrmcnealy.com";
        private const int    default_port   = 15432;
        private const string default_user   = "db_user";
        private const string default_passwd = "dbAccess";
        private const string default_dbname = "OilGas";

        private static readonly Func<string, int, string, string, string, string> connectionString = (host,
                                                                                                      port,
                                                                                                      user,
                                                                                                      passwd,
                                                                                                      dbname) => $"host={host} port={port} user={user} password={passwd} dbname={dbname}";

        private PostgreSqlUser? _user;

        public DbConnection()
        {
        }

        private void DisconnectUser(object           sender,
                                    ElapsedEventArgs e)
        {
            if(sender is PostgreSqlUser user)
            {
                user.Timer.Stop();

                PQfinish(user.Connection);
            }
        }

        public async Task<string> ConnectAsync(CancellationToken cancellationToken = default)
        {
            return await ConnectAsync(default_host, default_port, default_user, default_passwd, default_dbname, cancellationToken);
        }

        public async Task<string> ConnectAsync(string            hostName,
                                               int               hostport,
                                               string            user,
                                               string            passwd,
                                               string            dbname,
                                               CancellationToken cancellationToken = default)
        {
            pg_conn? conn;

            try
            {
                conn = PQconnectdb(connectionString(hostName, hostport, user, passwd, dbname));

                if(PQstatus(conn.Value) == ConnStatusType.CONNECTION_BAD)
                {
                    throw new Exception(Marshal.PtrToStringAnsi(PQerrorMessage(conn.Value)));
                }
            }
            catch(Exception e)
            {
                await Console.Error.WriteLineAsync(e.ToString());

                return await Task.FromResult(Guid.Empty.ToString());
            }

            _user = new PostgreSqlUser(user, passwd, dbname, conn.Value, DisconnectUser);

            return await Task.FromResult(_user.Uid.ToString());
        }

        public async Task DisconnectAsync(string            session,
                                          CancellationToken cancellationToken = default)
        {
            PQfinish(_user!.Connection);

            await Task.FromResult(Task.CompletedTask);
        }

        public async Task<pg_result> SqlQueryAsync(string            query,
                                                   CancellationToken cancellationToken = default)
        {
            if(_user == null)
            {
                throw new NullReferenceException("Not connected to any data source.");
            }

            pg_result res = PQexec(_user.Connection, query);

            return await Task.FromResult(res);
        }

        public string ResultAsJson(pg_result res,
                                   string    typeName)
        {
            int nFields = PQnfields(res);

            DbTypeBuilder dbTypeBuilder = new DbTypeBuilder("SqlQueryAssembly", "SqlQuery", typeName);

            string colName;
            Type   col_type;

            for(int i = 0; i < nFields; ++i)
            {
                colName  = PQfname(res, i);
                col_type = DbTypeBuilder.GetClrType(OidTypes[PQftype(res, i)]);

                dbTypeBuilder.AddProperty(colName, col_type);
            }

            Type resultType = dbTypeBuilder.CreateType();

            List<object> result = new List<object>(PQntuples(res));

            for(int i = 0; i < PQntuples(res); ++i)
            {
                result.Add(dbTypeBuilder.CreateNew(resultType));
            }

            OidKind colKind;

            for(int j = 0; j < PQntuples(res); j++)
            {
                bool is_null;

                for(int i = 0; i < nFields; ++i)
                {
                    //col_text = raw.sqlite3_column_text(stmt, i).utf8_to_string();

                    colKind = OidTypes[PQftype(res, i)];

                    is_null = PQgetisnull(res, j, i) != 0;

                    //Console.Write($"{PQgetvalue(res, j, i)} ");

                    switch(colKind)
                    {
                        case OidKind.BOOLOID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<bool?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], PQgetvalue(res, j, i) == "true");
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<bool?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.BYTEAOID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<sbyte?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], sbyte.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<sbyte?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.INT2OID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<short?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], short.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<short?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.INT4OID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<int?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], int.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<int?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.INT8OID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<long?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], long.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<long?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.FLOAT4OID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<float?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], float.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<float?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.FLOAT8OID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<double?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], double.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<double?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.CHAROID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<char?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], char.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<char?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.VARCHAROID:
                        case OidKind.TEXTOID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<string?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], PQgetvalue(res, j, i));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<string?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        case OidKind.TIMEOID:
                        case OidKind.TIMESTAMPOID:
                        case OidKind.DATEOID:
                        {
                            if(!is_null)
                            {
                                DbTypeBuilder.SetProperty<DateTime?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], DateTime.Parse(PQgetvalue(res, j, i)));
                            }
                            else
                            {
                                DbTypeBuilder.SetProperty<DateTime?>(resultType, result[j], dbTypeBuilder.PropertyNames[i], null);
                            }

                            break;
                        }
                        default:
                        {
                            throw new NotSupportedException(colKind.ToString());
                        }
                    }
                }

                //Logger.LogInformation();
            }

            return JsonSerializer.Serialize(result);
        }

        public string ResultAsGeoJson(pg_result res,
                                      string    typeName,
                                      bool      isLineString = true)
        {
            int nFields = PQnfields(res);
            int nRows   = PQntuples(res);

            DataStructures.GeoJsonSchema.GeoJson geoJson = new DataStructures.GeoJsonSchema.GeoJson
            {
                Type = GeoJsonKind.FeatureCollection, Features = new List<FeatureType?>(nRows)
            };

            string colName;
            int    surfaceLongitudeIndex = -1;
            int    surfaceLatitudeIndex  = -1;
            int    bottomLongitudeIndex  = -1;
            int    bottomLatitudeIndex   = -1;

            if(isLineString)
            {
                for(int i = 0; i < nFields; ++i)
                {
                    colName = PQfname(res, i);

                    if(colName.Contains("Surface") && colName.Contains("Longitude"))
                    {
                        surfaceLongitudeIndex = i;
                    }
                    else if(colName.Contains("Surface") && colName.Contains("Latitude"))
                    {
                        surfaceLatitudeIndex = i;
                    }
                    else if(colName.Contains("Bottom") && colName.Contains("Longitude"))
                    {
                        bottomLongitudeIndex = i;
                    }
                    else if(colName.Contains("Bottom") && colName.Contains("Latitude"))
                    {
                        bottomLatitudeIndex = i;
                    }
                }
            }
            else
            {
                for(int i = 0; i < nFields; ++i)
                {
                    colName = PQfname(res, i);

                    if(colName.Contains("Surface") && colName.Contains("Longitude"))
                    {
                        surfaceLongitudeIndex = i;
                    }
                    else if(colName.Contains("Surface") && colName.Contains("Latitude"))
                    {
                        surfaceLatitudeIndex = i;
                    }
                }
            }

            if(-1 == surfaceLongitudeIndex || -1 == surfaceLatitudeIndex)
            {
                throw new NotSupportedException("-1 == surfaceLongitudeIndex ||-1 == surfaceLatitudeIndex ||-1 == bottomLongitudeIndex ||-1 == bottomLatitudeIndex");
            }

            if(isLineString)
            {
                if(-1 == bottomLongitudeIndex || -1 == bottomLatitudeIndex)
                {
                    throw new NotSupportedException("-1 == surfaceLongitudeIndex ||-1 == surfaceLatitudeIndex ||-1 == bottomLongitudeIndex ||-1 == bottomLatitudeIndex");
                }
            }

            if(isLineString)
            {
                Parallel.ForEach(Partitioner.Create(0, nRows, Math.Max(nRows / Environment.ProcessorCount, 1)),
                                 row =>
                                 {
                                     string  columnName;
                                     OidKind colKind;
                                     bool    is_null;

                                     double? surfaceLongitude;
                                     double? surfaceLatitude;
                                     double? bottomLongitude;
                                     double? bottomLatitude;

                                     Dictionary<string, object?> properties;

                                     for(int i = row.Item1; i < row.Item2; i++)
                                     {
                                         properties = new Dictionary<string, object?>();

                                         surfaceLongitude = null;
                                         surfaceLatitude  = null;
                                         bottomLongitude  = null;
                                         bottomLatitude   = null;

                                         for(int j = 0; j < nFields; ++j)
                                         {
                                             columnName = PQfname(res, j);

                                             colKind = OidTypes[PQftype(res, j)];

                                             is_null = PQgetisnull(res, i, j) != 0;


                                             if(j == surfaceLongitudeIndex && !is_null)
                                             {
                                                 surfaceLongitude = double.Parse(PQgetvalue(res, i, j));
                                             }
                                             else if(j == surfaceLatitudeIndex && !is_null)
                                             {
                                                 surfaceLatitude = double.Parse(PQgetvalue(res, i, j));
                                             }
                                             else if(j == bottomLongitudeIndex && !is_null)
                                             {
                                                 bottomLongitude = double.Parse(PQgetvalue(res, i, j));
                                             }
                                             else if(j == bottomLatitudeIndex && !is_null)
                                             {
                                                 bottomLatitude = double.Parse(PQgetvalue(res, i, j));
                                             }

                                             switch(colKind)
                                             {
                                                 case OidKind.BOOLOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, PQgetvalue(res, i, j) == "true");
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.BYTEAOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, sbyte.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.INT2OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, short.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.INT4OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, int.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.INT8OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, long.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.FLOAT4OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, float.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.FLOAT8OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, double.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.CHAROID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, char.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.VARCHAROID:
                                                 case OidKind.TEXTOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, PQgetvalue(res, i, j).ToString());
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.TIMEOID:
                                                 case OidKind.TIMESTAMPOID:
                                                 case OidKind.DATEOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, DateTime.Parse(PQgetvalue(res, i, j).ToString()));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 default:
                                                 {
                                                     throw new NotSupportedException(colKind.ToString());
                                                 }
                                             }
                                         }

                                         geoJson.Features.Add(new Feature
                                         {
                                             Id = i,
                                             Geometry = new Geometry
                                             {
                                                 Type = GeometryKind.LineString,
                                                 Coordinates = new List<CoordinateElement?>
                                                 {
                                                     new List<double>
                                                     {
                                                         surfaceLongitude ?? 0.0, surfaceLatitude ?? 0.0
                                                     },
                                                     new List<double>
                                                     {
                                                         bottomLongitude ?? 0.0, bottomLatitude ?? 0.0
                                                     }
                                                 }
                                             },
                                             Properties = properties
                                         });
                                     }
                                 });
            }
            else
            {
                Parallel.ForEach(Partitioner.Create(0, nRows, Math.Max(nRows / Environment.ProcessorCount, 1)),
                                 row =>
                                 {
                                     string  columnName;
                                     OidKind colKind;
                                     bool    is_null;

                                     double? surfaceLongitude;
                                     double? surfaceLatitude;

                                     Dictionary<string, object?> properties;

                                     for(int i = row.Item1; i < row.Item2; i++)
                                     {
                                         properties = new Dictionary<string, object?>();

                                         surfaceLongitude = null;
                                         surfaceLatitude  = null;

                                         for(int j = 0; j < nFields; ++j)
                                         {
                                             columnName = PQfname(res, j);

                                             colKind = OidTypes[PQftype(res, j)];

                                             is_null = PQgetisnull(res, i, j) != 0;

                                             if(j == surfaceLongitudeIndex && !is_null)
                                             {
                                                 surfaceLongitude = double.Parse(PQgetvalue(res, i, j));
                                             }
                                             else if(j == surfaceLatitudeIndex && !is_null)
                                             {
                                                 surfaceLatitude = double.Parse(PQgetvalue(res, i, j));
                                             }

                                             switch(colKind)
                                             {
                                                 case OidKind.BOOLOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, PQgetvalue(res, i, j) == "true");
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.BYTEAOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, sbyte.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.INT2OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, short.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.INT4OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, int.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.INT8OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, long.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.FLOAT4OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, float.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.FLOAT8OID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, double.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.CHAROID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, char.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.VARCHAROID:
                                                 case OidKind.TEXTOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, PQgetvalue(res, i, j));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 case OidKind.TIMEOID:
                                                 case OidKind.TIMESTAMPOID:
                                                 case OidKind.DATEOID:
                                                 {
                                                     if(!is_null)
                                                     {
                                                         properties.Add(columnName, DateTime.Parse(PQgetvalue(res, i, j)));
                                                     }
                                                     else
                                                     {
                                                         properties.Add(columnName, null);
                                                     }

                                                     break;
                                                 }
                                                 default:
                                                 {
                                                     throw new NotSupportedException(colKind.ToString());
                                                 }
                                             }
                                         }

                                         geoJson.Features.Add(new Feature
                                         {
                                             Id = i,
                                             Geometry = new Geometry
                                             {
                                                 Type = GeometryKind.Point,
                                                 Coordinates = new List<CoordinateElement?>
                                                 {
                                                     surfaceLongitude ?? 0.0, surfaceLatitude ?? 0.0
                                                 }
                                             },
                                             Properties = properties
                                         });
                                     }
                                 });
            }
            //            DataManager.Instance[(mapboxData.Location, MediaTypes.Json)] = locationGeoJson.ToJson();

            return geoJson.ToJson();
        }

        //public DataFrame ResultAsDataFrame(pg_result res,
        //                                   string    typeName)
        //{
        //    List<DataFrameColumn> columns = new List<DataFrameColumn>(queryResult.Row_set.Columns.Count);

        //    int nRows = queryResult.Row_set.Columns.FirstOrDefault().Nulls.Count;

        //    foreach(TColumnType rowDesc in queryResult.Row_set.Row_desc)
        //    {
        //        switch(rowDesc.Col_type.Type)
        //        {
        //            case TDatumType.BOOL:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<bool>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.TINYINT:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<sbyte>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.SMALLINT:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<short>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.INT:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<int>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.BIGINT:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<long>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.FLOAT:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<float>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.DOUBLE:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<double>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.DATE:
        //            case TDatumType.TIME:
        //            {
        //                columns.Add(new PrimitiveDataFrameColumn<DateTime>(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            case TDatumType.STR:
        //            {
        //                columns.Add(new StringDataFrameColumn(rowDesc.Col_name, nRows));

        //                break;
        //            }
        //            default:
        //            {
        //                throw new NotSupportedException(rowDesc.Col_name);
        //            }
        //        }
        //    }

        //    TDatumType col_type;
        //    bool       is_null;

        //    for(int row = 0; row < nRows; ++row)
        //    {
        //        for(int i = 0; i < queryResult.Row_set.Columns.Count; ++i)
        //        {
        //            col_type = queryResult.Row_set.Row_desc[i].Col_type.Type;

        //            is_null = queryResult.Row_set.Columns[i].Nulls[row];

        //            switch(col_type)
        //            {
        //                case TDatumType.BOOL:
        //                case TDatumType.TINYINT:
        //                case TDatumType.SMALLINT:
        //                case TDatumType.INT:
        //                case TDatumType.BIGINT:
        //                {
        //                    if(!is_null)
        //                    {
        //                        columns[i][row] = queryResult.Row_set.Columns[i].Data.Int_col[row];
        //                    }

        //                    break;
        //                }
        //                case TDatumType.FLOAT:
        //                case TDatumType.DOUBLE:
        //                {
        //                    if(!is_null)
        //                    {
        //                        columns[i][row] = queryResult.Row_set.Columns[i].Data.Real_col[row];
        //                    }

        //                    break;
        //                }
        //                case TDatumType.DATE:
        //                case TDatumType.TIME:
        //                case TDatumType.STR:
        //                {
        //                    if(!is_null)
        //                    {
        //                        columns[i][row] = queryResult.Row_set.Columns[i].Data.Str_col[row];
        //                    }

        //                    break;
        //                }
        //                default:
        //                {
        //                    throw new NotSupportedException(col_type.ToString());
        //                }
        //            }
        //        }
        //    }

        //    return new DataFrame(columns);
        //}
    }
}