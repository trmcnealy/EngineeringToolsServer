
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";
import * as chroma from "chroma-js";

import {BaseLayerSettings} from "./BaseLayerSettings";
import {MapboxMap, MapboxMapProperties} from "Controls";
import {ColorStops, ColorStop, DataColumnMetadataMap, ClassificationMethod, getBreaks} from "DataTypes";
import {DataSource, DataSetType} from "Data";

export abstract class BaseLayer<TLayerSettings extends BaseLayerSettings> {
    protected parent: MapboxMap;
    protected source: DataSource;
    protected prevLabelPositionSetting: string;
    protected colorStops: ColorStops;

    protected settings: TLayerSettings;

    public abstract GetSettings(): TLayerSettings;
    public abstract SetSettings(settings: TLayerSettings);

    constructor(settings: TLayerSettings, map: MapboxMap, source: DataSource) {
        this.parent = map;
        this.source = source;
        this.settings = settings;

        this.prevLabelPositionSetting = map.GetProperties().LabelPosition;
    }

    //UpdateSource(dataSet: DataSetType, metadata: DataColumnMetadataMap, settings: MapLayerSettingsType) {
    //    if (properties.Layers[this.settings.id].layout && properties.Layers[this.settings.id].layout.visibility === "visible") {
    //        this.source.Update(this.parent.GetMap(), dataSet, metadata, settings);
    //    }
    //}

    public GetBounds(properties: MapboxMapProperties): mapboxgl.LngLatBounds {
        if (properties.Layers[this.settings.id].layout && properties.Layers[this.settings.id].layout.visibility === "visible") {
            return this.source.GetBounds();
        }
        return null as mapboxgl.LngLatBounds;
    }

    public abstract GetLayerIds();

    public abstract UpdateSelection(dataSet: DataSetType, metadata: DataColumnMetadataMap);

    public abstract HoverHighLight(e);
    //if (!this.LayerExists()) {
    //    return;
    //}
    //const roleMap = this.parent.getRoleMap();
    //const latitude = roleMap.latitude.displayName;
    //const longitude = roleMap.longitude.displayName;
    //const eventProps = e.features[0].properties;
    //const lngLatFilter = ["all", ["==", latitude, eventProps[latitude]], ["==", longitude, eventProps[longitude]]];
    //this.parent.getMap().setFilter(Circle.HighlightID, lngLatFilter);

    public abstract RemoveHighlight(metadata: DataColumnMetadataMap);
    //if (!this.LayerExists()) {
    //    return;
    //}
    //const latitude = roleMap.latitude.displayName;
    //const map = this.parent.getMap();
    //const zeroFilter = ["==", latitude, ""];
    //map.setFilter(Circle.HighlightID, zeroFilter);
    //if (this.settings.opacity) {
    //    map.setPaintProperty(Circle.ID, "circle-opacity", this.settings.opacity / 100);
    //}

    public GetColorStops(): ColorStops {
        return this.colorStops;
    }

    public static MapValuesToColorStops(colorInterval: string[], method: ClassificationMethod, classCount: number, values: number[]): ColorStops {
        if (!values || values.length === 0) {
            return [];
        }

        if (values.length === 1) {
            const colorStop = values[0];
            const color = colorInterval[0];
            return [{colorStop: colorStop, color: color} as ColorStop] as ColorStops;
        }

        const domain: number[] = classCount ? getBreaks(values, method, classCount) : values;
        const colors = chroma.scale(colorInterval).colors(domain.length);

        return domain.map((colorStop, idx) => {
            const color = colors[idx].toString();
            return {colorStop, color};
        });
    }

    //GenerateColorStops(settings: MapLayerSettingsType, isGradient: boolean, colorLimits: Limits, colorPalette: ColorPalette): ColorStops {

    //    if (!isGradient) {
    //        return colorLimits.values.map((value) => {
    //            const colorStop = value.toString();
    //            const color = colorPalette.GetColor(colorStop);
    //            return new ColorStop(colorStop, color);
    //        });
    //    }

    //    //if (settings instanceof ClusterSettings || !settings.diverging) {
    //    //    const classCount = getClassCount(colorLimits.values);
    //    //    return Layer.mapValuesToColorStops([settings.minColor, settings.maxColor], this.getClassificationMethod(), classCount, colorLimits.values);
    //    //}

    //    const {minValue, midValue, maxValue, minColor, midColor, maxColor} = settings;

    //    const filteredValues = filterValues(colorLimits.values, minValue, maxValue);

    //    // Split the interval into two halves when there is a middle value
    //    if (midValue != null) {
    //        const lowerHalf = Array<number>();
    //        const upperHalf = Array<number>();

    //        if (minValue != null) {
    //            lowerHalf.push(minValue);
    //        }

    //        filteredValues.forEach((value) => {
    //            if (value < midValue) {
    //                lowerHalf.push(value);
    //            } else {
    //                upperHalf.push(value);
    //            }
    //        });

    //        if (maxValue != null) {
    //            upperHalf.push(maxValue);
    //        }

    //        // Add midValue to both interval
    //        lowerHalf.push(midValue);
    //        upperHalf.unshift(midValue);

    //        // Divide the colorstops between the two intervals (halve them)
    //        const lowerHalfClassCount = getClassCount(lowerHalf) >> 1;
    //        const upperHalfClassCount = getClassCount(upperHalf) >> 1;

    //        const lowerColorStops = BaseLayer.MapValuesToColorStops([minColor, midColor], this.GetClassificationMethod(), lowerHalfClassCount, lowerHalf);
    //        const upperColorStops = BaseLayer.MapValuesToColorStops([midColor, maxColor], this.GetClassificationMethod(), upperHalfClassCount, upperHalf);

