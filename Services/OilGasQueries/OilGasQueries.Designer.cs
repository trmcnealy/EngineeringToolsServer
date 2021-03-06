﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EngineeringToolsServer.Services {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class OilGasQueries {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal OilGasQueries() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("EngineeringToolsServer.Services.OilGasQueries.OilGasQueries", typeof(OilGasQueries).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    &quot;ShapeFileLocation&quot;.&quot;Api&quot; AS &quot;Api&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot; AS &quot;SurfaceEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceNorthing83&quot; AS &quot;SurfaceNorthing&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomEasting83&quot; AS &quot;BottomEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomNorthing83&quot; AS &quot;BottomNorthing&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceLatitude83&quot; AS &quot;SurfaceLatitude&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceLongitude83&quot; AS &quot;SurfaceLongitude&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomLatitude83&quot; AS &quot;BottomLatitude&quot;,
        ///    &quot;ShapeF [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string AllWellsLocations {
            get {
                return ResourceManager.GetString("AllWellsLocations", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT min(&quot;MonthlyProduction&quot;.&quot;OilVolume&quot;) AS &quot;min&quot;, max(&quot;MonthlyProduction&quot;.&quot;OilVolume&quot;) AS &quot;max&quot;
        ///FROM &quot;Well&quot;
        ///INNER JOIN &quot;MonthlyProduction&quot;
        ///ON &quot;Well&quot;.&quot;Id&quot;=&quot;MonthlyProduction&quot;.&quot;WellId&quot;.
        /// </summary>
        internal static string MinMaxMonthlyProduction {
            get {
                return ResourceManager.GetString("MinMaxMonthlyProduction", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    Wells.&quot;Api&quot; AS &quot;Api&quot;,
        ///    MonthlyProductions.&quot;Date&quot; AS &quot;Date&quot;,
        ///    MonthlyProductions.&quot;GasVolume&quot; AS &quot;GasVolume&quot;,
        ///    MonthlyProductions.&quot;OilVolume&quot; AS &quot;OilVolume&quot;,
        ///    MonthlyProductions.&quot;CondensateVolume&quot; AS &quot;CondensateVolume&quot;,
        ///    MonthlyProductions.&quot;WaterVolume&quot; AS &quot;WaterVolume&quot;
        ///FROM (
        ///    SELECT &quot;Id&quot;, &quot;Api&quot;
        ///    FROM &quot;Well&quot;
        ///) Wells
        ///LEFT JOIN (
        ///    SELECT &quot;Id&quot;, &quot;Date&quot;, &quot;GasVolume&quot;, &quot;OilVolume&quot;, &quot;CondensateVolume&quot;, &quot;WaterVolume&quot;, &quot;WellId&quot;
        ///    FROM &quot;MonthlyProduction&quot;
        ///) MonthlyProductions
        ///ON Wel [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string MonthlyProduction {
            get {
                return ResourceManager.GetString("MonthlyProduction", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT  jsonb_agg(jsonb_build_object(
        ///                &apos;Well&apos;, jsonb_build_object(
        ///                                        &apos;Id&apos;,  Well.&quot;Id&quot;,
        ///                                        &apos;Api&apos;,  Well.&quot;Api&quot;,
        ///                                        &apos;Name&apos;,  Well.&quot;Name&quot;,
        ///                                        &apos;Number&apos;,  Well.&quot;Number&quot;,
        ///                                        &apos;LeaseId&apos;,  Well.&quot;LeaseId&quot;,
        ///                                        &apos;FieldId&apos;,  Well.&quot;FieldId&quot;,
        ///                                         [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string OilGasDb {
            get {
                return ResourceManager.GetString("OilGasDb", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to 
        ///SELECT
        ///    json_build_object(&apos;Api&apos;,DataTable.&quot;Api&quot;,
        ///        &apos;ReservoirName&apos;,DataTable.&quot;ReservoirName&quot;,
        ///        &apos;ReservoirDepth&apos;,DataTable.&quot;ReservoirDepth&quot;,
        ///        &apos;GasSpecificGravity&apos;,DataTable.&quot;GasSpecificGravity&quot;,
        ///        &apos;GasReferenceTemperature&apos;,DataTable.&quot;GasReferenceTemperature&quot;,
        ///        &apos;GasReferencePressure&apos;,DataTable.&quot;GasReferencePressure&quot;,
        ///        &apos;OilApiGravity&apos;,DataTable.&quot;OilApiGravity&quot;,
        ///        &apos;OilReferenceTemperature&apos;,DataTable.&quot;OilReferenceTemperature&quot;,
        ///        &apos;OilReferencePress [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string OilGasProductionDb {
            get {
                return ResourceManager.GetString("OilGasProductionDb", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    Wells.&quot;Api&quot; AS &quot;Api&quot;,
        ///    Wells.&quot;Name&quot; AS &quot;Name&quot;,
        ///    Wells.&quot;Number&quot; AS &quot;Number&quot;,
        ///    &quot;Lease&quot;.&quot;Name&quot; AS &quot;Lease&quot;,
        ///    &quot;Field&quot;.&quot;Name&quot; AS &quot;Field&quot;,
        ///    &quot;Company&quot;.&quot;Name&quot; AS &quot;Company&quot;,
        ///    ReservoirDatas.&quot;ReservoirName&quot; AS &quot;ReservoirName&quot;,
        ///    ReservoirDatas.&quot;ReservoirDepth&quot; AS &quot;ReservoirDepth&quot;,
        ///    GasPropertiess.&quot;SpecificGravity&quot; AS &quot;GasSpecificGravity&quot;,
        ///    OilPropertiess.&quot;Density&quot; AS &quot;OilApiGravity&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceLatitude83&quot; AS &quot;SurfaceLatitude&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceL [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string WellsData {
            get {
                return ResourceManager.GetString("WellsData", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT min(&quot;SurfaceLatitude83&quot;) AS &quot;MinLatitude&quot;,
        ///       max(&quot;SurfaceLatitude83&quot;) AS &quot;MaxLatitude&quot;,
        ///       min(&quot;SurfaceLongitude83&quot;) AS &quot;MinLongitude&quot;,
        ///       max(&quot;SurfaceLongitude83&quot;) AS &quot;MaxLongitude&quot;
        ///FROM &quot;ShapeFileLocation&quot;;
        ///.
        /// </summary>
        internal static string WellsExtents {
            get {
                return ResourceManager.GetString("WellsExtents", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    Wells.&quot;Api&quot; AS &quot;Api&quot;,    
        ///    ReservoirDatas.&quot;ReservoirName&quot; AS &quot;ReservoirName&quot;,
        ///    ReservoirDatas.&quot;ReservoirDepth&quot; AS &quot;ReservoirDepth&quot;,
        ///    GasPropertiess.&quot;SpecificGravity&quot; AS &quot;GasSpecificGravity&quot;,
        ///    OilPropertiess.&quot;Density&quot; AS &quot;OilApiGravity&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot; AS &quot;SurfaceEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceNorthing83&quot; AS &quot;SurfaceNorthing&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomEasting83&quot; AS &quot;BottomEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomNorthing83&quot; AS &quot;BottomNorthin [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string WellsKarnesData {
            get {
                return ResourceManager.GetString("WellsKarnesData", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    min(&quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot;) AS &quot;MinEasting&quot;,
        ///    max(&quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot;) AS &quot;MaxEasting&quot;,
        ///    min(&quot;ShapeFileLocation&quot;.&quot;SurfaceNorthing83&quot;) AS &quot;MinNorthing&quot;,
        ///    max(&quot;ShapeFileLocation&quot;.&quot;SurfaceNorthing83&quot;) AS &quot;MaxNorthing&quot;
        ///FROM (
        ///    SELECT &quot;Id&quot;, &quot;Api&quot;
        ///    FROM &quot;Well&quot;
        ///    WHERE &quot;Well&quot;.&quot;Api&quot; LIKE &apos;%-255-%&apos;
        ///) Wells
        ///LEFT JOIN &quot;ShapeFileLocation&quot;
        ///ON Wells.&quot;Api&quot;=&quot;ShapeFileLocation&quot;.&quot;Api&quot;
        ///WHERE Wells.&quot;Api&quot; IS NOT NULL AND &quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot; IS NOT [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string WellsKarnesExtents {
            get {
                return ResourceManager.GetString("WellsKarnesExtents", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    Wells.&quot;Api&quot; AS &quot;Api&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot; AS &quot;SurfaceEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceNorthing83&quot; AS &quot;SurfaceNorthing&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomEasting83&quot; AS &quot;BottomEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomNorthing83&quot; AS &quot;BottomNorthing&quot;
        ///FROM (
        ///    SELECT &quot;Id&quot;, &quot;Api&quot;
        ///    FROM &quot;Well&quot;
        ///    WHERE &quot;Well&quot;.&quot;Api&quot; LIKE &apos;%-255-%&apos;
        ///) Wells
        ///LEFT JOIN &quot;ShapeFileLocation&quot;
        ///ON Wells.&quot;Api&quot;=&quot;ShapeFileLocation&quot;.&quot;Api&quot;
        ///WHERE Wells.&quot;Api&quot; IS NOT NULL AND &quot;ShapeFileLocation&quot;.&quot;Surfac [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string WellsKarnesLocations {
            get {
                return ResourceManager.GetString("WellsKarnesLocations", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    Wells.&quot;Api&quot; AS &quot;Api&quot;,
        ///    MonthlyProductions.&quot;Date&quot; AS &quot;Date&quot;,
        ///    MonthlyProductions.&quot;GasVolume&quot; AS &quot;GasVolume&quot;,
        ///    MonthlyProductions.&quot;OilVolume&quot; AS &quot;OilVolume&quot;,
        ///    MonthlyProductions.&quot;CondensateVolume&quot; AS &quot;CondensateVolume&quot;,
        ///    MonthlyProductions.&quot;WaterVolume&quot; AS &quot;WaterVolume&quot;
        ///FROM (
        ///    SELECT &quot;Id&quot;, &quot;Api&quot;
        ///    FROM &quot;Well&quot;
        ///    WHERE &quot;Well&quot;.&quot;Api&quot; LIKE &apos;%-255-%&apos;
        ///) Wells
        ///LEFT JOIN (
        ///    SELECT &quot;Id&quot;, &quot;Date&quot;, &quot;GasVolume&quot;, &quot;OilVolume&quot;, &quot;CondensateVolume&quot;, &quot;WaterVolume&quot;, &quot;WellId&quot;
        ///    FROM &quot;MonthlyP [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string WellsKarnesMonthlyProduction {
            get {
                return ResourceManager.GetString("WellsKarnesMonthlyProduction", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to SELECT
        ///    Wells.&quot;Api&quot; AS &quot;Api&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot; AS &quot;SurfaceEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;SurfaceNorthing83&quot; AS &quot;SurfaceNorthing&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomEasting83&quot; AS &quot;BottomEasting&quot;,
        ///    &quot;ShapeFileLocation&quot;.&quot;BottomNorthing83&quot; AS &quot;BottomNorthing&quot;
        ///FROM (
        ///    SELECT &quot;Id&quot;, &quot;Api&quot;
        ///    FROM &quot;Well&quot;
        ///) Wells
        ///LEFT JOIN &quot;ShapeFileLocation&quot;
        ///ON Wells.&quot;Api&quot;=&quot;ShapeFileLocation&quot;.&quot;Api&quot;
        ///WHERE Wells.&quot;Api&quot; IS NOT NULL AND &quot;ShapeFileLocation&quot;.&quot;SurfaceEasting83&quot; IS NOT NULL AND &quot;ShapeFile [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string WellsLocations {
            get {
                return ResourceManager.GetString("WellsLocations", resourceCulture);
            }
        }
    }
}
