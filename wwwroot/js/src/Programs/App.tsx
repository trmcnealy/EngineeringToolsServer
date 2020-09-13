import * as React from "react";

import {Fabric, initializeIcons, ICustomizations, Customizer} from "@fluentui/react";

import {Theme} from "@fluentui/react-theme-provider";

import {DarkThemeCustomizations, DarkTheme, LightThemeCustomizations, LightTheme, Themes} from "Themes";

import { Dashboard } from "Controls";

//import MainLayout from "MainLayout";
//import { DashboardState } from "DashboardState";

//interface AppContextProperties {
//}

//export interface AppProviderProperties {
//    children: JSX.Array<Element>;
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

export class App extends React.Component<AppProperties, AppState> {
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

    getCustomizations(): {customizations: ICustomizations; theme: Theme} {
        const darkMode = this.props.DarkMode as boolean;

        return darkMode ? {customizations: DarkThemeCustomizations, theme: DarkTheme} : {customizations: LightThemeCustomizations, theme: LightTheme};
    }

    shouldComponentUpdate?(nextProps: Readonly<AppProperties>, nextState: Readonly<AppState>, _nextContext: any): boolean {
        if (this.state.Theme !== nextState.Theme || this.state.DarkMode !== nextState.DarkMode) {
            return true;
        }
        return false;
    }

    //    useEffect(() => {
    //    loadMap();
    //}, [container]);

    render(): React.ReactNode {
        initializeIcons();

        const customTheme = this.getCustomizations();

        Themes.setCustomizations(customTheme.customizations);
        Themes.setTheme(customTheme.theme);

        //const dashboardState = new DashboardState();

        //<ThemeProvider theme={this.Properties.Theme}><aside id="navMenu"></aside>
        //</ThemeProvider>
        return (
            <Customizer 
                settings={customTheme.customizations.settings}
                scopedSettings={customTheme.customizations.scopedSettings}
                >
                <Fabric className="root" applyTheme={true}>
                    <Dashboard {...Dashboard.defaultProperties} />
                </Fabric>
            </Customizer>
        );
    }
}
