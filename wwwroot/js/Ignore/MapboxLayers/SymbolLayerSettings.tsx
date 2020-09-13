/// <reference path="_MapLayersReferences.ts"/>

export module MapLayers {
    export interface SymbolLayerLayout extends LayerLayout {
        "symbol-placement"?: "point" | "line" | "line-center";
        "symbol-spacing"?: number | Expression;
        "symbol-avoid-edges"?: boolean;
        "symbol-z-order"?: "viewport-y" | "source";
        "icon-allow-overlap"?: boolean | StyleFunction | Expression;
        "icon-ignore-placement"?: boolean;
        "icon-optional"?: boolean;
        "icon-rotation-alignment"?: "map" | "viewport" | "auto";
        "icon-size"?: number | StyleFunction | Expression;
        "icon-text-fit"?: "none" | "both" | "width" | "height";
        "icon-text-fit-padding"?: number[] | Expression;
        "icon-image"?: string | StyleFunction | Expression;
        "icon-rotate"?: number | StyleFunction | Expression;
        "icon-padding"?: number | Expression;
        "icon-keep-upright"?: boolean;
        "icon-offset"?: number[] | StyleFunction | Expression;
        "icon-anchor"?: Anchor | StyleFunction | Expression;
        "icon-pitch-alignment"?: "map" | "viewport" | "auto";
        "text-pitch-alignment"?: "map" | "viewport" | "auto";
        "text-rotation-alignment"?: "map" | "viewport" | "auto";
        "text-field"?: string | StyleFunction | Expression;
        "text-font"?: string | string[] | Expression;
        "text-size"?: number | StyleFunction | Expression;
        "text-max-width"?: number | StyleFunction | Expression;
        "text-line-height"?: number | Expression;
        "text-letter-spacing"?: number | Expression;
        "text-justify"?: "left" | "center" | "right" | Expression;
        "text-anchor"?: Anchor | StyleFunction | Expression;
        "text-max-angle"?: number | Expression;
        "text-rotate"?: number | StyleFunction | Expression;
        "text-padding"?: number | Expression;
        "text-keep-upright"?: boolean;
        "text-transform"?: "none" | "uppercase" | "lowercase" | StyleFunction | Expression;
        "text-offset"?: number[] | Expression;
        "text-allow-overlap"?: boolean;
        "text-ignore-placement"?: boolean;
        "text-optional"?: boolean;
        "text-radial-offset"?: number | Expression;
        "text-variable-anchor"?: Anchor[];
        "text-writing-mode"?: ("horizontal" | "vertical")[];
        "symbol-sort-key"?: number | Expression;
    }

    export interface SymbolLayerPaint {
        "icon-opacity"?: number | StyleFunction | Expression;
        "icon-opacity-transition"?: Transition;
        "icon-color"?: string | StyleFunction | Expression;
        "icon-color-transition"?: Transition;
        "icon-halo-color"?: string | StyleFunction | Expression;
        "icon-halo-color-transition"?: Transition;
        "icon-halo-width"?: number | StyleFunction | Expression;
        "icon-halo-width-transition"?: Transition;
        "icon-halo-blur"?: number | StyleFunction | Expression;
        "icon-halo-blur-transition"?: Transition;
        "icon-translate"?: number[] | Expression;
        "icon-translate-transition"?: Transition;
        "icon-translate-anchor"?: "map" | "viewport";
        "text-opacity"?: number | StyleFunction | Expression;
        "text-opacity-transition"?: Transition;
        "text-color"?: string | StyleFunction | Expression;
        "text-color-transition"?: Transition;
        "text-halo-color"?: string | StyleFunction | Expression;
        "text-halo-color-transition"?: Transition;
        "text-halo-width"?: number | StyleFunction | Expression;
        "text-halo-width-transition"?: Transition;
        "text-halo-blur"?: number | StyleFunction | Expression;
        "text-halo-blur-transition"?: Transition;
        "text-translate"?: number[] | Expression;
        "text-translate-transition"?: Transition;
        "text-translate-anchor"?: "map" | "viewport";
    }

    export default class SymbolLayerSettings extends BaseLayerSettings {
        minzoom?: number;
        maxzoom?: number;

        layout?: mapboxgl.SymbolLayout;
        paint?: mapboxgl.SymbolPaint;

        constructor(id?: string) {
            super("symbol", id);
        }
    }
}
