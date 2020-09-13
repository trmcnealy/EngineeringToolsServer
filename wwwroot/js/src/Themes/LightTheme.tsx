import {ICustomizations, ISemanticColors} from "office-ui-fabric-react";
import {DefaultEffects, IPalette, IPartialTheme, IFontStyles, IFontWeight, IRawStyle} from "@fluentui/react";
import {Theme} from "@fluentui/react-theme-provider";
import {addVariants} from "@uifabric/variants";

import {Themes} from "./Themes";
import {DefaultFont} from "./Fonts";

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

export const LightThemeSemanticColors: Partial<ISemanticColors> = {
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
};

export const LightPartialTheme: IPartialTheme = {
    palette: LightThemePalette,
    semanticColors: LightThemeSemanticColors,
    fonts: DefaultFont,
    effects: DefaultEffects,
    isInverted: true,
    disableGlobalClassNames: false
};

export const LightTheme: Theme = Themes.CreateTheme(LightPartialTheme);

export const LightThemeCustomizations: ICustomizations = {
    settings: {
        theme: LightPartialTheme
    },
    scopedSettings: {
        Card: {
            styles: {
                root: {
                    background: LightPartialTheme.palette!.neutralLighter
                }
            }
        },
        DetailsList: {
            styles: {
                headerWrapper: {
                    selectors: {
                        ".ms-DetailsHeader": {
                            borderColor: LightPartialTheme.palette!.neutralQuaternary
                        }
                    }
                }
            }
        },
        ActionButton: {
            styles: {
                root: {
                    backgroundColor: LightPartialTheme.palette!.white
                },
                rootDisabled: {
                    backgroundColor: LightPartialTheme.palette!.neutralLighter
                },
                rootHovered: {
                    backgroundColor: LightPartialTheme.palette!.neutralLight
                },
                rootPressed: {
                    backgroundColor: LightPartialTheme.palette!.neutralQuaternaryAlt
                }
            }
        },
        DetailsRow: {
            styles: {
                root: {
                    selectors: {
                        ":hover": {
                            background: LightPartialTheme.palette!.neutralLighter
                        }
                    },
                    borderColor: LightPartialTheme.palette!.neutralQuaternaryAlt
                }
            }
        },
        Modal: {
            styles: {
                main: {
                    backgroundColor: LightPartialTheme.palette!.neutralLighter
                }
            }
        },
        Overlay: {
            styles: {
                root: {
                    background: LightPartialTheme.palette!.blackTranslucent40
                }
            }
        },
        VerticalDivider: {
            styles: {
                divider: {
                    backgroundColor: LightPartialTheme.palette!.neutralQuaternaryAlt
                },
                wrapper: {
                    Backgroundcolor: LightPartialTheme.palette!.green
                }
            }
        },
        DocumentCard: {
            styles: {
                root: {
                    border: `1px solid ${LightPartialTheme.palette!.neutralQuaternaryAlt}`,
                    selectors: {
                        ".ms-DocumentCardPreview": {
                            borderRight: `1px solid ${LightPartialTheme.palette!.neutralQuaternaryAlt}`
                        }
                    }
                }
            }
        },
        DocumentCardPreview: {
            styles: {
                root: {
                    borderBottom: `1px solid ${LightPartialTheme.palette!.neutralQuaternaryAlt}`,
                    borderRight: `1px solid ${LightPartialTheme.palette!.neutralQuaternaryAlt}`
                }
            }
        },
        Panel: {
            styles: {
                main: {
                    backgroundColor: LightPartialTheme.palette!.neutralLighter
                },
                closeButton: {
                    color: LightPartialTheme.palette!.neutralSecondary,
                    selectors: {
                        ":hover": {
                            color: LightPartialTheme.palette!.neutralPrimary
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
                            backgroundColor: LightPartialTheme.palette!.neutralQuaternaryAlt
                        },
                        ":after": {
                            backgroundColor: LightPartialTheme.palette!.neutralQuaternaryAlt
                        }
                    }
                }
            }
        },
        SpinButton: {
            styles: {
                inputTextSelected: {
                    color: LightPartialTheme.palette!.black,
                    background: LightPartialTheme.palette!.themePrimary
                }
            }
        }
    }
};

addVariants(LightThemeCustomizations.settings.theme);
