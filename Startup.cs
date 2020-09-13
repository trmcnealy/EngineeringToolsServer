using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using EngineeringToolsServer.Services;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace EngineeringToolsServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        //public static IServerEventsController ServerEventsController { get; } = new ServerEventsController();

        public static DataSources.OilGasDataSourceController OilGasDataSourceController { get; } = new DataSources.OilGasDataSourceController();

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();

            services.AddSpaStaticFiles(configuration =>
                                       {
                                           configuration.RootPath = "wwwroot/build";
                                       });

            services.AddSingleton(OilGasDataSourceController);

            //services.AddSingleton(ServerEventsController);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseRouter(r =>
                          {
                              r.Routes.Add(DataManager.Instance.SetLogger(loggerFactory.CreateLogger(nameof(EngineeringToolsServer))));
                          });

            app.UseAuthorization();

            app.UseResponseCaching();
            
            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapBlazorHub().AddComponent<App>(selector: "app");
                endpoints.MapRazorPages();

                endpoints.MapControllerRoute(name: "default",
                                             pattern: "{controller}/{action}");
                endpoints.MapFallbackToPage("/Index");
            });

            app.UseSpa(spa =>
                       {
                           spa.Options.SourcePath = "wwwroot/js/src";

                           if (env.IsDevelopment())
                           {
                               spa.UseReactDevelopmentServer(npmScript: "start");
                           }
                       });
        }
    }
}
