import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactGridLayout from "react-grid-layout";

import {property, sealed, Func} from "./Decorators";

import {Fabric, initializeIcons, ICustomizations, Customizer} from "office-ui-fabric-react";
import {CommandBar, ICommandBarItemProps} from "office-ui-fabric-react/lib/CommandBar";
import {IButtonProps} from "office-ui-fabric-react/lib/Button";
import {As} from "./UtilityMethods";
import {Guid} from "./guid";

import { LayoutItemHeaderProperties } from "./LayoutItemHeaderProperties"
import { LayoutItemHeader } from "./LayoutItemHeader";
import { Emitter, eventFactory } from "./Events";

import {MapView, MapViewProperties} from "./MapView";

export interface GridPosition {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface LayoutItemProperties {
    id: number;
    type: string;
    title: string;
    layout:ReactGridLayout.Layout;
    header:LayoutItemHeaderProperties;
    componentProperties: any;
    component: any;
}

export interface LayoutItemState {
    gridPos: GridPosition;
}

export const panelSizeChanged = eventFactory('panel-size-changed');

export class LayoutItem extends React.Component<LayoutItemProperties, LayoutItemState> {

    static defaultState: any = {
        gridPos: {x: 0, y: 0, h: 10, w: 10}
    };

    events: Emitter;

    constructor(props:LayoutItemProperties) {
        super(props);
        
        this.events = new Emitter();

        this.state = LayoutItem.defaultState;
    }

    destroy() {
    }
    
    updateGridPos(newPos: GridPosition) {

        this.state.gridPos.x = newPos.x;
        this.state.gridPos.y = newPos.y;
        this.state.gridPos.w = newPos.w;
        this.state.gridPos.h = newPos.h;

        if (this.state.gridPos.w !== newPos.w || this.state.gridPos.h !== newPos.h) {
            this.events.emit(panelSizeChanged);
        }
    }

    resizeDone() {
        this.events.emit(panelSizeChanged);
    }

