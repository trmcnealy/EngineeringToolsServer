import * as React from "react";
import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";

import {property, sealed} from "./Decorators";
import {LayoutItem} from "./LayoutItem";
import Mapbox, {MapboxProperties} from "./Mapbox";
import {Guid} from "./guid";

@sealed
export default class MapboxLayoutItem extends LayoutItem<MapboxProperties> {
    static defaultLayoutProperties: ReactGridLayout.Layout = {
        i: Guid.newGuid().toString(),
        x: 0,
        y: 0,
        w: 20,
        h: 20
    };

    constructor(props) {
        super(props);
    }

    renderComponent(): React.ReactNode {
        return <Mapbox {...this.props.ComponentProperties} />;
    }
}
