/// <reference path="../_references.ts"/>

export module labelPosition {
    export const insideEnd: string = "InsideEnd";
    export const insideCenter: string = "InsideCenter";
    export const outsideEnd: string = "OutsideEnd";
    export const insideBase: string = "InsideBase";

    export const type: IEnumType = createEnumType([
        {value: insideEnd, displayName: (resources) => resources.get("Visual_LabelPosition_InsideEnd")},
        {value: outsideEnd, displayName: (resources) => resources.get("Visual_LabelPosition_OutsideEnd")},
        {value: insideCenter, displayName: (resources) => resources.get("Visual_LabelPosition_InsideCenter")},
        {value: insideBase, displayName: (resources) => resources.get("Visual_LabelPosition_InsideBase")}
    ]);
}
