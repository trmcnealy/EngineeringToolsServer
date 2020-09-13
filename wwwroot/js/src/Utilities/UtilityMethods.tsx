
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import * as utilities from "@uifabric/utilities";

import {DataMetadata} from "DataTypes";
import {StringExtensions} from "Extensions";
import {AnyFunction} from "./Decorators";

export const FormatString = utilities.format;

export function As<T>(value: any): T {
    return value as T;
}

export function NotNull<T, R extends NonNullable<T>>(val?: T): R {
    if (typeof val === typeof undefined || val === undefined || val === null) {
        throw `${val} is null`;
    }
    return val as R;
}

export function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export function NullishCoalescing<T>(val: T, otherVal: T): T {
    if (typeof val === typeof undefined && typeof otherVal !== typeof undefined) {
        return otherVal;
    }

    if (val !== undefined && val !== null) {
        return val;
    }

    return otherVal;
}

export function IsWhitespace(value: string): boolean {
    return value.trim() === "";
}

export function IsNullOrEmpty(value: string): boolean {
    return value == null || value.length === 0;
}

export function IsNullOrEmptyOrWhitespace(value: string): boolean {
    return value == null || value.length === 0 || value.trim() === "";
}

export function IsNullish<T>(val: T): boolean {
    if (typeof val === typeof undefined || val === undefined || val === null) {
        return true;
    }
    return false;
}

export function getStackTrace(leadingFramesToRemove = 1): string {
    let stackTrace: string, stackSegments: string[];

    try {
        // needs to throw for stack trace to work in IE
        throw new Error();
    } catch (error) {
        stackTrace = error.stack;
        if (stackTrace != null) {
            stackSegments = stackTrace.split("\n");
            stackSegments.splice(1, leadingFramesToRemove);
            // Finally
            stackTrace = stackSegments.join("\n");
        }
    }

    return stackTrace;
}

export interface IError extends Error {
    stack?: string;
    argument?: string;
}

namespace Errors {
    export function infoNavAppAlreadyPresent(): IError {
        return {
            name: "infoNavAppAlreadyPresent",
            message: "Cannot initialize embedded scenario when the InfoNav App is already present in this context",
            stack: getExceptionStackTrace()
        };
    }

    export function invalidOperation(message: string): IError {
        return {
            name: "invalidOperation",
            message: message,
            stack: getExceptionStackTrace()
        };
    }

    export function argument(argumentName: string, message: string): IError {
        return {
            name: "invalidArgumentError",
            argument: argumentName,
            message: message,
            stack: getExceptionStackTrace()
        };
    }

    export function argumentNull(argumentName: string): IError {
        return {
            name: "argumentNull",
            argument: argumentName,
            message: "Argument was null",
            stack: getExceptionStackTrace()
        };
    }

    export function argumentUndefined(argumentName: string): IError {
        return {
            name: "argumentUndefined",
            argument: argumentName,
            message: "Argument was undefined",
            stack: getExceptionStackTrace()
        };
    }

    export function argumentOutOfRange(argumentName: string): IError {
        return {
            name: "argumentOutOfRange",
            argument: argumentName,
            message: "Argument was out of range",
            stack: getExceptionStackTrace()
        };
    }

    export function pureVirtualMethodException(className: string, methodName: string): IError {
        return {
            name: "pureVirtualMethodException",
            message: "This method must be overriden by the derived class:" + className + "." + methodName,
            stack: getExceptionStackTrace()
        };
    }

    export function notImplementedException(message: string): IError {
        return {
            name: "notImplementedException",
            message: message,
            stack: getExceptionStackTrace()
        };
    }

    function getExceptionStackTrace(): string {
        return getStackTrace(/*leadingFramesToRemove*/ 2);
    }
}

export class Utility {
    private static TypeNamespace = "http://schemas.microsoft.com/sqlbi/2013/01/NLRuntimeService";

    static JsonContentType = "application/json";
    static JpegContentType = "image/jpeg";
    static XJavascriptContentType = "application/x-javascript";
    static JsonDataType = "json";
    static BlobDataType = "blob";
    static HttpGetMethod = "GET";
    static HttpPostMethod = "POST";
    static HttpPutMethod = "PUT";
    static HttpDeleteMethod = "DELETE";
    static HttpContentTypeHeader = "Content-Type";
    static HttpAcceptHeader = "Accept";
    static Undefined = "undefined";

