/// <reference path="../_references.ts"/>

export module axisType {
    export const scalar: string = "Scalar";
    export const categorical: string = "Categorical";
    export const both: string = "Both";

    export const type: IEnumType = createEnumType([
        {value: scalar, displayName: (resources) => resources.get("Visual_Axis_Scalar")},
        {value: categorical, displayName: (resources) => resources.get("Visual_Axis_Categorical")}
    ]);
}
