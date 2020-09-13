/// <reference path="../_references.ts"/>

export module axisStyle {
    export const showBoth: string = "showBoth";
    export const showTitleOnly: string = "showTitleOnly";
    export const showUnitOnly: string = "showUnitOnly";

    export const type: IEnumType = createEnumType([
        {value: showTitleOnly, displayName: (resources) => resources.get("Visual_Axis_ShowTitleOnly")},
        {value: showUnitOnly, displayName: (resources) => resources.get("Visual_Axis_ShowUnitOnly")},
        {value: showBoth, displayName: (resources) => resources.get("Visual_Axis_ShowBoth")}
    ]);
}
