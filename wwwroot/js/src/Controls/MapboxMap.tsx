import * as React from "react";
import * as ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import * as d3 from "d3";

import {sealed, Action} from "Utilities";
import {DataColumnMetadataMap, ColorPalette} from "DataTypes";
import {DataSource, DataSetType, Url, WellLocations} from "Data";
import {ITooltipServiceWrapper} from "Services";

import {LegendControl, FrameRateControl, HomeControl, LayerControl} from "MapboxControls";
import {LineLayer, LineLayerSettings, MapLayerType} from "MapboxLayers";

import {MapboxFilter} from "./MapboxFilter";
import {MapboxMapProperties, MapControlLocation} from "./MapboxMapProperties";

//const SizedResizable = SizeMe({
//    monitorWidth: true,
//    monitorHeight: true
//})(Resizable);

export const enum MapLayerKind {
    WellLocations = 0,
    ReservoirData,
    GasProperties,
    OilProperties
}

export const MapLayersToStringMap = {
    [MapLayerKind.WellLocations]: "WellLocations",
    [MapLayerKind.ReservoirData]: "ReservoirData",
    [MapLayerKind.GasProperties]: "GasProperties",
    [MapLayerKind.OilProperties]: "OilProperties"
};

export interface MapboxMapState {
    mounted: boolean;
}

@sealed
export class MapboxMap extends React.Component<MapboxMapProperties, MapboxMapState> {
    //static LayerIds: Array<string> = ["WellLocations", "ReservoirData", "GasProperties", "OilProperties"];

    static defaultProperties: MapboxMapProperties = {
        className: "mapboxView",
        BaseMapStyle: "mapbox://styles/mapbox/dark-v10",

        Center: null,
        Zoom: null,
        Bounds: [
            [-106.52775578, 25.85656136],
            [-93.53154648, 36.49897217]
        ],

        ShowNavigationControl: true,
        NavigationControlLocation: "bottom-left",

        ShowFullscreenControl: true,
        FullscreenControlLocation: "top-right",

        ShowFrameRateControl: true,
        FrameRateControlLocation: "top-right",

        LabelPosition: "above",

        Layers: new Map<string, MapLayerType>()
    };

    static defaultState: MapboxMapState = {
        mounted: false
    };

    DataEvent: EventSource;

    ElementRef: React.RefObject<HTMLDivElement>;

    ResizeObserver: any;

    Map: mapboxgl.Map;

    MetaData: DataColumnMetadataMap;

    Layers: Map<string, MapLayerType>;

    UpdatedHandler: Action;

    Filter: MapboxFilter;

    Palette: ColorPalette;

    TooltipServiceWrapper: ITooltipServiceWrapper;

    private legend: LegendControl;

    GetMap(): mapboxgl.Map {
        return this.Map;
    }

    GetMapDiv(): HTMLDivElement | null {
        return this.ElementRef.current;
    }

    GetProperties(): MapboxMapProperties {
        return this.props;
    }

    GetMetadata(): DataColumnMetadataMap {
        return this.MetaData;
    }

    GetLayers(): Array<MapLayerType> {
        return Array.from(this.Layers.values());
    }

    //GetExistingLayers(): Array<MapLayerType> {
    //    return Array.from(this.Layers.values()).filter((layer) => layer.LayerExists());
    //}

