
import { IRawStyle, IFontWeight, IFontStyles } from "@fluentui/react";

const WestEuropean = "Segoe UI Web (West European)";
const DefaultFontFamily = `'Segoe UI', '${WestEuropean}'`;

module FontSizes {
    export const mini = "10px";
    export const xSmall = "10px";
    export const small = "12px";
    export const smallPlus = "12px";
    export const medium = "14px";
    export const mediumPlus = "16px";
    export const icon = "16px";
    export const large = "18px";
    export const xLarge = "20px";
    export const xLargePlus = "24px";
    export const xxLarge = "28px";
    export const xxLargePlus = "32px";
    export const superLarge = "42px";
    export const mega = "68px";
}

module FontWeights {
    export const light: IFontWeight = 100;
    export const semilight: IFontWeight = 300;
    export const regular: IFontWeight = 400;
    export const semibold: IFontWeight = 600;
    export const bold: IFontWeight = 700;
}

module IconFontSizes {
    export const xSmall = "10px";
    export const small = "12px";
    export const medium = "16px";
    export const large = "20px";
}

function createFont(size: string, weight: IFontWeight, fontFamily: string): IRawStyle {
    return {
        fontFamily: fontFamily,
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        fontSize: size,
        fontWeight: weight
    };
}

export const DefaultFont: Partial<IFontStyles> = {
    tiny: createFont(FontSizes.mini, FontWeights.regular, DefaultFontFamily),
    xSmall: createFont(FontSizes.xSmall, FontWeights.regular, DefaultFontFamily),
    small: createFont(FontSizes.small, FontWeights.regular, DefaultFontFamily),
    smallPlus: createFont(FontSizes.smallPlus, FontWeights.regular, DefaultFontFamily),
    medium: createFont(FontSizes.medium, FontWeights.regular, DefaultFontFamily),
    mediumPlus: createFont(FontSizes.mediumPlus, FontWeights.regular, DefaultFontFamily),
    large: createFont(FontSizes.large, FontWeights.regular, DefaultFontFamily),
    xLarge: createFont(FontSizes.xLarge, FontWeights.semibold, DefaultFontFamily),
    xLargePlus: createFont(FontSizes.xLargePlus, FontWeights.semibold, DefaultFontFamily),
    xxLarge: createFont(FontSizes.xxLarge, FontWeights.semibold, DefaultFontFamily),
    xxLargePlus: createFont(FontSizes.xxLargePlus, FontWeights.semibold, DefaultFontFamily),
    superLarge: createFont(FontSizes.superLarge, FontWeights.semibold, DefaultFontFamily),
    mega: createFont(FontSizes.mega, FontWeights.semibold, DefaultFontFamily)
};
