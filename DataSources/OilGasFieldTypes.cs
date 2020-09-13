// ReSharper disable ConvertToAutoProperty
// ReSharper disable InconsistentNaming

using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace EngineeringToolsServer.DataSources
{
    [System.Runtime.Versioning.NonVersionable]
    public sealed class TableKind : IEnumerable<TableKind>
    {
        private readonly string _value;
        public ref readonly string Value { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref _value; } }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        private TableKind(string value) { _value = value; }

        private static readonly TableKind NoneType = new TableKind("None");
        public static ref readonly TableKind None { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref NoneType; } }

        private static readonly TableKind WellType = new TableKind("Well");
        public static ref readonly TableKind Well { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref WellType; } }

        private static readonly TableKind LeaseType = new TableKind("Lease");
        public static ref readonly TableKind Lease { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref LeaseType; } }

        private static readonly TableKind FieldType = new TableKind("Field");
        public static ref readonly TableKind Field { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref FieldType; } }

        private static readonly TableKind CompanyType = new TableKind("Company");
        public static ref readonly TableKind Company { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref CompanyType; } }

        private static readonly TableKind LocationType = new TableKind("Location");
        public static ref readonly TableKind Location { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref LocationType; } }

        private static readonly TableKind WellboreDetailsType = new TableKind("WellboreDetails");
        public static ref readonly TableKind WellboreDetails { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref WellboreDetailsType; } }

        private static readonly TableKind CompletionDetailsType = new TableKind("CompletionDetails");
        public static ref readonly TableKind CompletionDetails { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref CompletionDetailsType; } }

        private static readonly TableKind PerforationIntervalType = new TableKind("PerforationInterval");
        public static ref readonly TableKind PerforationInterval { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref PerforationIntervalType; } }

        private static readonly TableKind ReservoirDataType = new TableKind("ReservoirData");
        public static ref readonly TableKind ReservoirData { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref ReservoirDataType; } }

        private static readonly TableKind ReservoirPropertiesType = new TableKind("ReservoirProperties");
        public static ref readonly TableKind ReservoirProperties { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref ReservoirPropertiesType; } }

        private static readonly TableKind GasPropertiesType = new TableKind("GasProperties");
        public static ref readonly TableKind GasProperties { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref GasPropertiesType; } }

        private static readonly TableKind OilPropertiesType = new TableKind("OilProperties");
        public static ref readonly TableKind OilProperties { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref OilPropertiesType; } }

        private static readonly TableKind WaterPropertiesType = new TableKind("WaterProperties");
        public static ref readonly TableKind WaterProperties { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref WaterPropertiesType; } }

        private static readonly TableKind MonthlyProductionType = new TableKind("MonthlyProduction");
        public static ref readonly TableKind MonthlyProduction { [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)] get { return ref MonthlyProductionType; } }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public IEnumerator<TableKind> GetEnumerator()
        {
            yield return None;
            yield return Well;
            yield return Lease;
            yield return Field;
            yield return Company;
            yield return Location;
            yield return WellboreDetails;
            yield return CompletionDetails;
            yield return PerforationInterval;
            yield return ReservoirData;
            yield return ReservoirProperties;
            yield return GasProperties;
            yield return OilProperties;
            yield return WaterProperties;
            yield return MonthlyProduction;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override string ToString()
        {
            return _value;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static implicit operator string(TableKind tablekind)
        {
            return tablekind._value;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static implicit operator TableKind(string value)
        {
            return new TableKind(value);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public bool Equals(TableKind other) { return _value == other._value; }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override bool Equals(object obj) { return obj is TableKind kind && Equals(kind); }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public override int GetHashCode() { return _value.GetHashCode(); }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static bool operator ==(TableKind left, TableKind right) { return Equals(left, right); }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static bool operator ==(TableKind left, string right) { return left?._value == right; }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static bool operator ==(string left, TableKind right) { return left == right?._value; }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static bool operator !=(TableKind left, TableKind right) { return !Equals(left, right); }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static bool operator !=(TableKind left, string right) { return left?._value != right; }

        [MethodImpl(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
        public static bool operator !=(string left, TableKind right) { return left != right?._value; }

    }

}