    render() {
        
        const Component = this.props.component;

        return (
            <div className="react-grid-item" key={this.props.id} data-grid={this.props.layout}>
                <LayoutItemHeader {...this.props.header}/>
                <Component {...this.props.componentProperties} />
            </div>
        );
    }
}


export function LayoutItemWrapper(title: string,
                                  WrappedComponent,
                                  WrappedComponentProperties) {
}

//<div key={i} data-grid={el} onClick={this.onAddItem} onClick={this.onRemoveItem.bind(this, i)}>

//</div>

//<div class="react-grid-item react-draggable react-resizable" data-grid="[object Object]" style="top: 24px; left: 24px; width: 681px; height: 496px; position: absolute; touch-action: none;">
//    <div class="mapd-chart-wrapper">
//        <div class="chart-container-header">
//            <div class="chart-title chart-title-no-edit-container"><div id="chart-2-title" class="chart-title-no-edit" title="Wells by Avg Value Monthly">Wells by Avg Value Monthly</div></div>
//            <div class="chart-left-controls"></div>
//            <div class="chart-right-controls">
//                <div class="chart-button chart-settings-button" id="chart-2-settings" title="Edit Chart">
//                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                        <path
//                            d="M18.995 13.333l1.843 1.402c.166.128.21.357.105.545l-1.747 2.94c-.105.188-.332.264-.533.188l-2.176-.85c-.455.331-.944.62-1.477.832l-.332 2.253a.423.423 0 0 1-.428.357h-3.496a.423.423 0 0 1-.428-.357l-.332-2.253a6.43 6.43 0 0 1-1.477-.832l-2.176.85a.445.445 0 0 1-.533-.188l-1.747-2.94a.421.421 0 0 1 .104-.544l1.844-1.403a6.56 6.56 0 0 1-.06-.833c0-.28.025-.561.06-.833l-1.844-1.402a.412.412 0 0 1-.104-.545l1.747-2.94a.432.432 0 0 1 .533-.188l2.176.85c.455-.331.944-.62 1.477-.833l.332-2.252A.423.423 0 0 1 10.754 4h3.496c.218 0 .402.153.428.357l.332 2.252a6.43 6.43 0 0 1 1.477.833l2.176-.85a.445.445 0 0 1 .533.188l1.747 2.94a.421.421 0 0 1-.105.544l-1.843 1.403c.035.272.06.544.06.833 0 .289-.025.561-.06.833zM12.5 15c1.379 0 2.5-1.121 2.5-2.5S13.879 10 12.5 10a2.503 2.503 0 0 0-2.5 2.5c0 1.379 1.121 2.5 2.5 2.5z"
//                        ></path>
//                    </svg>
//                </div>
//                <div class="chart-button chart-dropdown-button"><i class="rmwc-icon material-icons">more_vert</i></div>
//            </div>
//            <div class="chart-left-shadow" style="width: 0px;"></div>
//            <div class="chart-right-shadow" style="width: 48px;"></div>
//        </div>
//        <div class="chart-container chart-type-pointmap basemap-current immerse theme" data-testid="chartContainerTestId">
//            <div id="chart2" class="dc-chart mapboxgl-map" style="width: 677px; height: 452px; cursor: default;">
//                <div style="cursor: default; pointer-events: auto;"></div>
//                <input type="text" placeholder="Zoom to" class="geocoder-input" style="top: 5px; right: 5px; float: right; position: absolute; cursor: default; pointer-events: auto;" />
//                <div class="mapd-draw-canvas-container" style="cursor: default; pointer-events: auto;">
//                    <canvas class="mapd-draw-canvas" style="position: absolute; pointer-events: none; left: 0px; top: 0px; width: 677px; height: 452px; outline: currentcolor none medium;" width="677" height="452" tabindex="-1"></canvas>
//                </div>
//                <div class="resize-sensor" style="position: absolute; inset: 0px; overflow: hidden; z-index: -1; visibility: hidden; cursor: default; pointer-events: auto;">
//                    <div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;">
//                        <div style="position: absolute; left: 0px; top: 0px; transition: all 0s ease 0s; width: 100000px; height: 100000px;"></div>
//                    </div>
//                    <div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;">
//                        <div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%;"></div>
//                    </div>
//                </div>
//                <div style="top: 0px; left: 0px; position: absolute; cursor: default; pointer-events: auto;" class="mapd-draw-button-container">
//                    <div class="mapd-draw-button-control-group" style="width: auto;">
//                        <button class="mapd-draw-button mapd-draw-button-circle" title="Create a circle"></button><button class="mapd-draw-button mapd-draw-button-polyline" title="Create a polyline"></button>
//                        <button class="mapd-draw-button mapd-draw-button-lasso" title="Create a lasso"></button>
//                    </div>
//                </div>
//                <div class="legend gradient-legend legendables open bottom-left">
//                    <div></div>
//                    <div class="range">
//                        <div class="block">
//                            <div class="color" style="background: rgb(17, 95, 154) none repeat scroll 0% 0%;"></div>
//                            <div class="text extent"><span>0</span><input /></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(25, 132, 197) none repeat scroll 0% 0%;"></div>
//                            <div class="text step"><span>22k</span></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(34, 167, 240) none repeat scroll 0% 0%;"></div>
//                            <div class="text step"><span>44k</span></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(72, 181, 196) none repeat scroll 0% 0%;"></div>
//                            <div class="text step"><span>67k</span></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(118, 198, 143) none repeat scroll 0% 0%;"></div>
//                            <div class="text step"><span>89k</span></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(166, 215, 91) none repeat scroll 0% 0%;"></div>
//                            <div class="text step"><span>110k</span></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(201, 229, 47) none repeat scroll 0% 0%;"></div>
//                            <div class="text step"><span>130k</span></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(208, 238, 17) none repeat scroll 0% 0%;"></div>
//                            <div class="text step"><span>160k</span></div>
//                        </div>
//                        <div class="block">
//                            <div class="color" style="background: rgb(208, 244, 0) none repeat scroll 0% 0%;"></div>
//                            <div class="text extent"><span>200k</span><input /></div>
//                        </div>
//                    </div>
//                    <div class="lock locked">
//                        <svg viewBox="0,0,48,48">
//                            <g style="stroke: white;"><path d="M34,20v-4c0-5.5-4.5-10-10-10c-5.5,0-10,4.5-10,10v4H8v20h32V20H34z M18,16c0-3.3,2.7-6,6-6s6,2.7,6,6v4H18V16z"></path></g>
//                        </svg>
//                    </div>
//                </div>
//                <div class="mapboxgl-canary" style="visibility: hidden;"></div>
//                <div class="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate">
//                    <canvas class="mapboxgl-canvas" tabindex="0" aria-label="Map" width="677" height="452" style="width: 677px; height: 452px;"></canvas>
//                </div>
//                <div class="mapboxgl-control-container">
//                    <div class="mapboxgl-ctrl-top-left"></div>
//                    <div class="mapboxgl-ctrl-top-right"></div>
//                    <div class="mapboxgl-ctrl-bottom-left"></div>
//                    <div class="mapboxgl-ctrl-bottom-right">
//                        <div class="mapboxgl-ctrl mapboxgl-ctrl-scale" style="width: 46.5982px;">500&nbsp;km</div>
//                        <div class="mapboxgl-ctrl mapboxgl-ctrl-attrib">
//                            <div class="mapboxgl-ctrl-attrib-inner">
//                                <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>
//                                <a
//                                    class="mapbox-improve-map"
//                                    href="https://apps.mapbox.com/feedback/?owner=mapbox&amp;id=dark-v9&amp;access_token=pk.eyJ1IjoibWFwZCIsImEiOiJjajZmOGYzNG0wZTZwMnltbDhoaG50YzFiIn0.IzTw2By-SmxIONNGignoxw"
//                                    target="_blank"
//                                    rel="noopener nofollow"
//                                >
//                                    Improve this map
//                                </a>
//                            </div>
//                        </div>
//                        <div class="mapboxgl-ctrl mapboxgl-ctrl-group">
//                            <button class="mapboxgl-ctrl-zoom-in" type="button" title="Zoom in" aria-label="Zoom in"><span class="mapboxgl-ctrl-icon" aria-hidden="true"></span></button>
//                            <button class="mapboxgl-ctrl-zoom-out" type="button" title="Zoom out" aria-label="Zoom out"><span class="mapboxgl-ctrl-icon" aria-hidden="true"></span></button>
//                            <button class="mapboxgl-ctrl-compass" type="button" title="Reset bearing to north" aria-label="Reset bearing to north">
//                                <span class="mapboxgl-ctrl-icon" aria-hidden="true" style="transform: rotate(0deg);"></span>
//                            </button>
//                        </div>
//                        <div class="mapboxgl-ctrl" style="display: block;"><a class="mapboxgl-ctrl-logo" target="_blank" rel="noopener nofollow" href="https://www.mapbox.com/" aria-label="Mapbox logo"></a></div>
//                    </div>
//                </div>
//                <input type="text" placeholder="Zoom to" class="geocoder-input" style="top: 5px; right: 5px; float: right; position: absolute;" />
//                <div class="mapd-draw-canvas-container">
//                    <canvas class="mapd-draw-canvas" style="position: absolute; pointer-events: none; left: 0px; top: 0px; width: 677px; height: 452px; outline: currentcolor none medium;" width="677" height="452" tabindex="-1"></canvas>
//                </div>
//                <div style="top: 0px; left: 0px; position: absolute;" class="mapd-draw-button-container">
//                    <div class="mapd-draw-button-control-group">
//                        <button class="mapd-draw-button mapd-draw-button-circle" title="Create a circle"></button><button class="mapd-draw-button mapd-draw-button-polyline" title="Create a polyline"></button>
//                        <button class="mapd-draw-button mapd-draw-button-lasso" title="Create a lasso"></button>
//                    </div>
//                </div>
//                <div class="chart-popup">
//                    <div class="chart-popup-box"><div class="chart-popup-content"></div></div>
//                </div>
//            </div>
//        </div>
//    </div>
//    <span class="react-resizable-handle react-resizable-handle-se" style="touch-action: none;"></span>
//</div>