    private static staticContentLocation: string = window.location.protocol + "//" + window.location.host;

    static throwIfNullOrUndefined(value, context, methodName, parameterName) {
        if (value === null) {
            Utility.throwException(Errors.argumentNull(Utility.getComponentName(context) + methodName + "." + parameterName));
        } else if (typeof value === Utility.Undefined) {
            Utility.throwException(Errors.argumentUndefined(Utility.getComponentName(context) + methodName + "." + parameterName));
        }
    }

    static throwIfNullOrEmpty(value: any, context: any, methodName: string, parameterName: string) {
        Utility.throwIfNullOrUndefined(value, context, methodName, parameterName);
        if (!value.length) {
            Utility.throwException(Errors.argumentOutOfRange(Utility.getComponentName(context) + methodName + "." + parameterName));
        }
    }

    static throwIfNullOrEmptyString(value: string, context: any, methodName: string, parameterName: string) {
        Utility.throwIfNullOrUndefined(value, context, methodName, parameterName);
        if (value.length < 1) {
            Utility.throwException(Errors.argumentOutOfRange(Utility.getComponentName(context) + methodName + "." + parameterName));
        }
    }

    static throwIfNullEmptyOrWhitespaceString(value: string, context: any, methodName: string, parameterName: string) {
        Utility.throwIfNullOrUndefined(value, context, methodName, parameterName);
        if (StringExtensions.isNullOrUndefinedOrWhiteSpaceString(value)) {
            Utility.throwException(Errors.argumentOutOfRange(Utility.getComponentName(context) + methodName + "." + parameterName));
        }
    }

    static throwIfNotTrue(condition: boolean, context: any, methodName: string, parameterName: string) {
        if (!condition) {
            Utility.throwException(Errors.argument(parameterName, Utility.getComponentName(context) + methodName + "." + parameterName));
        }
    }

    static isString(value: any): boolean {
        return typeof value === "string";
    }

    static isBoolean(value: any): boolean {
        return typeof value === "boolean";
    }

    static isNumber(value: any): boolean {
        return typeof value === "number";
    }

    static isDate(value: any): boolean {
        return Utility.isObject(value) && value instanceof Date;
    }

    static isObject(value: any): boolean {
        return value != null && typeof value === "object";
    }

    static isNullOrUndefined(value: any): boolean {
        return value === null || typeof value === Utility.Undefined;
    }

    static urlCombine(baseUrl: string, path: string) {
        Utility.throwIfNullOrUndefined(baseUrl, null, "urlCombine", "baseUrl");
        Utility.throwIfNullOrUndefined(path, null, "urlCombine", "path");

        if (StringExtensions.isNullOrUndefinedOrWhiteSpaceString(path)) {
            return baseUrl;
        }

        if (StringExtensions.isNullOrUndefinedOrWhiteSpaceString(baseUrl)) {
            return path;
        }

        const finalUrl = baseUrl;

        if (finalUrl.charAt(finalUrl.length - 1) === "/") {
            if (path.charAt(0) === "/") path = path.slice(1);
        } else {
            if (path.charAt(0) !== "/") path = "/" + path;
        }

        return finalUrl + path;
    }

    static getStaticResourceUri(path: string) {
        Utility.throwIfNullOrUndefined(path, null, "getStaticResourceUri", "path");

        let url = path;

        if (url && url.indexOf("http") === -1) {
            url = Utility.urlCombine(Utility.staticContentLocation, url);
        }
        return url;
    }

    static getComponentName(context) {
        return !context ? "" : (typeof context).toString() + ".";
    }

    static throwException(e) {
        throw e;
    }

    static createClassSelector(className: string): string {
        Utility.throwIfNullOrEmptyString(className, null, "CreateClassSelector", "className");
        return "." + className;
    }

    static createIdSelector(id: string): string {
        Utility.throwIfNullOrEmptyString(id, null, "CreateIdSelector", "id");
        return "#" + id;
    }