    constructor(properties: MapboxMapProperties) {
        super(properties);

        mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";
        //(mapboxgl as any).config.API_URL = "https://trmcnealy.github.io";

        this.state = MapboxMap.defaultState;

        this.ElementRef = React.createRef();

        this.Filter = new MapboxFilter(this);

        this.onResize = this.onResize.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    private AddMap() {
        if (this.Map) {
            return;
        }

        if (this.props.Bounds) {
            this.Map = new mapboxgl.Map({
                container: this.ElementRef.current,
                style: this.props.BaseMapStyle,
                bounds: this.props.Bounds
            });
        } else {
            this.Map = new mapboxgl.Map({
                container: this.ElementRef.current,
                style: this.props.BaseMapStyle,
                center: this.props.Center,
                zoom: this.props.Zoom
            });
        }

        this.Layers = this.props.Layers;

        //this.Layers.push(new Raster(this));
        //this.Layers.push(new Heatmap(this));
        //this.Layers.push(new Cluster(this, () => {
        //    return this.dataColumnMap.cluster.displayName;
        //}))
        //this.Layers.push(new Circle(this, this.filter, this.palette));
        //this.Layers.push(new Choropleth(this, this.filter, this.palette));
        //this.DrawControl.manageHandlers(this);

        //this.Filter.ManageHandlers();
    }

    private RemoveMap() {
        if (this.Map) {
            this.Map.remove();
            this.Map = null as mapboxgl.Map;
            this.Layers.clear();
        }
    }

    Initialize(): void {
        //new MapboxControls({
        //    Map:this.Map,
        //    position: "top-left"
        //});

        this.Map.addControl(new HomeControl(), "top-left");
        this.Map.addControl(new LayerControl({title: "WellLocations"}), "top-left");

        if (this.props.ShowNavigationControl) {
            this.Map.addControl(new mapboxgl.NavigationControl({showCompass: false}), this.props.NavigationControlLocation);
        }
        if (this.props.ShowFullscreenControl) {
            this.Map.addControl(new mapboxgl.FullscreenControl(), this.props.FullscreenControlLocation);
        }
        if (this.props.ShowFrameRateControl) {
            MapboxMap.AddFrameRateControl(this.Map, this.props.FrameRateControlLocation);
        }

        MapboxMap.DisableUnwantedControls(this.Map);
    }

    Destroy(): void {
        this.RemoveMap();
    }

    shouldComponentUpdate?(nextProps: Readonly<MapboxMapProperties>, nextState: Readonly<MapboxMapState>, nextContext: any): boolean {
        //console.log("MapboxMap:shouldComponentUpdate");
        return true;
    }

    componentDidMount?(): void {
        //(window as any).addEventListener("resize", this.onResize.bind(this));

        //Dashboard.AddResize(this.onResize);

        const ResizeObserver = new (window as any).ResizeObserver((entries) => {
            this.onResize(entries);
        });

        ResizeObserver.observe(this.ElementRef.current);

        this.AddMap();

        this.Map.on = this.Map.on.bind(this);

        this.Initialize();

        const WellLocationsId = "WellLocations";

        const colorPalette: ColorPalette = new ColorPalette({
            Palette: d3.rgb(255, 0, 0)
        });

        const lineSettings = new LineLayerSettings(WellLocationsId);
        const lineLayer = new LineLayer(lineSettings, this, WellLocations, this.Filter, colorPalette);

        lineLayer.GetSettings().SetLayout({
            visibility: "visible",
            "line-join": "round",
            "line-cap": "round"
        });

        lineLayer.GetSettings().SetPaint({
            "line-color": "#0000FF",
            "line-width": 2
        });

        this.Map.on("load", () => {
            this.AddLayer(lineLayer);

            //const wellsLocations = GetVariableUrl(WellLocationsId);

            //console.log(wellsLocations);

            //var request = new XMLHttpRequest();

            //(window as any).setInterval(function() {
            //    // make a GET request to parse the GeoJSON at the url
            //    request.open("GET", wellsLocations, true);

            //    request.onload = function() {
            //        if (this.status >= 200 && this.status < 400) {

            //            let variable = UtilityMethods.GetVariable(WellLocationsId).then((variable) => {return variable;});

            //            variable.push(JSON.parse(this.response));

            //            UtilityMethods.SetVariable(WellLocationsId, variable).then((variable) => console.log(variable));

            //            this.Map.GetSource(WellLocationsId).setData(wellsLocations);
            //        }
            //    }.bind(this);

            //    request.send();

            //}, 1000).bind(this);

            //self.Map.addSource(WellLocationsId, {
            //    type: "geojson",
            //    data: wellsLocations
            //});

            //this.Map.addLayer({
            //    id: WellLocationsId,
            //    type: "line",
            //    source: WellLocationsId,
            //    layout: {
            //        visibility: "visible",
            //        "line-join": "round",
            //        "line-cap": "round"
            //    },
            //    paint: {
            //        "line-color": "#0000FF",
            //        "line-width": 2
            //    }
            //});

            //window.map.addSource(ReservoirDataId, {
            //    type: "geojson",
            //    data: reservoirData
            //});

            //window.map.addLayer({
            //    id: ReservoirDataId,
            //    type: "circle",
            //    source: ReservoirDataId,
            //    layout: {
            //        "visibility": "none"
            //    },
            //    paint: {
            //        "circle-radius": {
            //            base: 3,
            //            "stops": [
            //                [12, 5],
            //                [22, 180]
            //            ]
            //        },
            //        "circle-color": colorMethods.GradientRgb("ReservoirDepth", "#ffffff", "#ff0000", 6, 8000, 18000)
            //    }
            //});

            //window.map.addSource(GasPropertiesId, {
            //    type: "geojson",
            //    data: gasProperties
            //});

            //window.map.addLayer({
            //    id: GasPropertiesId,
            //    type: "circle",
            //    source: GasPropertiesId,
            //    layout: {
            //        "visibility": "visible"
            //    },
            //    paint: {
            //        "circle-radius": {
            //            base: 3,
            //            "stops": [
            //                [12, 5],
            //                [22, 180]
            //            ]
            //        },
            //        "circle-color": colorMethods.GradientRgb("GasSpecificGravity", "#ffff00", "#ff0000", 6, 0.5, 1.0)
            //    }
            //});

            //window.map.addSource(OilPropertiesId, {
            //    type: "geojson",
            //    data: oilProperties
            //});

            //window.map.addLayer({
            //    id: OilPropertiesId,
            //    type: "circle",
            //    source: OilPropertiesId,
            //    layout: {
            //        "visibility": "none"
            //    },
            //    paint: {
            //        "circle-radius": {
            //            base: 3,
            //            "stops": [
            //                [12, 5],
            //                [22, 180]
            //            ]
            //        },
            //        "circle-color": colorMethods.GradientRgb("OilApiGravity", "#00ff00", "#ff0000", 6, 10, 70)
            //    }
            //});

            //AddMousePointer(WellLocationsId);
            //window.map.on("click", WellLocationsId, function(e) {

            //    const coordinates = e.features[0].geometry.coordinates[0];

            //    const description = sls`<table style="width:100%">
            //                            <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
            //                            </table>`;

            //    //const description = sls`<table style="width:100%">
            //    //<tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
            //    //<tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
            //    //<tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
            //    //<tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
            //    //<tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
            //    //<tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
            //    //<tr><td>ReservoirName</td><td>${e.features[0].properties.ReservoirName}</td></tr>
            //    //<tr><td>ReservoirDepth</td><td>${e.features[0].properties.ReservoirDepth}</td></tr>
            //    //<tr><td>GasSpecificGravity</td><td>${e.features[0].properties.GasSpecificGravity}</td></tr>
            //    //<tr><td>OilApiGravity</td><td>${e.features[0].properties.OilApiGravity}</td></tr>
            //    //</table>`;

            //    new window.mapboxgl.Popup()
            //        .setLngLat(coordinates)
            //        .setHTML(description)
            //        .addTo(window.map);
            //});

            //AddMousePointer(ReservoirDataId);
            //window.map.on("click", ReservoirDataId, function(e) {

            //    const coordinates = e.features[0].geometry.coordinates;

            //    const description = sls`<table style="width:100%">
            //                                <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
            //                                <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
            //                                <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
            //                                <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
            //                                <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
            //                                <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
            //                                <tr><td>ReservoirName</td><td>${e.features[0].properties.ReservoirName}</td></tr>
            //                                <tr><td>ReservoirDepth</td><td>${e.features[0].properties.ReservoirDepth.toFixed(2)}</td></tr>
            //                                </table>`;

            //    new window.mapboxgl.Popup()
            //        .setLngLat(coordinates)
            //        .setHTML(description)
            //        .addTo(window.map);
            //});

            //AddMousePointer(GasPropertiesId);
            //window.map.on("click", GasPropertiesId, function(e) {

            //    const coordinates = e.features[0].geometry.coordinates;

            //    const description = sls`<table style="width:100%">
            //                                <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
            //                                <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
            //                                <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
            //                                <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
            //                                <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
            //                                <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
            //                                <tr><td>GasSpecificGravity</td><td>${e.features[0].properties.GasSpecificGravity.toFixed(4)}</td></tr>
            //                                </table>`;

            //    new window.mapboxgl.Popup()
            //        .setLngLat(coordinates)
            //        .setHTML(description)
            //        .addTo(window.map);
            //});

            //AddMousePointer(OilPropertiesId);
            //window.map.on("click", OilPropertiesId, function(e) {

            //    const coordinates = e.features[0].geometry.coordinates;

            //    const description = sls`<table style="width:100%">
            //                            <tr><td>API</td><td>${e.features[0].properties.API}</td></tr>
            //                            <tr><td>Name</td><td>${e.features[0].properties.Name}</td></tr>
            //                            <tr><td>Number</td><td>${e.features[0].properties.Number}</td></tr>
            //                            <tr><td>Lease</td><td>${e.features[0].properties.Lease}</td></tr>
            //                            <tr><td>Field</td><td>${e.features[0].properties.Field}</td></tr>
            //                            <tr><td>Company</td><td>${e.features[0].properties.Company}</td></tr>
            //                            <tr><td>OilApiGravity</td><td>${e.features[0].properties.OilApiGravity.toFixed(2)}</td></tr>
            //                            </table>`;

            //    new window.mapboxgl.Popup()
            //        .setLngLat(coordinates)
            //        .setHTML(description)
            //        .addTo(window.map);
            //});
        });

        this.removeStupidShit();

        this.setState({mounted: true});
    }

    componentWillUnmount?(): void {
        //Dashboard.RemoveResize(this.onResize);

        if (this.ResizeObserver) {
            this.ResizeObserver.disconnect();
        }

        this.setState({mounted: false});
    }

    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("componentDidCatch");
    }

