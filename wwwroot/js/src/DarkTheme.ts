import {createTheme, IPalette, ITheme, ICustomizations} from "office-ui-fabric-react";
import {addVariants} from "@uifabric/variants";

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

export const DarkTheme: ITheme = createTheme({
    palette: DarkThemePalette,
    semanticColors: {
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
    },
    isInverted: true
});

export const DarkThemeCustomizations: ICustomizations = {
    settings: {
        theme: DarkTheme
    },
    scopedSettings: {
        Card: {
            styles: {
                root: {
                    background: DarkTheme.palette.neutralLighter
                }
            }
        },
        DetailsList: {
            styles: {
                headerWrapper: {
                    selectors: {
                        ".ms-DetailsHeader": {
                            borderColor: DarkTheme.palette.neutralQuaternary
                        }
                    }
                }
            }
        },
        ActionButton: {
            styles: {
                root: {
                    backgroundColor: DarkTheme.palette.white
                },
                rootDisabled: {
                    backgroundColor: DarkTheme.palette.neutralLighter
                },
                rootHovered: {
                    backgroundColor: DarkTheme.palette.neutralLight
                },
                rootPressed: {
                    backgroundColor: DarkTheme.palette.neutralQuaternaryAlt
                }
            }
        },
        DetailsRow: {
            styles: {
                root: {
                    selectors: {
                        ":hover": {
                            background: DarkTheme.palette.neutralLighter
                        }
                    },
                    borderColor: DarkTheme.palette.neutralQuaternaryAlt
                }
            }
        },
        Modal: {
            styles: {
                main: {
                    backgroundColor: DarkTheme.palette.neutralLighter
                }
            }
        },
        Overlay: {
            styles: {
                root: {
                    background: DarkTheme.palette.blackTranslucent40
                }
            }
        },
        VerticalDivider: {
            styles: {
                divider: {
                    backgroundColor: DarkTheme.palette.neutralQuaternaryAlt
                },
                wrapper: {
                    Backgroundcolor: DarkTheme.palette.green
                }
            }
        },
        DocumentCard: {
            styles: {
                root: {
                    border: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
                    selectors: {
                        ".ms-DocumentCardPreview": {
                            borderRight: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`
                        }
                    }
                }
            }
        },
        DocumentCardPreview: {
            styles: {
                root: {
                    borderBottom: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`,
                    borderRight: `1px solid ${DarkTheme.palette.neutralQuaternaryAlt}`
                }
            }
        },
        Panel: {
            styles: {
                main: {
                    backgroundColor: DarkTheme.palette.neutralLighter
                },
                closeButton: {
                    color: DarkTheme.palette.neutralSecondary,
                    selectors: {
                        ":hover": {
                            color: DarkTheme.palette.neutralPrimary
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
                            backgroundColor: DarkTheme.palette.neutralQuaternaryAlt
                        },
                        ":after": {
                            backgroundColor: DarkTheme.palette.neutralQuaternaryAlt
                        }
                    }
                }
            }
        },
        SpinButton: {
            styles: {
                inputTextSelected: {
                    color: DarkTheme.palette.black,
                    background: DarkTheme.palette.themePrimary
                }
            }
        }
    }
};

addVariants(DarkThemeCustomizations.settings.theme);
