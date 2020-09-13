import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {sealed, FormatString} from "Utilities";
import {ColorStops} from "DataTypes";

@sealed
export class LegendControl implements mapboxgl.IControl {
    private Map: mapboxgl.Map;
    private LegendContainer: HTMLElement;
    private Legends: Map<string, HTMLElement> = new Map<string, HTMLElement>();

    static readonly DEFAULT_NUMBER_FORMAT = "0.##";

    removeLegends() {
        if (this.LegendContainer) {
            Object.keys(this.Legends).forEach((key) => {
                if (this.Legends[key]) {
                    this.LegendContainer.removeChild(this.Legends[key]);
                }
            });
        }
        this.Legends.clear();
    }

    addLegend(key: string, title: string, data: ColorStops, format: string) {
        if (this.Legends[key]) {
            if (this.LegendContainer) {
                this.LegendContainer.removeChild(this.Legends[key]);
            }
        }

        if (data) {
            this.Legends[key] = this.createLegendElement(title, data, format);
            if (this.LegendContainer) {
                this.LegendContainer.appendChild(this.Legends[key]);
            }
        }
    }

    onAdd(map: mapboxgl.Map): HTMLElement {
        this.Map = map;
        if (!this.LegendContainer) {
            this.LegendContainer = document.createElement("div");
            this.LegendContainer.className = "mapboxgl-ctrl";
            this.LegendContainer.id = "mapbox-legend-container";
        }

        Object.keys(this.Legends).forEach((key) => {
            if (this.Legends[key]) {
                this.LegendContainer.appendChild(this.Legends[key]);
            }
        });

        return this.LegendContainer;
    }

    onRemove(map: mapboxgl.Map) {
        this.removeLegends();
        if (this.LegendContainer) {
            this.LegendContainer.parentNode.removeChild(this.LegendContainer);
        }

        this.Map = undefined;
        this.LegendContainer = undefined;
    }

    getDefaultPosition(): string {
        return "bottom-right";
    }

    createLegendElement(title: string, data: ColorStops, stringFormat: string): HTMLElement {
        const d = document;
        const legend = d.createElement("div");

        legend.setAttribute("class", "mapbox-legend mapboxgl-ctrl-group");

        const titleElement = d.createElement("div");
        const titleText = d.createTextNode(title);
        titleElement.className = "mapbox-legend-title";
        titleElement.appendChild(titleText);
        legend.appendChild(titleElement);

        data.forEach(({colorStop, color}) => {
            // Create line item
            const item = d.createElement("div");

            // Create color element and add to item
            const colorElement = d.createElement("span");
            colorElement.setAttribute("class", "mapbox-legend-color middle");
            colorElement.setAttribute("style", `background-color: ${color};`);
            item.appendChild(colorElement);

            // Create value element and add to item
            const valueElement = document.createElement("span");
            valueElement.setAttribute("class", "mapbox-legend-value middle");
            if (typeof colorStop === "number") {
                const valueText = d.createTextNode(FormatString(stringFormat || LegendControl.DEFAULT_NUMBER_FORMAT, colorStop));
                valueElement.appendChild(valueText);
            } else {
                const valueText = d.createTextNode(colorStop);
                valueElement.appendChild(valueText);
            }
            item.appendChild(valueElement);

            // Add line item to legend
            legend.appendChild(item);
        });

        return legend;
    }
}
