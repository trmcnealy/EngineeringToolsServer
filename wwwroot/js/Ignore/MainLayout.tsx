/// <reference> Styles.d.ts

import * as React from "react";
import * as ReactDOM from "react-dom";

import mapboxgl from "mapbox-gl";

import ReactGridLayout, {WidthProvider, ItemCallback, Responsive, ResponsiveProps} from "react-grid-layout";

import * as gridcss from "../node_modules/react-grid-layout/css/styles.css";
import * as resizablecss from "../node_modules/react-resizable/css/styles.css";

import {Fabric, initializeIcons, ICustomizations, Customizer} from "office-ui-fabric-react";
import {Nav, INavLink, INavLinkGroup} from "office-ui-fabric-react/lib/Nav";

import {CommandBar, ICommandBarItemProps} from "office-ui-fabric-react/lib/CommandBar";
import {IButtonProps} from "office-ui-fabric-react/lib/Button";

import {property, sealed} from "./Decorators";
import {Guid} from "./guid";
import * as UtilityMethods from "./UtilityMethods";
import {LayoutItem, LayoutItemState, LayoutItemProperties} from "./LayoutItem";

import {MapView, MapViewProperties} from "./MapView";

import classNames from "classnames";
import sizeMe from "react-sizeme";

import As = UtilityMethods.As;

import {DashboardState} from "./DashboardState";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const GRID_CELL_HEIGHT = 30;
export const GRID_CELL_VMARGIN = 8;
export const GRID_COLUMN_COUNT = 48;

export const DEFAULT_ROW_HEIGHT = 20;
export const MIN_PANEL_HEIGHT = GRID_CELL_HEIGHT * 3;

export const PANEL_BORDER = 2;

export const DEFAULT_ANNOTATION_COLOR = "rgba(0, 211, 255, 1)";

let lastGridWidth = 1200;
let ignoreNextWidthChange = false;

export interface AddPanelProps {
    panel: LayoutItem;
}

//interface GridWrapperPropertiesOld {
//    size: {width: number};
//    layout: ReactGridLayout.Layout[];
//    onLayoutChange: (layout: ReactGridLayout.Layout[]) => void;
//    children: JSX.Element | JSX.Element[];
//    onDragStop: ItemCallback;
//    onResize: ItemCallback;
//    onResizeStop: ItemCallback;
//    onWidthChange: () => void;
//    className: string;
//    isResizable?: boolean;
//    isDraggable?: boolean;
//}

//function GridWrapperOld({size, layout, onLayoutChange, children, onDragStop, onResize, onResizeStop, onWidthChange, className, isResizable, isDraggable}: GridWrapperProperties) {
//    const width = size.width > 0 ? size.width : lastGridWidth;

//    if (width !== lastGridWidth) {
//        if (ignoreNextWidthChange) {
//            ignoreNextWidthChange = false;
//        } else if (Math.abs(width - lastGridWidth) > 8) {
//            onWidthChange();
//            lastGridWidth = width;
//        }
//    }

//    const draggable = width <= 420 ? false : isDraggable;

//    return (
//        <ReactGridLayout
//            width={lastGridWidth}
//            className={className}
//            isDraggable={draggable}
//            isResizable={isResizable}
//            containerPadding={[0, 0]}
//            useCSSTransforms={false}
//            margin={[GRID_CELL_VMARGIN, GRID_CELL_VMARGIN]}
//            cols={GRID_COLUMN_COUNT}
//            rowHeight={GRID_CELL_HEIGHT}
//            draggableHandle=".grid-drag-handle"
//            layout={layout}
//            onResize={onResize}
//            onResizeStop={onResizeStop}
//            onDragStop={onDragStop}
//            onLayoutChange={onLayoutChange}
//        >
//            {children}
//        </ReactGridLayout>
//    );
//}


interface GridWrapperProperties extends ResponsiveProps{
    children: JSX.Element | JSX.Element[];
}

