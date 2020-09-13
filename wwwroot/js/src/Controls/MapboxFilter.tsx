import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {MapboxMap} from "./MapboxMap";
import {ISelectionManager} from "DataTypes";
import {SelectionIdBuilder} from "Utilities";
import {BaseLayer} from "MapboxLayers";

let fastDeepEqual: any;

interface queryRenderedFeaturesOptions {
    layers?: string[];
    filter?: any[];
    validate?: boolean;
}

export namespace FeatureOptions {
    function isFeatureEqual(feature: GeoJSON.Feature<GeoJSON.Geometry>, otherFeature: GeoJSON.Feature<GeoJSON.Geometry>): boolean {
        return fastDeepEqual(feature.properties, otherFeature.properties);
    }

    export function isInclude(featureArray: Array<GeoJSON.Feature<GeoJSON.Geometry>>, otherFeature: GeoJSON.Feature<GeoJSON.Geometry>): boolean {
        return featureArray.some((feature) => isFeatureEqual(feature, otherFeature));
    }
}

export type FeatureGeometry = GeoJSON.Feature<GeoJSON.Geometry>;

export class MapboxFilter {
    private box: HTMLElement;
    private start: any;
    private Map: MapboxMap;
    private selectionInProgress: boolean;
    private selectionFinish: number;
    private dragScreenX: number;
    private dragScreenY: number;
    private dragStartTime: number;
    private selectionManager: ISelectionManager;
    private categories: any;
    private prevSelectionByLayer: Map<string, Array<FeatureGeometry>>;