    static generateGuid(): string {
        let guid = "",
            idx = 0;

        for (idx = 0; idx < 32; idx += 1) {
            const guidDigitsItem = (Math.random() * 16) | 0;
            switch (idx) {
                case 8:
                case 12:
                case 16:
                case 20:
                    guid += "-";
                    break;
            }
            guid += guidDigitsItem.toString(16);
        }

        return guid;
    }

    static generateConnectionGroupName(): string {
        let name = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 7; i++) name += possible.charAt(Math.floor(Math.random() * possible.length));

        return name;
    }

    static getCookieValue(key: string): string | null {
        const keyValuePairs = document.cookie.split(";");
        for (let i = 0; i < keyValuePairs.length; i++) {
            const keyValue = keyValuePairs[i];
            const split = keyValue.split("=");
            if (split.length > 0 && split[0].trim() === key) {
                return keyValue.substr(keyValue.indexOf("=") + 1);
            }
        }
        return null;
    }

    static convertWcfToJsDictionary(wcfDictionary: any[]): {[index: string]: any} {
        const result: {[index: string]: any} = {};

        for (let i = 0; i < wcfDictionary.length; i++) {
            const keyValuePair = wcfDictionary[i];
            result[keyValuePair["Key"]] = keyValuePair["Value"];
        }

        return result;
    }

    static getDateFromWcfJsonString(jsonDate: string, fromUtcMilliseconds: boolean): Date | null {
        if (StringExtensions.isNullOrEmpty(jsonDate)) {
            return null;
        }
        const begIndex = jsonDate.indexOf("(");
        const endIndex = jsonDate.indexOf(")");
        if (begIndex !== -1 && endIndex !== -1) {
            const milliseconds = parseInt(jsonDate.substring(begIndex + 1, endIndex), 10);

            if (fromUtcMilliseconds) {
                return new Date(milliseconds);
            } else {
                const retValue = new Date(0);
                retValue.setUTCMilliseconds(milliseconds);
                return retValue;
            }
        }
        return null;
    }

    static compareInt(a: number, b: number): number {
        return a - b;
    }

    static getIndexOfMinValue(a: number[]) {
        let retValue = 0;
        let currentMinValue = a[0];

        for (let i = 0; i < a.length; i++) {
            if (a[i] < currentMinValue) {
                currentMinValue = a[i];
                retValue = i;
            }
        }

        return retValue;
    }

    static isValidUrl(url: string): boolean {
        return !StringExtensions.isNullOrEmpty(url) && (StringExtensions.startsWithIgnoreCase(url, "http://") || StringExtensions.startsWithIgnoreCase(url, "https://"));
    }

    static extractUrlFromCssBackgroundImage(input: string) {
        return input.replace(/"/g, "").replace(/url\(|\)$/gi, "");
    }

    static isValidImageDataUrl(url: string): boolean {
        const regex = new RegExp("data:(image/(png|jpg|jpeg|gif|svg))");
        return regex.test(url);
    }

    static isEventSupported(eventName: string, element: Element): boolean {
        eventName = "on" + eventName;
        let isSupported = eventName in element;

        if (!isSupported) {
            // if we can't use setAttribute try a generic element
            if (!element.setAttribute) {
                element = document.createElement("div");
            }
            if (element.setAttribute && element.removeAttribute) {
                element.setAttribute(eventName, "");
                isSupported = typeof element[eventName] === "function";

                // if the property was created - remove it
                if (typeof element[eventName] !== "undefined") {
                    element[eventName] = null;
                }

                element.removeAttribute(eventName);
            }
        }

        element = null as Element;
        return isSupported;
    }

    static getPropertyCount(object: any) {
        Utility.throwIfNullOrUndefined(object, this, "getPropertyCount", "object");
        return Object.getOwnPropertyNames(object).length;
    }

    static getFileExtension(filePath: string): string {
        if (filePath) {
            const index = filePath.lastIndexOf(".");
            if (index >= 0) return filePath.substr(index + 1);
        }
        return "";
    }

    static extractFileNameFromPath(filePath: string): string {
        return filePath.replace(/^.*[\\]/, "");
    }

    static is64BitOperatingSystem(): boolean {
        return navigator.userAgent.indexOf("WOW64") !== -1 || navigator.userAgent.indexOf("Win64") !== -1;
    }

    static parseNumber(value: any, defaultValue?: number): number | null {
        if (value === null) return null;
        if (value === undefined) return defaultValue!;

        const result = Number(value);
        if (isFinite(result)) return result;
        if (isNaN(result) && !(typeof value === "number" || value === "NaN")) return defaultValue!;
        return result;
    }

    static getURLParamValue(name: string) {
        const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }

    //static getLocalTimeZoneString(): string {
    //    const timeSummer = new Date(Date.UTC(2005, 6, 30, 0, 0, 0, 0));
    //    const summerOffset = -1 * timeSummer.getTimezoneOffset();
    //    const timeWinter = new Date(Date.UTC(2005, 12, 30, 0, 0, 0, 0));
    //    const winterOffset = -1 * timeWinter.getTimezoneOffset();
    //    let localTimeZoneString;

    //    if (-720 === summerOffset && -720 === winterOffset) {
    //        localTimeZoneString = "Dateline Standard Time";
    //    } else if (-660 === summerOffset && -660 === winterOffset) {
    //        localTimeZoneString = "UTC-11";
    //    } else if (-660 === summerOffset && -660 === winterOffset) {
    //        localTimeZoneString = "Samoa Standard Time";
    //    } else if (-600 === summerOffset && -600 === winterOffset) {
    //        localTimeZoneString = "Hawaiian Standard Time";
    //    } else if (-480 === summerOffset && -540 === winterOffset) {
    //        localTimeZoneString = "Alaskan Standard Time";
    //    } else if (-420 === summerOffset && -480 === winterOffset) {
    //        localTimeZoneString = "Pacific Standard Time";
    //    } else if (-420 === summerOffset && -420 === winterOffset) {
    //        localTimeZoneString = "US Mountain Standard Time";
    //    } else if (-360 === summerOffset && -420 === winterOffset) {
    //        localTimeZoneString = "Mountain Standard Time";
    //    } else if (-360 === summerOffset && -360 === winterOffset) {
    //        localTimeZoneString = "Central America Standard Time";
    //    } else if (-300 === summerOffset && -360 === winterOffset) {
    //        localTimeZoneString = "Central Standard Time";
    //    } else if (-300 === summerOffset && -300 === winterOffset) {
    //        localTimeZoneString = "SA Pacific Standard Time";
    //    } else if (-240 === summerOffset && -300 === winterOffset) {
    //        localTimeZoneString = "Eastern Standard Time";
    //    } else if (-270 === summerOffset && -270 === winterOffset) {
    //        localTimeZoneString = "Venezuela Standard Time";
    //    } else if (-240 === summerOffset && -240 === winterOffset) {
    //        localTimeZoneString = "SA Western Standard Time";
    //    } else if (-240 === summerOffset && -180 === winterOffset) {
    //        localTimeZoneString = "Central Brazilian Standard Time";
    //    } else if (-180 === summerOffset && -240 === winterOffset) {
    //        localTimeZoneString = "Atlantic Standard Time";
    //    } else if (-180 === summerOffset && -180 === winterOffset) {
    //        localTimeZoneString = "Montevideo Standard Time";
    //    } else if (-180 === summerOffset && -120 === winterOffset) {
    //        localTimeZoneString = "E. South America Standard Time";
    //    } else if (-150 === summerOffset && -210 === winterOffset) {
    //        localTimeZoneString = "Mid-Atlantic Standard Time";
    //    } else if (-120 === summerOffset && -120 === winterOffset) {
    //        localTimeZoneString = "SA Eastern Standard Time";
    //    } else if (0 === summerOffset && 0 === winterOffset) {
    //        localTimeZoneString = "UTC";
    //    } else if (60 === summerOffset && 0 === winterOffset) {
    //        localTimeZoneString = "GMT Standard Time";
    //    } else if (60 === summerOffset && 120 === winterOffset) {
    //        localTimeZoneString = "Namibia Standard Time";
    //    } else if (120 === summerOffset && 60 === winterOffset) {
    //        localTimeZoneString = "Romance Standard Time";
    //    } else if (120 === summerOffset && 120 === winterOffset) {
    //        localTimeZoneString = "South Africa Standard Time";
    //    } else if (180 === summerOffset && 120 === winterOffset) {
    //        localTimeZoneString = "GTB Standard Time";
    //    } else if (180 === summerOffset && 180 === winterOffset) {
    //        localTimeZoneString = "E. Africa Standard Time";
    //    } else if (240 === summerOffset && 180 === winterOffset) {
    //        localTimeZoneString = "Russian Standard Time";
    //    } else if (240 === summerOffset && 240 === winterOffset) {
    //        localTimeZoneString = "Arabian Standard Time";
    //    } else if (270 === summerOffset && 210 === winterOffset) {
    //        localTimeZoneString = "Iran Standard Time";
    //    } else if (270 === summerOffset && 270 === winterOffset) {
    //        localTimeZoneString = "Afghanistan Standard Time";
    //    } else if (300 === summerOffset && 240 === winterOffset) {
    //        localTimeZoneString = "Pakistan Standard Time";
    //    } else if (300 === summerOffset && 300 === winterOffset) {
    //        localTimeZoneString = "West Asia Standard Time";
    //    } else if (330 === summerOffset && 330 === winterOffset) {
    //        localTimeZoneString = "India Standard Time";
    //    } else if (345 === summerOffset && 345 === winterOffset) {
    //        localTimeZoneString = "Nepal Standard Time";
    //    } else if (360 === summerOffset && 300 === winterOffset) {
    //        localTimeZoneString = "N. Central Asia Standard Time";
    //    } else if (360 === summerOffset && 360 === winterOffset) {
    //        localTimeZoneString = "Central Asia Standard Time";
    //    } else if (390 === summerOffset && 390 === winterOffset) {
    //        localTimeZoneString = "Myanmar Standard Time";
    //    } else if (420 === summerOffset && 360 === winterOffset) {
    //        localTimeZoneString = "North Asia Standard Time";
    //    } else if (420 === summerOffset && 420 === winterOffset) {
    //        localTimeZoneString = "SE Asia Standard Time";
    //    } else if (480 === summerOffset && 420 === winterOffset) {
    //        localTimeZoneString = "North Asia East Standard Time";
    //    } else if (480 === summerOffset && 480 === winterOffset) {
    //        localTimeZoneString = "China Standard Time";
    //    } else if (540 === summerOffset && 480 === winterOffset) {
    //        localTimeZoneString = "Yakutsk Standard Time";
    //    } else if (540 === summerOffset && 540 === winterOffset) {
    //        localTimeZoneString = "Tokyo Standard Time";
    //    } else if (570 === summerOffset && 570 === winterOffset) {
    //        localTimeZoneString = "Cen. Australia Standard Time";
    //    } else if (600 === summerOffset && 600 === winterOffset) {
    //        localTimeZoneString = "E. Australia Standard Time";
    //    } else if (600 === summerOffset && 660 === winterOffset) {
    //        localTimeZoneString = "AUS Eastern Standard Time";
    //    } else if (660 === summerOffset && 600 === winterOffset) {
    //        localTimeZoneString = "Tasmania Standard Time";
    //    } else if (660 === summerOffset && 660 === winterOffset) {
    //        localTimeZoneString = "West Pacific Standard Time";
    //    } else if (690 === summerOffset && 690 === winterOffset) {
    //        localTimeZoneString = "Central Pacific Standard Time";
    //    } else if (720 === summerOffset && 660 === winterOffset) {
    //        localTimeZoneString = "Magadan Standard Time";
    //    } else if (720 === summerOffset && 720 === winterOffset) {
    //        localTimeZoneString = "Fiji Standard Time";
    //    } else if (720 === summerOffset && 780 === winterOffset) {
    //        localTimeZoneString = "New Zealand Standard Time";
    //    } else if (780 === summerOffset && 780 === winterOffset) {
    //        localTimeZoneString = "Tonga Standard Time";
    //    } else {
    //        localTimeZoneString = "UTC";
    //    }
    //    return localTimeZoneString;
    //}
}

