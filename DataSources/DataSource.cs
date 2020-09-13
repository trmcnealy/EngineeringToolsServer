#nullable enable
using System;

using Engineering.DataSource;

using System.Collections.Generic;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;

using JsonConverter = System.Text.Json.Serialization.JsonConverter;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace EngineeringToolsServer.DataSources
{
    public abstract class DataSource
    {
        public abstract ref readonly string[] GetFields();

        public abstract TableKind GetFieldTable(string field);

        public abstract string GetFieldDbName(string alias);

        public abstract string GetFieldDbFullName(string alias);

        public abstract string GetSqlQuery(ApiNumber[] apiFilters,
                                           string[]    fields);
    }

    public enum SortDirection
    {
        Ascending  = 1,
        Descending = 2
    }

    public class ValueRange<T>
        where T : struct
    {
        [JsonPropertyName("max")]
        public T? Max { get; set; }

        [JsonPropertyName("min")]
        public T? Min { get; set; }

        public static ValueRange<T> FromJson(string json) => JsonSerializer.Deserialize<ValueRange<T>>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class NumberRange : ValueRange<double>
    {
    }

    public struct ValueType
    {
        public bool?   Bool;
        public double? Double;
        public string? String;

        public static implicit operator ValueType(bool Bool) =>
            new ValueType
            {
                Bool = Bool
            };

        public static implicit operator ValueType(double Double) =>
            new ValueType
            {
                Double = Double
            };

        public static implicit operator ValueType(string String) =>
            new ValueType
            {
                String = String
            };

        public static object FromJson(string json) => JsonSerializer.Deserialize<object>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class DataCategorical
    {
        [JsonPropertyName("categories")]
        public List<DataCategoryColumn>? Categories { get; set; }

        [JsonPropertyName("values")]
        public List<DataValuesColumn>? Values { get; set; }

        public static DataCategorical FromJson(string json) => JsonSerializer.Deserialize<DataCategorical>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class DataCategoryColumn
    {
        [JsonPropertyName("identityFields")]
        public List<object>? IdentityFields { get; set; }

        [JsonPropertyName("objects")]
        public List<Dictionary<string, object>>? Objects { get; set; }

        [JsonPropertyName("source")]
        public DataColumnMetadataMap? Source { get; set; }

        [JsonPropertyName("values")]
        public List<ValueType>? Values { get; set; }

        public static DataCategoryColumn FromJson(string json) => JsonSerializer.Deserialize<DataCategoryColumn>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class DataColumnMetadataMap
    {
        [JsonPropertyName("aggregates")]
        public DataAggregatesColumn? Aggregates { get; set; }

        [JsonPropertyName("displayName")]
        public string? DisplayName { get; set; }

        [JsonPropertyName("expr")]
        public object? Expr { get; set; }

        [JsonPropertyName("format")]
        public string? Format { get; set; }

        [JsonPropertyName("index")]
        public double? Index { get; set; }

        [JsonPropertyName("objects")]
        public Dictionary<string, object>? Objects { get; set; }

        [JsonPropertyName("queryName")]
        public string? QueryName { get; set; }

        [JsonPropertyName("sort")]
        public double? Sort { get; set; }

        [JsonPropertyName("sortOrder")]
        public double? SortOrder { get; set; }

        [JsonPropertyName("type")]
        public string? Type { get; set; }

        public static Dictionary<string, DataColumnMetadataMap> FromJson(string json) => JsonSerializer.Deserialize<Dictionary<string, DataColumnMetadataMap>>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class DataAggregatesColumn
    {
        [JsonPropertyName("average")]
        public ValueType? Average { get; set; }

        [JsonPropertyName("count")]
        public double? Count { get; set; }

        [JsonPropertyName("max")]
        public ValueType? Max { get; set; }

        [JsonPropertyName("maxLocal")]
        public ValueType? MaxLocal { get; set; }

        [JsonPropertyName("median")]
        public ValueType? Median { get; set; }

        [JsonPropertyName("min")]
        public ValueType? Min { get; set; }

        [JsonPropertyName("minLocal")]
        public ValueType? MinLocal { get; set; }

        [JsonPropertyName("percentiles")]
        public List<DataPercentileAggregate>? Percentiles { get; set; }

        [JsonPropertyName("single")]
        public ValueType? Single { get; set; }

        [JsonPropertyName("subtotal")]
        public ValueType? Subtotal { get; set; }

        public static DataAggregatesColumn FromJson(string json) => JsonSerializer.Deserialize<DataAggregatesColumn>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class DataPercentileAggregate
    {
        [JsonPropertyName("key")]
        public double Key { get; set; }

        [JsonPropertyName("value")]
        public ValueType Value { get; set; }

        public static DataPercentileAggregate FromJson(string json) => JsonSerializer.Deserialize<DataPercentileAggregate>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class DataValuesColumn
    {
        [JsonPropertyName("highlights")]
        public List<ValueType>? Highlights { get; set; }

        [JsonPropertyName("identity")]
        public object? Identity { get; set; }

        [JsonPropertyName("objects")]
        public List<Dictionary<string, object>>? Objects { get; set; }

        [JsonPropertyName("source")]
        public DataColumnMetadataMap? Source { get; set; }

        [JsonPropertyName("values")]
        public List<ValueType>? Values { get; set; }

        public static DataValuesColumn FromJson(string json) => JsonSerializer.Deserialize<DataValuesColumn>(json, Converter.Settings);

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    public class DataCategoricalColumn
    {
        [JsonPropertyName("objects")]
        public List<Dictionary<string, object>>? Objects { get; set; }

        [JsonPropertyName("source")]
        public DataColumnMetadataMap? Source { get; set; }

        public static DataCategoricalColumn FromJson(string json)
        {
            return JsonSerializer.Deserialize<DataCategoricalColumn>(json, Converter.Settings);
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, Converter.Settings);
        }
    }

    internal static class Converter
    {
        public sealed class DefaultJavaScriptEncoderBasicLatin : JavaScriptEncoder
        {
            public static readonly DefaultJavaScriptEncoderBasicLatin s_singleton = new DefaultJavaScriptEncoderBasicLatin();

            private DefaultJavaScriptEncoderBasicLatin()
            {
            }

            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            public override bool WillEncode(int unicodeScalar)
            {
                return false;
            }

            public override unsafe int FindFirstCharacterToEncode(char* text,
                                                                  int   textLength)
            {
                return -1;
            }

            public override unsafe int FindFirstCharacterToEncodeUtf8(ReadOnlySpan<byte> utf8Text)
            {
                return -1;
            }

            public override int MaxOutputCharactersPerInputCharacter { get { return 12; } }

            public override unsafe bool TryEncodeUnicodeScalar(int     unicodeScalar,
                                                               char*   buffer,
                                                               int     bufferLength,
                                                               out int numberOfCharactersWritten)
            {
                numberOfCharactersWritten = 0;

                return false;
            }
        }

        public static readonly JsonSerializerOptions Settings = new JsonSerializerOptions
        {
            Encoder                     = DefaultJavaScriptEncoderBasicLatin.s_singleton,
            PropertyNameCaseInsensitive = true,
            IgnoreNullValues            = true,
            WriteIndented               = true,
            PropertyNamingPolicy        = JsonNamingPolicy.CamelCase,
            Converters =
            {
                ValueTypeConverter.Singleton, SortDirectionConverter.Singleton
            }
        };
    }

    internal class SortDirectionConverter : JsonConverter<SortDirection>
    {
        public override bool CanConvert(Type t)
        {
            return t == typeof(SortDirection) || t == typeof(SortDirection?);
        }

        public override SortDirection Read(ref Utf8JsonReader    reader,
                                           Type                  typeToConvert,
                                           JsonSerializerOptions options)
        {
            if(reader.TokenType == JsonTokenType.Null)
            {
                return default;
            }

            string? value = JsonSerializer.Deserialize<string>(reader.ValueSpan, options);

            switch(value)
            {
                case "Ascending":  return SortDirection.Ascending;
                case "Descending": return SortDirection.Descending;
            }

            throw new Exception("Cannot unmarshal type esri.FieldType");
        }

        public override void Write(Utf8JsonWriter        writer,
                                   SortDirection         value,
                                   JsonSerializerOptions options)
        {
            switch(value)
            {
                case SortDirection.Ascending:
                    JsonSerializer.Serialize(writer, "Ascending", options);

                    return;
                case SortDirection.Descending:
                    JsonSerializer.Serialize(writer, "Descending", options);

                    return;
            }

            throw new Exception("Cannot marshal type esri.FieldType");
        }

        public static readonly SortDirectionConverter Singleton = new SortDirectionConverter();
    }

    internal class ValueTypeConverter : JsonConverter<ValueType>
    {
        public override bool CanConvert(Type t)
        {
            return t == typeof(ValueType) || t == typeof(ValueType?);
        }

        public override ValueType Read(ref Utf8JsonReader    reader,
                                       Type                  typeToConvert,
                                       JsonSerializerOptions options)
        {
            if(reader.TokenType == JsonTokenType.Null)
            {
                return default;
            }

            switch(reader.TokenType)
            {
                case JsonTokenType.False:
                case JsonTokenType.True:
                    return new ValueType
                    {
                        Bool = JsonSerializer.Deserialize<bool>(reader.ValueSpan, options)
                    };
                case JsonTokenType.String:
                    return new ValueType
                    {
                        String = JsonSerializer.Deserialize<string>(reader.ValueSpan, options)
                    };
                case JsonTokenType.Number:
                    return new ValueType
                    {
                        Double = JsonSerializer.Deserialize<double>(reader.ValueSpan, options)
                    };
            }

            throw new Exception("Cannot unmarshal type esri.FieldType");
        }

        public override void Write(Utf8JsonWriter        writer,
                                   ValueType             value,
                                   JsonSerializerOptions options)
        {
            if(value.String != null)
            {
                JsonSerializer.Serialize(writer, value.String, options);

                return;
            }

            if(value.Double != null)
            {
                JsonSerializer.Serialize(writer, value.Double, options);

                return;
            }

            if(value.Bool != null)
            {
                JsonSerializer.Serialize(writer, value.Bool, options);

                return;
            }

            throw new Exception("Cannot marshal type esri.FieldType");
        }

        public static readonly ValueTypeConverter Singleton = new ValueTypeConverter();
    }
}