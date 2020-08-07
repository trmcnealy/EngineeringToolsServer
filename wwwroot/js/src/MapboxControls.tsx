import * as React from "react";
import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";

import {Fabric, initializeIcons, ICustomizations, Customizer, Overlay} from "office-ui-fabric-react";
import {Nav, INavLink, INavLinkGroup} from "office-ui-fabric-react/lib/Nav";

import {DarkThemeCustomizations} from "./DarkTheme";
import {LightThemeCustomizations} from "./LightTheme";

import {property, sealed} from "./Decorators";

import * as UtilityMethods from "./UtilityMethods";
import As = UtilityMethods.As;

@sealed
export default class MapboxControls extends React.Component implements mapboxgl.IControl {
    @property() HomeButton: INavLink;
    @property() WellLocationButton: INavLink;
    @property() ReservoirDataButton: INavLink;
    @property() GasPropertiesButton: INavLink;
    @property() OilPropertiesButton: INavLink;

    NavLinkGroups: INavLinkGroup[];

    @property() Container: HTMLDivElement;

    @property() Map: mapboxgl.Map;

    constructor() {
        super({});
    }

    initialize(): void {
        this.HomeButton = As<INavLink>({
            name: "",
            url: "",
            className: "",
            key: "Home",
            target: "_blank",
            icon: "Nav2DMapView",
            title: "Home",
            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
                if (ev !== null && ev !== undefined) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }

                this.Map.flyTo({
                    center: [-99.33, 31.64],
                    zoom: 6,
                    essential: true
                } as mapboxgl.FlyToOptions);
            }
        });

        this.WellLocationButton = As<INavLink>({
            name: "",
            url: "",
            className: "active",
            key: "WellLocations",
            target: "_blank",
            icon: "MapPin",
            title: "Wellbore Locations",
            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
                if (ev !== null && ev !== undefined) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    this.toggleLayerVisibility(ev.currentTarget, "WellLocations");
                }
            }
        });

        this.ReservoirDataButton = As<INavLink>({
            name: "",
            url: "",
            className: "inactive",
            key: "ReservoirData",
            target: "_blank",
            icon: "MapLayers",
            title: "Reservoir Depths",
            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
                if (ev !== null && ev !== undefined) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    this.toggleLayerVisibility(ev.currentTarget, "ReservoirData");
                }
            }
        });

        this.GasPropertiesButton = As<INavLink>({
            name: "",
            url: "",
            className: "active",
            key: "GasProperties",
            target: "_blank",
            icon: "Precipitation",
            title: "Gas Properties",
            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
                if (ev !== null && ev !== undefined) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    this.toggleLayerVisibility(ev.currentTarget, "GasProperties");
                }
            }
        });

        this.OilPropertiesButton = As<INavLink>({
            name: "",
            url: "",
            className: "inactive",
            key: "OilProperties",
            target: "_blank",
            icon: "DropShapeSolid",
            title: "Oil Properties",
            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
                if (ev !== null && ev !== undefined) {
                    ev.preventDefault();
                    ev.stopPropagation();

                    this.toggleLayerVisibility(ev.currentTarget, "OilProperties");
                }
            }
        });

        this.NavLinkGroups = [
            {
                links: [
                    this.HomeButton,
                    this.WellLocationButton,
                    this.ReservoirDataButton,
                    this.GasPropertiesButton,
                    this.OilPropertiesButton
                    //{
                    //    name: "",
                    //    url: "",
                    //    className: "",
                    //    key: "key6",
                    //    target: "_blank",
                    //    icon: "LineChart"
                    //},
                    //{
                    //    name: "",
                    //    url: "",
                    //    className: "",
                    //    key: "key7",
                    //    target: "_blank",
                    //    icon: "LineChart"
                    //},
                    //{
                    //    name: "",
                    //    url: "",
                    //    className: "",
                    //    key: "key2",
                    //    target: "_blank",
                    //    icon: "Processing"
                    //}
                ]
            }
        ];
    }

    toggleLayerVisibility(element: HTMLElement, layerId: string): void {
        const visibility = this.Map.getLayoutProperty(layerId, "visibility");

        if (visibility === "visible") {
            this.Map.setLayoutProperty(layerId, "visibility", "none");
            //element.classList.remove("active");
            //element.classList.add("inactive");
        } else {
            //element.classList.remove("inactive");
            //element.classList.add("active");
            this.Map.setLayoutProperty(layerId, "visibility", "visible");
        }
    }

    onAdd(map: mapboxgl.Map): HTMLElement {
        this.Map = map;

        this.Container = document.createElement("div");

        this.initialize();

        ReactDOM.render(<MapboxControls />, this.Container);

        return this.Container;
    }

    onRemove(map: mapboxgl.Map): any {
        if (this.Container.parentNode !== null) {
            (this.Container.parentNode as any).removeChild(this.Container);
        }

        this.Map = null;

        return this;
    }

    render() {
        return <Nav className="navMenu" initialSelectedKey="GasProperties" groups={this.NavLinkGroups} />;
    }
}
