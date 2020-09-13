/// <reference path="BaseLayerSettings.tsx"/>

export module MapLayers {
    export interface CircleLayerLayout extends LayerLayout {}

    export interface CircleLayerPaint {
        "circle-radius"?: number | StyleFunction | Expression;
        "circle-radius-transition"?: Transition;
        "circle-color"?: string | StyleFunction | Expression;
        "circle-color-transition"?: Transition;
        "circle-blur"?: number | StyleFunction | Expression;
        "circle-blur-transition"?: Transition;
        "circle-opacity"?: number | StyleFunction | Expression;
        "circle-opacity-transition"?: Transition;
        "circle-translate"?: number[] | Expression;
        "circle-translate-transition"?: Transition;
        "circle-translate-anchor"?: "map" | "viewport";
        "circle-pitch-scale"?: "map" | "viewport";
        "circle-pitch-alignment"?: "map" | "viewport";
        "circle-stroke-width"?: number | StyleFunction | Expression;
        "circle-stroke-width-transition"?: Transition;
        "circle-stroke-color"?: string | StyleFunction | Expression;
        "circle-stroke-color-transition"?: Transition;
        "circle-stroke-opacity"?: number | StyleFunction | Expression;
        "circle-stroke-opacity-transition"?: Transition;
    }

    export default class CircleLayerSettings extends BaseLayerSettings {
        minzoom?: number;
        maxzoom?: number;

        layout?: CircleLayerLayout;
        paint?: CircleLayerPaint;

        constructor(id?: string) {
            super("circle", id);
        }
    }
}