    //        // Make sure the midValue included only once
    //        lowerColorStops.pop();

    //        return lowerColorStops.concat(upperColorStops);
    //    }

    //    if (minValue != null) {
    //        filteredValues.push(minValue);
    //    }

    //    if (maxValue != null) {
    //        filteredValues.push(maxValue);
    //    }

    //    const classCount = getClassCount(filteredValues);

    //    return BaseLayer.MapValuesToColorStops([minColor, midColor, maxColor], this.GetClassificationMethod(), classCount, filteredValues);
    //}

    public GetClassificationMethod(): ClassificationMethod {
        return ClassificationMethod.Quantile;
    }

    //ApplySettings(metadata: DataColumnMetadataMap) {
    //    const map = this.parent.GetMap();

    //    if (this.parent.props.Layers[this.settings.id].layout && this.parent.props.Layers[this.settings.id].layout.visibility === "visible") {
    //        if (this.prevLabelPositionSetting === this.parent.props.LabelPosition) {
    //            if (!this.LayerExists()) {
    //                let firstSymbolId = this.CalculateLabelPosition(properties, map);
    //                this.AddLayer(properties, firstSymbolId, metadata);
    //            }
    //        } else {
    //            const firstSymbolId = this.CalculateLabelPosition(properties, map);
    //            this.MoveLayer(firstSymbolId);
    //        }
    //    } else {
    //        if (this.LayerExists()) {
    //            this.RemoveLayer();
    //        }
    //    }
    //    //if (this.prevLabelPositionSetting !== settings.api.labelPosition) {
    //    //    this.prevLabelPositionSetting = settings.api.labelPosition;
    //    //}
    //}

    public LayerExists() {
        const map = this.parent.GetMap();
        const layer = map.getLayer(this.settings.id);
        return layer != null;
    }

    public GetSource(): DataSource {
        if (this.parent.props.Layers[this.settings.id].layout && this.parent.props.Layers[this.settings.id].layout.visibility === "visible") {
            return this.source;
        }
        return null as DataSource;
    }

    //HandleZoom(properties: MapboxMapProperties, settings: MapLayerSettingsType): boolean {
    //    if (properties.Layers[this.settings.id].layout && properties.Layers[this.settings.id].layout.visibility === "visible") {
    //        return this.source.HandleZoom(this.parent.GetMap(), settings);
    //    }
    //    return false;
    //}

    //HasTooltip(tooltips) {
    //    if (!tooltips) {
    //        // Do not show tooltip if no property is pulled into 'tooltips' data role
    //        return false;
    //    }
    //    return true;
    //}

    //GetFormattedTooltipValue(metadata: DataColumnMetadataMap, data): string {
    //    //const displayName = data.DisplayName;
    //    //const tooltipData = metadata[tooltips][displayName];
    //    let value = data.value;
    //    //if (tooltipData && tooltipData.format) {
    //    //    //const {format, type} = tooltipData;

    //    //    if (type.dateTime) {
    //    //        value = new Date(data.value);
    //    //        if (isNaN(value)) {
    //    //            value = data.value;
    //    //        }
    //    //    } else if (type.numeric) {
    //    //        value = Number(data.value);
    //    //    }

    //    //    //value = valueFormatter.format(value, format);
    //    //}
    //    return value;
    //}

    //HandleTooltip(tooltipEvent: TooltipEventArgs<number>, metadata: DataColumnMetadataMap, settings: MapLayerSettingsType): TooltipDataItem[] {
    //    return [];
    //}

    //CalculateLabelPosition(properties: MapboxMapProperties, map: mapboxgl.Map) {
    //    // If there is no firstSymbolId specified, it adds the data as the last element.
    //    let firstSymbolId = null;
    //    if (properties.LabelPosition === "above") {
    //        // For default styles place data under waterway-label layer
    //        firstSymbolId = "waterway-label";
    //        if (properties.BaseMapStyle === "mapbox://styles/mapbox/satellite-v9?optimize=true" || properties.BaseMapStyle === "custom") {
    //            // For custom style find the lowest symbol layer to place data underneath
    //            firstSymbolId = "";
    //            let layers = map.getStyle().layers;
    //            for (let i = 0; i < layers.length; i++) {
    //                if (layers[i].type === "symbol") {
    //                    firstSymbolId = layers[i].id;
    //                    break;
    //                }
    //            }
    //        }
    //    }
    //    return firstSymbolId;
    //}

    //static GetTooltipData(value: any): TooltipDataItem[] {
    //    if (!value) {
    //        return [];
    //    }
    //    // Flatten the multiple properties or multiple datapoints
    //    return [].concat.apply(
    //        [],
    //        value.map((properties) => {
    //            // This mapping is needed to copy the value with the toString
    //            // call as otherwise some caching logic causes to be the same
    //            // tooltip displayed for all datapoints.
    //            return properties.map((prop) => {
    //                return {
    //                    displayName: prop.key,
    //                    value: prop.value.toString()
    //                };
    //            });
    //        })
    //    );
    //}

    //ShowLegend(settings: MapLayerSettingsType, metadata: DataColumnMetadataMap) {
    //    return this.LayerExists();
    //}

    //AddLegend(legend: LegendControl, metadata: DataColumnMetadataMap, settings: MapLayerSettingsType): void {
    //    const id = this.GetId();
    //    const title = metadata["color"].displayName;
    //    const colorStops = this.GetColorStops();
    //    const format = metadata["color"].format;
    //    legend.addLegend(id, title, colorStops, format);
    //}
}
