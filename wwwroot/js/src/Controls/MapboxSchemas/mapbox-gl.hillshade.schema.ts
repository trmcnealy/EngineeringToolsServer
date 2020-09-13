import {JSONSchemaType} from "react-hook-form-jsonschema";

export const hillshade_JSON: JSONSchemaType = {
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
                    "$ref": "#/definitions/HillshadeLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/HillshadePaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
