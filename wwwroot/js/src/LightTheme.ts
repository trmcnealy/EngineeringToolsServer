import {createTheme, IPalette, ITheme, ICustomizations} from "office-ui-fabric-react";
import {addVariants} from "@uifabric/variants";

export const LightThemePalette: Partial<IPalette> = {
    themePrimary: "#0277d1",
    themeLighterAlt: "#f3f9fd",
    themeLighter: "#d0e7f8",
    themeLight: "#aad2f1",
    themeTertiary: "#5ca9e3",
    themeSecondary: "#1c86d7",
    themeDarkAlt: "#026bbc",
    themeDark: "#025b9f",
    themeDarker: "#014375",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#595959",
    neutralSecondary: "#373737",
    neutralPrimaryAlt: "#2f2f2f",
    neutralPrimary: "#000000",
    neutralDark: "#151515",
    black: "#0b0b0b",
    white: "#ffffff"
};

export const LightTheme: ITheme = createTheme({
    palette: LightThemePalette,
    semanticColors: {
        buttonText: LightThemePalette.black,
        buttonTextPressed: LightThemePalette.neutralDark,
        buttonTextHovered: LightThemePalette.neutralPrimary,
        disabledBackground: LightThemePalette.neutralQuaternaryAlt,
        inputBackgroundChecked: LightThemePalette.themePrimary,
        menuBackground: LightThemePalette.neutralLighter,
        menuItemBackgroundHovered: LightThemePalette.neutralQuaternaryAlt,
        menuItemBackgroundPressed: LightThemePalette.neutralQuaternary,
        menuDivider: LightThemePalette.neutralTertiaryAlt,
        menuIcon: LightThemePalette.themeDarkAlt,
        menuHeader: LightThemePalette.black,
        menuItemText: LightThemePalette.neutralPrimary,
        menuItemTextHovered: LightThemePalette.neutralDark
    },
    isInverted: true
});

export const LightThemeCustomizations: ICustomizations = {
    settings: {
        theme: LightTheme
    },
    scopedSettings: {
        Card: {
            styles: {
                root: {
                    background: LightTheme.palette.neutralLighter
                }
            }
        },
        DetailsList: {
            styles: {
                headerWrapper: {
                    selectors: {
                        ".ms-DetailsHeader": {
                            borderColor: LightTheme.palette.neutralQuaternary
                        }
                    }
                }
            }
        },
        ActionButton: {
            styles: {
                root: {
                    backgroundColor: LightTheme.palette.white
                },
                rootDisabled: {
                    backgroundColor: LightTheme.palette.neutralLighter
                },
                rootHovered: {
                    backgroundColor: LightTheme.palette.neutralLight
                },
                rootPressed: {
                    backgroundColor: LightTheme.palette.neutralQuaternaryAlt
                }
            }
        },
        DetailsRow: {
            styles: {
                root: {
                    selectors: {
                        ":hover": {
                            background: LightTheme.palette.neutralLighter
                        }
                    },
                    borderColor: LightTheme.palette.neutralQuaternaryAlt
                }
            }
        },
        Modal: {
            styles: {
                main: {
                    backgroundColor: LightTheme.palette.neutralLighter
                }
            }
        },
        Overlay: {
            styles: {
                root: {
                    background: LightTheme.palette.blackTranslucent40
                }
            }
        },
        VerticalDivider: {
            styles: {
                divider: {
                    backgroundColor: LightTheme.palette.neutralQuaternaryAlt
                },
                wrapper: {
                    Backgroundcolor: LightTheme.palette.green
                }
            }
        },
        DocumentCard: {
            styles: {
                root: {
                    border: `1px solid ${LightTheme.palette.neutralQuaternaryAlt}`,
                    selectors: {
                        ".ms-DocumentCardPreview": {
                            borderRight: `1px solid ${LightTheme.palette.neutralQuaternaryAlt}`
                        }
                    }
                }
            }
        },
        DocumentCardPreview: {
            styles: {
                root: {
                    borderBottom: `1px solid ${LightTheme.palette.neutralQuaternaryAlt}`,
                    borderRight: `1px solid ${LightTheme.palette.neutralQuaternaryAlt}`
                }
            }
        },
        Panel: {
            styles: {
                main: {
                    backgroundColor: LightTheme.palette.neutralLighter
                },
                closeButton: {
                    color: LightTheme.palette.neutralSecondary,
                    selectors: {
                        ":hover": {
                            color: LightTheme.palette.neutralPrimary
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
                            backgroundColor: LightTheme.palette.neutralQuaternaryAlt
                        },
                        ":after": {
                            backgroundColor: LightTheme.palette.neutralQuaternaryAlt
                        }
                    }
                }
            }
        },
        SpinButton: {
            styles: {
                inputTextSelected: {
                    color: LightTheme.palette.black,
                    background: LightTheme.palette.themePrimary
                }
            }
        }
    }
};

addVariants(LightThemeCustomizations.settings.theme);
