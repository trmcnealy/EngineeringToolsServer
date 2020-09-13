import {JSONSchemaType} from "react-hook-form-jsonschema";

export const fill_JSON: JSONSchemaType = {
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
                    "$ref": "#/definitions/FillLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/FillPaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
