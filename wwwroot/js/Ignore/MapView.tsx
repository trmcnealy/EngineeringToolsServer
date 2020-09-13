import * as React from "react";
//import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";
import {Feature, Point, LineString} from "geojson";

import {property, sealed} from "Utilities/Decorators";
import * as UtilityMethods from "Utilities/UtilityMethods";

import {Fabric, initializeIcons, ICustomizations, Customizer} from @fluentui/react;
import {Nav, INavLink, INavLinkGroup} from "office-ui-fabric-react/lib/Nav";

import * as LayoutItem from "LayoutItem";
import FrameRateControl from "FrameRateControl";
import NavMenu from "NavMenu";

import sls = UtilityMethods.sls;
import ColorMethods = UtilityMethods.ColorMethods;
import IsNullish = UtilityMethods.IsNullish;
import As = UtilityMethods.As;
import NotNull = UtilityMethods.NotNull;

export const enum MapLayers {
    WellLocations = 0,
    ReservoirData,
    GasProperties,
    OilProperties
}

export const MapLayersToStringMap = {
    [MapLayers.WellLocations]: "WellLocations",
    [MapLayers.ReservoirData]: "ReservoirData",
    [MapLayers.GasProperties]: "GasProperties",
    [MapLayers.OilProperties]: "OilProperties"
};

export type MapControlLocation = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface MapViewProperties {
    className: string;
    BaseMapStyle: string;
    Center?: mapboxgl.LngLat;
    Zoom?: number;
    Bounds?: mapboxgl.LngLatBounds;
}

export interface MapViewState {
    ShowNavigationControl: boolean;
    NavigationControlLocation: MapControlLocation;

    ShowFullscreenControl: boolean;
    FullscreenControlLocation: MapControlLocation;

    ShowFrameRateControl: boolean;
    FrameRateControlLocation: MapControlLocation;
}

mapboxgl.accessToken = "pk.eyJ1IjoidHJtY25lYWx5IiwiYSI6ImNrZDN3aGNvMzBxNjQycW16Zml2M2UwZmcifQ.aT8sIrXsA2pHPSjw_U-fUA";

@sealed
export default class MapView extends React.Component<MapViewProperties, MapViewState> {
    static accessToken = "pk.eyJ1IjoidHJtY25lYWx5IiwiYSI6ImNrZDN3aGNvMzBxNjQycW16Zml2M2UwZmcifQ.aT8sIrXsA2pHPSjw_U-fUA";

    static LayerIds: string[] = ["WellLocations", "ReservoirData", "GasProperties", "OilProperties"];

    static defaultState: MapViewState = {
        BaseMapStyle: "mapbox://styles/mapbox/dark-v10",

        Center: null,
        Zoom: null,
        Bounds: new mapboxgl.LngLatBounds([
            [-106.52775578, 25.85656136],
            [-93.53154648, 36.49897217]
        ]),

        ShowNavigationControl: true,
        NavigationControlLocation: "top-left",

        ShowFullscreenControl: true,
        FullscreenControlLocation: "top-right",

        ShowFrameRateControl: true,
        FrameRateControlLocation: "top-right"
    } as MapViewState;

    static AddFrameRateControl(map: mapboxgl.Map, location: MapControlLocation): void {
        const fps = new FrameRateControl({
            background: "rgba(0, 0, 0, 0.1)",
            barWidth: 4 * window.devicePixelRatio,
            color: "#7cf859",
            graphHeight: 60 * window.devicePixelRatio,
            graphWidth: 90 * window.devicePixelRatio,
            graphTop: 0,
            graphRight: 5 * window.devicePixelRatio,
            width: 100 * window.devicePixelRatio
        } as any);

        map.addControl(fps, location);
    }

    static AddSourceToMap(map: mapboxgl.Map, dataSourceName: string, dataSource: string): void {
        map.addSource(dataSourceName, {
            type: "geojson",
            data: dataSource
        });
    }

