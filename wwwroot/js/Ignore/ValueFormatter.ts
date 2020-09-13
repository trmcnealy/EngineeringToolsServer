/// <reference path="../DataTypes/Double.ts"/>

import { ValueType } from "DataTypes/DataColumnTypes"
import StringExtensions from "Extensions/StringExtensions"

export default class DisplayUnit {
    // Fields
    value: number;
    title: string;
    labelFormat: string;
    applicableRangeMin: number;
    applicableRangeMax: number;

    // Methods
    project(value: number): number {
        if (this.value) {
            return value / this.value;
        } else {
            return value;
        }
    }

    reverseProject(value: number): number {
        if (this.value) {
            return value * this.value;
        } else {
            return value;
        }
    }

    isApplicableTo(value: number): boolean {
        value = Math.abs(value);
        var precision = Double.getPrecision(value, 3);
        return Double.greaterOrEqualWithPrecision(value, this.applicableRangeMin, precision) && Double.lessWithPrecision(value, this.applicableRangeMax, precision);
    }

    isScaling(): boolean {
        return this.value > 1;
    }
}

export default class DisplayUnitSystem {
    // Constants
    static UNSUPPORTED_FORMATS = /^(p\d*)|(.*\%)|(e\d*)$/i;
    static NUMBER_FORMAT = /#|0/;

    // Fields
    units: DisplayUnit[];
    displayUnit: DisplayUnit;
    private _unitBaseValue: number;

    // Constructor
    constructor(units?: DisplayUnit[]) {
        this.units = units ? units : [];
    }

    // Properties
    get title(): string {
        return this.displayUnit ? this.displayUnit.title : undefined;
    }

    // Methods
    update(value: number): void {
        if (value === undefined) return;

        this._unitBaseValue = value;
        this.displayUnit = this.findApplicableDisplayUnit(value);
    }

    private findApplicableDisplayUnit(value: number): DisplayUnit {
        var count = this.units.length;
        for (var i = 0; i < count; i++) {
            var unit = this.units[i];
            if (unit.isApplicableTo(value)) {
                return unit;
            }
        }
        return undefined;
    }

    format(value: number, format: string, decimals?: number, trailingZeros?: boolean): string {
        if (!DisplayUnitSystem.UNSUPPORTED_FORMATS.test(format)) {
            if (this.isScalingUnit()) {
                var projectedValue = this.displayUnit.project(value);
                var nonScientificFormat = trailingZeros
                    ? DisplayUnitSystem.getNonScientificFormatWithPrecision(this.displayUnit.labelFormat, decimals)
                    : this.displayUnit.labelFormat;
                return this.formatHelper(value, projectedValue, nonScientificFormat, format, decimals, trailingZeros);
            }
            if (decimals != null) {
                if (trailingZeros && format && DisplayUnitSystem.NUMBER_FORMAT.test(format)) {
                    var formatWithPrecision = DisplayUnitSystem.getFormatWithPrecision(decimals);
                    format = format.replace(/0\.0*/g, formatWithPrecision);
                    return this.formatHelper(value, value, "", format, decimals, trailingZeros);
                }
                if (trailingZeros) {
                    var nonScientificFormat = DisplayUnitSystem.getNonScientificFormatWithPrecision("{0}", decimals);
                    return this.formatHelper(value, value, nonScientificFormat, format, decimals, trailingZeros);
                }
                return this.formatHelper(value, value, "", format, decimals, trailingZeros);
            }
        }

        format = this.removeFractionIfNecessary(format);
        return formattingService.formatValue(value, format);
    }

    isScalingUnit(): boolean {
        return this.displayUnit && this.displayUnit.isScaling();
    }

    private formatHelper(value: number, projectedValue: number, nonScientificFormat: string, format: string, decimals?: number, trailingZeros?: boolean) {
        var precision = decimals != null ? Double.pow10(decimals) : Double.getPrecision(value);

        var x = Double.roundToPrecision(projectedValue, precision);

        if (format && !formattingService.isStandardNumberFormat(format)) return formattingService.formatNumberWithCustomOverride(x, format, nonScientificFormat);

        var textFormat = trailingZeros ? DisplayUnitSystem.getFormatWithPrecision(decimals) : "G";
        var text = formattingService.formatValue(x, textFormat);
        return formattingService.format(nonScientificFormat, [text]);
    }