export function Throttle(callback, delay) {
    let throttleTimeout = null;
    let storedEvent = null;

    const throttledEventHandler = (event) => {
        storedEvent = event;

        const shouldHandleEvent = !throttleTimeout;

        if (shouldHandleEvent) {
            callback(storedEvent);

            storedEvent = null;

            throttleTimeout = window.setTimeout(() => {
                throttleTimeout = null;
                if (storedEvent) {
                    throttledEventHandler(storedEvent);
                }
            }, delay);
        }
    };
    return throttledEventHandler;
}

export function Debounce(func: AnyFunction, wait: number, executeNow: boolean): any {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!executeNow) {
                func(...args);
            }
        };

        const shouldExecute = executeNow && !timeout;

        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);

        if (shouldExecute) {
            func(...args);
        }
    };
}

//export function debounce(func, wait, immediate) {
//    let timeout;
//
//    return function () {
//        let context = this;
//        let args = arguments;
//
//        let later = () => {
//            timeout = null;
//            if (!immediate) {
//                func.apply(this, args);
//            }
//        };
//
//        let callNow = immediate && !timeout;
//        window.clearTimeout(timeout);
//        timeout = window.setTimeout(later, wait);
//
//        if (callNow) {
//            func.apply(context, args);
//        }
//    };
//}