function GridWrapper({onLayoutChange, onBreakpointChange, children}: GridWrapperProperties) {

    return (
        <ResponsiveReactGridLayout
            cols={{ lg: 48, md: 40, sm: 20, xs: 16, xxs: 8 }}
            rowHeight={GRID_CELL_HEIGHT}
            onLayoutChange={onLayoutChange}
            onBreakpointChange={onBreakpointChange}
        >
            {children}
        </ResponsiveReactGridLayout>
    );
}


const SizedReactLayoutGrid = sizeMe({monitorWidth: true})(GridWrapper);

export interface MainLayoutProps {
    dashboard: DashboardState;
}

@sealed
export default class MainLayout extends React.Component<MainLayoutProps> {
    static SUBROWS_PER_VISIBLE_ROW = 10;
    static DASHBOARD_ROW_HEIGHT = 20;

    static defaultProps = {
        className: "layout",
        cols: {lg: 48, md: 40, sm: 20, xs: 16, xxs: 8},
        rowHeight: 30
    };

    @property() Uid: string;

    @property() ElementRef: React.RefObject<HTMLDivElement>;

    @property() panelMap: Map<string, LayoutItem>;
    @property() panelRef: Map<string, HTMLElement>;

    @property()
    MainHeaderControlsLeft: ICommandBarItemProps[] = [
        {
            key: "addItem",
            text: "Add",
            cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
            iconProps: {iconName: "Add"},
            subMenuProps: {
                items: [
                    {
                        key: "mapView",
                        text: "MapView",
                        iconProps: {iconName: "Nav2DMapView"},
                        onClick: () => {
                            //(As<GridLayoutItemProperties>({ i: Guid.newGuid().ToString, x: 0, y: 0, w: 10, h: 10 })

                            const mainMapLayoutItem = {
                                id: 0,
                                type: "Map",
                                title: "MapView",
                                layout: {i: Guid.newGuid().ToString, x: 0, y: 0, w: 10, h: 10},
                                header: {title: "MapView"},
                                componentProperties: As<MapViewProperties>({
                                    className: "mapboxView",
                                    BaseMapStyle: "mapbox://styles/mapbox/dark-v10",
                                    Bounds: new mapboxgl.LngLatBounds([[-106.52775578, 25.85656136], [-93.53154648, 36.49897217]])
                                }),
                                component: MapView
                            } as LayoutItemProperties;

                            this.AddItem(mainMapLayoutItem);
                        }
                    }
                ]
            }
        },
        {
            key: "upload",
            text: "Upload",
            iconProps: {iconName: "Upload"},
            href: "https://developer.microsoft.com/en-us/fluentui"
        },
        {
            key: "share",
            text: "Share",
            iconProps: {iconName: "Share"},
            onClick: () => console.log("Share")
        },
        {
            key: "download",
            text: "Download",
            iconProps: {iconName: "Download"},
            onClick: () => console.log("Download")
        }
    ];

    constructor(props: MainLayoutProps) {
        super(props);

        //this.resetLayout = this.resetLayout.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.AddItem = this.AddItem.bind(this);
        this.RemoveItem = this.RemoveItem.bind(this);

        this.ElementRef = React.createRef();

        this.panelMap = new Map<string, LayoutItem>();
        this.panelRef = new Map<string, HTMLElement>();


    }

    componentDidMount() {
        const mainMapLayoutItem = {
            id: 0,
            type: "Map",
            title: "MapView",
            layout: {i: Guid.newGuid().ToString, x: 0, y: 0, w: 10, h: 10},
            header: {title: "MapView"},
            componentProperties: As<MapViewProperties>({
                className: "mapboxView",
                BaseMapStyle: "mapbox://styles/mapbox/dark-v10",
                Bounds: new mapboxgl.LngLatBounds([[-106.52775578, 25.85656136], [-93.53154648, 36.49897217]])
            }),
            component: MapView
        } as LayoutItemProperties;

        this.AddItem(mainMapLayoutItem);
    }

    componentWillUnmount?(): void {}

    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void {}

    getLayout(key) {
        let ls = {};
        if ((window as any).localStorage) {
            try {
                ls = JSON.parse((window as any).localStorage.getItem("MainLayout")) || {};
            } catch (e) {
                /*Ignore*/
            }
        }
        return ls[key];
    }