    private static getNonScientificFormatWithPrecision(baseFormat?: string, decimals?: number): string {
        if (!decimals || baseFormat === undefined) return baseFormat;

        var newFormat = "{0:" + DisplayUnitSystem.getFormatWithPrecision(decimals) + "}";

        return baseFormat.replace("{0}", newFormat);
    }

    private static getFormatWithPrecision(decimals?: number): string {
        if (decimals == null) return "G";
        return ",0." + StringExtensions.repeat("0", Math.abs(decimals));
    }

    /** Formats a single value by choosing an appropriate base for the DisplayUnitSystem before formatting. */
    formatSingleValue(value: number, format: string, decimals?: number): string {
        // Change unit base to a value appropriate for this value
        this.update(this.shouldUseValuePrecision(value) ? Double.getPrecision(value, 8) : value);

        return this.format(value, format, decimals);
    }

    private shouldUseValuePrecision(value: number): boolean {
        if (this.units.length === 0) return true;

        // Check if the value is big enough to have a valid unit by checking against the smallest unit (that it's value bigger than 1).
        var applicableRangeMin: number = 0;
        for (var i = 0; i < this.units.length; i++) {
            if (this.units[i].isScaling()) {
                applicableRangeMin = this.units[i].applicableRangeMin;
                break;
            }
        }

        return Math.abs(value) < applicableRangeMin;
    }

