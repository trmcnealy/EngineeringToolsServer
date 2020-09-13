/// <reference path="_MapLayersReferences.ts"/>

export module MapLayers {
    export interface FillLayerLayout extends LayerLayout {
        "fill-sort-key"?: number;
    }

    export interface FillLayerPaint {
        "fill-antialias"?: boolean | Expression;
        "fill-opacity"?: number | StyleFunction | Expression;
        "fill-opacity-transition"?: Transition;
        "fill-color"?: string | StyleFunction | Expression;
        "fill-color-transition"?: Transition;
        "fill-outline-color"?: string | StyleFunction | Expression;
        "fill-outline-color-transition"?: Transition;
        "fill-translate"?: number[];
        "fill-translate-transition"?: Transition;
        "fill-translate-anchor"?: "map" | "viewport";
        "fill-pattern"?: string | Expression;
        "fill-pattern-transition"?: Transition;
    }

    export default class FillLayerSettings extends BaseLayerSettings {
        minzoom?: number;
        maxzoom?: number;

        layout?: mapboxgl.FillLayout;
        paint?: mapboxgl.FillPaint;

        constructor(id?: string) {
            super("fill", id);
        }
    }
}
