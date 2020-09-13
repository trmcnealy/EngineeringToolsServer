import * as d3 from "d3";

//import { Color, RGBColor, HSLColor, LabColor, HCLColor, CubehelixColor, ScaleLinear, ScalePower, ScaleLogarithmic, ScaleSymLog,
//        ScaleIdentity, ScaleTime, ScaleSequential, ScaleDiverging, ScaleQuantize, ScaleQuantile, ScaleThreshold,
//        ScaleOrdinal, ScaleBand, ScalePoint } from "d3";

import {IColorPalette, IColorInfo} from "DataTypes";

export class ColorStop {
    colorStop: number | string;
    color: number | string | any;

    constructor(colorStop: number | string, color: number | string | any) {
        this.colorStop = colorStop;
        this.color = color;
    }
}

export type ColorStops = Array<ColorStop>;

type TOutput = number | string | any;
type TRange = number | string | any;
type TDomain = number | string | Date | any;
type TDomain2 = {toString(): string} | any;

export interface IScaleLinear extends d3.ScaleLinear<TOutput, TOutput> {
    (value: number | {valueOf(): number}): TOutput;
}

export interface IScalePower extends d3.ScalePower<TOutput, TOutput> {
    (value: number | {valueOf(): number}): TOutput;
}

export interface IScaleLogarithmic extends d3.ScaleLogarithmic<TOutput, TOutput> {
    (value: number | {valueOf(): number}): TOutput;
}

export interface IScaleSymLog extends d3.ScaleSymLog<TOutput, TOutput> {
    (value: number | {valueOf(): number}): TOutput;
}

export interface IScaleIdentity extends d3.ScaleIdentity {
    (value: number | {valueOf(): number}): number;
}

export interface IScaleTime extends d3.ScaleTime<TRange, TOutput> {
    (value: Date | number | {valueOf(): number}): TOutput;
}

export interface IScaleSequential extends d3.ScaleSequential<TOutput> {
    (value: number | {valueOf(): number}): TOutput;
}

export interface IScaleDiverging extends d3.ScaleDiverging<TOutput> {
    (value: number | {valueOf(): number}): TOutput;
}

export interface IScaleQuantize extends d3.ScaleQuantize<TRange> {
    (value: number | {valueOf(): number}): TRange;
}

export interface IScaleQuantile extends d3.ScaleQuantile<TRange> {
    (value: number | {valueOf(): number}): TRange;
}

export interface IScaleThreshold extends d3.ScaleThreshold<TDomain, TRange> {
    (value: TDomain): TRange;
}

export interface IScaleOrdinal extends d3.ScaleOrdinal<TDomain2, TRange> {
    (x: TDomain2): TRange;
}

export interface IScaleBand extends d3.ScaleBand<TDomain2> {
    (x: TDomain2): number | undefined;
}

export interface IScalePoint extends d3.ScalePoint<TDomain2> {
    (x: TDomain2): number | undefined;
}

//export class ScaleConstant<TColor extends Color| RGBColor| HSLColor| LabColor| HCLColor| CubehelixColor> {
//    color: TColor;

//    constructor() {
//    }

//    (val?:any): string {
//        return color.toString();
//    }
//}

//export interface IScaleConstant<TColor extends Color| RGBColor| HSLColor| LabColor| HCLColor| CubehelixColor> extends ScaleConstant<TColor> {
//    (): string;
//}

export type PaletteTypes =
    | d3.Color
    | d3.RGBColor
    | d3.HSLColor
    | d3.LabColor
    | d3.HCLColor
    | d3.CubehelixColor
    | IScaleLinear
    | IScalePower
    | IScaleLogarithmic
    | IScaleSymLog
    | IScaleIdentity
    | IScaleTime
    | IScaleSequential
    | IScaleDiverging
    | IScaleQuantize
    | IScaleQuantile
    | IScaleThreshold
    | IScaleOrdinal
    | IScaleBand
    | IScalePoint;

export type PaletteCallable =
    | d3.Color
    | d3.RGBColor
    | d3.HSLColor
    | d3.LabColor
    | d3.HCLColor
    | d3.CubehelixColor
    | ReturnType<IScaleLinear>
    | ReturnType<IScalePower>
    | ReturnType<IScaleLogarithmic>
    | ReturnType<IScaleSymLog>
    | ReturnType<IScaleIdentity>
    | ReturnType<IScaleTime>
    | ReturnType<IScaleSequential>
    | ReturnType<IScaleDiverging>
    | ReturnType<IScaleQuantize>
    | ReturnType<IScaleQuantile>
    | ReturnType<IScaleThreshold>
    | ReturnType<IScaleOrdinal>
    | ReturnType<IScaleBand>
    | ReturnType<IScalePoint>;

//export type PaletteTypes = ScaleLinear<number, number | string>
//                          | ScalePower<number, number | string | any>
//                          | ScaleLogarithmic<number, number | string | any>
//                          | ScaleSymLog<number, number | string | any>
//                          | ScaleIdentity
//                          | ScaleTime<number, number | string | any>
//                          | ScaleSequential<number | string>
//                          | ScaleDiverging<number | string>
//                          | ScaleQuantize<number | string | any>
//                          | ScaleQuantile<number | string | any>
//                          | ScaleThreshold<number, number | string | any>
//                          | ScaleOrdinal<string, number | string>
//                          | ScaleBand<number | string | any>
//                          | ScalePoint<number | string | any>;

//export type PaletteCallable = ScaleContinuousNumericCallable | ScaleIdentityCallable | ScaleTimeCallable | ScaleSequentialCallable | ScaleThresholdCallable;

export type IPalette = PaletteCallable;

//export interface IPalette extends PaletteTypes{
//    (value: number | {valueOf(): number}) : string;
//    (value: number | {valueOf(): number}) : number;
//    (value: Date | number | {valueOf(): number}) : any;
//    (value: number | {valueOf(): number}) : any;
//    (value: any) : any;
//}

export interface IColorMap {
    readonly [group: string]: string;
}

export interface ColorPaletteProperties {
    ColorMap?: IColorMap;
    Palette?: IPalette;
}

export class ColorPalette implements IColorPalette {
    ColorMap?: IColorMap;
    Palette?: IPalette;

    //private _scale: number;

    constructor(properties: ColorPaletteProperties) {

        this.ColorMap = properties.ColorMap;
        this.Palette = properties.Palette;


        //if (properties.ColorPalette.Range) {
        //    this._scale = this.ColorPalette.Range.Upper - this.ColorPalette.Range.Lower;
        //} else {
        //    this.ColorPalette.Range = {Lower: 0.0, Upper: 1.0};
        //    this._scale = this.ColorPalette.Range.Upper - this.ColorPalette.Range.Lower;
        //}
    }

    //ScaleToLimits(value: number) {
    //    return this.ColorPalette.Range.Lower + this._scale * value;
    //}

    GetColor(value?: Date | number | {valueOf(): number}): TOutput | IColorInfo;
    GetColor(value?: number | {valueOf(): number}): TOutput | IColorInfo;
    GetColor(value?: TDomain2): number | IColorInfo | undefined;
    GetColor(value?: TDomain): TRange | IColorInfo {
        if (value) {
            return this.Palette(value);
        }

        return this.Palette;
    }

    Reset(): IColorPalette {
        return this;
    }

    Update(properties: ColorPaletteProperties) {
        try {
            this.UpdateColorMap(properties.Palette);
        } catch (err) {
            console.log("Exception occured during group color creation: ", err);
        }
    }

    UpdateColorMap(palette: IPalette) {
        this.Palette = palette;
    }
}