    constructor(map: MapboxMap) {
        this.Map = map;
        this.prevSelectionByLayer = new Map<string, Array<FeatureGeometry>>();

        document.addEventListener("mousedown", (e) => this.onMouseDown(e));
        document.addEventListener("mousemove", (e) => this.onMouseMove(e));
        document.addEventListener("mouseup", (e) => this.onMouseUp(e));
        document.addEventListener("keydown", (e) => this.onKeyDown(e));
        document.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    setCategories(categories: any): void {
        this.categories = categories;
    }

    clearSelection() {
        this.selectionManager.clear();
    }

    hasSelection() {
        return this.selectionManager.hasSelection();
    }

    addSelection(values, role?) {
        let indexes = values;
        let category = this.categories[0];

        if (role) {
            category = this.categories.find((cat) => {
                return cat.source.displayName === role.displayName;
            });

            indexes = values.map((value) => category.values.indexOf(value));
        }

        const selectors = indexes
            .filter((index) => {
                return index >= 0 && index < category.values.length;
            })
            .map((index) => {
                return new SelectionIdBuilder().withCategory(category, index).createSelectionId();
            });

        this.selectionManager.select(selectors, false);
    }

    isSelectionInProgress() {
        return this.selectionInProgress;
    }

    setSelectionInProgress(inProgress) {
        this.selectionInProgress = inProgress;

        if (!inProgress) {
            this.selectionFinish = Date.now();
        }
    }

    RemoveHighlightAndSelection(layers: Array<BaseLayer<any>>) {
        layers.map((layer) => {
            layer.RemoveHighlight(this.Map.GetMetadata());
        });
        this.clearSelection();
    }

    ManageHandlers() {
        //const map = this.Map.GetMap();
        //// Disable box zoom in favour of rectangular selection (Shift + drag)
        //map.boxZoom.disable();
        //const clickHandler = this.createClickHandler(this.Map);
        //map.off("click", clickHandler);
        //map.on("click", clickHandler);
        //const mouseMoveHandler = Debounce(
        //    (e) => {
        //        if (!this.hasSelection() && !this.selectionInProgress) {
        //            const layers = this.Map.GetLayers();
        //            layers.map((layer) => layer.HoverHighLight(e));
        //        }
        //    },
        //    12,
        //    true
        //);
        //const mouseLeaveHandler = Debounce(
        //    (e) => {
        //        if (!this.hasSelection() && !this.selectionInProgress) {
        //            const layers = this.Map.GetLayers();
        //            layers.map((layer) => layer.RemoveHighlight(this.Map.GetMetadata()));
        //        }
        //    },
        //    12,
        //    true
        //);
        //const hoverHighLightLayers = [LineLayer.Id];
        //hoverHighLightLayers.map((hhLayer) => {
        //    map.off("mousemove", hhLayer, mouseMoveHandler);
        //    map.on("mousemove", hhLayer, mouseMoveHandler);
        //    map.off("mouseleave", hhLayer, mouseLeaveHandler);
        //    map.on("mouseleave", hhLayer, mouseLeaveHandler);
        //});
        //const dragStartHandler = (e) => {
        //    this.dragScreenX = e.originalEvent.screenX;
        //    this.dragScreenY = e.originalEvent.screenY;
        //    this.dragStartTime = Date.now();
        //};
        //map.off("dragstart", dragStartHandler);
        //map.on("dragstart", dragStartHandler);
        //const dragEndHandler = (e) => {
        //    if (this.selectionInProgress) {
        //        // Selection is still in progress, so there is nothing to do
        //        return;
        //    }
        //    const dragAfterSelection = Date.now() - this.selectionFinish;
        //    if (dragAfterSelection < 300) {
        //        // Skip the click if selection is still in progress
        //        return;
        //    }
        //    const dragDuration = Date.now() - this.dragStartTime;
        //    if (dragDuration > 500) {
        //        // Drag lasted long enough not to be handled as a click
        //        return;
        //    }
        //    const radius = 5;
        //    if (
        //        this.dragScreenX - radius > e.originalEvent.screenX ||
        //        this.dragScreenX + radius < e.originalEvent.screenX ||
        //        this.dragScreenY - radius > e.originalEvent.screenY ||
        //        this.dragScreenY + radius < e.originalEvent.screenY
        //    ) {
        //        // It was a real drag event
        //        return;
        //    }
        //    // This drag event is considered to be click, so remove the highlight and selection
        //    const layers = this.Map.getLayers();
        //    this.removeHighlightAndSelection(layers);
        //};
        //map.off("dragend", dragEndHandler);
        //map.on("dragend", dragEndHandler);
    }

    // Return the xy coordinates of the mouse position
    mousePos(e) {
        const map = this.Map.GetMap();
        const canvas = map.getCanvasContainer();
        const rect = canvas.getBoundingClientRect();
        return new mapboxgl.Point(e.clientX - rect.left - canvas.clientLeft, e.clientY - rect.top - canvas.clientTop);
    }

    onMouseDown(e: MouseEvent) {
        // Continue the rest of the function if the shiftkey is pressed.
        if (!(e.shiftKey && e.button === 0) || !this.Map) return;
        const map = this.Map.GetMap();
        this.selectionInProgress = true;
        // Disable default drag zooming when the shift key is held down.
        map.dragPan.disable();

        // Capture the first xy coordinates
        this.start = this.mousePos(e);
    }

    onMouseMove(e) {
        // Capture the ongoing xy coordinates
        if (!(e.shiftKey && e.button === 0) || !this.selectionInProgress) {
            // Selection is not in progress
            return;
        }

        const current = this.mousePos(e);
        const map = this.Map.GetMap();
        const canvas = map.getCanvasContainer();

        // Append the box element if it doesnt exist
        if (!this.box) {
            this.box = document.createElement("div");
            this.box.classList.add("boxdraw");
            canvas.appendChild(this.box);
        }

        const minX = Math.min(this.start.x, current.x),
            maxX = Math.max(this.start.x, current.x),
            minY = Math.min(this.start.y, current.y),
            maxY = Math.max(this.start.y, current.y);

        // Adjust width and xy position of the box element ongoing
        const pos = "translate(" + minX + "px," + minY + "px)";
        this.box.style.transform = pos;
        this.box.style.webkitTransform = pos;
        this.box.style.width = maxX - minX + "px";
        this.box.style.height = maxY - minY + "px";
    }

    onMouseUp(e) {
        // Capture xy coordinates
        if (this.selectionInProgress) {
            if (this.start) {
                this.finish([this.start, this.mousePos(e)]);
                return;
            }
        }
    }

    onKeyDown(e) {
        // If the ESC key is pressed
        if (e.keyCode === 27) this.finish(null);
    }

    onKeyUp(e) {
        // Cancel selection when shift is released
        if (e.keyCode === 16) {
            setTimeout(() => {
                this.finish(null);
            }, 300);
        }
    }

    finish(bbox) {
        //this.selectionInProgress = false;
        //const map = this.Map.GetMap();
        //if (this.box) {
        //    this.box.parentNode.removeChild(this.box);
        //    this.box = null;
        //}
        //// If bbox exists. use this value as the argument for `queryRenderedFeatures`
        //if (bbox) {
        //    this.selectionFinish = Date.now();
        //    const layers = this.Map.GetLayers();
        //    if (layers && layers.length > 0) {
        //        const dataColumnMap = this.Map.GetProperties();
        //        layers.map((layer) => {
        //            let features = map.queryRenderedFeatures(bbox, {layers: [layer.GetId()]});
        //            this.UpdateSelection(layer, features, dataColumnMap);
        //        });
        //    }
        //}
        //map.dragPan.enable();
        //this.start = null;
    }

    UpdateSelection(layer: BaseLayer<any>, features: Array<GeoJSON.Feature<GeoJSON.Geometry>>, dataColumnMap: any, toggleSelection = false) {
        //const layerId = layer.GetId();
        //if (toggleSelection && this.prevSelectionByLayer[layerId]) {
        //    const toAdd = features.filter((feature) => !FeatureOptions.isInclude(this.prevSelectionByLayer[layerId], feature));
        //    const toKeep = this.prevSelectionByLayer[layerId].filter((feature) => !FeatureOptions.isInclude(features, feature));
        //    features = toKeep.concat(toAdd);
        //}
        //layer.UpdateSelection(features, dataColumnMap);
        //this.prevSelectionByLayer[layerId] = [...features];
    }

    getSelectionOpacity(opacity) {
        opacity = opacity / 100;
        if (this.hasSelection()) {
            opacity = 0.5 * opacity;
        }
        return opacity;
    }

    private static isToggleClick(e: MouseEvent) {
        if (navigator.platform.toUpperCase().indexOf("MAC") >= 0) {
            return e.metaKey && e.button === 0;
        } else if (navigator.platform.toUpperCase().indexOf("WIN") >= 0) {
            return e.ctrlKey && e.button === 0;
        }

        return (e.metaKey || e.ctrlKey) && e.button === 0;
    }

    createClickHandler(mapboxMap: MapboxMap) {
        const onClick = (e) => {
            const originalEvent = e.originalEvent;
            if ((originalEvent.shiftKey && originalEvent.button === 0) || this.selectionInProgress) {
                // Selection is considered to be still in progress
                return;
            }

            // This is kind of a hack, because we have multiple click handlers installed. For example
            // one is installed here, but another one is installed in lassoDraw.ts, and it might
            // happen that the click handler in lassoDraw.ts gets sooner notified than this one. And
            // in those cases selectionInProgress is already false, but we definitely don't want to
            // remove the selection as a response to that click which actually applied the selection.
            const clickAfterSelection = Date.now() - this.selectionFinish;
            if (clickAfterSelection < 300) {
                // Skip the click if selection is still in progress
                return;
            }

            const radius = 0;
            const minpoint = [e.point["x"] - radius, e.point["y"] - radius] as mapboxgl.PointLike;
            const maxpoint = [e.point["x"] + radius, e.point["y"] + radius] as mapboxgl.PointLike;

            const map = mapboxMap.GetMap();
            const dataColumnMap = this.Map.GetProperties();
            const layers = mapboxMap.GetLayers();

            this.RemoveHighlightAndSelection(layers);

            const isToggleClick = MapboxFilter.isToggleClick(originalEvent);

            // map.queryRenderedFeatures fails
            // when option.layers contains an id which is not on the map
            layers.forEach((layer) => {
                // Clicking without holding down ctrl/cmd clears the previous selection
                if (!isToggleClick) {
                    this.prevSelectionByLayer[layer.GetSettings().GetId()] = new Array<FeatureGeometry>();
                }

                const features: any = map.queryRenderedFeatures([minpoint, maxpoint], {
                    layers: [layer.GetSettings().GetId()]
                });

                if (features && features.length && features[0] && features[0].geometry && features[0].geometry.coordinates) {
                    mapboxMap.HideTooltip();
                    this.UpdateSelection(layer, features, dataColumnMap, isToggleClick);
                } else if (isToggleClick) {
                    // Clicking on an empty space while holding down ctrl/cmd
                    // should not clear the previous selection
                    // (removeHighlightAndSelection has already cleared it)
                    // so it must be added back.
                    this.UpdateSelection(layer, new Array<GeoJSON.Feature<GeoJSON.Geometry>>(), dataColumnMap, isToggleClick);
                }
            });
        };

        return onClick;
    }
}
