import * as React from "react";
import * as ReactDOM from "react-dom";

import sizeMe from "react-sizeme";

import mapboxgl from "mapbox-gl";

import {Fabric, initializeIcons, ICustomizations, Customizer} from "office-ui-fabric-react";
import {Nav, INavLink, INavLinkGroup} from "office-ui-fabric-react/lib/Nav";

import {DarkThemeCustomizations} from "./DarkTheme";
import {LightThemeCustomizations} from "./LightTheme";

import NavMenu from "./NavMenu";

import {property, sealed} from "./Decorators";
import * as UtilityMethods from "./UtilityMethods";
import MapboxControls from "./MapboxControls";
import FrameRateControl from "./FrameRateControl";

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

export interface MapboxProperties {
    className: string;
    BaseMapStyle: string;
    Center?: mapboxgl.LngLat;
    Zoom?: number;
    Bounds?: mapboxgl.LngLatBoundsLike;
}

export interface MapboxState {
    mounted: boolean;

    ShowNavigationControl: boolean;
    NavigationControlLocation: MapControlLocation;

    ShowFullscreenControl: boolean;
    FullscreenControlLocation: MapControlLocation;

    ShowFrameRateControl: boolean;
    FrameRateControlLocation: MapControlLocation;
}

@sealed
export class Mapbox extends React.Component<MapboxProperties, MapboxState> {
    static LayerIds: string[] = ["WellLocations", "ReservoirData", "GasProperties", "OilProperties"];

    static defaultProperties: MapboxProperties = {
        className: "mapboxView",
        BaseMapStyle: "mapbox://styles/mapbox/dark-v10",

        Center: null,
        Zoom: null,
        Bounds:[[-106.52775578, 25.85656136], [-93.53154648, 36.49897217]]
    };

    static defaultState: MapboxState = {
        mounted: false,

        ShowNavigationControl: true,
        NavigationControlLocation: "bottom-right",

        ShowFullscreenControl: true,
        FullscreenControlLocation: "top-left",

        ShowFrameRateControl: true,
        FrameRateControlLocation: "top-right"
    };

    @property() DataEvent: EventSource;

    @property() ElementRef: React.RefObject<HTMLDivElement>;

    @property() Map: mapboxgl.Map;

    constructor(properties: MapboxProperties) {
        super(properties);

        mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

        this.state = Mapbox.defaultState;

        this.ElementRef = React.createRef();
    }

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

    static Initialize(map: mapboxgl.Map, state: MapboxState): void {
        //map.addControl(new MapboxControls(), "bottom-left");

        if (state.ShowNavigationControl) {
            map.addControl(
                new mapboxgl.NavigationControl({
                    showCompass: false
                }),
                state.NavigationControlLocation
            );
        }
        if (state.ShowFullscreenControl) {
            map.addControl(new mapboxgl.FullscreenControl(), state.FullscreenControlLocation);
        }
        if (state.ShowFrameRateControl) {
            Mapbox.AddFrameRateControl(map, state.FrameRateControlLocation);
        }

        Mapbox.DisableUnwantedControls(map);
    }

    static AddMousePointer(map: mapboxgl.Map, layerId: string): void {
        map.on("mouseenter", layerId, () => {
            map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", layerId, () => {
            map.getCanvas().style.cursor = "";
        });
    }

    static DisableUnwantedControls(map: mapboxgl.Map): void {
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();
        map.boxZoom.disable();
    }

    shouldComponentUpdate?(nextProps: Readonly<MapboxProperties>, nextState: Readonly<MapboxState>, nextContext: any): boolean {
        //console.log("Mapbox:shouldComponentUpdate");
        this.Map.resize();
        return true;
    }

    componentDidMount?(): void {
        //console.log(this);
        this.Map = new mapboxgl.Map({
            container: this.ElementRef.current,
            style: this.props.BaseMapStyle,
            bounds: this.props.Bounds
            //center: this.props.Center,
            //zoom: this.props.Zoom,
        });

        Mapbox.Initialize(this.Map, this.state);

        this.removeStupidShit();

        this.setState({mounted: true});
    }

    componentWillUnmount?(): void {
        this.setState({mounted: false});
    }

    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void {}

    render() {
        return (
                <div className="mapboxDiv" ref={this.ElementRef} />
        );
        //return (
        //    <div className="mapboxContainer">
        //        <div className="mapboxDiv" ref={this.ElementRef} />
        //    </div>
        //);
    }

    removeStupidShit() {
        var elements = this.ElementRef.current.getElementsByClassName("mapboxgl-ctrl-attrib-inner");

        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }

        elements = this.ElementRef.current.getElementsByClassName("mapboxgl-ctrl mapboxgl-ctrl-attrib mapboxgl-compact");

        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }
}

export default sizeMe({
    monitorWidth: true,
    monitorHeight: true
})(Mapbox);

//return (
//    <React.Fragment>
//        <NavMenu Map={this.Map}/>
//        <div ref={this.ElementRef}></div>
//    </React.Fragment>
//);
