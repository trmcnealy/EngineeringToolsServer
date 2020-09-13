import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {ColorPalette, ColorStops, ColorStop, DataColumnMetadataMap, ClassificationMethod, getBreaks} from "DataTypes";
import {MapboxFilter, MapboxMap, MapboxMapProperties} from "Controls";
import {DataSource, DataSetType} from "Data";

import {BaseLayer} from "./BaseLayer";
import {LineLayerSettings} from "./LineLayerSettings";

export class LineLayer extends BaseLayer<LineLayerSettings> {
    private filter: MapboxFilter;
    private palette: ColorPalette;

    //static readonly Id: string = "line";
    //private static readonly HighlightId: string = "line-highlight";

    //private static readonly LayerOrder: string[] = [LineLayer.Id, LineLayer.HighlightId];

    constructor(settings: LineLayerSettings, map: MapboxMap, source: DataSource, filter: MapboxFilter, palette: ColorPalette) {
        super(settings, map, source);

        this.filter = filter;
        this.palette = palette;
    }

    GetLayerIds(): string[] {
        return [this.settings.id];
    }

    GetSettings(): LineLayerSettings {
        this.settings.source = this.source.id;
        return this.settings;
    }

    SetSettings(settings: LineLayerSettings): void {
        this.settings = settings;
    }

    GetSource(): DataSource {
        return super.GetSource();
    }

    UpdateSelection(dataSet: DataSetType, metadata: DataColumnMetadataMap) {
        console.log("UpdateSelection");
    }

    HoverHighLight(e) {
        console.log("HoverHighLight");
    }

    RemoveHighlight(metadata: Map<string, any>) {
        console.log("RemoveHighlight");
    }
}
