import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {DataSource} from "./DataSource";

export const WellLocations = new DataSource("WellLocations", "geojson", new Array<string>(), [
    "Api",
    "Surface Longitude 83",
    "Surface Latitude 83",
    "Bottom Longitude 83",
    "Bottom Latitude 83"
]);
