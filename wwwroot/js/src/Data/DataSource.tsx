import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

//import {parse as parser} from "JSONStream";

//import * as fs from "fs";

//MapLayers.SymbolLayerSettings |
//MapLayers.RasterLayerSettings |
//MapLayers.LineLayerSettings |
//MapLayers.HeatmapLayerSettings |
//MapLayers.CircleLayerSettings |
//MapLayers.FillLayerSettings;

import Geometry = GeoJSON.Geometry;
import Feature = GeoJSON.Feature;
import FeatureCollection = GeoJSON.FeatureCollection;

export type SourceType = "vector" | "raster" | "raster-dem" | "geojson" | "image" | "video" | "canvas";

export type Url = string;

export type DataSetType = Url | Array<Feature<Geometry>> | FeatureCollection<Geometry>;

export class DataSource {
    bounds?: mapboxgl.LngLatBounds;
    id: string;
    type: SourceType;
    filters: Array<string>;
    fields: Array<string>;

    constructor(id: string, type: SourceType, filters: Array<string>, fields: Array<string>) {
        this.id = id;
        this.type = type;
        this.filters = filters;
        this.fields = fields;
    }

    GetBounds(): mapboxgl.LngLatBounds {
        return this.bounds!;
    }

    async GetData(): Promise<string> {
        return DataSource.GetData(this.id, this.type, this.filters, this.fields);
    }

    static async GetFieldNames(): Promise<string> {
        return await DataSource.Get("DataSource/GetFieldNames");
    }

    static async GetData(name: string, type: string, apiFilters: Array<string>, fields: Array<string>): Promise<string> {
        //console.log(fields.map((f) => `&fields=${f}`).join(""));

        const result = await DataSource.Get(`DataSource/GetData?name=${name}&type=${type}&apiFilters=${apiFilters}${fields.map((f) => `&fields=${f}`).join("")}`);

        return `${(window as any).location.origin}/data/${result}`;
    }

