import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {JSONSchemaType} from "react-hook-form-jsonschema";

import {NullishCoalescing} from "Utilities";
import {Guid} from "DataTypes";

export type LayerType = "fill" | "line" | "symbol" | "circle" | "fill-extrusion" | "raster" | "background" | "heatmap" | "hillshade";

export type ExpressionName =
    // Types
    | "array"
    | "boolean"
    | "collator"
    | "format"
    | "literal"
    | "number"
    | "object"
    | "string"
    | "to-boolean"
    | "to-color"
    | "to-number"
    | "to-string"
    | "typeof"
    // Feature data
    | "feature-state"
    | "geometry-type"
    | "id"
    | "line-progress"
    | "properties"
    // Lookup
    | "at"
    | "get"
    | "has"
    | "length"
    // Decision
    | "!"
    | "!="
    | "<"
    | "<="
    | "=="
    | ">"
    | ">="
    | "all"
    | "any"
    | "case"
    | "match"
    | "coalesce"
    // Ramps, scales, curves
    | "interpolate"
    | "interpolate-hcl"
    | "interpolate-lab"
    | "step"
    // Variable binding
    | "let"
    | "var"
    // String
    | "concat"
    | "downcase"
    | "is-supported-script"
    | "resolved-locale"
    | "upcase"
    // Color
    | "rgb"
    | "rgba"
    // Math
    | "-"
    | "*"
    | "/"
    | "%"
    | "^"
    | "+"
    | "abs"
    | "acos"
    | "asin"
    | "atan"
    | "ceil"
    | "cos"
    | "e"
    | "floor"
    | "ln"
    | "ln2"
    | "log10"
    | "log2"
    | "max"
    | "min"
    | "pi"
    | "round"
    | "sin"
    | "sqrt"
    | "tan"
    // Zoom, Heatmap
    | "zoom"
    | "heatmap-density";

export type Expression = [ExpressionName, ...any[]];

export type Anchor = "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type Transition = mapboxgl.Transition;

export type StyleFunction = mapboxgl.StyleFunction;

export type Visibility = "visible" | "none";

export type Layout = mapboxgl.Layout;

import {all_JSON} from "MapboxSchemas";

export abstract class BaseLayerSettings<TLayout = any, TPaint = any> implements mapboxgl.Layer {
    static Schema: JSONSchemaType = all_JSON;

    readonly type: LayerType;
    readonly id: string;

    metadata?: any;
    ref?: string;

    source?: string | mapboxgl.AnySourceData;

    constructor(type: LayerType, id?: string) {
        this.type = type;
        this.id = NullishCoalescing(id, Guid.newGuid().ToString());
    }

    GetId(): string {
        return this.id;
    }

    GetType(): LayerType {
        return this.type;
    }

    GetSchema(): JSONSchemaType {
        return BaseLayerSettings.Schema;
    }

    abstract GetLayout(): TLayout | undefined;
    abstract SetLayout(layout: TLayout);
    abstract GetPaint(): TPaint | undefined;
    abstract SetPaint(paint: TPaint);
}

//export interface CustomLayerInterface {
//    id: string;
//    type: "custom";
//    renderingMode?: "2d" | "3d";
//}