export function sls(strings: string, ...values: Array<string>): string {
    let output = "";
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];

    const lines = output.split(/(?:\r\n|\n|\r)/);

    return lines
        .map((line) => {
            return line.replace(/^\s+/gm, "");
        })
        .join(" ")
        .trim();
}

export function getMetadata(metadata: DataMetadata) {
    const ret = {
        tooltips: {}
    };

    metadata.columns.map((column) => {
        Object.keys(column.roles).map((role) => {
            if (role === "tooltips") {
                ret.tooltips[column.displayName] = column;
            } else {
                ret[role] = column;
            }
        });
    });

    return ret;
}

export function IndexOf<T>(array: Array<T>, element: T): number {
    for (let i = 0; i <= array.length; i++) {
        if (array[i] === element) {
            return i;
        }
    }

    return -1;
}

export function DistictAdd<T>(array: Array<T>, element: T) {
    if (IndexOf<T>(array, element) === -1) {
        array.push(element);
    }
}

export function linspace(a: number, b: number, n: number): Array<number> {
    if (typeof n === "undefined") {
        n = Math.max(Math.round(b - a) + 1, 1);
    }

    if (n < 2) {
        return n === 1 ? [a] : [];
    }

    let i;

    const ret: Array<number> = new Array<number>(n);

    n--;
    for (i = n; i >= 0; i--) {
        ret[i] = (i * b + (n - i) * a) / n;
    }

    return ret;
}

