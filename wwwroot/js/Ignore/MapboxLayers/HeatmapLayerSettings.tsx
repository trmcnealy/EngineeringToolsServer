/// <reference path="_MapLayersReferences.ts"/>

export module MapLayers {
    export interface HeatmapLayerLayout extends LayerLayout {}

    export interface HeatmapLayerPaint {
        "heatmap-radius"?: number | StyleFunction | Expression;
        "heatmap-radius-transition"?: Transition;
        "heatmap-weight"?: number | StyleFunction | Expression;
        "heatmap-intensity"?: number | StyleFunction | Expression;
        "heatmap-intensity-transition"?: Transition;
        "heatmap-color"?: string | StyleFunction | Expression;
        "heatmap-opacity"?: number | StyleFunction | Expression;
        "heatmap-opacity-transition"?: Transition;
    }

    export default class HeatmapLayerSettings extends BaseLayerSettings {
        minzoom?: number;
        maxzoom?: number;

        layout?: mapboxgl.HeatmapLayout;
        paint?: mapboxgl.HeatmapPaint;

        constructor(id?: string) {
            super("heatmap", id);
        }
    }
}
