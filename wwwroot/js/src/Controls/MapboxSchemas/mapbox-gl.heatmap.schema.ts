import {JSONSchemaType} from "react-hook-form-jsonschema";

export const heatmap_JSON: JSONSchemaType = {
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
                    "$ref": "#/definitions/HeatmapLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/HeatmapPaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
