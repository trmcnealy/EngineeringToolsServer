#nullable enable

// ReSharper disable RedundantLambdaParameterType

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using Engineering.DataSource;
using Engineering.DataSource.GeoSpatial;
using Engineering.DataSource.Tools;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Html;
using Microsoft.Data.Analysis;

namespace EngineeringToolsServer.Services
{
    public sealed class DatabaseService
    {
        public DbConnection DatabaseConnection { get; set; }

        private static volatile DatabaseService _instance;

        static DatabaseService()
        {
            _instance = new DatabaseService();
        }

        public static DatabaseService GetInstance()
        {
            return _instance;
        }

        private DatabaseService()
        {
            DatabaseConnection = new DbConnection();
        }

//#if NETSTANDARD
//        [MethodImpl(MethodImplOptions.AggressiveInlining)]
//#else
//        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
//#endif
//        private DataFrame? queryDb(string sql)
//        {
//            return DatabaseConnection.QueryDb(sql);
//        }

#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
        private async Task<string?> queryDbAsync(string sql)
        {
            return await DatabaseConnection.SqlQueryAsync(sql);
        }

        //public static DataFrame? QueryDb(string sql)
        //{
        //    return _instance.queryDb(sql);
        //}

        public static async Task<string?> QueryDbAsync(string sql)
        {
            return await _instance.queryDbAsync(sql);
        }
    }
}