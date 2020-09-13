import {JSONSchemaType} from "react-hook-form-jsonschema";

export const all_JSON: JSONSchemaType = {
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
        "BackgroundLayout": {
            "title": "BackgroundLayout",
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
        "BackgroundPaint": {
            "title": "BackgroundPaint",
            "type": "object",
            "properties": {
                "background-color": {
                    "type": "string",
                    "title": "background-color"
                },
                "background-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "background-color-transition"
                },
                "background-pattern": {
                    "type": "string",
                    "title": "background-pattern"
                },
                "background-pattern-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "background-pattern-transition"
                },
                "background-opacity": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "background-opacity"
                },
                "background-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "background-opacity-transition"
                }
            }
        },
        "FillLayout": {
            "title": "FillLayout",
            "type": "object",
            "properties": {
                "fill-sort-key": {
                    "type": "number",
                    "title": "fill-sort-key"
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
        "FillPaint": {
            "title": "FillPaint",
            "type": "object",
            "properties": {
                "fill-antialias": {
                    "type": [
                        "string",
                        "boolean"
                    ],
                    "title": "fill-antialias"
                },
                "fill-opacity": {
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
                    "title": "fill-opacity"
                },
                "fill-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-opacity-transition"
                },
                "fill-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "fill-color"
                },
                "fill-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-color-transition"
                },
                "fill-outline-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "fill-outline-color"
                },
                "fill-outline-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-outline-color-transition"
                },
                "fill-translate": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "title": "fill-translate"
                },
                "fill-translate-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-translate-transition"
                },
                "fill-translate-anchor": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "fill-translate-anchor"
                },
                "fill-pattern": {
                    "type": "string",
                    "title": "fill-pattern"
                },
                "fill-pattern-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-pattern-transition"
                }
            }
        },
        "FillExtrusionLayout": {
            "title": "FillExtrusionLayout",
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
        "FillExtrusionPaint": {
            "title": "FillExtrusionPaint",
            "type": "object",
            "properties": {
                "fill-extrusion-opacity": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "fill-extrusion-opacity"
                },
                "fill-extrusion-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-extrusion-opacity-transition"
                },
                "fill-extrusion-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "fill-extrusion-color"
                },
                "fill-extrusion-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-extrusion-color-transition"
                },
                "fill-extrusion-translate": {
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
                    "title": "fill-extrusion-translate"
                },
                "fill-extrusion-translate-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-extrusion-translate-transition"
                },
                "fill-extrusion-translate-anchor": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "fill-extrusion-translate-anchor"
                },
                "fill-extrusion-pattern": {
                    "type": "string",
                    "title": "fill-extrusion-pattern"
                },
                "fill-extrusion-pattern-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-extrusion-pattern-transition"
                },
                "fill-extrusion-height": {
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
                    "title": "fill-extrusion-height"
                },
                "fill-extrusion-height-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-extrusion-height-transition"
                },
                "fill-extrusion-base": {
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
                    "title": "fill-extrusion-base"
                },
                "fill-extrusion-base-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "fill-extrusion-base-transition"
                },
                "fill-extrusion-vertical-gradient": {
                    "type": "boolean",
                    "title": "fill-extrusion-vertical-gradient"
                }
            }
        },
        "LineLayout": {
            "title": "LineLayout",
            "type": "object",
            "properties": {
                "line-cap": {
                    "enum": [
                        "butt",
                        "round",
                        "square"
                    ],
                    "type": "string",
                    "title": "line-cap"
                },
                "line-join": {
                    "type": "string",
                    "title": "line-join"
                },
                "line-miter-limit": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "line-miter-limit"
                },
                "line-round-limit": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "line-round-limit"
                },
                "line-sort-key": {
                    "type": "number",
                    "title": "line-sort-key"
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
        "LinePaint": {
            "title": "LinePaint",
            "type": "object",
            "properties": {
                "line-opacity": {
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
                    "title": "line-opacity"
                },
                "line-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-opacity-transition"
                },
                "line-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "line-color"
                },
                "line-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-color-transition"
                },
                "line-translate": {
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
                    "title": "line-translate"
                },
                "line-translate-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-translate-transition"
                },
                "line-translate-anchor": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "line-translate-anchor"
                },
                "line-width": {
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
                    "title": "line-width"
                },
                "line-width-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-width-transition"
                },
                "line-gap-width": {
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
                    "title": "line-gap-width"
                },
                "line-gap-width-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-gap-width-transition"
                },
                "line-offset": {
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
                    "title": "line-offset"
                },
                "line-offset-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-offset-transition"
                },
                "line-blur": {
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
                    "title": "line-blur"
                },
                "line-blur-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-blur-transition"
                },
                "line-dasharray": {
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
                    "title": "line-dasharray"
                },
                "line-dasharray-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-dasharray-transition"
                },
                "line-pattern": {
                    "type": "string",
                    "title": "line-pattern"
                },
                "line-pattern-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "line-pattern-transition"
                },
                "line-gradient": {
                    "type": "string",
                    "title": "line-gradient"
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
        "RasterLayout": {
            "title": "RasterLayout",
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
        "RasterPaint": {
            "title": "RasterPaint",
            "type": "object",
            "properties": {
                "raster-opacity": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "raster-opacity"
                },
                "raster-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "raster-opacity-transition"
                },
                "raster-hue-rotate": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "raster-hue-rotate"
                },
                "raster-hue-rotate-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "raster-hue-rotate-transition"
                },
                "raster-brightness-min": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "raster-brightness-min"
                },
                "raster-brightness-min-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "raster-brightness-min-transition"
                },
                "raster-brightness-max": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "raster-brightness-max"
                },
                "raster-brightness-max-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "raster-brightness-max-transition"
                },
                "raster-saturation": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "raster-saturation"
                },
                "raster-saturation-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "raster-saturation-transition"
                },
                "raster-contrast": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "raster-contrast"
                },
                "raster-contrast-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "raster-contrast-transition"
                },
                "raster-fade-duration": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "raster-fade-duration"
                },
                "raster-resampling": {
                    "enum": [
                        "linear",
                        "nearest"
                    ],
                    "type": "string",
                    "title": "raster-resampling"
                },
                "circle-sort-key": {
                    "type": "number",
                    "title": "circle-sort-key"
                }
            }
        },
        "CircleLayout": {
            "title": "CircleLayout",
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
        "CirclePaint": {
            "title": "CirclePaint",
            "type": "object",
            "properties": {
                "circle-radius": {
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
                    "title": "circle-radius"
                },
                "circle-radius-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-radius-transition"
                },
                "circle-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "circle-color"
                },
                "circle-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-color-transition"
                },
                "circle-blur": {
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
                    "title": "circle-blur"
                },
                "circle-blur-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-blur-transition"
                },
                "circle-opacity": {
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
                    "title": "circle-opacity"
                },
                "circle-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-opacity-transition"
                },
                "circle-translate": {
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
                    "title": "circle-translate"
                },
                "circle-translate-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-translate-transition"
                },
                "circle-translate-anchor": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "circle-translate-anchor"
                },
                "circle-pitch-scale": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "circle-pitch-scale"
                },
                "circle-pitch-alignment": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "circle-pitch-alignment"
                },
                "circle-stroke-width": {
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
                    "title": "circle-stroke-width"
                },
                "circle-stroke-width-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-stroke-width-transition"
                },
                "circle-stroke-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "circle-stroke-color"
                },
                "circle-stroke-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-stroke-color-transition"
                },
                "circle-stroke-opacity": {
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
                    "title": "circle-stroke-opacity"
                },
                "circle-stroke-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "circle-stroke-opacity-transition"
                }
            }
        },
        "HeatmapLayout": {
            "title": "HeatmapLayout",
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
        "HeatmapPaint": {
            "title": "HeatmapPaint",
            "type": "object",
            "properties": {
                "heatmap-radius": {
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
                    "title": "heatmap-radius"
                },
                "heatmap-radius-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "heatmap-radius-transition"
                },
                "heatmap-weight": {
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
                    "title": "heatmap-weight"
                },
                "heatmap-intensity": {
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
                    "title": "heatmap-intensity"
                },
                "heatmap-intensity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "heatmap-intensity-transition"
                },
                "heatmap-color": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/StyleFunction"
                        },
                        {
                            "type": "string"
                        }
                    ],
                    "title": "heatmap-color"
                },
                "heatmap-opacity": {
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
                    "title": "heatmap-opacity"
                },
                "heatmap-opacity-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "heatmap-opacity-transition"
                }
            }
        },
        "HillshadeLayout": {
            "title": "HillshadeLayout",
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
        "HillshadePaint": {
            "title": "HillshadePaint",
            "type": "object",
            "properties": {
                "hillshade-illumination-direction": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "hillshade-illumination-direction"
                },
                "hillshade-illumination-anchor": {
                    "enum": [
                        "map",
                        "viewport"
                    ],
                    "type": "string",
                    "title": "hillshade-illumination-anchor"
                },
                "hillshade-exaggeration": {
                    "type": [
                        "string",
                        "number"
                    ],
                    "title": "hillshade-exaggeration"
                },
                "hillshade-exaggeration-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "hillshade-exaggeration-transition"
                },
                "hillshade-shadow-color": {
                    "type": "string",
                    "title": "hillshade-shadow-color"
                },
                "hillshade-shadow-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "hillshade-shadow-color-transition"
                },
                "hillshade-highlight-color": {
                    "type": "string",
                    "title": "hillshade-highlight-color"
                },
                "hillshade-highlight-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "hillshade-highlight-color-transition"
                },
                "hillshade-accent-color": {
                    "type": "string",
                    "title": "hillshade-accent-color"
                },
                "hillshade-accent-color-transition": {
                    "$ref": "#/definitions/Transition",
                    "title": "hillshade-accent-color-transition"
                }
            }
        },
        "AnyLayout": {
            "anyOf": [
                {
                    "$ref": "#/definitions/BackgroundLayout"
                },
                {
                    "$ref": "#/definitions/FillLayout"
                },
                {
                    "$ref": "#/definitions/FillExtrusionLayout"
                },
                {
                    "$ref": "#/definitions/LineLayout"
                },
                {
                    "$ref": "#/definitions/SymbolLayout"
                },
                {
                    "$ref": "#/definitions/RasterLayout"
                },
                {
                    "$ref": "#/definitions/CircleLayout"
                },
                {
                    "$ref": "#/definitions/HeatmapLayout"
                },
                {
                    "$ref": "#/definitions/HillshadeLayout"
                }
            ]
        },
        "AnyPaint": {
            "anyOf": [
                {
                    "$ref": "#/definitions/BackgroundPaint"
                },
                {
                    "$ref": "#/definitions/FillPaint"
                },
                {
                    "$ref": "#/definitions/FillExtrusionPaint"
                },
                {
                    "$ref": "#/definitions/LinePaint"
                },
                {
                    "$ref": "#/definitions/SymbolPaint"
                },
                {
                    "$ref": "#/definitions/RasterPaint"
                },
                {
                    "$ref": "#/definitions/CirclePaint"
                },
                {
                    "$ref": "#/definitions/HeatmapPaint"
                },
                {
                    "$ref": "#/definitions/HillshadePaint"
                }
            ]
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
                    "anyOf": [
                        {
                            "$ref": "#/definitions/BackgroundLayout"
                        },
                        {
                            "$ref": "#/definitions/FillLayout"
                        },
                        {
                            "$ref": "#/definitions/FillExtrusionLayout"
                        },
                        {
                            "$ref": "#/definitions/LineLayout"
                        },
                        {
                            "$ref": "#/definitions/SymbolLayout"
                        },
                        {
                            "$ref": "#/definitions/RasterLayout"
                        },
                        {
                            "$ref": "#/definitions/CircleLayout"
                        },
                        {
                            "$ref": "#/definitions/HeatmapLayout"
                        },
                        {
                            "$ref": "#/definitions/HillshadeLayout"
                        }
                    ],
                    "title": "layout"
                },
                "paint": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/BackgroundPaint"
                        },
                        {
                            "$ref": "#/definitions/FillPaint"
                        },
                        {
                            "$ref": "#/definitions/FillExtrusionPaint"
                        },
                        {
                            "$ref": "#/definitions/LinePaint"
                        },
                        {
                            "$ref": "#/definitions/SymbolPaint"
                        },
                        {
                            "$ref": "#/definitions/RasterPaint"
                        },
                        {
                            "$ref": "#/definitions/CirclePaint"
                        },
                        {
                            "$ref": "#/definitions/HeatmapPaint"
                        },
                        {
                            "$ref": "#/definitions/HillshadePaint"
                        }
                    ],
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
