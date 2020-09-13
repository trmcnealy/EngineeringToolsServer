/// <reference path="../_references.ts"/>

export module legendPosition {
    export const top: string = "Top";
    export const bottom: string = "Bottom";
    export const left: string = "Left";
    export const right: string = "Right";
    export const topCenter: string = "TopCenter";
    export const bottomCenter: string = "BottomCenter";
    export const leftCenter: string = "LeftCenter";
    export const rightCenter: string = "RightCenter";

    export const type: IEnumType = createEnumType([
        {value: top, displayName: (resources) => resources.get("Visual_LegendPosition_Top")},
        {value: bottom, displayName: (resources) => resources.get("Visual_LegendPosition_Bottom")},
        {value: left, displayName: (resources) => resources.get("Visual_LegendPosition_Left")},
        {value: right, displayName: (resources) => resources.get("Visual_LegendPosition_Right")},
        {value: topCenter, displayName: (resources) => resources.get("Visual_LegendPosition_TopCenter")},
        {value: bottomCenter, displayName: (resources) => resources.get("Visual_LegendPosition_BottomCenter")},
        {value: leftCenter, displayName: (resources) => resources.get("Visual_LegendPosition_LeftCenter")},
        {value: rightCenter, displayName: (resources) => resources.get("Visual_LegendPosition_RightCenter")}
    ]);
}
