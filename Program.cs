using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace EngineeringToolsServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args).ConfigureLogging(logging =>
                                                                    {
                                                                        logging.ClearProviders();
                                                                        logging.AddConsole();
#if DEBUG
                                                                        logging.SetMinimumLevel(LogLevel.Information);
                                                                        logging.AddDebug();
#else
                                                                        logging.SetMinimumLevel(LogLevel.Warning);
#endif
                                                                    }).ConfigureWebHostDefaults(webBuilder =>
                                                                                                {
                                                                                                    webBuilder.UseStartup<Startup>();
                                                                                                });
        }
    }
}