    render() {
        return <div ref={this.ElementRef} className="mapboxDiv"></div>;
    }

    onResize(e: Event): void {
        //console.log("MapboxMap:onResizeStart");
        this.Map.resize();
    }

    AddLayer(layer: MapLayerType) {
        const dataSource = layer.GetSource();

        const dataSet = layer
            .GetSource()
            .GetData()
            .then((url) => {
                return url;
            });

        this.Map.addSource(dataSource.id, {
            type: dataSource.type,
            data: dataSet,
            buffer: 512
        } as any);

        this.Map.addLayer(layer.GetSettings());

        //self.Map.addSource(WellLocationsId, {
        //    type: "geojson",
        //    data: wellsLocations
        //});

        //this.Map.addLayer({
        //    id: WellLocationsId,
        //    type: "line",
        //    source: WellLocationsId,
        //    layout: {
        //        visibility: "visible",
        //        "line-join": "round",
        //        "line-cap": "round"
        //    },
        //    paint: {
        //        "line-color": "#0000FF",
        //        "line-width": 2
        //    }
        //});
    }

    AddSources(id: string, dataSet: DataSetType) {
        this.Map.addSource(id, {
            type: "geojson",
            data: dataSet,
            buffer: 512
        } as any);

        return this.Map.getSource(id);
    }

