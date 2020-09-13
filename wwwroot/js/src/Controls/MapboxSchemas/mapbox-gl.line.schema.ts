import {JSONSchemaType} from "react-hook-form-jsonschema";

export const line_JSON: JSONSchemaType = {
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
                    "$ref": "#/definitions/LineLayout",
                    "title": "layout"
                },
                "paint": {
                    "$ref": "#/definitions/LinePaint",
                    "title": "paint"
                }
            },
            "required": [
                "id"
            ]
        }
    }
}
