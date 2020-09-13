import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {IconButton, IIconProps, IContextualMenuProps, Stack, Link} from "@fluentui/react";

import {BindAll, DOMremove, DOMcreate, ToggleLayerVisibility} from "Utilities";

export type LayerOptions = {
    title?: string;
    container?: HTMLElement;
};

export class LayerControl implements mapboxgl.IControl {
    _map: mapboxgl.Map;
    _controlContainer: HTMLElement;
    _clicked: boolean;
    _change: string;
    _button: HTMLElement;
    _container: HTMLElement;
    _title?: string;

    constructor(options?: LayerOptions) {
        this._clicked = true;

        if (options) {
            if (options.container) {
                if (options.container instanceof (window as any).HTMLElement) {
                    this._container = options.container;
                } else {
                    console.warn("Layer control 'container' must be a DOM element.");
                }
            }
            if (options.title) {
                this._title = options.title;
            } else {
                this._title = "";
            }
        }

        BindAll(["onClick", "setupUI"], this);
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

    getDefaultPosition(): string {
        return "top-left";
    }

    setupUI() {
        const iconProps: IIconProps = {iconName: this._clicked ? "MapPinSolid" : "MapPin"};

        ReactDOM.render(
            <IconButton iconProps={iconProps} title={this._title} ariaLabel={this._title} disabled={false} checked={false} onClick={this.onClick} />,
            this._controlContainer
        );
    }

    onClick() {
        this._clicked = !this._clicked;
        ToggleLayerVisibility(this._map, this._controlContainer, this._title);

        this.setupUI();
    }
}
