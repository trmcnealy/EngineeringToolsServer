/// <reference path="BaseLayerSettings.tsx"/>

export module MapLayers {

    export interface FillExtrusionLayerLayout extends LayerLayout {}

    export interface FillExtrusionLayerPaint {
        "fill-extrusion-opacity"?: number | Expression;
        "fill-extrusion-opacity-transition"?: Transition;
        "fill-extrusion-color"?: string | StyleFunction | Expression;
        "fill-extrusion-color-transition"?: Transition;
        "fill-extrusion-translate"?: number[] | Expression;
        "fill-extrusion-translate-transition"?: Transition;
        "fill-extrusion-translate-anchor"?: "map" | "viewport";
        "fill-extrusion-pattern"?: string | Expression;
        "fill-extrusion-pattern-transition"?: Transition;
        "fill-extrusion-height"?: number | StyleFunction | Expression;
        "fill-extrusion-height-transition"?: Transition;
        "fill-extrusion-base"?: number | StyleFunction | Expression;
        "fill-extrusion-base-transition"?: Transition;
        "fill-extrusion-vertical-gradient"?: boolean;
    }

    export default class FillExtrusionLayerSettings extends BaseLayerSettings {
        minzoom?: number;
        maxzoom?: number;

        layout?: FillExtrusionLayerLayout;
        paint?: FillExtrusionLayerPaint;

        constructor(id?: string) {
            super("fill-extrusion", id);
        }
    }
}
