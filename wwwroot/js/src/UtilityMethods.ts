import * as Math from "math-lib";

import mapboxgl from "mapbox-gl";

import StyleFunction = mapboxgl.StyleFunction;
import Expression = mapboxgl.Expression;


export const As = <T>(value: any): T => value as T;


export const NotNull = <T, R extends NonNullable<T>>(val?: T): R => {
    if (typeof val === typeof undefined || val === undefined || val === null) {
        throw `${val} is null`;
    }
    return val as R;
};

export const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];


export const NullishCoalescing = <T>(val: T, otherVal: T): T => {
    if (typeof val === typeof undefined && typeof otherVal !== typeof undefined) {
        return otherVal;
    }

    if (val !== undefined && val !== null) {
        return val;
    }

    return otherVal;
};

export const IsNullish = <T>(val: T): boolean => {
    if (typeof val === typeof undefined || val === undefined || val === null) {
        return true;
    }
    return false;
};

export const sls = (strings: string, ...values: string[]): string => {
    let output = "";
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];

    let lines = output.split(/(?:\r\n|\n|\r)/);

    return lines
        .map((line) => {
            return line.replace(/^\s+/gm, "");
        })
        .join(" ")
        .trim();
};

export const linspace = (a: number, b: number, n: number): number[] => {
    if (typeof n === "undefined") {
        n = Math.max(Math.round(b - a) + 1, 1);
    }

    if (n < 2) {
        return n === 1 ? [a] : [];
    }

    var i;

    let ret: number[] = new Array<number>(n);

    n--;
    for (i = n; i >= 0; i--) {
        ret[i] = (i * b + (n - i) * a) / n;
    }

    return ret;
};

const enum MediaTypes {
    ArrayBuffer = "arraybuffer",
    Blob = "blob",
    FormData = "multipart/form-data",
    Json = "application/json",
    Text = "text/plain"
}

export interface ColorGradientResult<T, V> {
    value: T;
    color: V;
}

export interface rgba {
    a: number;
    r: number;
    g: number;
    b: number;
}

export interface rgb {
    r: number;
    g: number;
    b: number;
}


type GradientRgbResultType = string | StyleFunction | Expression;

export class ColorMethods {
    static colorComponentToHex(colorComponent: number): string {
        const hex = colorComponent.toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    }

    static rgbToHexJson(rgb: any): string {
        return ColorMethods.rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    static rgbToHex(r: number, g: number, b: number): string {
        return "#" + ColorMethods.colorComponentToHex(r) + ColorMethods.colorComponentToHex(g) + ColorMethods.colorComponentToHex(b);
    }

    static hexToRgb(hex: string): rgb | null {
        const matchArray = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

        return matchArray
            ? {
                  r: parseInt(matchArray[1], 16),
                  g: parseInt(matchArray[2], 16),
                  b: parseInt(matchArray[3], 16)
              }
            : null;
    }

    // Generates an array of color values in sequence from 'colorA' to 'colorB'
    // using the specified number of steps
    static Gradient(inputColorA: string, inputColorB: string, steps: number, valueA: number, valueB: number): ColorGradientResult<number, string>[] {
        var result = new Array<ColorGradientResult<number, string>>(steps);
        // var rInterval;
        // var gInterval;
        // var bInterval;

        var colorA = ColorMethods.hexToRgb(inputColorA); // [r,g,b]
        var colorB = ColorMethods.hexToRgb(inputColorB); // [r,g,b]
        steps -= 1; // Reduce the steps by one because we're including the first item manually

        if (colorA === null || colorB === null) {
            return result;
        }

        // Calculate the intervals for each color
        var rStep = (Math.max(colorA.r, colorB.r) - Math.min(colorA.r, colorB.r)) / steps;
        var gStep = (Math.max(colorA.g, colorB.g) - Math.min(colorA.g, colorB.g)) / steps;
        var bStep = (Math.max(colorA.b, colorB.b) - Math.min(colorA.b, colorB.b)) / steps;
        var vSteps = (Math.max(valueA, valueB) - Math.min(valueA, valueB)) / steps;

        result.push({value: valueA, color: ColorMethods.rgbToHexJson(colorA)} as ColorGradientResult<number, string>);

        // Set the starting value as the first color value
        var rVal = colorA.r;
        var gVal = colorA.g;
        var bVal = colorA.b;
        var vVal = valueA;

        // Loop over the steps-1 because we're includeing the last value manually to
        // ensure it's accurate
        for (var i = 0; i < steps - 1; i++) {
            // If the first value is lower than the last - increment up otherwise
            // increment down
            rVal = colorA.r < colorB.r ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
            gVal = colorA.g < colorB.g ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
            bVal = colorA.b < colorB.b ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
            vVal += vSteps;
            result.push({
                value: vVal,
                color: "#" + ColorMethods.rgbToHexJson({r: rVal, g: gVal, b: bVal})
            });
        }

        result.push({value: valueB, color: "#" + ColorMethods.rgbToHexJson(colorB)});

        return result;
    }





    static GradientRgb(variable: string, colorA: any, colorB: any, steps: number, valueA: number, valueB: number): GradientRgbResultType[] {

        var result = new Array<GradientRgbResultType>(steps);
        // var rInterval;
        // var gInterval;
        // var bInterval;

        result.push("interpolate");
        result.push(["linear"] as any);
        result.push(["get", variable]);

        colorA = ColorMethods.hexToRgb(colorA); // [r,g,b]
        colorB = ColorMethods.hexToRgb(colorB); // [r,g,b]
        steps -= 1; // Reduce the steps by one because we're including the first
        // item manually

        // Calculate the intervals for each color
        var rStep = (Math.max(colorA.r, colorB.r) - Math.min(colorA.r, colorB.r)) / steps;
        var gStep = (Math.max(colorA.g, colorB.g) - Math.min(colorA.g, colorB.g)) / steps;
        var bStep = (Math.max(colorA.b, colorB.b) - Math.min(colorA.b, colorB.b)) / steps;
        var vSteps = (Math.max(valueA, valueB) - Math.min(valueA, valueB)) / steps;

        result.push(valueA as any);
        result.push(`rgb(${colorA.r},${colorA.g},${colorA.b})`);

        // Set the starting value as the first color value
        var rVal = colorA.r;
        var gVal = colorA.g;
        var bVal = colorA.b;
        var vVal = valueA;

        // Loop over the steps-1 because we're includeing the last value manually to
        // ensure it's accurate
        for (var i = 0; i < steps - 1; i++) {
            // If the first value is lower than the last - increment up otherwise
            // increment down
            rVal = colorA.r < colorB.r ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
            gVal = colorA.g < colorB.g ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
            bVal = colorA.b < colorB.b ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
            vVal += vSteps;
            result.push(vVal as any);
            result.push(`rgb(${rVal},${gVal},${bVal})`);
        }

        result.push(valueB as any);
        result.push(`rgb(${colorB.r},${colorB.g},${colorB.b})`);

        return result;
    }
}
