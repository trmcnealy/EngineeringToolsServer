#nullable enable
using System.Text.Json;
using System.Text.Json.Serialization;

namespace EngineeringToolsServer.Pages
{
    public sealed class PlotlyPointData
    {
        [JsonPropertyName("text")]
        public string[]? Text { get; set; }

        [JsonPropertyName("lon")]
        public double?[]? Longitude { get; set; }

        [JsonPropertyName("lat")]
        public double?[]? Latitude { get; set; }

        public PlotlyPointData(string[]?  text,
                               double?[]? longitude,
                               double?[]? latitude)
        {
            Text      = text;
            Longitude = longitude;
            Latitude  = latitude;
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Engineering.DataSource.GeoSpatial.esri.Converter.Settings);
        }

        public static PlotlyPointData FromJson(string json)
        {
            return JsonSerializer.Deserialize<PlotlyPointData>(json, Engineering.DataSource.GeoSpatial.esri.Converter.Settings);
        }
    }

    public sealed class PlotlyLineData
    {
        [JsonPropertyName("type")]
        public string? Type { get; set; }

        [JsonPropertyName("text")]
        public string? Text { get; set; }

        [JsonPropertyName("mode")]
        public string? Mode { get; set; } = "lines";

        [JsonPropertyName("lon")]
        public double?[]? Longitude { get; set; }

        [JsonPropertyName("lat")]
        public double?[]? Latitude { get; set; }

        [JsonPropertyName("opacity")]
        public double? Opacity { get; set; } = 1.0;

        [JsonPropertyName("line")]
        public LineData? Line { get; set; }

        public class LineData
        {
            [JsonPropertyName("width")]
            public int? Width { get; set; }

            [JsonPropertyName("color")]
            public string? Color { get; set; }

            public LineData(int?    width,
                            string? color)
            {
                Width = width;
                Color = color;
            }
        }
        
        public PlotlyLineData(string?    text,
                              double?[]? longitude,
                              double?[]? latitude,
                              double?    opacity,
                              int?       width,
                              string?    color)
        {
            Type      = "scattermapbox";
            Text      = text;
            Longitude = longitude;
            Latitude  = latitude;
            Opacity   = opacity;
            Line      = new LineData(width, color);
        }

        public PlotlyLineData(string?    type,
                              string?    text,
                              double?[]? longitude,
                              double?[]? latitude,
                              double?    opacity,
                              int?       width,
                              string?    color)
        {
            Type      = type;
            Text      = text;
            Longitude = longitude;
            Latitude  = latitude;
            Opacity   = opacity;
            Line      = new LineData(width, color);
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Engineering.DataSource.GeoSpatial.esri.Converter.Settings);
        }

        public static PlotlyLineData FromJson(string json)
        {
            return JsonSerializer.Deserialize<PlotlyLineData>(json, Engineering.DataSource.GeoSpatial.esri.Converter.Settings);
        }
    }
}