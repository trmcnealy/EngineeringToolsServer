
import { ICustomizations } from 'office-ui-fabric-react';
import {IPartialTheme} from "@fluentui/react";
import {Theme, ColorPlateSet, TokenSetType} from "@fluentui/react-theme-provider";
import {merge} from "@uifabric/utilities";

//import {DarkThemeCustomizations} from "./DarkTheme";
//import {LightThemeCustomizations} from "./LightTheme";

export interface Tokens {
    body: ColorPlateSet & TokenSetType;
    [key: string]: TokenSetType | any;
}

export class Themes {
    private static Instance: Themes;

    private _currentTheme: Theme;
    get CurrentTheme(): Theme {
        return this._currentTheme;
    }
    set CurrentTheme(theme: Theme) {
        this._currentTheme = theme;
    }

    private _currentCustomizations: ICustomizations;
    get CurrentCustomizations(): ICustomizations {
        return this._currentCustomizations;
    }
    set CurrentCustomizations(customizations: ICustomizations) {
        this._currentCustomizations = customizations;
    }

    static initialize() {
        if (!Themes.Instance) {
            Themes.Instance = new Themes();
        }
    }

    private constructor() {
        //this._currentCustomizations = DarkThemeCustomizations;
        //this._currentTheme = DarkThemeCustomizations.settings.theme;
    }

    static getInstance(): Themes {
        return Themes.Instance;
    }

    static getTheme(): Theme {
        return Themes.Instance.CurrentTheme;
    }
    static setTheme(theme: Theme) {
        Themes.Instance.CurrentTheme = theme;
    }

    static getCustomizations(): ICustomizations {
        return Themes.Instance.CurrentCustomizations;
    }
    static setCustomizations(customizations: ICustomizations) {
        Themes.Instance.CurrentCustomizations = customizations;
    }

    static CreateTheme(partialTheme: IPartialTheme): Theme {
        const defaultTheme: Theme = {
            stylesheets: [],
            tokens: Themes.GetTokens(partialTheme)
        };

        return defaultTheme;
    }

    static GetTokens(partialTheme: IPartialTheme): Tokens {

        const {palette, fonts, semanticColors, effects} = partialTheme;


        const preparedTokens: Tokens = merge({}, Themes.defaultTokens, {
            accent: {
                background: semanticColors!.primaryButtonBackground,
                borderColor: semanticColors!.primaryButtonBorder,
                contentColor: semanticColors!.primaryButtonText,
                iconColor: palette!.white,
                dividerColor: palette!.white,

                hovered: {
                    background: semanticColors!.primaryButtonBackgroundHovered,
                    contentColor: semanticColors!.primaryButtonTextHovered
                },

                pressed: {
                    background: semanticColors!.primaryButtonBackgroundPressed,
                    contentColor: semanticColors!.primaryButtonTextPressed
                },

                disabled: {
                    background: semanticColors!.primaryButtonBackgroundDisabled,
                    contentColor: semanticColors!.buttonTextDisabled,
                    dividerColor: palette!.neutralTertiaryAlt
                },

                checked: {
                    background: semanticColors!.primaryButtonBackgroundPressed,
                    contentColor: semanticColors!.primaryButtonTextPressed
                },

                checkedHovered: {
                    background: semanticColors!.primaryButtonBackgroundPressed,
                    contentColor: semanticColors!.primaryButtonTextPressed
                }
            },

            body: {
                background: semanticColors!.bodyBackground
            },

            button: {
                fontWeight: fonts!.medium!.fontWeight as any,
                fontSize: fonts!.medium!.fontSize as any,
                fontFamily: fonts!.medium!.fontFamily,
                iconSize: fonts!.mediumPlus!.fontSize as any,
                borderRadius: effects!.roundedCorner2,
                focusColor: palette!.neutralSecondary,
                focusInnerColor: palette!.white,

                background: semanticColors!.buttonBackground,
                borderColor: semanticColors!.buttonBorder,
                contentColor: semanticColors!.buttonText,
                dividerColor: palette!.neutralTertiaryAlt,

                hovered: {
                    background: semanticColors!.buttonBackgroundHovered,
                    borderColor: semanticColors!.buttonBorder,
                    contentColor: semanticColors!.buttonTextHovered
                },

                pressed: {
                    background: semanticColors!.buttonBackgroundPressed,
                    contentColor: semanticColors!.buttonTextPressed,
                    borderColor: semanticColors!.buttonBorder
                },

                disabled: {
                    background: semanticColors!.buttonBackgroundDisabled,
                    borderColor: semanticColors!.buttonBorderDisabled,
                    contentColor: semanticColors!.buttonTextDisabled
                },

                checked: {
                    background: semanticColors!.buttonBackgroundPressed,
                    contentColor: semanticColors!.buttonTextChecked
                },

                checkedHovered: {
                    background: semanticColors!.buttonBackgroundPressed,
                    contentColor: semanticColors!.buttonTextCheckedHovered
                }
            }
        });

        return {...preparedTokens};
    }

