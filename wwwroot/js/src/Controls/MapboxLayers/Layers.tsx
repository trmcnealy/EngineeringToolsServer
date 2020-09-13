import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {BaseLayerSettings} from "./BaseLayerSettings";
import {BaseLayer} from "./BaseLayer";

import {LineLayerSettings} from "./LineLayerSettings";
import {LineLayer} from "./LineLayer";

//export BaseLayerSettings from "BaseLayerSettings";

export const MAX_SELECTION_COUNT = 1000;

export type MapLayerSettingsType = LineLayerSettings;

export type MapLayerType = LineLayer;

//MapLayers.Symbol
//| MapLayers.Raster
//| MapLayers.Line
//| MapLayers.Heatmap
//| MapLayers.Circle
//| MapLayers.Fill
//| MapLayers.FillExtrusion;
