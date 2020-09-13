/// <reference path="CircleLayerSettings.tsx"/>

import MapboxMap from "Controls/MapboxMap";
import {ColorStops, LegendControl} from "Controls/MapboxControls";
import {ClassificationMethod} from "DataTypes/DataColumnTypes";
import {TooltipEventArgs} from "Services/TooltipService";
import DataSource from "Data/DataSource";
import MapboxFilter from "Controls/MapboxFilter";
import ColorPalette from "DataTypes/ColorPalette";
import { ColorStops } from "Controls/MapboxControls/LegendControl";

export module MapLayers {
    export default class CircleLayer extends BaseLayer {

        private filter: MapboxFilter;
        private palette: ColorPalette;
        private settings: CircleLayerSettings;

        public static readonly Id = "circle";
        private static readonly HighlightID = "circle-highlight";

        private static readonly LayerOrder = [CircleLayer.Id, CircleLayer.HighlightID];

        constructor(map: MapboxMap, filter: MapboxFilter, palette: ColorPalette) {
            super(map);

            this.id = CircleLayer.Id;
            this.filter = filter;
            this.palette = palette;
            this.source = Sources.Point;
        }

        GetLayerIDs() {
            return [CircleLayer.Id];
        }

        GetSource(settings) {
            this.settings = settings.circle;
            return super.GetSource(settings);
        }

        AddLayer(settings, beforeLayerId, metadata) {
            const map = this.parent.getMap();
            const latitude = metadata.latitude.displayName;
            const layers = {};

            layers[CircleLayer.Id] = {
                id: CircleLayer.Id,
                source: "data",
                type: "circle"
            };

            const zeroFilter = ["==", latitude, ""];

            layers[CircleLayer.HighlightID] = {
                id: CircleLayer.HighlightID,
                type: "circle",
                source: "data",
                filter: zeroFilter
            };

            CircleLayer.LayerOrder.forEach((layerId) => map.addLayer(layers[layerId], beforeLayerId));

            map.setPaintProperty(CircleLayer.HighlightID, "circle-color", settings.circle.highlightColor);
            map.setPaintProperty(CircleLayer.HighlightID, "circle-opacity", 1);
            map.setPaintProperty(CircleLayer.HighlightID, "circle-stroke-width", 1);
            map.setPaintProperty(CircleLayer.HighlightID, "circle-stroke-color", "black");
        }

        MoveLayer(beforeLayerId: string) {
            const map = this.parent.getMap();
            CircleLayer.LayerOrder.forEach((layerId) => map.moveLayer(layerId, beforeLayerId));
        }

        HoverHighLight(e) {
            if (!this.LayerExists()) {
                return;
            }

            const metadata = this.parent.getMetadata();
            const latitude = metadata.latitude.displayName;
            const longitude = metadata.longitude.displayName;
            const eventProps = e.features[0].properties;
            const lngLatFilter = ["all", ["==", latitude, eventProps[latitude]], ["==", longitude, eventProps[longitude]]];
            this.parent.getMap().setFilter(CircleLayer.HighlightID, lngLatFilter);
        }

        RemoveHighlight(metadata) {
            if (!this.layerExists()) {
                return;
            }
            const latitude = metadata.latitude.displayName;
            const map = this.parent.getMap();
            const zeroFilter = ["==", latitude, ""];
            map.setFilter(CircleLayer.HighlightID, zeroFilter);
            if (this.settings.opacity) {
                map.setPaintProperty(CircleLayer.Id, "circle-opacity", this.settings.opacity / 100);
            }
        }

        UpdateSelection(features, metadata) {
            const map = this.parent.getMap();
            const latitude = metadata.latitude.displayName;
            const longitude = metadata.longitude.displayName;

            let lngLatFilter = [];
            lngLatFilter.push("any");
            let selectionIds = features.slice(0, constants.MAX_SELECTION_COUNT).map((feature, index) => {
                lngLatFilter.push(["all", ["==", latitude, feature.properties[latitude]], ["==", longitude, feature.properties[longitude]]]);
                return feature.id;
            });
            this.filter.addSelection(selectionIds);

            map.setFilter(CircleLayer.HighlightID, lngLatFilter);

            const opacity = this.filter.getSelectionOpacity(this.settings.opacity);
            map.setPaintProperty(CircleLayer.Id, "circle-opacity", opacity);
            return selectionIds;
        }

