import * as mapboxgl from "mapbox-gl";

import {JSONSchemaType} from "react-hook-form-jsonschema";

import {BaseLayerSettings} from "./BaseLayerSettings";

import {line_JSON} from "MapboxSchemas";

export class LineLayerSettings extends BaseLayerSettings<mapboxgl.LineLayout, mapboxgl.LinePaint> {
    static Schema: JSONSchemaType = line_JSON;

    minzoom?: number;
    maxzoom?: number;

    layout?: mapboxgl.LineLayout;
    paint?: mapboxgl.LinePaint;

    constructor(id?: string) {
        super("line", id);
    }

    GetSchema(): JSONSchemaType {
        return LineLayerSettings.Schema;
    }

    GetLayout(): mapboxgl.LineLayout | undefined {
        return this.layout;
    }

    SetLayout(layout: mapboxgl.LineLayout) {
        this.layout = layout;
    }

    GetPaint(): mapboxgl.LinePaint | undefined {
        return this.paint;
    }

    SetPaint(paint: mapboxgl.LinePaint) {
        this.paint = paint;
    }
}
