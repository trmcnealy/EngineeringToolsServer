using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

using System.Text.Json;

using Engineering.DataSource.GeoSpatial;

using Microsoft.Extensions.Logging;

namespace EngineeringToolsServer.Services
{
    public enum MediaTypes
    {
        ArrayBuffer,
        Blob,
        FormData,
        Json,
        Text
    }

    public sealed class DataManager : IRouter
    {
        private static volatile DataManager _instance;

        private readonly Dictionary<string, object>     _storage     = new Dictionary<string, object>();
        private readonly Dictionary<string, MediaTypes> _storageType = new Dictionary<string, MediaTypes>();

        private ILogger _logger;

        public string BaseUrl { get; private set; }

        public static DataManager Instance
        {
#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
            [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
            get { return _instance; }
        }

        static DataManager()
        {
            _instance = new DataManager();
        }

        private DataManager()
        {
        }

        public object this[(string name, MediaTypes type) variable]
        {
#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
            [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
            get { return _storage[variable.name]; }
#if NETSTANDARD
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
#else
            [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
#endif
            set
            {
                _storage[variable.name]     = value;
                _storageType[variable.name] = variable.type;
            }
        }

        public bool IsValidVariable(string variableName)
        {
            return _storage.ContainsKey(variableName);
        }

        public DataManager SetLogger(ILogger logger)
        {
            _logger = logger;

            return this;
        }

        public VirtualPathData GetVirtualPath(VirtualPathContext context)
        {
            return null;
        }

        /// <summary>
        /// https://www.iana.org/assignments/media-types/media-types.xhtml
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task RouteAsync(RouteContext context)
        {
            if(!context.HttpContext.Request.Path.Value.AsSpan().StartsWith("/data"))
            {
                return;
            }

            if(context.HttpContext.Request.Method == HttpMethods.Get)
            {
                GetRequest(context);
            }
            else if(context.HttpContext.Request.Method == HttpMethods.Post)
            {
                await PostRequest(context);
            }
        }

        private void GetRequest(RouteContext context)
        {
            string[] segments = context.HttpContext.Request.Path.Value.Split(new[]
                                                                             {
                                                                                 '/'
                                                                             },
                                                                             StringSplitOptions.RemoveEmptyEntries);

            if(segments.Length < 2)
            {
                return;
            }

            string variableName = segments[1];

            if(_storage.TryGetValue(variableName, out object value))
            {
                context.Handler = async httpContext =>
                                  {
                                      await using(StreamWriter writer = new StreamWriter(httpContext.Response.Body))
                                      {
                                          switch(_storageType[variableName])
                                          {
                                              case MediaTypes.ArrayBuffer:
                                              {
                                                  httpContext.Response.ContentType = "arraybuffer";
                                                  await writer.WriteAsync(JsonSerializer.Serialize(value));
                                                  break;
                                              }
                                              case MediaTypes.Blob:
                                              {
                                                  httpContext.Response.ContentType = "blob";
                                                  await writer.WriteAsync(JsonSerializer.Serialize(value));
                                                  break;
                                              }
                                              case MediaTypes.FormData:
                                              {
                                                  httpContext.Response.ContentType = "multipart/form-data";
                                                  await writer.WriteAsync(value as string);
                                                  break;
                                              }
                                              case MediaTypes.Json:
                                              {
                                                  httpContext.Response.ContentType = "application/json";
                                                  await writer.WriteAsync(value as string);
                                                  break;
                                              }
                                              case MediaTypes.Text:
                                              {
                                                  httpContext.Response.ContentType = "text/plain";
                                                  await writer.WriteAsync(value as string);
                                                  break;
                                              }
                                              default:
                                              {
                                                  httpContext.Response.ContentType = "blob";
                                                  await writer.WriteAsync(JsonSerializer.Serialize(value));
                                                  break;
                                              }
                                          }
                                      }

                                      await httpContext.Response.CompleteAsync();
                                  };

                return;
            }

            context.Handler = async httpContext =>
                              {
                                  httpContext.Response.StatusCode = 400;
                                  await httpContext.Response.WriteAsync($"variable {variableName} not found.");
                                  await httpContext.Response.CompleteAsync();
                              };
        }

        private async Task PostRequest(RouteContext context)
        {
            string[] segments = context.HttpContext.Request.Path.Value.Split(new[]
                                                                             {
                                                                                 '/'
                                                                             },
                                                                             StringSplitOptions.RemoveEmptyEntries);

            string variableName = segments[1];

            switch(context.HttpContext.Request.ContentType)
            {
                case "text/plain":
                {
                    _storageType[variableName] = MediaTypes.Text;

                    break;
                }
                case "application/json":
                {
                    _storageType[variableName] = MediaTypes.Json;

                    break;
                }
                case "multipart/form-data":
                {
                    _storageType[variableName] = MediaTypes.FormData;

                    break;
                }
                case "arraybuffer":
                {
                    _storageType[variableName] = MediaTypes.ArrayBuffer;

                    break;
                }
                default:
                {
                    _storageType[variableName] = MediaTypes.Blob;

                    break;
                }
            }

            using StreamReader reader = new StreamReader(context.HttpContext.Request.Body);

            string source = await reader.ReadToEndAsync();

            _storage[variableName] = source;

            if(variableName == "BaseUrl")
            {
                BaseUrl baseUrl = JsonSerializer.Deserialize<BaseUrl>(source);

                BaseUrl = baseUrl.Url;
            }

            context.Handler = async httpContext =>
                              {
                                  //httpContext.Response.ContentType = "application/json";

                                  await using(StreamWriter writer = new StreamWriter(httpContext.Response.Body))
                                  {
                                      await writer.WriteAsync(source);
                                  }

                                  await httpContext.Response.CompleteAsync();
                              };
        }
    }
}