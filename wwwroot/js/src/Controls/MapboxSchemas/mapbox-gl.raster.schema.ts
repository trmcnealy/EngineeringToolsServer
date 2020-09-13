import {JSONSchemaType} from "react-hook-form-jsonschema";

export const raster_JSON: JSONSchemaType = {
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
                    "$ref": "#/definitions/RasterLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/RasterPaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