    saveLayout(key, value) {
        if ((window as any).localStorage) {
            (window as any).localStorage.setItem(
                "MainLayout",
                JSON.stringify({
                    [key]: value
                })
            );
        }
    }

    //resetLayout() {
    //    this.setState({
    //        layout: []
    //    });
    //}

    buildLayout() {
        const layout = [];

        this.panelMap = new Map<string, LayoutItem>();

        for (const panel of this.props.dashboard.Panels) {
            const stringId = panel.props.id.ToString;

            this.panelMap[stringId] = panel;

            if (!panel.state.gridPos) {
                console.log("panel without gridpos");
                continue;
            }

            const panelPos: any = {
                i: stringId,
                x: panel.state.gridPos.x,
                y: panel.state.gridPos.y,
                w: panel.state.gridPos.w,
                h: panel.state.gridPos.h
            };

            layout.push(panelPos);
        }

        return layout;
    }

    onLayoutChange(newLayout: ReactGridLayout.Layout[]) {
        for (const newPos of newLayout) {
            this.panelMap[newPos.i!].updateGridPos(newPos);
        }

        this.props.dashboard.sortPanelsByGridPos();

        // Call render() after any changes.  This is called when the layour loads
        this.forceUpdate();
    }

    AddItem(layoutItem: LayoutItemProperties) {
        console.log("onAddClick happened");

        this.props.dashboard.addPanel(layoutItem);
    }

    RemoveItem(key: string) {
        console.log("removing", key);

        this.props.dashboard.removePanel(this.panelMap[key]);

        //this.setState({ items: _.reject(this.state.items, { i: i }) });
    }

    onBreakpointChange(breakpoint, cols) {
        //this.setState({
        //    breakpoint: breakpoint,
        //    cols: cols
        //});
    }

    onWidthChange = () => {
        for (const panel of this.props.dashboard.Panels) {
            panel.resizeDone();
        }
    };

    updateGridPos = (item: ReactGridLayout.Layout, layout: ReactGridLayout.Layout[]) => {
        this.panelMap[item.i!].updateGridPos(item);

        this.onLayoutChange(layout);
    };

    onResize: ItemCallback = (layout, oldItem, newItem) => {
        this.panelMap[newItem.i!].updateGridPos(newItem);
    };

    onResizeStop: ItemCallback = (layout, oldItem, newItem) => {
        this.updateGridPos(newItem, layout);
        this.panelMap[newItem.i!].resizeDone();
    };

    onDragStop: ItemCallback = (layout, oldItem, newItem) => {
        this.updateGridPos(newItem, layout);
    };

    shouldComponentUpdate?(nextProps: Readonly<MainLayoutProps>, nextState, nextContext): boolean {
        return true;
    }

    renderPanel(panel: LayoutItem) {
        return panel.render();
    }

    renderPanels() {
        const panelElements:any[] = [];

        for (const panel of this.props.dashboard.Panels) {
            const id = panel.props.id.ToString;

            panelElements.push(
                <div key={id} className="react-grid-item" id={"panel-" + id} ref={(elem) => elem && (this.panelRef[id] = elem)}>
                  {this.renderPanel(panel)}
                </div>
            );
        }

        return panelElements;
    }

    render() {
        return (
            <div id="main" ref={this.ElementRef}>
                <CommandBar items={this.MainHeaderControlsLeft} />
                <SizedReactLayoutGrid
                    onLayoutChange={this.onLayoutChange}
                    onBreakpointChange={this.onBreakpointChange}
                >
                    {this.renderPanels()}
                </SizedReactLayoutGrid>
            </div>
        );
    }
}

//<SizedReactLayoutGrid
//    className=""
//    layout={this.buildLayout()}
//    isResizable={true}
//    isDraggable={true}
//    onLayoutChange={this.onLayoutChange}
//    onWidthChange={this.onWidthChange}
//    onDragStop={this.onDragStop}
//    onResize={this.onResize}
//    onResizeStop={this.onResizeStop}
//>
