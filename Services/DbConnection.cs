using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;

using Apache.Thrift.Database;

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

        private PostgreSqlUser _user;

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

        public async Task<string> SqlQueryAsync(string            query,
                                                CancellationToken cancellationToken = default)
        {
            pg_result res = PQexec(_user.Connection, query);

            string jsonResult = new pg_string(res.Handle);

            Console.WriteLine(jsonResult.Substring(100));

            return await Task.FromResult(jsonResult);
        }
    }
}