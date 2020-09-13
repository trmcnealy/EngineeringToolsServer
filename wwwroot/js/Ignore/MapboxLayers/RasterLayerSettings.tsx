/// <reference path="_MapLayersReferences.ts"/>

export module MapLayers {
    export interface RasterLayerLayout extends LayerLayout {}

    export interface RasterLayerPaint {
        "raster-opacity"?: number | Expression;
        "raster-opacity-transition"?: Transition;
        "raster-hue-rotate"?: number | Expression;
        "raster-hue-rotate-transition"?: Transition;
        "raster-brightness-min"?: number | Expression;
        "raster-brightness-min-transition"?: Transition;
        "raster-brightness-max"?: number | Expression;
        "raster-brightness-max-transition"?: Transition;
        "raster-saturation"?: number | Expression;
        "raster-saturation-transition"?: Transition;
        "raster-contrast"?: number | Expression;
        "raster-contrast-transition"?: Transition;
        "raster-fade-duration"?: number | Expression;
        "raster-resampling"?: "linear" | "nearest";
        "circle-sort-key"?: number;
    }

    export default class RasterLayerSettings extends BaseLayerSettings {
        minzoom?: number;
        maxzoom?: number;

        layout?: mapboxgl.RasterLayout;
        paint?: mapboxgl.RasterPaint;

        constructor(id?: string) {
            super("raster", id);
        }
    }
}
