import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import GeoJsonProperties = GeoJSON.GeoJsonProperties;
import BBox = GeoJSON.BBox;
import Point = GeoJSON.Point;
import MultiPoint = GeoJSON.MultiPoint;
import Position = GeoJSON.Position;
import Polygon = GeoJSON.Polygon;
import MultiPolygon = GeoJSON.MultiPolygon;
import LineString = GeoJSON.LineString;
import MultiLineString = GeoJSON.MultiLineString;
import Geometry = GeoJSON.Geometry;
import GeometryCollection = GeoJSON.GeometryCollection;
import Feature = GeoJSON.Feature;
import FeatureCollection = GeoJSON.FeatureCollection;

export type GeoJsonId = string | number;

export type Coord = Feature<Point> | Point | Position;

// TurfJS String Types
export type Units = "meters" | "millimeters" | "centimeters" | "kilometers" | "acres" | "miles" | "nauticalmiles" | "inches" | "yards" | "feet" | "radians" | "degrees";
export type Grid = "point" | "square" | "hex" | "triangle";
export type Corners = "sw" | "se" | "nw" | "ne" | "center" | "centroid";

export type Lines = LineString | MultiLineString | Polygon | MultiPolygon;
export type AllGeoJSON = Feature | FeatureCollection | Geometry | GeometryCollection;

export const earthRadius = 6371008.8;

export const factors: {[key: string]: number} = {
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    degrees: earthRadius / 111325,
    feet: earthRadius * 3.28084,
    inches: earthRadius * 39.37,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    meters: earthRadius,
    metres: earthRadius,
    miles: earthRadius / 1609.344,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    nauticalmiles: earthRadius / 1852,
    radians: 1,
    yards: earthRadius / 1.0936
};

export const unitsFactors: {[key: string]: number} = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.37,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / earthRadius,
    yards: 1 / 1.0936
};

export const areaFactors: any = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046
};

export function coordEach(geojson, callback, excludeWrapCoord) {
    // Handles null Geometry -- Skips this GeoJSON
    if (!geojson) {
        return;
    }

    let j: number;
    let k: number;
    let l: number;
    let geometry: any;
    let stopG: number;
    let coords;
    let geometryMaybeCollection: any;
    let wrapShrink = 0;
    let coordIndex = 0;
    let isGeometryCollection: boolean;
    const type = geojson.type;
    const isFeatureCollection = type === "FeatureCollection";
    const isFeature = type === "Feature";
    const stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (let featureIndex = 0; featureIndex < stop; featureIndex++) {
        geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;

        isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;

        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (let geomIndex = 0; geomIndex < stopG; geomIndex++) {
            let multiFeatureIndex = 0;
            let geometryIndex = 0;
            geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = geometry.coordinates;
            const geomType: string = geometry.type;

            wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;

            switch (geomType) {
                case null:
                    break;
                case "Point":
                    if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                    coordIndex++;
                    multiFeatureIndex++;
                    break;
                case "LineString":
                    multiFeatureIndex++;
                case "MultiPoint":
                    for (j = 0; j < coords.length; j++) {
                        if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                        coordIndex++;
                        if (geomType === "MultiPoint") multiFeatureIndex++;
                    }
                    break;
                case "Polygon":
                    multiFeatureIndex++;
                case "MultiLineString":
                    for (j = 0; j < coords.length; j++) {
                        for (k = 0; k < coords[j].length - wrapShrink; k++) {
                            if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                            coordIndex++;
                        }
                        if (geomType === "MultiLineString") multiFeatureIndex++;
                        if (geomType === "Polygon") geometryIndex++;
                    }
                    break;
                case "MultiPolygon":
                    for (j = 0; j < coords.length; j++) {
                        geometryIndex = 0;
                        for (k = 0; k < coords[j].length; k++) {
                            for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                                if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                                coordIndex++;
                            }
                            geometryIndex++;
                        }
                        multiFeatureIndex++;
                    }
                    break;
                case "GeometryCollection":
                    for (j = 0; j < geometry.geometries.length; j++) if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
                    break;
                default:
                    throw new Error("Unknown Geometry Type");
            }
        }
    }
}

export function toBBox(geojson: any): BBox {
    const result: BBox = [Infinity, Infinity, -Infinity, -Infinity];
    coordEach(
        geojson,
        (coord) => {
            if (result[0] > coord[0]) {
                result[0] = coord[0];
            }
            if (result[1] > coord[1]) {
                result[1] = coord[1];
            }
            if (result[2] < coord[0]) {
                result[2] = coord[0];
            }
            if (result[3] < coord[1]) {
                result[3] = coord[1];
            }
        },
        null
    );
    return result;
}

export function toFeature<G extends Geometry | null = Geometry, P = GeoJsonProperties>(geom: G, properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): Feature<G, P> {
    const feat: any = {type: "Feature"};
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}

