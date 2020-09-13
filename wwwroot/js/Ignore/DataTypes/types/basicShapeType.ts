/// <reference path="../_references.ts"/>

export module basicShapeType {
    export const rectangle: string = "rectangle";
    export const oval: string = "oval";
    export const line: string = "line";
    export const arrow: string = "arrow";
    export const triangle: string = "triangle";

    export const type: IEnumType = createEnumType([
        {value: rectangle, displayName: "rectangle"},
        {value: oval, displayName: "oval"},
        {value: line, displayName: "line"},
        {value: arrow, displayName: "arrow"},
        {value: triangle, displayName: "triangle"}
    ]);
}
