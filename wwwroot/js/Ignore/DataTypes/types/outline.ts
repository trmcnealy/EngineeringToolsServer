/// <reference path="../_references.ts"/>

export module outline {
    export const none: string = "None";
    export const bottomOnly: string = "BottomOnly";
    export const topOnly: string = "TopOnly";
    export const topBottom: string = "TopBottom";
    export const leftRight: string = "LeftRight";
    export const frame: string = "Frame";

    export const type: IEnumType = createEnumType([
        {value: none, displayName: (resources) => resources.get("Visual_Outline_none")},
        {value: bottomOnly, displayName: (resources) => resources.get("Visual_Outline_bottom_only")},
        {value: topOnly, displayName: (resources) => resources.get("Visual_Outline_top_only")},
        {value: topBottom, displayName: (resources) => resources.get("Visual_Outline_top_Bottom")},
        {value: leftRight, displayName: (resources) => resources.get("Visual_Outline_leftRight")},
        {value: frame, displayName: (resources) => resources.get("Visual_Outline_frame")}
    ]);
}
