/// <reference path="../_references.ts"/>

export module imageScalingType {
    export const normal: string = "Normal";
    export const fit: string = "Fit";
    export const fill: string = "Fill";

    export const type: IEnumType = createEnumType([
        {value: normal, displayName: (resources) => resources.get("Visual_ImageScalingType_Normal")},
        {value: fit, displayName: (resources) => resources.get("Visual_ImageScalingType_Fit")},
        {value: fill, displayName: (resources) => resources.get("Visual_ImageScalingType_Fill")}
    ]);
}
