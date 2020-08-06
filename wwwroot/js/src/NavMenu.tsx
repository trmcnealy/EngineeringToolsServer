import * as React from "react";
import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";

import {Fabric, initializeIcons, ICustomizations, Customizer} from "office-ui-fabric-react";
import {Nav, INavLink, INavLinkGroup} from "office-ui-fabric-react/lib/Nav";

import {DarkThemeCustomizations} from "./DarkTheme";
import {LightThemeCustomizations} from "./LightTheme";

import * as Decorators from "./Decorators";
import property = Decorators.property;
import * as UtilityMethods from "./UtilityMethods";
import As = UtilityMethods.As;

export interface NavMenuProperties {
    Map?: mapboxgl.Map;
}

export default class NavMenu extends React.Component<NavMenuProperties> {
    @property() HomeButton: INavLink;
    @property() WellLocationButton: INavLink;
    @property() ReservoirDataButton: INavLink;
    @property() GasPropertiesButton: INavLink;
    @property() OilPropertiesButton: INavLink;

    NavLinkGroups: INavLinkGroup[];

    constructor(props: NavMenuProperties) {
        super(props);

        this.initialize();
    }

    initialize(): void {
        this.HomeButton = As<INavLink>({
            name: "",
            url: "",
            className: "",
            key: "Home",
            target: "_blank",
            icon: "Nav2DMapView",
            title:"Home",
            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
                if (ev !== null && ev !== undefined) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }

                (window as any).map.flyTo({
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
            title:"Wellbore Locations",
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
            title:"Reservoir Depths",
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
            title:"Gas Properties",
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
            title:"Oil Properties",
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

        const visibility = (window as any).map.getLayoutProperty(layerId, "visibility");

        if (visibility === "visible") {
            (window as any).map.setLayoutProperty(layerId, "visibility", "none");
            //element.classList.remove("active");
            //element.classList.add("inactive");
        } else {
            //element.classList.remove("inactive");
            //element.classList.add("active");
            (window as any).map.setLayoutProperty(layerId, "visibility", "visible");
        }
    }

    render() {
        
        initializeIcons();

        const Customizations = DarkThemeCustomizations;

        return (
            <Customizer settings={Customizations.settings} scopedSettings={Customizations.scopedSettings}>
                <Fabric>
                    <Nav initialSelectedKey="GasProperties" groups={this.NavLinkGroups} />
                </Fabric>
            </Customizer>
        );
    }
}

ReactDOM.render(
    <NavMenu />,
    document.getElementById("navMenu")
);


//import { createTheme } from "@uifabric/fluent-theme";
//import { Customizations } from "@uifabric/utilities";

//import { ThemeProvider  } from "@fluentui/react-theme-provider";

//type Partial<T> = {
//    [P in keyof T]?: T[P];
//    };

//Primary color #0085eb
//Text color #fafafa
//Background color #1a1a1a

//Customizations.applySettings({ theme: DarkTheme });

//const navStyles: Partial<INavStyles> = {
//    root: {
//        width: 30
//    },
//    navItem: IStyle
//};

//const NavComponent: React.FunctionComponent = () => {
//    initializeIcons();

//    return (
//        <Nav
//            theme={DarkTheme}
//            selectedKey="WellLocations"
//            groups={navLinkGroups}/>
//    );
//};
//const NavComponentWrapper = () => <Fabric theme={DarkTheme}>
//                                         <NavComponent/>
//                                     </Fabric>;
