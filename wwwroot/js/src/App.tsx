import * as React from "react";
import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";

import {Fabric, initializeIcons, ICustomizations, Customizer} from "office-ui-fabric-react";
import {Nav, INavLink, INavLinkGroup} from "office-ui-fabric-react/lib/Nav";

import {ThemeProvider, Theme} from "@fluentui/react-theme-provider";

import {DarkThemeCustomizations} from "./DarkTheme";
import {LightThemeCustomizations} from "./LightTheme";



import * as Decorators from "./Decorators";
import property = Decorators.property;

import Dashboard from "./Dashboard";
//import MainLayout from "./MainLayout";
//import { DashboardState } from "./DashboardState";

//interface AppContextProperties {
//}

//export interface AppProviderProperties {
//    children: JSX.Element[];
//}

//export const AppContext = React.createContext<AppContextProperties>(null);

//export const AppProvider = ({ children }: AppProviderProperties) => {
//    return (
//        <AppContext.Provider>
//            {children}
//        </AppContext.Provider>
//    );
//};

export interface AppProperties {
    DarkMode: boolean;
}

export interface AppState {
    DarkMode: boolean;
    Theme?: Theme;
}

export default class App extends React.Component<AppProperties, AppState> {

    static defaultProperties: AppProperties = {
        DarkMode: true
        //Theme: DarkThemeCustomizations.settings.theme
    } as AppProperties;

    constructor(props: AppProperties) {
        super(props);

        this.state = {
            DarkMode: this.props.DarkMode
        };
    }
    
    getCustomizations(): ICustomizations {
        const darkMode = this.props.DarkMode as boolean;

        return darkMode ? DarkThemeCustomizations : LightThemeCustomizations;
    }

    shouldComponentUpdate?(nextProps: Readonly<AppProperties>, nextState: Readonly<AppState>, nextContext: any): boolean {
        if (this.state.Theme !== nextState.Theme || this.state.DarkMode !== nextState.DarkMode) {
            return true;
        }
        return false;
    }

    //    useEffect(() => {
    //    loadMap();
    //}, [container]);

    render() {
        initializeIcons();

        const Customizations = this.getCustomizations();

        //const dashboardState = new DashboardState();

        return (
            //<ThemeProvider theme={this.Properties.Theme}>
            <Customizer settings={Customizations.settings} scopedSettings={Customizations.scopedSettings}>
                <Fabric className="root" applyTheme={true}>
                    <Dashboard {...Dashboard.defaultProperties}/>
                </Fabric>
            </Customizer>
            //</ThemeProvider>
        );
    }
}
