import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {MapLayerType} from "MapboxLayers";

export type MapControlLocation = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface MapboxMapProperties {
    className: string;
    BaseMapStyle: string;

    Center?: mapboxgl.LngLat | null;
    Zoom?: number | null;
    Bounds?: mapboxgl.LngLatBoundsLike | null;

    ShowNavigationControl?: boolean;
    NavigationControlLocation?: MapControlLocation;

    ShowFullscreenControl?: boolean;
    FullscreenControlLocation?: MapControlLocation;

    ShowFrameRateControl?: boolean;
    FrameRateControlLocation?: MapControlLocation;

    LabelPosition?: string;

    Layers: Map<string, MapLayerType>;
}