export function BindAll(fns: Array<string>, context: any): void {
    fns.forEach((fn) => {
        if (!context[fn]) {
            return;
        }
        context[fn] = context[fn].bind(context);
    });
}

export function DOMcreate(tagName: string, className?: string, container?: HTMLElement) {
    const el = (window as any).document.createElement(tagName);
    if (className !== undefined) el.className = className;
    if (container) container.appendChild(el);
    return el;
}

export function DOMremove(node: HTMLElement) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

let passiveSupported = false;

try {
    const options = Object.defineProperty({}, "passive", {
        get() {
            passiveSupported = true;
        }
    });
    (window as any).addEventListener("test", options, options);
    (window as any).removeEventListener("test", options, options);
} catch (err) {
    passiveSupported = false;
}

export function DOMaddEventListener(target: any, type: any, callback: any, options: {passive?: boolean; capture?: boolean} = {}) {
    if ("passive" in options && passiveSupported) {
        target.addEventListener(type, callback, options);
    } else {
        target.addEventListener(type, callback, options.capture);
    }
}

export function DOMremoveEventListener(target: any, type: any, callback: any, options: {passive?: boolean; capture?: boolean} = {}) {
    if ("passive" in options && passiveSupported) {
        target.removeEventListener(type, callback, options);
    } else {
        target.removeEventListener(type, callback, options.capture);
    }
}

export function ToggleLayerVisibility(map: any, element: HTMLElement, layerId: string): void {
    const visibility = map.getLayoutProperty(layerId, "visibility");

    if (visibility === "visible") {
        map.setLayoutProperty(layerId, "visibility", "none");
    } else {
        map.setLayoutProperty(layerId, "visibility", "visible");
    }
}

