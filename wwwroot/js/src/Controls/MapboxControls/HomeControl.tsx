import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {IconButton, IIconProps} from "@fluentui/react";
import {BindAll, DOMremove, DOMcreate} from "Utilities";

export interface MapboxLayerControlsOptions {
    Map: mapboxgl.Map;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export type Options = {
    container?: HTMLElement;
};

export class HomeControl implements mapboxgl.IControl {
    _map: mapboxgl.Map;
    _controlContainer: HTMLElement;
    _button: HTMLElement;
    _container: HTMLElement;

    constructor(options?: Options) {
        if (options && options.container) {
            if (options.container instanceof (window as any).HTMLElement) {
                this._container = options.container;
            } else {
                console.warn("Home control 'container' must be a DOM element.");
            }
        }
        BindAll(["onClick"], this);
    }

    onAdd(map: mapboxgl.Map) {
        this._map = map;

        if (!this._container) {
            this._container = this._map.getContainer();
        }

        this._controlContainer = DOMcreate("div", "mapboxgl-ctrl mapboxgl-ctrl-group");

        this.setupUI();

        return this._controlContainer;
    }

    onRemove() {
        DOMremove(this._controlContainer);
        this._map = null;
    }

    setupUI() {
        const iconProps: IIconProps = {iconName: "Nav2DMapView"};

        ReactDOM.render(<IconButton iconProps={iconProps} title="Home" ariaLabel="Home" disabled={false} checked={false} onClick={this.onClick} />, this._controlContainer);
    }

    onClick() {
        this._map.flyTo({
            center: [-99.33, 31.64],
            zoom: 6,
            essential: true
        });
    }
}
