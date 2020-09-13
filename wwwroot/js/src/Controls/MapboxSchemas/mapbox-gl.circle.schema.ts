import {JSONSchemaType} from "react-hook-form-jsonschema";

export const circle_JSON: JSONSchemaType = {
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
                    "$ref": "#/definitions/CircleLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/CirclePaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