    static defaultTokens: Tokens = {
        body: {background: "#ffffff"},
        accent: {
            background: "#0078d4",
            contentColor: "#ffffff",
            borderColor: "transparent",
            iconColor: "#ffffff",
            dividerColor: "#ffffff",
            disabled: {
                background: "#f3f2f1",
                contentColor: "#c8c6c4",
                borderColor: "var(--accent-disabled-background)",
                iconColor: "var(--accent-disabled-contentColor)",
                dividerColor: "#c8c6c4"
            },
            hovered: {
                background: "#106ebe",
                contentColor: "#ffffff",
                borderColor: "var(--accent-borderColor)",
                iconColor: "#ffffff"
            },
            pressed: {
                background: "#005a9e",
                contentColor: "var(--accent-contentColor)",
                borderColor: "var(--accent-borderColor)",
                iconColor: "var(--accent-iconColor)"
            },
            focused: {
                background: "var(--accent-background)",
                borderColor: "var(--accent-borderColor)",
                contentColor: "var(--accent-contentColor)",
                iconColor: "var(--accent-iconColor)"
            },
            checked: {
                background: "var(--acent-pressed-background)",
                contentColor: "var(--acent-pressed-contentColor)"
            },
            checkedHovered: {
                background: "var(--acent-pressed-background)",
                contentColor: "var(--acent-pressed-contentColor)"
            }
        },
        button: {
            size: {
                // smallest size supported by default theme is 24px.
                smallest: "24px",
                smaller: "24px",
                small: "24px",
                regular: "32px",
                large: "40px",
                larger: "48px",
                largest: "64px"
            },
            padding: "0 16px",
            minHeight: "var(--button-size-regular)",
            contentGap: "10px",
            iconSize: "16px",
            borderRadius: "2px",
            borderWidth: "1px",
            fontFamily: `'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`,
            fontSize: "14px",
            fontWeight: 400,
            focusColor: "#605e5c",
            focusInnerColor: "#ffffff",
            background: "#ffffff",
            borderColor: "#8a8886",
            contentColor: "#323130",
            iconColor: "inherit",
            dividerColor: "rgba(0, 0, 0, 0.1)",
            dividerLength: "var(--button-minHeight)",
            dividerThickness: "var(--button-borderWidth)",
            disabled: {
                background: "#f3f2f1",
                borderColor: "#f3f2f1",
                contentColor: "#a19f9d",
                iconColor: "var(--button-disabled-contentColor)",
                dividerColor: "#c8c6c4"
            },
            hovered: {
                background: "#f3f2f1",
                borderColor: "#8a8886",
                contentColor: "#201f1e",
                iconColor: "var(--button-iconColor)"
            },
            pressed: {
                background: "#edebe9",
                borderColor: "#8a8886",
                contentColor: "#201f1e",
                iconColor: "var(--button-iconColor)"
            },
            focused: {
                background: "var(--button-background)",
                borderColor: "var(--button-borderColor)",
                contentColor: "var(--button-contentColor)",
                iconColor: "var(--button-iconColor)"
            },
            checked: {
                background: "var(--button-pressed-background)",
                contentColor: "var(--button-pressed-contentColor)"
            },
            checkedHovered: {
                background: "var(--button-pressed-background)",
                contentColor: "var(--button-pressed-contentColor)"
            }
        }
    };
}

Themes.initialize();

//import { Params, ColorBlindnessMode } from '@thematic/color'
//import { loadById, Theme, ThemeListing } from '@thematic/core'

//export const themesLoaded = createAction<ThemeListing[]>('App:Themes:Loaded')
//export const themeInfoSelected = createAction<ThemeListing>(
//	'App:Themes:Selected',
//)
//export const themeLoaded = createAction<Theme>('App:Theme:Loaded')
//export const themeEdited = createAction('App:Theme:Edited')
//export const themeVariantToggled = createAction('App:Theme:VariantToggled')

//export const paramsChanged = createAction<Params>(
//	'App:CoolerPicker:Params:All:Changed',
//)

//export const chartSizeChanged = createAction<number>(
//	'App:Viewer:ChartSize:Changed',
//)
//export const drawNodesChanged = createAction<boolean>(
//	'App:Viewer:DrawNodes:Changed',
//)
//export const drawLinksChanged = createAction<boolean>(
//	'App:Viewer:DrawLinks:Changed',
//)
//export const graphLoaded = createAction<Graph>('App:Viewer:Graph:Loaded')
//export const scaleItemCountChanged = createAction<number>(
//	'App:Viewer:ScaleItems:Changed',
//)
//export const colorBlindnessModeChanged = createAction<ColorBlindnessMode>(
//	'App:Viewer:ColorBlindnessMode:Changed',
//)

//export const themeSelected = (themeInfo: ThemeListing) => (
//	dispatch: Dispatch,
//): void => {
//	const theme = loadById(themeInfo.id)
//	dispatch(themeInfoSelected(themeInfo))
//	dispatch(themeLoaded(theme))
//}
