/// <reference path="../_references.ts"/>

export module yAxisPosition {
    export const left: string = "Left";
    export const right: string = "Right";

    export const type: IEnumType = createEnumType([
        {value: left, displayName: (resources) => resources.get("Visual_yAxis_Left")},
        {value: right, displayName: (resources) => resources.get("Visual_yAxis_Right")}
    ]);
}
