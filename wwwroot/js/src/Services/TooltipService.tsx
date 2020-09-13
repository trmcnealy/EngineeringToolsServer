import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

export interface TooltipEventArgs<TData> {
    data: TData;
    coordinates: Array<number>;
    isTouchEvent: boolean;
}

export interface ITooltipServiceWrapper {
    AddTooltip<T>(map, layer, tooltips, getTooltipInfoDelegate: (args: TooltipEventArgs<T>) => Array<TooltipDataItem>, reloadTooltipDataOnMouseMove?: boolean): void;
    Hide(immediately?: boolean): void;
}

export interface TooltipDataItem {
    DisplayName: string;
    Value: string;
}