    RemoveSources(id: string) {
        this.Map.removeSource(id);
    }

    AddToMap(dataSet: DataSetType) {
        console.log("AddToMap");
    }

    RemoveFromMap(layerId: string) {
        this.RemoveSources(layerId);
    }

    //AddLayer(properties: MapboxMapProperties, beforeLayerId: string, metadata: DataColumnMetadataMap) {
    //    throw new Error("Method not implemented.");
    //}

    //MoveLayer(beforeLayerId: string) {
    //    LineLayer.LayerOrder.forEach((layerId) => this.Map.moveLayer(layerId, beforeLayerId));
    //}

    //RemoveLayer() {
    //    LineLayer.LayerOrder.forEach((layerId) => this.Map.removeLayer(layerId));
    //    this.RemoveFromMap(map, LineLayer.Id);
    //}

    //onUpdate(map: mapboxgl.Map, settings, updatedHandler: Function) {
    //    try {
    //        this.Layers.map((layer) => {
    //            layer.applySettings(settings, this.MetaData);
    //        });

    //        this.UpdateLegend(settings);

    //        if (settings.api.autozoom) {
    //            const bounds: mapboxgl.LngLatBounds = this.Layers.map((layer) => {
    //                return layer.GetBounds(settings);
    //            }).reduce((acc, bounds) => {
    //                if (!bounds) {
    //                    return acc;
    //                }
    //                if (!acc) {
    //                    return bounds;
    //                }

    //                const combined = FeatureCollection([BBox(acc), BBox(bounds)]);

    //                return BBox(combined);
    //            });
    //            MapboxMap.ZoomToData(map, bounds);
    //        }
    //    } catch (error) {
    //        console.error("OnUpdate failed:", error);
    //    } finally {
    //        updatedHandler();
    //    }
    //}

    HideTooltip(): void {
        this.TooltipServiceWrapper.Hide(true);
    }

    static ZoomToData(map: mapboxgl.Map, bounds: mapboxgl.LngLatBounds): void {
        if (bounds) {
            map.fitBounds(bounds, {
                padding: 20,
                maxZoom: 15
            });
        }
    }

    static AddFrameRateControl(map: mapboxgl.Map, location: MapControlLocation): void {
        const fps = new FrameRateControl();

        map.addControl(fps, location);
    }