    static AddLayerToMap(map: mapboxgl.Map, dataSourceName: string): void {
        map.addLayer({
            id: dataSourceName,
            type: "line",
            //"metadata": mixed,
            source: dataSourceName,
            //"source-layer": string,
            //"minzoom": number,
            //"maxzoom": number,
            //"filter": FilterSpecification,
            layout: {
                "line-cap": "round",
                "line-join": "round",
                visibility: "visible"
            },
            paint: {
                //"line-opacity": DataDrivenPropertyValueSpecification<number>,
                "line-color": "rgba(255,0,0,255)",
                //"line-translate": PropertyValueSpecification<[number, number]>,
                //"line-translate-anchor": PropertyValueSpecification<"map" | "viewport">,
                "line-width": 8
                //"line-gap-width": DataDrivenPropertyValueSpecification<number>,
                //"line-offset": DataDrivenPropertyValueSpecification<number>,
                //"line-blur": DataDrivenPropertyValueSpecification<number>,
                //"line-dasharray": PropertyValueSpecification<Array<number>>,
                //"line-pattern": DataDrivenPropertyValueSpecification<ResolvedImageSpecification>,
                //"line-gradient": ExpressionSpecification
            }
        });
    }

    static getDataSourceUrl(rootUrl: string, variable: string): string {
        return `${rootUrl}/data/${variable}`;
    }

    Map: mapboxgl.Map;

    DataEvent: EventSource | null;

    Element: HTMLDivElement;

    ElementRef: React.RefObject<HTMLDivElement>;

    constructor(props: MapViewProperties) {
        super(props);

        //this.Properties = {...options, ...MapView.defaultProperties};

        this.state = MapView.defaultState;

        this.ElementRef = React.createRef();
    }

    Initialize(): void {
        if (this.state.ShowNavigationControl) {
            this.Map.addControl(
                new mapboxgl.NavigationControl({
                    showCompass: false
                }),
                this.state.NavigationControlLocation
            );
        }
        if (this.state.ShowFullscreenControl) {
            this.Map.addControl(new mapboxgl.FullscreenControl(), this.state.FullscreenControlLocation);
        }
        if (this.state.ShowFrameRateControl) {
            MapView.AddFrameRateControl(this.Map, this.state.FrameRateControlLocation);
        }

        this.DisableUnwantedControls();
    }

    AddMousePointer(layerId: string): void {
        this.Map.on("mouseenter", layerId, () => {
            this.Map.getCanvas().style.cursor = "pointer";
        });

        this.Map.on("mouseleave", layerId, () => {
            this.Map.getCanvas().style.cursor = "";
        });
    }

    DisableUnwantedControls(): void {
        this.Map.dragRotate.disable();
        this.Map.touchZoomRotate.disableRotation();
        this.Map.boxZoom.disable();
    }

    loadData(): void {
        this.DataEvent = new EventSource("/api/sse");
        this.DataEvent.onopen = this.onopen;
        this.DataEvent.onmessage = this.onmessage;
        this.DataEvent.onerror = this.onerror;
    }

    onopen(event: MessageEvent): MapView {
        return this;
    }

    //on<T extends keyof MapLayerEventType>(
    //    type: T,
    //    layer: string,
    //    listener: (ev: MapLayerEventType[T] & EventData) => void,
    //): this;
    //on<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & EventData) => void): this;
    //on(type: string, listener: (ev: any) => void): this;

