import * as React from "react";
import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";
import * as chroma from "chroma-js";

import MapboxMap from "MapboxMap";
import LegendControl, {ColorStop, ColorStops} from "MapboxControls/LegendControl";
import ColorPalette, {IPalette} from "DataTypes/ColorPalette";
import DataSource from "Data/DataSource";
import {ClassificationMethod, getBreaks, Limits, getClassCount, filterValues} from "DataTypes/DataColumnTypes";
import {MapboxMapProperties} from "Controls/MapboxMapProperties";
import {TooltipEventArgs, TooltipDataItem} from "Services/TooltipService";
import {DataColumnMetadataMap} from "Utilities/UtilityMethods";

//export enum LayerType {
//    Fill = 0,
//    Line,
//    Symbol,
//    Circle,
//    FillExtrusion,
//    Raster,
//    Background,
//    Heatmap,
//    Custom
//}

//export const LayerNames: Map<LayerType, string> = new Map<LayerType, string>([
//    [LayerType.Fill, "fill"][(LayerType.Line, "line")][(LayerType.Symbol, "symbol")][(LayerType.Circle, "circle")][(LayerType.FillExtrusion, "fill-extrusion")][
//        (LayerType.Raster, "raster")
//    ][(LayerType.Background, "background")][(LayerType.Heatmap, "heatmap")][(LayerType.Custom, "custom")]
//]);

export default class LayerSettings {
    show: boolean = true;
    radius: number = 3;
    scaleFactor: number = 5;
    diverging: boolean = false;
    minColor: string = "#ffffcc";
    midColor: string = "#41b6c4";
    maxColor: string = "#253494";
    minValue: number = null;
    midValue: number = null;
    maxValue: number = null;
    highlightColor: string = "#253494";
    blur: number = 0.0;
    opacity: number = 80;
    strokeWidth: number = 1;
    strokeColor: string = "#bdbdbd";
    strokeOpacity: number = 50;
    minZoom?: number;
    maxZoom?: number;
    legend?: boolean;
}

export abstract class MapboxLayer {
    protected parent: MapboxMap;
    protected source: DataSource;
    protected id: string;
    protected prevLabelPositionSetting: string;

    protected colorStops: ColorStops;

    constructor(map: MapboxMap) {
        this.parent = map;
        this.prevLabelPositionSetting = map.getProperties().LabelPosition;
    }

    updateSource(features, mataColumnMap: DataColumnMetadataMap, properties: MapboxMapProperties) {
        if (properties[this.id].show) {
            this.source.Update(this.parent.getMap(), features, mataColumnMap, properties);
        }
    }

    getBounds(properties: MapboxMapProperties): mapboxgl.LngLatBounds | null {
        if (properties[this.id].show) {
            return this.source.GetBounds();
        }
        return null;
    }

    getId() {
        return this.id;
    }

    abstract getLayerIDs();

    updateSelection(features, mataColumnMap: DataColumnMetadataMap) {}

    hoverHighLight(e) {}

    removeHighlight(mataColumnMap: DataColumnMetadataMap) {}

    getColorStops(): ColorStops {
        return this.colorStops;
    }

    static mapValuesToColorStops(colorInterval: Array<string>, method: ClassificationMethod, classCount: number, values: Array<number>): ColorStops {
        if (!values || values.length === 0) {
            return new ColorStops();
        }

        if (values.length === 1) {
            const colorStop = values[0];
            const color = colorInterval[0];
            return [{colorStop, color}];
        }

        const domain: Array<number> = classCount ? getBreaks(values, method, classCount) : values;
        const colors = chroma.scale(colorInterval).colors(domain.length);
        return domain.map((colorStop, idx) => {
            const color = colors[idx].toString();
            return {colorStop, color};
        });
    }

    generateColorStops(properties: LayerSettings, isGradient: boolean, colorLimits: Limits, colorPalette: ColorPalette): ColorStops {
        if (!isGradient) {
            return colorLimits.values.map((value) => {
                const colorStop = value;
                const color = colorPalette.getColor(colorStop);
                return {colorStop, color};
            });
        }

        if (!properties.diverging) {
            const classCount = getClassCount(colorLimits.values);
            return MapboxLayer.mapValuesToColorStops([properties.minColor, properties.maxColor], this.getClassificationMethod(), classCount, colorLimits.values);
        }

        const {minValue, midValue, maxValue, minColor, midColor, maxColor} = properties;

        const filteredValues = filterValues(colorLimits.values, minValue, maxValue);
        // Split the interval into two halves when there is a middle value
        if (midValue != null) {
            const lowerHalf = new Array<number>();
            const upperHalf = new Array<number>();

            if (minValue != null) {
                lowerHalf.push(minValue);
            }

            filteredValues.forEach((value) => {
                if (value < midValue) {
                    lowerHalf.push(value);
                } else {
                    upperHalf.push(value);
                }
            });

            if (maxValue != null) {
                upperHalf.push(maxValue);
            }

            // Add midValue to both interval
            lowerHalf.push(midValue);
            upperHalf.unshift(midValue);

            // Divide the colorstops between the two intervals (halve them)
            const lowerHalfClassCount = getClassCount(lowerHalf) >> 1;
            const upperHalfClassCount = getClassCount(upperHalf) >> 1;

            const lowerColorStops = MapboxLayer.mapValuesToColorStops([minColor, midColor], this.getClassificationMethod(), lowerHalfClassCount, lowerHalf);
            const upperColorStops = MapboxLayer.mapValuesToColorStops([midColor, maxColor], this.getClassificationMethod(), upperHalfClassCount, upperHalf);

            // Make sure the midValue included only once
            lowerColorStops.pop();
            return lowerColorStops.concat(upperColorStops);
        }

        if (minValue != null) {
            filteredValues.push(minValue);
        }

        if (maxValue != null) {
            filteredValues.push(maxValue);
        }

        const classCount = getClassCount(filteredValues);
        return MapboxLayer.mapValuesToColorStops([minColor, midColor, maxColor], this.getClassificationMethod(), classCount, filteredValues);
    }