    private static async Set<T>(variableName: string, variableData: T) {
        const response = await fetch(`${(window as any).location.origin}/DataSource?${variableName}`, {
            method: "POST",
            cache: "no-cache",
            mode: "same-origin",
            body: JSON.stringify(variableData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response;
    }

    private static async Get(variable: RequestInfo) {
        //${(window as any).location.origin}/
        const response = await fetch(variable, {
            method: "GET"
        });

        if (response.headers["Content-Type"] === "text/plain") {
            return response.text();
        }
        if (response.headers["Content-Type"] === "application/json") {
            return response.json();
        }
        if (response.headers["Content-Type"] === "multipart/form-data") {
            return response.formData();
        }
        if (response.headers["Content-Type"] === "arraybuffer") {
            return response.arrayBuffer();
        }

        return response.toString();
        //},
        //(err) => {
        //    console.error(err);
        //}
    }

    //static StreamFromGeojson(featureStream, filePath) {
    //    const handleError = (err) => {
    //        featureStream.emit("error", err);
    //    };

    //    const reader = fs.createReadStream(filePath);
    //    // parser = ;

    //    reader.on("error", (err) => handleError(new Error(err.message)));
    //    parser.on("error", (err) => {
    //        return handleError(new Error(`'Invalid JSON: ${err.message}'`));
    //    });

    //    (reader as any)
    //        .pipe(parser)
    //        .on(this.Id, (feature) => featureStream.push(feature))
    //        .on("end", () => featureStream.push(null));

    //    //reader.once("pipe", (src) => {
    //    //    src = parser;
    //    //});
    //
    //    //reader.on(this.Id, (feature) => {
    //    //    featureStream.push(feature);
    //    //});
    //
    //    //reader.on("end", () => {
    //    //    featureStream.push(null);
    //    //});
    //}
}

//export class UserCredentials {
//    Uid: Guid;
//    UserName: string;
//    Password: string;
//}

//export interface IDataAdapter {
//    GetData(): any;

//    SetData(o: any);
//}

//@sealed
//export class DataSource {
//    private _dataAdapter: IDataAdapter;

//    CreatedByUser: UserCredentials;

//    HasErrors: boolean;

//    ErrorReport: string;

//    constructor(dataAdapter: IDataAdapter, createdByUser: UserCredentials, errorReport: string = "", hasErrors: boolean = false) {
//        this._dataAdapter = dataAdapter;
//        this.CreatedByUser = createdByUser;
//        this.ErrorReport = errorReport;
//        this.HasErrors = hasErrors;
//    }

//    static Create(dataAdapter: IDataAdapter, createdByUser: UserCredentials): DataSource {
//        return new DataSource(dataAdapter, createdByUser);
//    }

//    SetData(o: any) {
//        this._dataAdapter.SetData(o);
//    }

//    GetData(): any {
//        return this._dataAdapter.GetData();
//    }
//}

//abstract class DataAdapter implements IDataAdapter {

//    constructor() {

//    }

//    abstract GetData(): Object;

//    abstract SetData(o: Object);
//}

//interface HttpResponse<T> extends Response {
//    parsedBody?: T;
//}

//export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
//    const response: HttpResponse<T> = await fetch(request);

//    response.parsedBody = await response.json();
//    return response;
//}

//export async function get<T>(
//    path: string,
//    args: RequestInit = {
//        method: "GET",
//        cache: "no-cache",
//        mode: "same-origin",
//        headers: {
//            "Content-Type": `${mediaType}`
//        }
//    }
//): Promise<HttpResponse<T>>
//{
//    return await http<T>(new Request(`${(window as any).location.origin}/${path}`, args));
//}

//export async function getData(path, variable) {

//const rootUrl = (window as any).location.origin;

//    fetch(`${rootUrl}/${path}`, {
//        method: "GET",
//        cache: "no-cache",
//        mode: "same-origin"
//    }).then(
//        response => {
//            if (response.headers["Content-Type"] === "text/plain") {
//                return response.text();
//            }
//            if (response.headers["Content-Type"] === "application/json") {
//                return response.json();
//            }
//            if (response.headers["Content-Type"] === "multipart/form-data") {
//                return response.formData();
//            }
//            if (response.headers["Content-Type"] === "arraybuffer") {
//                return response.arrayBuffer();
//            }

//            return response.blob();
//        },
//        err => {
//            console.error(err);
//        }
//    );

//    return null;
//}

//export async function post<T>(
//    path: string,
//    body: any,
//    args: RequestInit = {
//        method: "POST",
//        cache: "no-cache",
//        mode: "same-origin",
//        body: JSON.stringify(body)
//    }
//): Promise<HttpResponse<T>> {
//    return await http<T>(new Request(path, args));
//}

//export async function put<T>(
//    path: string,
//    body: any,
//    args: RequestInit = {
//        method: "PUT",
//        cache: "no-cache",
//        mode: "same-origin",
//        body: JSON.stringify(body)
//    }
//): Promise<HttpResponse<T>> {
//    return await http<T>(new Request(path, args));
//}

//export class DataSource {}

////Calculated Columns
////Fields

////loadData(): void {
////    this.DataEvent = new EventSource("/api/sse");
////    this.DataEvent.onopen = this.onopen;
////    this.DataEvent.onmessage = this.onmessage;
////    this.DataEvent.onerror = this.onerror;
////}

////onopen(event: MessageEvent): MapView {
////    return this;
////}

//////on<T extends keyof MapLayerEventType>(
//////    type: T,
//////    layer: string,
//////    listener: (ev: MapLayerEventType[T] & EventData) => void,
//////): this;
//////on<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & EventData) => void): this;
//////on(type: string, listener: (ev: any) => void): this;

////onmessage(event: MessageEvent): MapView {
////    this.Map.on("load", () => {
////        const urls = JSON.parse(event.data);

////        const wellsLocations = MapView.getDataSourceUrl(window.location.origin, urls.WellLocations);
////        const reservoirData = MapView.getDataSourceUrl(window.location.origin, urls.ReservoirData);
////        const gasProperties = MapView.getDataSourceUrl(window.location.origin, urls.GasProperties);
////        const oilProperties = MapView.getDataSourceUrl(window.location.origin, urls.OilProperties);

////        this.Map.addSource(MapView.LayerIds[MapLayers.WellLocations], {
////            type: "geojson",
////            data: wellsLocations
////        });

////        this.Map.addLayer({
////            id: MapView.LayerIds[MapLayers.WellLocations],
////            type: "line",
////            source: MapView.LayerIds[MapLayers.WellLocations],
////            layout: {
////                visibility: "visible",
////                "line-join": "round",
////                "line-cap": "round"
////            },
////            paint: {
////                "line-color": "#0000FF",
////                "line-width": 2
////            }
////        });

////        this.Map.addSource(MapView.LayerIds[MapLayers.ReservoirData], {
////            type: "geojson",
////            data: reservoirData
////        });

////        this.Map.addLayer({
////            id: MapView.LayerIds[MapLayers.ReservoirData],
////            type: "circle",
////            source: MapView.LayerIds[MapLayers.ReservoirData],
////            layout: {
////                visibility: "none"
////            },
////            paint: {
////                "circle-radius": {
////                    base: 3,
////                    stops: [[12, 5], [22, 180]]
////                },
////                "circle-color": ColorMethods.GradientRgb("ReservoirDepth", "#ffffff", "#ff0000", 6, 8000, 18000) as any
////            }
////        } as mapboxgl.Layer | mapboxgl.CustomLayerInterface);

////        this.Map.addSource(MapView.LayerIds[MapLayers.GasProperties], {
////            type: "geojson",
////            data: gasProperties
////        });

////        this.Map.addLayer({
////            id: MapView.LayerIds[MapLayers.GasProperties],
////            type: "circle",
////            source: MapView.LayerIds[MapLayers.GasProperties],
////            layout: {
////                visibility: "visible"
////            },
////            paint: {
////                "circle-radius": {
////                    base: 3,
////                    stops: [[12, 5], [22, 180]]
////                },
////                "circle-color": ColorMethods.GradientRgb("GasSpecificGravity", "#ffff00", "#ff0000", 6, 0.5, 1.0) as any
////            }
////        } as mapboxgl.Layer | mapboxgl.CustomLayerInterface);

////        this.Map.addSource(MapView.LayerIds[MapLayers.OilProperties], {
////            type: "geojson",
////            data: oilProperties
////        });

////        this.Map.addLayer({
////            id: MapView.LayerIds[MapLayers.OilProperties],
////            type: "circle",
////            source: MapView.LayerIds[MapLayers.OilProperties],
////            layout: {
////                visibility: "none"
////            },
////            paint: {
////                "circle-radius": {
////                    base: 3,
////                    stops: [[12, 5], [22, 180]]
////                },
////                "circle-color": ColorMethods.GradientRgb("OilApiGravity", "#00ff00", "#ff0000", 6, 10, 70) as any
////            }
////        } as mapboxgl.Layer | mapboxgl.CustomLayerInterface);

////        this.AddMousePointer(MapView.LayerIds[MapLayers.WellLocations]);

////        this.Map.on("click", MapView.LayerIds[MapLayers.WellLocations], (e) => {
////            if ((e = NotNull(e)) || (e.features[0] = NotNull(e.features[0])) || (e.features[0].properties = NotNull(e.features[0].properties))) {
////                //throw "this.Map === null";
////                return;
////            }

////            const coordinates = As<mapboxgl.LngLatLike>((e.features[0] as Feature<LineString>).geometry.coordinates[0]);

////            const description = sls(`<table style="width:100%">
////                                        <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
////                                        </table>`);

////            //const description = sls`<table style="width:100%">
////            //<tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
////            //<tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
////            //<tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
////            //<tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
////            //<tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
////            //<tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
////            //<tr><td>ReservoirName</td><td>${e.features[0].properties.ReservoirName}</td></tr>
////            //<tr><td>ReservoirDepth</td><td>${e.features[0].properties.ReservoirDepth}</td></tr>
////            //<tr><td>GasSpecificGravity</td><td>${e.features[0].properties.GasSpecificGravity}</td></tr>
////            //<tr><td>OilApiGravity</td><td>${e.features[0].properties.OilApiGravity}</td></tr>
////            //</table>`;

////            new mapboxgl.Popup()
////                .setLngLat(coordinates)
////                .setHTML(description)
////                .addTo(this.Map);
////        });

////        this.AddMousePointer(MapView.LayerIds[MapLayers.ReservoirData]);
////        this.Map.on("click", MapView.LayerIds[MapLayers.ReservoirData], (e) => {
////            if (IsNullish(e) || IsNullish(e.features[0]) || IsNullish(e.features[0].properties)) {
////                //throw "this.Map === null";
////                return;
////            }

////            const coordinates = As<mapboxgl.LngLatLike>(As<Feature<Point>>(e.features[0]).geometry.coordinates);

////            const description = sls(`<table style="width:100%">
////                                            <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
////                                            <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
////                                            <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
////                                            <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
////                                            <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
////                                            <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
////                                            <tr><td>ReservoirName</td><td>${e.features[0].properties.ReservoirName}</td></tr>
////                                            <tr><td>ReservoirDepth</td><td>${e.features[0].properties.ReservoirDepth.toFixed(2)}</td></tr>
////                                            </table>`);

////            new mapboxgl.Popup()
////                .setLngLat(coordinates)
////                .setHTML(description)
////                .addTo(this.Map);
////        });

////        this.AddMousePointer(MapView.LayerIds[MapLayers.GasProperties]);
////        this.Map.on("click", MapView.LayerIds[MapLayers.GasProperties], (e) => {
////            if (IsNullish(e) || IsNullish(e.features[0]) || IsNullish(e.features[0].properties)) {
////                //throw "this.Map === null";
////                return;
////            }

////            const coordinates = As<mapboxgl.LngLatLike>(As<Feature<Point>>(e.features[0]).geometry.coordinates);

////            const description = sls(`<table style="width:100%">
////                                            <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
////                                            <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
////                                            <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
////                                            <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
////                                            <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
////                                            <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
////                                            <tr><td>GasSpecificGravity</td><td>${e.features[0].properties.GasSpecificGravity.toFixed(4)}</td></tr>
////                                            </table>`);

////            new mapboxgl.Popup()
////                .setLngLat(coordinates)
////                .setHTML(description)
////                .addTo(this.Map);
////        });

////        this.AddMousePointer(MapView.LayerIds[MapLayers.OilProperties]);
////        this.Map.on("click", MapView.LayerIds[MapLayers.OilProperties], (e) => {
////            if (IsNullish(e) || IsNullish(e.features[0]) || IsNullish(e.features[0].properties)) {
////                //throw "this.Map === null";
////                return;
////            }

////            const coordinates = As<mapboxgl.LngLatLike>(As<Feature<Point>>(e.features[0]).geometry.coordinates);

////            const description = sls(`<table style="width:100%">
////                                        <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
////                                        <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
////                                        <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
////                                        <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
////                                        <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
////                                        <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
////                                        <tr><td>OilApiGravity</td><td>${e.features[0].properties.OilApiGravity.toFixed(2)}</td></tr>
////                                        </table>`);

////            new mapboxgl.Popup()
////                .setLngLat(coordinates)
////                .setHTML(description)
////                .addTo(this.Map);
////        });
////    });

////    return this;
////}

////onerror(event: MessageEvent): MapView {
////    console.error(event);
////    if (!IsNullish(this.DataEvent)) {
////        this.DataEvent!.close();
////    }

////    return this;
////}