    onmessage(event: MessageEvent): MapView {
        this.Map.on("load", () => {
            const urls = JSON.parse(event.data);

            const wellsLocations = MapView.getDataSourceUrl(window.location.origin, urls.WellLocations);
            const reservoirData = MapView.getDataSourceUrl(window.location.origin, urls.ReservoirData);
            const gasProperties = MapView.getDataSourceUrl(window.location.origin, urls.GasProperties);
            const oilProperties = MapView.getDataSourceUrl(window.location.origin, urls.OilProperties);

            this.Map.addSource(MapView.LayerIds[MapLayers.WellLocations], {
                type: "geojson",
                data: wellsLocations
            });

            this.Map.addLayer({
                id: MapView.LayerIds[MapLayers.WellLocations],
                type: "line",
                source: MapView.LayerIds[MapLayers.WellLocations],
                layout: {
                    visibility: "visible",
                    "line-join": "round",
                    "line-cap": "round"
                },
                paint: {
                    "line-color": "#0000FF",
                    "line-width": 2
                }
            });

            this.Map.addSource(MapView.LayerIds[MapLayers.ReservoirData], {
                type: "geojson",
                data: reservoirData
            });

            this.Map.addLayer({
                id: MapView.LayerIds[MapLayers.ReservoirData],
                type: "circle",
                source: MapView.LayerIds[MapLayers.ReservoirData],
                layout: {
                    visibility: "none"
                },
                paint: {
                    "circle-radius": {
                        base: 3,
                        stops: [
                            [12, 5],
                            [22, 180]
                        ]
                    },
                    "circle-color": ColorMethods.GradientRgb("ReservoirDepth", "#ffffff", "#ff0000", 6, 8000, 18000) as any
                }
            } as mapboxgl.Layer | mapboxgl.CustomLayerInterface);

            this.Map.addSource(MapView.LayerIds[MapLayers.GasProperties], {
                type: "geojson",
                data: gasProperties
            });

            this.Map.addLayer({
                id: MapView.LayerIds[MapLayers.GasProperties],
                type: "circle",
                source: MapView.LayerIds[MapLayers.GasProperties],
                layout: {
                    visibility: "visible"
                },
                paint: {
                    "circle-radius": {
                        base: 3,
                        stops: [
                            [12, 5],
                            [22, 180]
                        ]
                    },
                    "circle-color": ColorMethods.GradientRgb("GasSpecificGravity", "#ffff00", "#ff0000", 6, 0.5, 1.0) as any
                }
            } as mapboxgl.Layer | mapboxgl.CustomLayerInterface);

            this.Map.addSource(MapView.LayerIds[MapLayers.OilProperties], {
                type: "geojson",
                data: oilProperties
            });

            this.Map.addLayer({
                id: MapView.LayerIds[MapLayers.OilProperties],
                type: "circle",
                source: MapView.LayerIds[MapLayers.OilProperties],
                layout: {
                    visibility: "none"
                },
                paint: {
                    "circle-radius": {
                        base: 3,
                        stops: [
                            [12, 5],
                            [22, 180]
                        ]
                    },
                    "circle-color": ColorMethods.GradientRgb("OilApiGravity", "#00ff00", "#ff0000", 6, 10, 70) as any
                }
            } as mapboxgl.Layer | mapboxgl.CustomLayerInterface);

            this.AddMousePointer(MapView.LayerIds[MapLayers.WellLocations]);

            this.Map.on("click", MapView.LayerIds[MapLayers.WellLocations], (e) => {
                if ((e = NotNull(e)) || (e.features[0] = NotNull(e.features[0])) || (e.features[0].properties = NotNull(e.features[0].properties))) {
                    //throw "this.Map === null";
                    return;
                }

                const coordinates = As<mapboxgl.LngLatLike>((e.features[0] as Feature<LineString>).geometry.coordinates[0]);

                const description = sls(`<table style="width:100%">
                                            <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
                                            </table>`);

                //const description = sls`<table style="width:100%">
                //<tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
                //<tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
                //<tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
                //<tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
                //<tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
                //<tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
                //<tr><td>ReservoirName</td><td>${e.features[0].properties.ReservoirName}</td></tr>
                //<tr><td>ReservoirDepth</td><td>${e.features[0].properties.ReservoirDepth}</td></tr>
                //<tr><td>GasSpecificGravity</td><td>${e.features[0].properties.GasSpecificGravity}</td></tr>
                //<tr><td>OilApiGravity</td><td>${e.features[0].properties.OilApiGravity}</td></tr>
                //</table>`;

                new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(this.Map);
            });

            this.AddMousePointer(MapView.LayerIds[MapLayers.ReservoirData]);
            this.Map.on("click", MapView.LayerIds[MapLayers.ReservoirData], (e) => {
                if (IsNullish(e) || IsNullish(e.features[0]) || IsNullish(e.features[0].properties)) {
                    //throw "this.Map === null";
                    return;
                }

                const coordinates = As<mapboxgl.LngLatLike>(As<Feature<Point>>(e.features[0]).geometry.coordinates);

                const description = sls(`<table style="width:100%">
                                                <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
                                                <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
                                                <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
                                                <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
                                                <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
                                                <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
                                                <tr><td>ReservoirName</td><td>${e.features[0].properties.ReservoirName}</td></tr>
                                                <tr><td>ReservoirDepth</td><td>${e.features[0].properties.ReservoirDepth.toFixed(2)}</td></tr>
                                                </table>`);

                new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(this.Map);
            });

            this.AddMousePointer(MapView.LayerIds[MapLayers.GasProperties]);
            this.Map.on("click", MapView.LayerIds[MapLayers.GasProperties], (e) => {
                if (IsNullish(e) || IsNullish(e.features[0]) || IsNullish(e.features[0].properties)) {
                    //throw "this.Map === null";
                    return;
                }

                const coordinates = As<mapboxgl.LngLatLike>(As<Feature<Point>>(e.features[0]).geometry.coordinates);

                const description = sls(`<table style="width:100%">
                                                <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
                                                <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
                                                <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
                                                <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
                                                <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
                                                <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
                                                <tr><td>GasSpecificGravity</td><td>${e.features[0].properties.GasSpecificGravity.toFixed(4)}</td></tr>
                                                </table>`);

                new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(this.Map);
            });

            this.AddMousePointer(MapView.LayerIds[MapLayers.OilProperties]);
            this.Map.on("click", MapView.LayerIds[MapLayers.OilProperties], (e) => {
                if (IsNullish(e) || IsNullish(e.features[0]) || IsNullish(e.features[0].properties)) {
                    //throw "this.Map === null";
                    return;
                }

                const coordinates = As<mapboxgl.LngLatLike>(As<Feature<Point>>(e.features[0]).geometry.coordinates);

                const description = sls(`<table style="width:100%">
                                            <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
                                            <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
                                            <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
                                            <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
                                            <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
                                            <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
                                            <tr><td>OilApiGravity</td><td>${e.features[0].properties.OilApiGravity.toFixed(2)}</td></tr>
                                            </table>`);

                new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(this.Map);
            });
        });

        return this;
    }

