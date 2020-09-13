import {JSONSchemaType} from "react-hook-form-jsonschema";

export const symbol_JSON: JSONSchemaType = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "StyleFunction": {
            "title": "StyleFunction",
            "type": "object",
            "properties": {
                "stops": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {}
                    },
                    "title": "stops"
                },
                "property": {
                    "type": "string",
                    "title": "property"
                },
                "base": {
                    "type": "number",
                    "title": "base"
                },
                "type": {
                    "enum": [
                        "categorical",
                        "exponential",
                        "identity",
                        "interval"
                    ],
                    "type": "string",
                    "title": "type"
                },
                "default": {
                    "title": "default"
                },
                "colorSpace": {
                    "enum": [
                        "hcl",
                        "lab",
                        "rgb"
                    ],
                    "type": "string",
                    "title": "colorSpace"
                }
            }
        },
        "Anchor": {
            "enum": [
                "bottom",
                "bottom-left",
                "bottom-right",
                "center",
                "left",
                "right",
                "top",
                "top-left",
                "top-right"
            ],
            "type": "string"
        },
        "Visibility": {
            "enum": [
                "none",
                "visible"
            ],
            "type": "string"
        },
        "Layout": {
            "title": "Layout",
            "type": "object",
            "properties": {
                "visibility": {
                    "enum": [
                        "none",
                        "visible"
                    ],
                    "type": "string",
                    "title": "visibility"
                }
            }
        },
        "Expression": {
            "type": "string"
        },
        "Transition": {
            "title": "Transition",
            "type": "object",
            "properties": {
                "delay": {
                    "type": "number",
                    "title": "delay"
                },
                "duration": {
                    "type": "number",
                    "title": "duration"
                }
            }
        },
        "SymbolLayout": {
            "title": "SymbolLayout",
            "type": "object",
            "properties": {
                "symbol-placement": {
                    "enum": [
                        "line",
                        "line-center",
                        "point"
                    ],
                    "type": "string",
                    "title": "symbol-placement"
                },
                "symbol-spacing": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "symbol-spacing"
                },
                "symbol-avoid-edges": {
                    "type": "boolean",
                    "title": "symbol-avoid-edges"
                },
                "symbol-z-order": {
                    "enum": [
                        "source",
                        "viewport-y"
                    ],
                    "type": "string",
                    "title": "symbol-z-order"
                },
                "icon-allow-overlap": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "boolean"
                            ]
                        }
                    ],
                    "title": "icon-allow-overlap"
                },
                "icon-ignore-placement": {
                    "type": "boolean",
                    "title": "icon-ignore-placement"
                },
                "icon-optional": {
                    "type": "boolean",
                    "title": "icon-optional"
                },
                "icon-rotation-alignment": {
                    "enum": [
                        "auto",
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "icon-rotation-alignment"
                },
                "icon-size": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "icon-size"
                },
                "icon-text-fit": {
                    "enum": [
                        "both",
                        "height",
                        "none",
                        "width"
                    ],
                    "type": "string",
                    "title": "icon-text-fit"
                },
                "icon-text-fit-padding": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "number"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "icon-text-fit-padding"
                },
                "icon-image": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "icon-image"
                },
                "icon-rotate": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "icon-rotate"
                },
                "icon-padding": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "icon-padding"
                },
                "icon-keep-upright": {
                    "type": "boolean",
                    "title": "icon-keep-upright"
                },
                "icon-offset": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "array",
                            "items": {
                                "type": "number"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "icon-offset"
                },
                "icon-anchor": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "icon-anchor"
                },
                "icon-pitch-alignment": {
                    "enum": [
                        "auto",
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "icon-pitch-alignment"
                },
                "text-pitch-alignment": {
                    "enum": [
                        "auto",
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "text-pitch-alignment"
                },
                "text-rotation-alignment": {
                    "enum": [
                        "auto",
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "text-rotation-alignment"
                },
                "text-field": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-field"
                },
                "text-font": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-font"
                },
                "text-size": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "text-size"
                },
                "text-max-width": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "text-max-width"
                },
                "text-line-height": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "text-line-height"
                },
                "text-letter-spacing": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "text-letter-spacing"
                },
                "text-justify": {
                    "type": "string",
                    "title": "text-justify"
                },
                "text-anchor": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-anchor"
                },
                "text-max-angle": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "text-max-angle"
                },
                "text-rotate": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "text-rotate"
                },
                "text-padding": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "text-padding"
                },
                "text-keep-upright": {
                    "type": "boolean",
                    "title": "text-keep-upright"
                },
                "text-transform": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-transform"
                },
                "text-offset": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "number"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-offset"
                },
                "text-allow-overlap": {
                    "type": "boolean",
                    "title": "text-allow-overlap"
                },
                "text-ignore-placement": {
                    "type": "boolean",
                    "title": "text-ignore-placement"
                },
                "text-optional": {
                    "type": "boolean",
                    "title": "text-optional"
                },
                "text-radial-offset": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "text-radial-offset"
                },
                "text-variable-anchor": {
                    "type": "array",
                    "items": {
                        "enum": [
                            "bottom",
                            "bottom-left",
                            "bottom-right",
                            "center",
                            "left",
                            "right",
                            "top",
                            "top-left",
                            "top-right"
                        ],
                        "type": "string"
                    },
                    "title": "text-variable-anchor"
                },
                "text-writing-mode": {
                    "type": "array",
                    "items": {
                        "enum": [
                            "horizontal",
                            "vertical"
                        ],
                        "type": "string"
                    },
                    "title": "text-writing-mode"
                },
                "symbol-sort-key": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "symbol-sort-key"
                },
                "visibility": {
                    "enum": [
                        "none",
                        "visible"
                    ],
                    "type": "string",
                    "title": "visibility"
                }
            }
        },
        "SymbolPaint": {
            "title": "SymbolPaint",
            "type": "object",
            "properties": {
                "icon-opacity": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "icon-opacity"
                },
                "icon-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "icon-opacity-transition"
                },
                "icon-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "icon-color"
                },
                "icon-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "icon-color-transition"
                },
                "icon-halo-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "icon-halo-color"
                },
                "icon-halo-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "icon-halo-color-transition"
                },
                "icon-halo-width": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "icon-halo-width"
                },
                "icon-halo-width-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "icon-halo-width-transition"
                },
                "icon-halo-blur": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "icon-halo-blur"
                },
                "icon-halo-blur-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "icon-halo-blur-transition"
                },
                "icon-translate": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "number"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "icon-translate"
                },
                "icon-translate-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "icon-translate-transition"
                },
                "icon-translate-anchor": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "icon-translate-anchor"
                },
                "text-opacity": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "text-opacity"
                },
                "text-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "text-opacity-transition"
                },
                "text-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-color"
                },
                "text-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "text-color-transition"
                },
                "text-halo-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-halo-color"
                },
                "text-halo-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "text-halo-color-transition"
                },
                "text-halo-width": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "text-halo-width"
                },
                "text-halo-width-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "text-halo-width-transition"
                },
                "text-halo-blur": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": [
                                "string",
                                "number"
                            ]
                        }
                    ],
                    "title": "text-halo-blur"
                },
                "text-halo-blur-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "text-halo-blur-transition"
                },
                "text-translate": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "number"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "text-translate"
                },
                "text-translate-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "text-translate-transition"
                },
                "text-translate-anchor": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "text-translate-anchor"
                }
            }
        },
        "Layer": {
            "title": "Layer",
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "title": "id"
                },
                "type": {
                    "enum": [
                        "background",
                        "circle",
                        "fill",
                        "fill-extrusion",
                        "heatmap",
                        "hillshade",
                        "line",
                        "raster",
                        "symbol"
                    ],
                    "type": "string",
                    "title": "type"
                },
                "metadata": {
                    "title": "metadata"
                },
                "ref": {
                    "type": "string",
                    "title": "ref"
                },
                "source": {
                    "type": "string",
                    "title": "source"
                },
                "source-layer": {
                    "type": "string",
                    "title": "source-layer"
                },
                "minzoom": {
                    "type": "number",
                    "title": "minzoom"
                },
                "maxzoom": {
                    "type": "number",
                    "title": "maxzoom"
                },
                "interactive": {
                    "type": "boolean",
                    "title": "interactive"
                },
                "filter": {
                    "type": "array",
                    "items": {},
                    "title": "filter"
                },
                "layout": {
                    "$ref": "#/definitions/SymbolLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/SymbolPaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
