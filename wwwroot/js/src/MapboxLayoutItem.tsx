import * as React from "react";
import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";

import {property, sealed} from "./Decorators";
import {LayoutItem, LayoutItemProperties } from "./LayoutItem";
import Mapbox, {MapboxProperties} from "./Mapbox";
import {Guid} from "./guid";

@sealed
export default class MapboxLayoutItem extends LayoutItem<MapboxProperties> {

    static defaultLayoutProperties: ReactGridLayout.Layout = {
        i: Guid.Empty.ToString(),
        x: 0,
        y: 0,
        w: 20,
        h: 20
    };

    constructor(props:LayoutItemProperties<MapboxProperties>) {
        super(props);
        //console.log(this.props);
    }

    renderComponent(): React.ReactNode {
        //console.log(this.props.ComponentProperties);
        return <Mapbox {...this.props.ComponentProperties} />;
    }
}