const enum MediaTypes {
    ArrayBuffer = "arraybuffer",
    Blob = "blob",
    FormData = "multipart/form-data",
    Json = "application/json",
    Text = "text/plain"
}

//export interface ColorGradientResult<T, V> {
//    value: T;
//    color: V;
//}

//export interface rgba {
//    a: number;
//    r: number;
//    g: number;
//    b: number;
//}

//export interface rgb {
//    r: number;
//    g: number;
//    b: number;
//}

//type GradientRgbResultType = string | StyleFunction | Expression;

//export class ColorMethods {
//    static colorComponentToHex(colorComponent: number): string {
//        const hex = colorComponent.toString(16);

//        return hex.length === 1 ? "0" + hex : hex;
//    }

//    static rgbToHexJson(rgb: any): string {
//        return ColorMethods.rgbToHex(rgb.r, rgb.g, rgb.b);
//    }

//    static rgbToHex(r: number, g: number, b: number): string {
//        return "#" + ColorMethods.colorComponentToHex(r) + ColorMethods.colorComponentToHex(g) + ColorMethods.colorComponentToHex(b);
//    }

//    static hexToRgb(hex: string): rgb | null {
//        const matchArray = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

//        return matchArray
//            ? {
//                  r: parseInt(matchArray[1], 16),
//                  g: parseInt(matchArray[2], 16),
//                  b: parseInt(matchArray[3], 16)
//              }
//            : null;
//    }

//    // Generates an array of color values in sequence from 'colorA' to 'colorB'
//    // using the specified number of steps
//    static Gradient(inputColorA: string, inputColorB: string, steps: number, valueA: number, valueB: number): Array<ColorGradientResult<number, string>> {
//        var result = new Array<ColorGradientResult<number, string>>(steps);
//        // var rInterval;
//        // var gInterval;
//        // var bInterval;

//        var colorA = ColorMethods.hexToRgb(inputColorA); // [r,g,b]
//        var colorB = ColorMethods.hexToRgb(inputColorB); // [r,g,b]
//        steps -= 1; // Reduce the steps by one because we're including the first item manually

//        if (IsNullish(colorA) || !IsNullish(colorB)) {
//            return result;
//        }

//        // Calculate the intervals for each color
//        var rStep = (Math.max(colorA.r, colorB.r) - Math.min(colorA.r, colorB.r)) / steps;
//        var gStep = (Math.max(colorA.g, colorB.g) - Math.min(colorA.g, colorB.g)) / steps;
//        var bStep = (Math.max(colorA.b, colorB.b) - Math.min(colorA.b, colorB.b)) / steps;
//        var vSteps = (Math.max(valueA, valueB) - Math.min(valueA, valueB)) / steps;

//        result.push({value: valueA, color: ColorMethods.rgbToHexJson(colorA)} as ColorGradientResult<number, string>);

//        // Set the starting value as the first color value
//        var rVal = colorA.r;
//        var gVal = colorA.g;
//        var bVal = colorA.b;
//        var vVal = valueA;

//        // Loop over the steps-1 because we're includeing the last value manually to
//        // ensure it's accurate
//        for (var i = 0; i < steps - 1; i++) {
//            // If the first value is lower than the last - increment up otherwise
//            // increment down
//            rVal = colorA.r < colorB.r ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
//            gVal = colorA.g < colorB.g ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
//            bVal = colorA.b < colorB.b ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
//            vVal += vSteps;
//            result.push({
//                value: vVal,
//                color: "#" + ColorMethods.rgbToHexJson({r: rVal, g: gVal, b: bVal})
//            });
//        }

//        result.push({value: valueB, color: "#" + ColorMethods.rgbToHexJson(colorB)});

//        return result;
//    }

//    static GradientRgb(variable: string, colorA: any, colorB: any, steps: number, valueA: number, valueB: number): Array<GradientRgbResultType> {
//        var result = new Array<GradientRgbResultType>(steps);
//        // var rInterval;
//        // var gInterval;
//        // var bInterval;

//        result.push("interpolate");
//        result.push(["linear"] as any);
//        result.push(["get", variable]);

