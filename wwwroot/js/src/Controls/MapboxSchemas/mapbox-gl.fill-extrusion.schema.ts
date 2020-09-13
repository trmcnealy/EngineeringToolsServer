import {JSONSchemaType} from "react-hook-form-jsonschema";

export const fill_extrusion_JSON: JSONSchemaType = {
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
                    "$ref": "#/definitions/FillExtrusionLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/FillExtrusionPaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
