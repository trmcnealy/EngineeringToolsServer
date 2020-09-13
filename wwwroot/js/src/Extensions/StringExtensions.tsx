import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {IStringResourceProvider} from "DataTypes";
import {Utility} from "Utilities";

export class StringExtensions {
    static format(...args: string[]) {
        let s = args[0];

        if (StringExtensions.isNullOrUndefinedOrWhiteSpaceString(s)) return s;

        for (let i = 0; i < args.length - 1; i++) {
            const reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, args[i + 1]);
        }
        return s;
    }

    static equalIgnoreCase(a: string, b: string): boolean {
        return StringExtensions.normalizeCase(a) === StringExtensions.normalizeCase(b);
    }

    static startsWithIgnoreCase(a: string, b: string): boolean {
        const normalizedSearchString = StringExtensions.normalizeCase(b);
        return StringExtensions.normalizeCase(a).indexOf(normalizedSearchString) === 0;
    }

    static containsIgnoreCase(source: string, substring: string): boolean {
        if (source == null) return false;

        return source.toLowerCase().indexOf(substring.toString()) !== -1;
    }

    static normalizeCase(value: string): string {
        Utility.throwIfNullOrUndefined(value, StringExtensions, "normalizeCase", "value");

        return value.toUpperCase();
    }

    static isNullOrEmpty(value: string): boolean {
        return value == null || value.length === 0;
    }

    static isNullOrUndefinedOrWhiteSpaceString(str: string): boolean {
        return StringExtensions.isNullOrEmpty(str) || StringExtensions.isNullOrEmpty(str.trim());
    }

    static containsWhitespace(str: string): boolean {
        Utility.throwIfNullOrUndefined(str, this, "containsWhitespace", "str");

        const expr = /\s/;
        return expr.test(str);
    }

    static isWhitespace(str: string): boolean {
        Utility.throwIfNullOrUndefined(str, this, "isWhitespace", "str");

        return str.trim() === "";
    }

    static trimTrailingWhitespace(str: string): string {
        Utility.throwIfNullOrUndefined(str, this, "trimTrailingWhitespace", "str");
        return str.replace(/\s+$/, "");
    }

    static trimWhitespace(str: string): string {
        Utility.throwIfNullOrUndefined(str, this, "trimWhitespace", "str");
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    }

    static getLengthDifference(left: string, right: string) {
        Utility.throwIfNullOrUndefined(left, this, "getLengthDifference", "left");
        Utility.throwIfNullOrUndefined(right, this, "getLengthDifference", "right");

        return Math.abs(left.length - right.length);
    }

    static repeat(char: string, count: number): string {
        let result = "";
        for (let i = 0; i < count; i++) {
            result += char;
        }
        return result;
    }

    static replaceAll(text: string, textToFind: string, textToReplace: string): string {
        if (!textToFind) {
            return text;
        }

        const pattern = textToFind.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1");

        return text.replace(new RegExp(pattern, "g"), textToReplace);
    }

    static findUniqueName(usedNames: {[name: string]: boolean}, baseName: string): string {
        // Find a unique name
        let i = 0,
            uniqueName: string = baseName;
        while (usedNames[uniqueName]) {
            uniqueName = baseName + ++i;
        }

        return uniqueName;
    }

    static constructCommaSeparatedList(list: string[], resourceProvider: IStringResourceProvider, maxValue?: number): string {
        if (!list || list.length === 0) return "";

        if (maxValue === null || maxValue === undefined) maxValue = Number.MAX_VALUE;

        const length = Math.min(maxValue, list.length);

        const replacedList = new Array<{targetValue: string; replaceValue: string}>();

        for (let j = 0; j < 2; j++) {
            const targetValue = "{" + j + "}";
            const replaceValue = "_|_<" + j + ">_|_";

            for (let i = 0; i < length; i++) {
                if (list[i].indexOf(targetValue) > -1) {
                    list[i] = list[i].replace(targetValue, replaceValue);

                    replacedList.push({targetValue: targetValue, replaceValue: replaceValue});
                }
            }
        }

        let commaSeparatedList = "";

        for (let i = 0; i < length; i++) {
            if (i === 0) commaSeparatedList = list[i];
            else commaSeparatedList = StringExtensions.format(resourceProvider.get("FilterRestatement_Comma"), commaSeparatedList, list[i]);
        }

        for (let i = 0; i < replacedList.length; i++) {
            commaSeparatedList = commaSeparatedList.replace(replacedList[i].replaceValue, replacedList[i].targetValue);
        }

        return commaSeparatedList;
    }
}
