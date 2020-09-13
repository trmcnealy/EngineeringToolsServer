///<reference path="../_references.ts"/>

export module axisScale {
    export const linear: string = "linear";
    export const log: string = "log";

    export const type: IEnumType = createEnumType([
        {value: linear, displayName: (resources) => resources.get("Visual_Axis_Linear")},
        {value: log, displayName: (resources) => resources.get("Visual_Axis_Log")}
    ]);
}