        RemoveLayer() {
            const map = this.parent.GetMap();
            CircleLayer.LayerOrder.forEach((layerId) => map.removeLayer(layerId));
            this.source.RemoveFromMap(map, CircleLayer.Id);
        }

        ApplySettings(settings: MapLayerSettingsType, metadata) {
            super.applySettings(settings, metadata);
            const map = this.parent.getMap();
            if (settings.circle.show) {
                const isGradient = shouldUseGradient(metadata.color);
                const limits = this.source.getLimits();
                const sizes = CircleLayer.getSizes(limits.size, map, settings, metadata.size);

                this.colorStops = this.generateColorStops(settings.circle, isGradient, limits.color, this.palette);
                let colorStyle = CircleLayer.getColorStyle(isGradient, settings, metadata.color, this.colorStops);

                map.setPaintProperty(CircleLayer.Id, "circle-radius", sizes);
                map.setPaintProperty(CircleLayer.HighlightID, "circle-radius", sizes);
                map.setPaintProperty(CircleLayer.HighlightID, "circle-color", settings.circle.highlightColor);
                map.setPaintProperty(CircleLayer.Id, "circle-color", colorStyle);
                map.setLayerZoomRange(CircleLayer.Id, settings.circle.minZoom, settings.circle.maxZoom);
                map.setPaintProperty(CircleLayer.Id, "circle-blur", settings.circle.blur / 100);
                map.setPaintProperty(CircleLayer.Id, "circle-opacity", settings.circle.opacity / 100);
                map.setPaintProperty(CircleLayer.Id, "circle-stroke-width", settings.circle.strokeWidth);
                map.setPaintProperty(CircleLayer.Id, "circle-stroke-opacity", settings.circle.strokeOpacity / 100);
                map.setPaintProperty(CircleLayer.Id, "circle-stroke-color", settings.circle.strokeColor);
            }
        }

        handleTooltip(tooltipEvent, metadata, settings: MapLayerSettingsType) {
            const tooltipData = Layer.getTooltipData(tooltipEvent.data).filter((elem) => metadata.tooltips[elem.displayName]); // Only show the fields that are added to the tooltips
            return tooltipData.map((data) => {
                data.value = this.getFormattedTooltipValue(metadata, data);
                return data;
            });
        }

        showLegend(settings: MapboxSettings, metadata: RoleMap) {
            return settings.circle.legend && metadata.color && super.showLegend(settings, metadata);
        }

        private static getColorStyle(isGradient: boolean, settings: MapboxSettings, colorField: any, colorStops: ColorStops) {
            if (!colorField) {
                return settings.circle.minColor;
            }

            if (isGradient) {
                // Set colors for continuous value
                const continuousStyle: any = ["interpolate", ["linear"], ["to-number", ["get", colorField.displayName]]];
                colorStops.forEach(({colorStop, color}) => {
                    continuousStyle.push(colorStop);
                    continuousStyle.push(color);
                });

                return continuousStyle;
            }

            // Set colors for categorical value
            let categoricalStyle: any = ["match", ["to-string", ["get", colorField.displayName]]];
            colorStops.forEach(({colorStop, color}) => {
                categoricalStyle.push(colorStop);
                categoricalStyle.push(color);
            });

            // Add transparent as default so that we only see regions
            // for which we have data values
            categoricalStyle.push("rgba(255,0,0,255)");

            return categoricalStyle;
        }

        private static getSizes(sizeLimits: Limits, map: any, settings: any, sizeField: any) {
            if (sizeField && sizeLimits && sizeLimits.min != null && sizeLimits.max != null && sizeLimits.min != sizeLimits.max) {
                const style: any[] = ["interpolate", ["linear"], ["to-number", ["get", sizeField.displayName]]];

                const classCount = getClassCount(sizeLimits.values);
                const sizeStops: any[] = getBreaks(sizeLimits.values, ClassificationMethod.Quantile, classCount);
                const sizeDelta = (settings.circle.radius * settings.circle.scaleFactor - settings.circle.radius) / classCount;

                sizeStops.map((sizeStop, index) => {
                    const size = settings.circle.radius + index * sizeDelta;
                    style.push(sizeStop);
                    style.push(size);
                });
                return style;
            } else {
                return ["interpolate", ["linear"], ["zoom"], 0, settings.circle.radius, 18, settings.circle.radius * settings.circle.scaleFactor];
            }
        }
    }
}