    private removeFractionIfNecessary(formatString: string): string {
        if (formatString) {
            if (Math.abs(this._unitBaseValue) >= 0.01) {
                formatString = formatString.replace(/^(p\d*)$/i, "p0");
            }
            if (Math.abs(this._unitBaseValue) >= 1.0) {
                formatString = formatString.replace(/[#0]\.[#0]+$/, "0"); // Custom number format with hash/zero fraction
                formatString = formatString.replace(/^(n\d*)$/i, "n0");
                formatString = formatString.replace(/^(f\d*)$/i, "f0");
                formatString = formatString.replace(/^(c\d*)$/i, "c0");
            }
        }
        return formatString;
    }
}

export interface DisplayUnitSystemNames {
    title: string;
    format: string;
}

export interface ICustomValueFormatter {
    (value: any, format?: string): string;
}

export interface ValueFormatterOptions {
    /** The format string to use. */
    format?: string;

    /** The data value. */
    value?: any;

    /** The data value. */
    value2?: any;

    /** The number of ticks. */
    tickCount?: any;

    /** The display unit system to use */
    displayUnitSystemType?: DisplayUnitSystemType;

    /** True if we are formatting single values in isolation (e.g. card), as opposed to multiple values with a common base (e.g. chart axes) */
    formatSingleValues?: boolean;

    /** True if we want to trim off unnecessary zeroes after the decimal and remove a space before the % symbol */
    allowFormatBeautification?: boolean;

    /** Specifies the maximum number of decimal places to show*/
    precision?: number;

    /** Specifies the column type of the data value */
    columnType?: ValueType;
}

export interface IValueFormatter {
    format(value: any): string;
    displayUnit?: DisplayUnit;
}

/** Captures all locale-specific options used by the valueFormatter. */
export interface ValueFormatterLocalizationOptions {
    null: string;
    true: string;
    false: string;
    NaN: string;
    infinity: string;
    negativeInfinity: string;

    /** Returns a beautified form the given format string. */
    beautify(format: string): string;

    /** Returns an object describing the given exponent in the current language. */
    describe(exponent: number): DisplayUnitSystemNames;
    restatementComma: string;
    restatementCompoundAnd: string;
    restatementCompoundOr: string;
}

export enum DisplayUnitSystemType {
    /** Default display unit system, which saves space by using units such as K, M, bn with PowerView rules for when to pick a unit. Suitable for chart axes. */
    Default,

    /** A verbose display unit system that will only respect the formatting defined in the model. Suitable for explore mode single-value cards. */
    Verbose,

    /**
     * A display unit system that uses units such as K, M, bn if we have at least one of those units (e.g. 0.9M is not valid as it's less than 1 million).
     * Suitable for dashboard tile cards
     */
    WholeUnits,

    /**A display unit system that also contains Auto and None units for data labels*/
    DataLabels
}

export default class ValueFormatter {
    static BeautifiedFormat: {[x: string]: string} = {
        "0.00 %;-0.00 %;0.00 %": "Percentage",
        "0.0 %;-0.0 %;0.0 %": "Percentage1"
    };

    static defaultLocalizedStrings = {
        NullValue: "(Blank)",
        BooleanTrue: "True",
        BooleanFalse: "False",
        NaNValue: "NaN",
        InfinityValue: "+Infinity",
        NegativeInfinityValue: "-Infinity",
        RestatementComma: "{0}, {1}",
        RestatementCompoundAnd: "{0} and {1}",
        RestatementCompoundOr: "{0} or {1}",
        DisplayUnitSystem_EAuto_Title: "Auto",
        DisplayUnitSystem_E0_Title: "None",
        DisplayUnitSystem_E3_LabelFormat: "{0}K",
        DisplayUnitSystem_E3_Title: "Thousands",
        DisplayUnitSystem_E6_LabelFormat: "{0}M",
        DisplayUnitSystem_E6_Title: "Millions",
        DisplayUnitSystem_E9_LabelFormat: "{0}bn",
        DisplayUnitSystem_E9_Title: "Billions",
        DisplayUnitSystem_E12_LabelFormat: "{0}T",
        DisplayUnitSystem_E12_Title: "Trillions",
        Percentage: "#,0.##%",
        Percentage1: "#,0.#%",
        TableTotalLabel: "Total",
        Tooltip_HighlightedValueDisplayName: "Highlighted",
        // Geotagging strings
        GeotaggingString_Continent: "continent",
        GeotaggingString_Continents: "continents",
        GeotaggingString_Country: "country",
        GeotaggingString_Countries: "countries",
        GeotaggingString_State: "state",
        GeotaggingString_States: "states",
        GeotaggingString_City: "city",
        GeotaggingString_Cities: "cities",
        GeotaggingString_Town: "town",
        GeotaggingString_Towns: "towns",
        GeotaggingString_Province: "province",
        GeotaggingString_Provinces: "provinces",
        GeotaggingString_County: "county",
        GeotaggingString_Counties: "counties",
        GeotaggingString_Village: "village",
        GeotaggingString_Villages: "villages",
        GeotaggingString_Post: "post",
        GeotaggingString_Zip: "zip",
        GeotaggingString_Code: "code",
        GeotaggingString_Place: "place",
        GeotaggingString_Places: "places",
        GeotaggingString_Address: "address",
        GeotaggingString_Addresses: "addresses",
        GeotaggingString_Street: "street",
        GeotaggingString_Streets: "streets",
        GeotaggingString_Longitude: "longitude",
        GeotaggingString_Longitude_Short: "lon",
        GeotaggingString_Latitude: "latitude",
        GeotaggingString_Latitude_Short: "lat",
        GeotaggingString_PostalCode: "postal code",
        GeotaggingString_PostalCodes: "postal codes",
        GeotaggingString_ZipCode: "zip code",
        GeotaggingString_ZipCodes: "zip codes",
        GeotaggingString_Territory: "territory",
        GeotaggingString_Territories: "territories"
    };

    static beautify(format: string): string {
        var key = ValueFormatter.BeautifiedFormat[format];
        if (key) return ValueFormatter.defaultLocalizedStrings[key] || format;
        return format;
    }

    static describeUnit(exponent: number): DisplayUnitSystemNames {
        var exponentLookup = exponent === -1 ? "Auto" : exponent.toString();

        var title: string = ValueFormatter.defaultLocalizedStrings["DisplayUnitSystem_E" + exponentLookup + "_Title"];
        var format: string = exponent <= 0 ? "{0}" : ValueFormatter.defaultLocalizedStrings["DisplayUnitSystem_E" + exponentLookup + "_LabelFormat"];

        if (title || format) return {title: title, format: format};
    }

    static getLocalizedString(stringId: string): string {
        return ValueFormatter.defaultLocalizedStrings[stringId];
    }

    // NOTE: Define default locale options, but these can be overriden by setLocaleOptions.
    static locale: ValueFormatterLocalizationOptions = {
        null: ValueFormatter.defaultLocalizedStrings["NullValue"],
        true: ValueFormatter.defaultLocalizedStrings["BooleanTrue"],
        false: ValueFormatter.defaultLocalizedStrings["BooleanFalse"],
        NaN: ValueFormatter.defaultLocalizedStrings["NaNValue"],
        infinity: ValueFormatter.defaultLocalizedStrings["InfinityValue"],
        negativeInfinity: ValueFormatter.defaultLocalizedStrings["NegativeInfinityValue"],
        beautify: (format) => ValueFormatter.beautify(format),
        describe: (exponent) => ValueFormatter.describeUnit(exponent),
        restatementComma: ValueFormatter.defaultLocalizedStrings["RestatementComma"],
        restatementCompoundAnd: ValueFormatter.defaultLocalizedStrings["RestatementCompoundAnd"],
        restatementCompoundOr: ValueFormatter.defaultLocalizedStrings["RestatementCompoundOr"]
    };

    static MaxScaledDecimalPlaces = 2;
    static MaxValueForDisplayUnitRounding = 1000;
    static MinIntegerValueForDisplayUnits = 10000;
    static MinPrecisionForDisplayUnits = 2;

    static getFormatMetadata(format: string): NumericFormatMetadata {
        return getCustomFormatMetadata(format);
    }

    static setLocaleOptions(options: ValueFormatterLocalizationOptions): void {

        ValueFormatter.locale = options;

        DefaultDisplayUnitSystem.reset();
        WholeUnitsDisplayUnitSystem.reset();
    }

    static createDefaultFormatter(formatString: string, allowFormatBeautification: boolean = false): IValueFormatter {
        var formatBeaut: string = allowFormatBeautification ? ValueFormatter.locale.beautify(formatString) : formatString;
        return {
            format: function(value: any): string {
                if (value == null) return ValueFormatter.locale.null;

                return ValueFormatter.formatCore(value, formatBeaut);
            }
        };
    }

    static create(options: ValueFormatterOptions): IValueFormatter {
        var format = !!options.allowFormatBeautification ? ValueFormatter.locale.beautify(options.format) : options.format;

        if (ValueFormatter.shouldUseNumericDisplayUnits(options)) {
            var displayUnitSystem = ValueFormatter.createDisplayUnitSystem(options.displayUnitSystemType);

            var singleValueFormattingMode = !!options.formatSingleValues;

            displayUnitSystem.update(Math.max(Math.abs(options.value || 0), Math.abs(options.value2 || 0)));

            var forcePrecision = options.precision != null;

            var decimals: number;

            if (forcePrecision) {
                decimals = -options.precision;
            } else if (displayUnitSystem.displayUnit && displayUnitSystem.displayUnit.value > 1) decimals = -ValueFormatter.MaxScaledDecimalPlaces;

            return {
                format: function(value: any): string {
                    var formattedValue: string = ValueFormatter.getStringFormat(value, true /*nullsAreBlank*/);

                    if (!StringExtensions.isNullOrUndefinedOrWhiteSpaceString(formattedValue)) return formattedValue;

                    if (value && !displayUnitSystem.isScalingUnit() && Math.abs(value) < ValueFormatter.MaxValueForDisplayUnitRounding && !forcePrecision)
                        value = Double.roundToPrecision(value, Double.pow10(Double.getPrecision(value)));

                    return singleValueFormattingMode
                        ? displayUnitSystem.formatSingleValue(value, format, decimals)
                        : displayUnitSystem.format(value, format, decimals, forcePrecision);
                },
                displayUnit: displayUnitSystem.displayUnit
            };
        }

        if (ValueFormatter.shouldUseDateUnits(options.value, options.value2, options.tickCount)) {
            var unit = ValueFormatter.DateTimeSequence.getIntervalUnit(options.value /* minDate */, options.value2 /* maxDate */, options.tickCount);

            return {
                format: function(value: any): string {
                    if (value == null) return ValueFormatter.locale.null;

                    var formatString = ValueFormatter.formattingService.dateFormatString(unit);
                    return ValueFormatter.formatCore(value, formatString);
                }
            };
        }

        return createDefaultFormatter(format);
    }

    static format(value: any, format?: string, allowFormatBeautification?: boolean): string {
        if (value == null) return locale.null;

        return formatCore(value, !!allowFormatBeautification ? locale.beautify(format) : format);
    }

    static formatRaw(value: any, format?: string): string {
        return formatCore(value, format);
    }

    static createDisplayUnitSystem(displayUnitSystemType?: DisplayUnitSystemType): DisplayUnitSystem {
        if (displayUnitSystemType == null) return new DefaultDisplayUnitSystem(locale.describe);

        switch (displayUnitSystemType) {
            case DisplayUnitSystemType.Default:
                return new DefaultDisplayUnitSystem(ValueFormatter.locale.describe);
            case DisplayUnitSystemType.WholeUnits:
                return new WholeUnitsDisplayUnitSystem(ValueFormatter.locale.describe);
            case DisplayUnitSystemType.Verbose:
                return new NoDisplayUnitSystem();
            case DisplayUnitSystemType.DataLabels:
                return new DataLabelsDisplayUnitSystem(ValueFormatter.locale.describe);
            default:
                return new DefaultDisplayUnitSystem(ValueFormatter.locale.describe);
        }
    }

    static shouldUseNumericDisplayUnits(options: ValueFormatterOptions): boolean {
        var value = options.value;
        var value2 = options.value2;
        var format = options.format;
        // For singleValue visuals like card, gauge we don't want to roundoff data to the nearest thousands so format the whole number / integers below 10K to not use display units
        if (options.formatSingleValues && format) {
            if (Math.abs(value) < ValueFormatter.MinIntegerValueForDisplayUnits) {
                var isCustomFormat = !powerbi.NumberFormat.isStandardFormat(format);

                if (isCustomFormat) {
                    var precision = powerbi.NumberFormat.getCustomFormatMetadata(format, isCustomFormat).precision;

                    if (precision < ValueFormatter.MinPrecisionForDisplayUnits) return false;
                } else if (Double.isInteger(value)) return false;
            }
        }

        if (typeof value === "number" || typeof value2 === "number") {
            return true;
        }
    }

    static shouldUseDateUnits(value: any, value2?: any, tickCount?: number): boolean {
        // must check both value and value2 because we'll need to get an interval for date units
        return value instanceof Date && value2 instanceof Date && (tickCount !== undefined && tickCount !== null);
    }

    static getFormatString(column: DataMetadataColumn, formatStringProperty: DataViewObjectPropertyIdentifier, suppressTypeFallback?: boolean): string {
        if (column) {
            if (formatStringProperty) {
                var propertyValue = DataObjects.getValue<string>(column.objects, formatStringProperty);
                if (propertyValue) return propertyValue;
            }

            if (!suppressTypeFallback) {
                var columnType = column.type;
                if (columnType) {
                    if (columnType.dateTime) return "d";
                    if (columnType.integer) return "g";
                    if (columnType.numeric) return "#,0.00";
                }
            }
        }
    }

    static formatListCompound(strings: string[], conjunction: string): string {
        var result: string;

        if (!strings) {
            return null;
        }

        var length = strings.length;
        if (length > 0) {
            result = strings[0];
            var lastIndex = length - 1;
            for (var i = 1, len = lastIndex; i < len; i++) {
                var value = strings[i];
                result = StringExtensions.format(locale.restatementComma, result, value);
            }

            if (length > 1) {
                var value = strings[lastIndex];
                result = StringExtensions.format(conjunction, result, value);
            }
        } else {
            result = null;
        }

        return result;
    }

    /** The returned string will look like 'A, B, ..., and C'  */
    static formatListAnd(strings: string[]): string {
        return formatListCompound(strings, locale.restatementCompoundAnd);
    }

    /** The returned string will look like 'A, B, ..., or C' */
    static formatListOr(strings: string[]): string {
        return formatListCompound(strings, locale.restatementCompoundOr);
    }

    static formatCore(value: any, format: string): string {
        var formattedValue = getStringFormat(value, false /*nullsAreBlank*/);

        if (!StringExtensions.isNullOrUndefinedOrWhiteSpaceString(formattedValue)) return formattedValue;

        return formattingService.formatValue(value, format);
    }

    static getStringFormat(value: any, nullsAreBlank: boolean): string {
        if (value == null && nullsAreBlank) return locale.null;

        if (value === true) return locale.true;

        if (value === false) return locale.false;

        if (typeof value === "number" && isNaN(value)) return locale.NaN;

        if (value === Number.NEGATIVE_INFINITY) return locale.negativeInfinity;

        if (value === Number.POSITIVE_INFINITY) return locale.infinity;

        return "";
    }

    static getDisplayUnits(displayUnitSystemType: DisplayUnitSystemType): DisplayUnit[] {
        var displayUnitSystem = createDisplayUnitSystem(displayUnitSystemType);
        return displayUnitSystem.units;
    }
}