    static AddSourceToMap(map: mapboxgl.Map, dataSourceName: string, dataSource: Url): void {
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

    static GetDataSourceUrl(rootUrl: string, variable: string): string {
        return `${rootUrl}/data/${variable}`;
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

    removeStupidShit() {
        let elements = this.ElementRef.current.getElementsByClassName("mapboxgl-ctrl-attrib-inner");

        let i: 0;
        for (i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }

        elements = this.ElementRef.current.getElementsByClassName("mapboxgl-ctrl mapboxgl-ctrl-attrib mapboxgl-compact");

        for (i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }

        elements = this.ElementRef.current.getElementsByClassName("mapboxgl-ctrl-logo mapboxgl-compact");

        for (i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }

    public UpdateLayers(dataView: DataView) {
        //const features = mapboxConverter.convert(dataView);
        //this.Palette.Update(dataView, features);
        //let datasources = {};
        //this.Layers.map((layer) => {
        //    const source = layer.getSource(this.props);
        //    if (source) {
        //        datasources[source.Id] = source;
        //    }
        //});
        //for (let id in datasources) {
        //    let datasource = datasources[id];
        //    datasource.Update(this.Map, features, this.MetaData, this.props);
        //}
        //this.Layers.map((layer) => {
        //    this.TooltipServiceWrapper.addTooltip(
        //        this.Map,
        //        layer,
        //        () => this.MetaData.tooltips,
        //        (tooltipEvent: TooltipEventArgs<number>) => {
        //            return layer.handleTooltip(tooltipEvent, this.MetaData, this.props);
        //        }
        //    );
        //});
        //this.onUpdate(this.Map, this.props, this.UpdatedHandler);
    }

    //private UpdateCurrentLevel(settings, options) {
    //    let temp = options.dataViews[0].metadata[columns];
    //    let temp_indexes = [];
    //    let temp_ii = [];
    //    temp.map((v, i) => {
    //        if (v.roles["location"]) {
    //            temp_indexes.push(v.displayName);
    //            temp_ii.push(i);
    //        }
    //    });

    //    let temp_sources = options.dataViews[0].matrix.rows.levels[0].sources.filter((s) => temp_indexes.indexOf(s.identityExprs[0]["ref"]) > -1);
    //    if (temp_sources.length < 1) {
    //        return;
    //    }

    //    if (temp_sources.length > 1) {
    //        settings.currentLevel = temp_sources.length;
    //    } else {
    //        settings.currentLevel = temp_sources[0].index - temp_ii[0] + 1;
    //    }
    //}

    public Update(options: any) {
        //const dataView: DataView = options.dataViews[0];
        //if (!dataView) {
        //    console.error("No dataView received from powerBI api");
        //    console.log("Update options:", options);
        //    return;
        //}
        //this.props = MapboxSettings.parse<MapboxSettings>(dataView);
        //if (!this.validateOptions(options)) {
        //    this.errorDiv.style.display = "block";
        //    this.removeMap();
        //    return false;
        //}
        //this.filter.setCategories(dataView.categorical.categories);
        //this.MetaData = this.GetMetadata(dataView.metadata);
        //this.UpdateCurrentLevel(this.props.choropleth, options);
        //if (!this.Map) {
        //    this.AddMap();
        //}
        ////if (this.autoZoomControl.isPinned() == this.props.autozoom) {
        ////    this.autoZoomControl.setPin(!this.props.autozoom);
        ////}
        //let style = this.props.BaseMapStyle === "custom" ? this.props.styleUrl : this.props.style;
        //if (this.mapStyle === "" || this.mapStyle !== style) {
        //    const delayedUpdate = (e) => {
        //        this.UpdateLayers(dataView);
        //        this.Map.off("style.load", delayedUpdate);
        //    };
        //    this.Map.on("style.load", delayedUpdate);
        //    if (this.mapStyle != style) {
        //        this.mapStyle = style;
        //        this.Map.setStyle(this.mapStyle);
        //    }
        //} else {
        //    this.UpdateLayers(dataView);
        //    return;
        //}
    }

    //private UpdateLegend(settings: MapLayerSettingsType) {
    //    if (this.legend) {
    //        this.legend.removeLegends();
    //    }

    //    if (!this.MetaData) {
    //        if (this.legend) {
    //            this.Map.removeControl(this.legend);
    //            this.legend = null;
    //        }

    //        return;
    //    }

    //    let removeLegend = true;

    //    this.Layers.forEach((layer) => {
    //        if (!layer.ShowLegend(settings, this.MetaData)) {
    //            return;
    //        }

    //        if (!this.legend) {
    //            this.legend = new LegendControl();
    //            this.Map.addControl(this.legend);
    //        }
    //        layer.addLegend(this.legend, this.MetaData, settings);

    //        removeLegend = false;
    //    });

    //    if (removeLegend && this.legend) {
    //        this.Map.removeControl(this.legend);
    //        this.legend = null;
    //    }
    //}
}