export function toGeometry(type: "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon", coordinates: any[]) {
    switch (type) {
        case "Point":
            return toPoint(coordinates).geometry;
        case "LineString":
            return toLineString(coordinates).geometry;
        case "Polygon":
            return toPolygon(coordinates).geometry;
        case "MultiPoint":
            return toMultiPoint(coordinates).geometry;
        case "MultiLineString":
            return toMultiLineString(coordinates).geometry;
        case "MultiPolygon":
            return toMultiPolygon(coordinates).geometry;
        default:
            throw new Error(type + " is invalid");
    }
}

export function toPoint<P = GeoJsonProperties>(coordinates: Position, properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): Feature<Point, P> {
    const geom: Point = {
        type: "Point",
        coordinates
    };
    return toFeature(geom, properties, options);
}

export function toPoints<P = GeoJsonProperties>(coordinates: Position[], properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): FeatureCollection<Point, P> {
    return toFeatureCollection(
        coordinates.map((coords) => {
            return toPoint(coords, properties);
        }),
        options
    );
}

export function toPolygon<P = GeoJsonProperties>(coordinates: Position[][], properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): Feature<Polygon, P> {
    for (const ring of coordinates) {
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (let j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    const geom: Polygon = {
        type: "Polygon",
        coordinates
    };
    return toFeature(geom, properties, options);
}

export function toPolygons<P = GeoJsonProperties>(coordinates: Position[][][], properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): FeatureCollection<Polygon, P> {
    return toFeatureCollection(
        coordinates.map((coords) => {
            return toPolygon(coords, properties);
        }),
        options
    );
}

export function toLineString<P = GeoJsonProperties>(coordinates: Position[], properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): Feature<LineString, P> {
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    const geom: LineString = {
        type: "LineString",
        coordinates
    };
    return toFeature(geom, properties, options);
}

export function toLineStrings<P = GeoJsonProperties>(
    coordinates: Position[][],
    properties?: P,
    options: {bbox?: BBox; id?: GeoJsonId} = {}
): FeatureCollection<LineString, P> {
    return toFeatureCollection(
        coordinates.map((coords) => {
            return toLineString(coords, properties);
        }),
        options
    );
}

export function toFeatureCollection<G extends Geometry | null = Geometry, P = GeoJsonProperties>(
    features: Array<Feature<G, P>>,
    options: {bbox?: BBox; id?: GeoJsonId} = {}
): FeatureCollection<G, P> {
    const fc: any = {type: "FeatureCollection"};
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}

export function toMultiLineString<P = GeoJsonProperties>(coordinates: Position[][], properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): Feature<MultiLineString, P> {
    const geom: MultiLineString = {
        type: "MultiLineString",
        coordinates
    };
    return toFeature(geom, properties, options);
}

export function toMultiPoint<P = GeoJsonProperties>(coordinates: Position[], properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): Feature<MultiPoint, P> {
    const geom: MultiPoint = {
        type: "MultiPoint",
        coordinates
    };
    return toFeature(geom, properties, options);
}

export function toMultiPolygon<P = GeoJsonProperties>(coordinates: Position[][][], properties?: P, options: {bbox?: BBox; id?: GeoJsonId} = {}): Feature<MultiPolygon, P> {
    const geom: MultiPolygon = {
        type: "MultiPolygon",
        coordinates
    };
    return toFeature(geom, properties, options);
}

export function toGeometryCollection<P = GeoJsonProperties>(
    geometries: Array<Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon>,
    properties?: P,
    options: {bbox?: BBox; id?: GeoJsonId} = {}
): Feature<GeometryCollection, P> {
    const geom: GeometryCollection = {
        type: "GeometryCollection",
        geometries
    };
    return toFeature(geom, properties, options);
}

export function round(num: number, precision = 0): number {
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}

export function radiansToLength(radians: number, units: Units = "kilometers"): number {
    const factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}

export function lengthToRadians(distance: number, units: Units = "kilometers"): number {
    const factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}

export function lengthToDegrees(distance: number, units: Units): number {
    return radiansToDegrees(lengthToRadians(distance, units));
}

export function bearingToAzimuth(bearing: number): number {
    let angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}

export function radiansToDegrees(radians: number): number {
    const degrees = radians % (2 * Math.PI);
    return (degrees * 180) / Math.PI;
}

export function degreesToRadians(degrees: number): number {
    const radians = degrees % 360;
    return (radians * Math.PI) / 180;
}

export function convertLength(length: number, originalUnit: Units = "kilometers", finalUnit: Units = "kilometers"): number {
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}

export function convertArea(area: number, originalUnit: Units = "meters", finalUnit: Units = "kilometers"): number {
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }

    const startFactor = areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }

    const finalFactor = areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }

    return (area / startFactor) * finalFactor;
}

export function isNumber(num: any): boolean {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}

export function isObject(input: any): boolean {
    return !!input && input.constructor === Object;
}

export function validateBBox(bbox: any): void {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach((num) => {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}

export function validateId(id: any): void {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