    getClassificationMethod(): ClassificationMethod {
        return ClassificationMethod.Quantile;
    }

    applySettings(properties: MapboxMapProperties, mataColumnMap: DataColumnMetadataMap): void {
        const map = this.parent.getMap();
        if (properties[this.id].show) {
            if (this.prevLabelPositionSetting === properties.LabelPosition) {
                if (!this.layerExists()) {
                    let firstSymbolId = this.calculateLabelPosition(properties, map);
                    this.addLayer(properties, firstSymbolId, mataColumnMap);
                }
            } else {
                const firstSymbolId = this.calculateLabelPosition(properties, map);
                this.moveLayer(firstSymbolId);
            }
        } else {
            if (this.layerExists()) {
                this.removeLayer();
            }
        }
        if (this.prevLabelPositionSetting !== properties.LabelPosition) {
            this.prevLabelPositionSetting = properties.LabelPosition;
        }
    }

    addLayer(properties: MapboxMapProperties, beforeLayerId: string, mataColumnMap: DataColumnMetadataMap) {}

    moveLayer(beforeLayerId: string) {}

    abstract removeLayer();

    layerExists() {
        const map = this.parent.getMap();
        const layer = map.getLayer(this.id);
        return layer != null;
    }

    getSource(properties: MapboxMapProperties) {
        if (properties[this.id].show) {
            this.source.Ensure(this.parent.getMap(), this.id, properties);
            return this.source;
        }
        return null;
    }

    handleZoom(properties: MapboxMapProperties): boolean {
        if (properties[this.id].show) {
            return this.source.HandleZoom(this.parent.getMap(), properties);
        }
        return false;
    }

    hasTooltip(tooltips) {
        if (!tooltips) {
            return false;
        }
        return true;
    }

    getFormattedTooltipValue(mataColumnMap: DataColumnMetadataMap, data): string {
        const displayName = data.displayName;
        const tooltipData = mataColumnMap[displayName].tooltips;
        let value = data.value;
        if (tooltipData && tooltipData.format) {
            const {format, type} = tooltipData;
            if (type.dateTime) {
                value = new Date(data.value);
                if (isNaN(value)) {
                    // Print original text if the date string is invalid.
                    value = data.value;
                }
            } else if (type.numeric) {
                value = Number(data.value);
            }
            value = FormatString(value, format);
        }
        return value;
    }

    handleTooltip(tooltipEvent: TooltipEventArgs<number>, dataColumnMap: DataColumnMetadataMap, properties: MapboxMapProperties): Array<TooltipDataItem> {
        return new Array<TooltipDataItem>();
    }

    calculateLabelPosition(properties: MapboxMapProperties, map: mapboxgl.Map) {
        let firstSymbolId = null;
        if (properties.LabelPosition === "above") {
            firstSymbolId = "waterway-label";
            if (properties.BaseMapStyle === "mapbox://styles/mapbox/satellite-v9?optimize=true" || properties.BaseMapStyle === "custom") {
                firstSymbolId = "";
                let layers = map.getStyle().layers;

                for (let i = 0; i < layers.length; i++) {
                    if (layers[i].type === "symbol") {
                        firstSymbolId = layers[i].id;
                        break;
                    }
                }
            }
        }
        return firstSymbolId;
    }

    static getTooltipData(value: any): Array<TooltipDataItem> {
        if (!value) {
            return new Array<TooltipDataItem>();
        }
        // Flatten the multiple properties or multiple datapoints
        return [].concat.apply(
            [],
            value.map((properties) => {
                // This mapping is needed to copy the value with the toString
                // call as otherwise some caching logic causes to be the same
                // tooltip displayed for all datapoints.
                return properties.map((prop) => {
                    return {
                        displayName: prop.key,
                        value: prop.value.toString()
                    };
                });
            })
        );
    }

    showLegend(properties: MapboxMapProperties, dataColumnMap: DataColumnMetadataMap) {
        return this.layerExists();
    }

    addLegend(legend: LegendControl, dataColumnMap: DataColumnMetadataMap, properties: MapboxMapProperties): void {
        const id = this.getId();
        const title = dataColumnMap.color.displayName;
        const colorStops = this.getColorStops();
        const format = dataColumnMap.color.format;
        legend.addLegend(id, title, colorStops, format);
    }

    static Decorate(layer: mapboxgl.Layer) {
        //switch (layer.type) {
        //    case 'circle': {
        //        layer.paint = {};
        //        break;
        //    }
        //    case 'cluster': {
        //        layer.type = 'circle';
        //        break;
        //    }
        //    case 'heatmap': {
        //        layer.paint = {};
        //        break;
        //    }
        //}
        return layer;
    }
}
