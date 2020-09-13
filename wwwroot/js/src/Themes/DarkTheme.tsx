import {ICustomizations, ISemanticColors} from "office-ui-fabric-react";
import {DefaultEffects, IPalette, IPartialTheme, IFontStyles, IFontWeight, IRawStyle} from "@fluentui/react";

import {Theme} from "@fluentui/react-theme-provider";
import {addVariants} from "@uifabric/variants";

import {Themes} from "./Themes";
import {DefaultFont} from "./Fonts";

export const DarkThemePalette: Partial<IPalette> = {
    themePrimary: "#0085eb",
    themeLighterAlt: "#000509",
    themeLighter: "#001526",
    themeLight: "#002846",
    themeTertiary: "#00508d",
    themeSecondary: "#0075ce",
    themeDarkAlt: "#1890ed",
    themeDark: "#39a1ef",
    themeDarker: "#6bb8f4",
    neutralLighterAlt: "#232323",
    neutralLighter: "#2c2c2c",
    neutralLight: "#3b3b3b",
    neutralQuaternaryAlt: "#444444",
    neutralQuaternary: "#4b4b4b",
    neutralTertiaryAlt: "#6a6a6a",
    neutralTertiary: "#fcfcfc",
    neutralSecondary: "#fcfcfc",
    neutralPrimaryAlt: "#fdfdfd",
    neutralPrimary: "#fafafa",
    neutralDark: "#fefefe",
    black: "#fefefe",
    white: "#1a1a1a"
};

export const DarkThemeSemanticColors: Partial<ISemanticColors> = {
    buttonText: DarkThemePalette.black,
    buttonTextPressed: DarkThemePalette.neutralDark,
    buttonTextHovered: DarkThemePalette.neutralPrimary,
    disabledBackground: DarkThemePalette.neutralQuaternaryAlt,
    inputBackgroundChecked: DarkThemePalette.themePrimary,
    menuBackground: DarkThemePalette.neutralLighter,
    menuItemBackgroundHovered: DarkThemePalette.neutralQuaternaryAlt,
    menuItemBackgroundPressed: DarkThemePalette.neutralQuaternary,
    menuDivider: DarkThemePalette.neutralTertiaryAlt,
    menuIcon: DarkThemePalette.themeDarkAlt,
    menuHeader: DarkThemePalette.black,
    menuItemText: DarkThemePalette.neutralPrimary,
    menuItemTextHovered: DarkThemePalette.neutralDark
};

export const DarkPartialTheme: IPartialTheme = {
    palette: DarkThemePalette,
    semanticColors: DarkThemeSemanticColors,
    fonts: DefaultFont,
    effects: DefaultEffects,
    isInverted: true,
    disableGlobalClassNames: false
};

export const DarkTheme: Theme = Themes.CreateTheme(DarkPartialTheme);

export const DarkThemeCustomizations: ICustomizations = {
    settings: {
        theme: DarkPartialTheme
    },
    scopedSettings: {
        Card: {
            styles: {
                root: {
                    background: DarkPartialTheme.palette!.neutralLighter
                }
            }
        },
        DetailsList: {
            styles: {
                headerWrapper: {
                    selectors: {
                        ".ms-DetailsHeader": {
                            borderColor: DarkPartialTheme.palette!.neutralQuaternary
                        }
                    }
                }
            }
        },
        ActionButton: {
            styles: {
                root: {
                    backgroundColor: DarkPartialTheme.palette!.white
                },
                rootDisabled: {
                    backgroundColor: DarkPartialTheme.palette!.neutralLighter
                },
                rootHovered: {
                    backgroundColor: DarkPartialTheme.palette!.neutralLight
                },
                rootPressed: {
                    backgroundColor: DarkPartialTheme.palette!.neutralQuaternaryAlt
                }
            }
        },
        DetailsRow: {
            styles: {
                root: {
                    selectors: {
                        ":hover": {
                            background: DarkPartialTheme.palette!.neutralLighter
                        }
                    },
                    borderColor: DarkPartialTheme.palette!.neutralQuaternaryAlt
                }
            }
        },
        Modal: {
            styles: {
                main: {
                    backgroundColor: DarkPartialTheme.palette!.neutralLighter
                }
            }
        },
        Overlay: {
            styles: {
                root: {
                    background: DarkPartialTheme.palette!.blackTranslucent40
                }
            }
        },
        VerticalDivider: {
            styles: {
                divider: {
                    backgroundColor: DarkPartialTheme.palette!.neutralQuaternaryAlt
                },
                wrapper: {
                    Backgroundcolor: DarkPartialTheme.palette!.green
                }
            }
        },
        DocumentCard: {
            styles: {
                root: {
                    border: `1px solid ${DarkPartialTheme.palette!.neutralQuaternaryAlt}`,
                    selectors: {
                        ".ms-DocumentCardPreview": {
                            borderRight: `1px solid ${DarkPartialTheme.palette!.neutralQuaternaryAlt}`
                        }
                    }
                }
            }
        },
        DocumentCardPreview: {
            styles: {
                root: {
                    borderBottom: `1px solid ${DarkPartialTheme.palette!.neutralQuaternaryAlt}`,
                    borderRight: `1px solid ${DarkPartialTheme.palette!.neutralQuaternaryAlt}`
                }
            }
        },
        Panel: {
            styles: {
                main: {
                    backgroundColor: DarkPartialTheme.palette!.neutralLighter
                },
                closeButton: {
                    color: DarkPartialTheme.palette!.neutralSecondary,
                    selectors: {
                        ":hover": {
                            color: DarkPartialTheme.palette!.neutralPrimary
                        }
                    }
                }
            }
        },
        Separator: {
            styles: {
                root: {
                    selectors: {
                        ":before": {
                            backgroundColor: DarkPartialTheme.palette!.neutralQuaternaryAlt
                        },
                        ":after": {
                            backgroundColor: DarkPartialTheme.palette!.neutralQuaternaryAlt
                        }
                    }
                }
            }
        },
        SpinButton: {
            styles: {
                inputTextSelected: {
                    color: DarkPartialTheme.palette!.black,
                    background: DarkPartialTheme.palette!.themePrimary
                }
            }
        }
    }
};

addVariants(DarkThemeCustomizations.settings.theme);