    onerror(event: MessageEvent): MapView {
        console.error(event);
        if (!IsNullish(this.DataEvent)) {
            this.DataEvent!.close();
        }

        return this;
    }

    componentDidMount() {
        this.Map = new mapboxgl.Map({
            container: this.ElementRef.current,
            style: this.props.BaseMapStyle,
            bounds: this.props.Bounds
            //center: [-99.33, 31.64],
            //zoom: 6
        });

        this.Initialize();
    }

    render() {
        return (
            <div className="mapboxContainer">
                <NavtgnMenu Map={this.Map} />
                <div className={this.props.className} ref={this.ElementRef} />
            </div>
        );
    }
}

//const CommandBarBasicExampleWrapper = () => <Fabric><CommandBarBasicExample /></Fabric>;

//<div class="control-container">
//    <div class="control-top-left">
//    </div>
//    <div class="control-top-right">
//    </div>
//    <div class="control-bottom-left">
//    </div>
//    <div class="control-bottom-right">
//    </div>
//</div>

//<div class="legend gradient-legend legendables open bottom-left">
//    <div></div>
//    <div class="range">
//        <div class="block">
//            <div class="color" style="background: rgb(17, 95, 154) none repeat scroll 0% 0%;"></div>
//            <div class="text extent"><span>0</span><input /></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(25, 132, 197) none repeat scroll 0% 0%;"></div>
//            <div class="text step"><span>22k</span></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(34, 167, 240) none repeat scroll 0% 0%;"></div>
//            <div class="text step"><span>44k</span></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(72, 181, 196) none repeat scroll 0% 0%;"></div>
//            <div class="text step"><span>67k</span></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(118, 198, 143) none repeat scroll 0% 0%;"></div>
//            <div class="text step"><span>89k</span></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(166, 215, 91) none repeat scroll 0% 0%;"></div>
//            <div class="text step"><span>110k</span></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(201, 229, 47) none repeat scroll 0% 0%;"></div>
//            <div class="text step"><span>130k</span></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(208, 238, 17) none repeat scroll 0% 0%;"></div>
//            <div class="text step"><span>160k</span></div>
//        </div>
//        <div class="block">
//            <div class="color" style="background: rgb(208, 244, 0) none repeat scroll 0% 0%;"></div>
//            <div class="text extent"><span>200k</span><input /></div>
//        </div>
//    </div>
//    <div class="lock locked">
//        <svg viewBox="0,0,48,48">
//            <g style="stroke: white;"><path d="M34,20v-4c0-5.5-4.5-10-10-10c-5.5,0-10,4.5-10,10v4H8v20h32V20H34z M18,16c0-3.3,2.7-6,6-6s6,2.7,6,6v4H18V16z"></path></g>
//        </svg>
//    </div>
//</div>