//        colorA = ColorMethods.hexToRgb(colorA); // [r,g,b]
//        colorB = ColorMethods.hexToRgb(colorB); // [r,g,b]
//        steps -= 1; // Reduce the steps by one because we're including the first
//        // item manually

//        // Calculate the intervals for each color
//        var rStep = (Math.max(colorA.r, colorB.r) - Math.min(colorA.r, colorB.r)) / steps;
//        var gStep = (Math.max(colorA.g, colorB.g) - Math.min(colorA.g, colorB.g)) / steps;
//        var bStep = (Math.max(colorA.b, colorB.b) - Math.min(colorA.b, colorB.b)) / steps;
//        var vSteps = (Math.max(valueA, valueB) - Math.min(valueA, valueB)) / steps;

//        result.push(valueA as any);
//        result.push(`rgb(${colorA.r},${colorA.g},${colorA.b})`);

//        // Set the starting value as the first color value
//        var rVal = colorA.r;
//        var gVal = colorA.g;
//        var bVal = colorA.b;
//        var vVal = valueA;

//        // Loop over the steps-1 because we're includeing the last value manually to
//        // ensure it's accurate
//        for (var i = 0; i < steps - 1; i++) {
//            // If the first value is lower than the last - increment up otherwise
//            // increment down
//            rVal = colorA.r < colorB.r ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
//            gVal = colorA.g < colorB.g ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
//            bVal = colorA.b < colorB.b ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
//            vVal += vSteps;
//            result.push(vVal as any);
//            result.push(`rgb(${rVal},${gVal},${bVal})`);
//        }

//        result.push(valueB as any);
//        result.push(`rgb(${colorB.r},${colorB.g},${colorB.b})`);

//        return result;
//    }
//}

const rootUrl = (window as any).location.origin;

export async function clientSetVariable(rootUrl, variableName, variableData, mediaType = MediaTypes.Json): Promise<any> {
    const response = await fetch(`${rootUrl}/data/${variableName}`, {
        method: "POST",
        cache: "no-cache",
        mode: "same-origin",
        body: JSON.stringify(variableData),
        headers: {
            "Content-Type": `${mediaType}`
        }
    });

    return await response;
}

export async function SetVariable(variableName, variableData, mediaType = MediaTypes.Json): Promise<any> {
    const csharpVariable = await clientSetVariable(rootUrl, variableName, variableData, mediaType).then((variable) => variable);

    if (csharpVariable !== null) {
        return csharpVariable;
    }

    return [];
}

export async function clientGetVariable(rootUrl, variable): Promise<any> {
    fetch(`${rootUrl}/data/${variable}`, {
        method: "GET",
        cache: "no-cache",
        mode: "same-origin"
    }).then(
        (response) => {
            if (response.headers["Content-Type"] === "text/plain") {
                return response.text();
            }
            if (response.headers["Content-Type"] === "application/json") {
                return response.json();
            }
            if (response.headers["Content-Type"] === "multipart/form-data") {
                return response.formData();
            }
            if (response.headers["Content-Type"] === "arraybuffer") {
                return response.arrayBuffer();
            }

            return response.blob();
        },
        (err) => {
            console.error(err);
        }
    );

    return null;
}

export async function GetVariable(variableName): Promise<any> {
    return await clientGetVariable(rootUrl, variableName).then((variable) => variable);
}

export function clientGetVariableUrl(rootUrl, variable): any {
    return `${rootUrl}/data/${variable}`;
}

export function GetVariableUrl(variableName): any {
    return clientGetVariableUrl(rootUrl, variableName);
}

//export function parse(mapFunc): NodeJS.ReadWriteStream {
//    if (mapFunc) {
//        const indexFunc = (feature, context) => mapFunc(feature, context[1]);
//        const jsonstream = parse(indexFunc);
//        return jsonstream;
//    }
//    const jsonstream = parse("features.*");
//    return jsonstream;
//}

//export function stringify(): NodeJS.ReadWriteStream {
//    const open = '{"type":"FeatureCollection","features":[';
//    const close = "]}";

//    const jsonstream = stringify(open, "\n,\n", close);
//    return jsonstream;
//}
