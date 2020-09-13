import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import sizeMe from "react-sizeme";

import * as CSS from "csstype";

import ReactGridLayout, {WidthProvider, ItemCallback, Responsive, ResponsiveProps} from "react-grid-layout";

import {Fabric, Stack} from "@fluentui/react";

import {CommandBar, ICommandBarItemProps} from "office-ui-fabric-react/lib/CommandBar";

//import {Fabric, initializeIcons, ICustomizations, Customizer} from "@fluentui/react";
//import {Nav, INavLink, INavLinkGroup} from "office-ui-fabric-react/lib/Nav";

//import {DarkThemeCustomizations} from "Themes/DarkTheme";
//import {LightThemeCustomizations} from "Themes/LightTheme";

import {sealed, OnResizeCallback} from "Utilities";
import {PanelProperties, MapboxLayoutItem} from "LayoutItems";


import {
    all_JSON,
    background_JSON,
    circle_JSON,
    fill_extrusion_JSON,
    fill_JSON,
    heatmap_JSON,
    hillshade_JSON,
    line_JSON,
    raster_JSON,
    symbol_JSON
} from "MapboxSchemas";



export type DashboardProperties = ResponsiveProps;

export interface DashboardState {
    mounted: boolean;
    breakpoint: string;
    cols: number;
    items: Map<string, PanelProperties<any>>;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const SizedResponsiveReactGridLayout = sizeMe({
    monitorWidth: true,
    monitorHeight: true
})(ResponsiveReactGridLayout);

//function MyGrid(props) {
//    const children = React.useMemo(() => {
//        return new Array(props.count).fill(undefined).map((val, idx) => {
//            return <div key={idx} data-grid={{x: idx, y: 1, w: 1, h: 1}} />;
//        });
//    }, [props.count]);
//    return <ReactGridLayout cols={12}>{children}</ReactGridLayout>;
//}

@sealed
export class Dashboard extends React.Component<DashboardProperties, DashboardState> {
    static defaultProperties: DashboardProperties = {
        className: "layout",
        //breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
        cols: {lg: 64, md: 32, sm: 16, xs: 8, xxs: 4},
        rowHeight: 30,
        onLayoutChange: (currentLayout: Array<ReactGridLayout.Layout>, allLayouts: ReactGridLayout.Layouts): void => {}
    };

    static defaultState: DashboardState = {
        mounted: false,
        breakpoint: "lg",
        cols: 64,
        items: new Map<string, PanelProperties<any>>()
    };

    static Load(key: string): any {
        let ls = {};

        if ((window as any).localStorage) {
            try {
                ls = JSON.parse((window as any).localStorage.getItem("DashboardLayout")) || {};
            } catch (e) {
                /*Ignore*/
            }
        }

        return ls[key];
    }

    static Save(key: string, value: any) {
        if ((window as any).localStorage) {
            (window as any).localStorage.setItem(
                "DashboardLayout",
                JSON.stringify({
                    [key]: value
                })
            );
        }
    }

    ElementRef: React.RefObject<HTMLDivElement>;

    Items: Map<string, PanelProperties>;

    Controls: Array<ICommandBarItemProps>;

    constructor(properties: DashboardProperties, context?: any) {
        super(properties, context);

        this.onAddItem = this.onAddItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onResizeStop = this.onResizeStop.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.state = Dashboard.defaultState;

        this.ElementRef = React.createRef();
        this.Items = new Map<string, PanelProperties>();

        this.Controls = [
            {
                key: "addItem",
                text: "Add",
                //cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
                iconProps: {iconName: "Add"},
                subMenuProps: {
                    items: [
                        {
                            key: "mapView",
                            text: "MapView",
                            iconProps: {iconName: "Nav2DMapView"},
                            onClick: () => {
                                //const key = Guid.newGuid().ToString();

                                //const header: LayoutItemHeaderProperties = {
                                //    title: key,
                                //    onClose: () => this.onRemoveItem(key)
                                //};

                                //const layout: ReactGridLayout.Layout = {
                                //    i: key,
                                //    x: MapboxLayoutItem.defaultLayoutProperties.x,
                                //    y: MapboxLayoutItem.defaultLayoutProperties.y,
                                //    w: MapboxLayoutItem.defaultLayoutProperties.w,
                                //    h: MapboxLayoutItem.defaultLayoutProperties.h
                                //};

                                //const layoutItem: PanelProperties = {
                                //    LayoutProperties: layout,
                                //    HeaderProperties: header,
                                //    ComponentProperties: Mapbox.defaultProperties,
                                //    Component: MapboxLayoutItem
                                //};



                                const layoutItem = MapboxLayoutItem.GetPanel(this.onRemoveItem, line_JSON);

                                this.onAddItem(layoutItem);
                            }
                        },
                        {
                            key: "scatterChart",
                            text: "Scatter Chart",
                            iconProps: {iconName: "ScatterChart"},
                            onClick: () => {}
                        }
                    ]
                }
            }
            //{
            //    key: "layout",
            //    text: "Layout",
            //    iconProps: {iconName: "Table"},
            //    subMenuProps: {
            //        items: [
            //            {
            //                key: "save",
            //                text: "Save",
            //                iconProps: {iconName: "Save"},
            //                onClick: () => {}
            //            },
            //            {
            //                key: "load",
            //                text: "Load",
            //                iconProps: {iconName: "DownloadDocument"},
            //                onClick: () => {}
            //            }
            //        ]
            //    }
            //}
        ];
    }

    onAddItem<T>(newItem: PanelProperties<T>): void {
        this.Items.set(newItem.LayoutProperties.i, newItem);

        this.setState({
            items: this.Items
        });
    }

    onRemoveItem(i: string): void {
        if (this.Items.delete(i)) {
            this.setState({
                items: this.Items
            });
        } else {
            throw "this.Items.delete Failed.";
        }
    }

    onBreakpointChange(newBreakpoint: string, newCols: number): void {
        //console.log(`onBreakpointChange ${newBreakpoint} ${newCols}`);
        this.setState({
            breakpoint: newBreakpoint,
            cols: newCols
        });
    }

    onLayoutChange(currentLayout: Array<ReactGridLayout.Layout>, allLayouts: ReactGridLayout.Layouts): void {
        //console.log("Dashboard:onLayoutChange");
        //console.log(this);
        ////this.props.onLayoutChange(currentLayout, allLayouts);

        ////this.Items.clear();

        //currentLayout.forEach((item) => {
        //    console.log(item);
        //    this.Items[item.i].LayoutProperties = item;

        //    //this.Items.set(item.i, this.Items[item.i].);
        //});

        //console.log(this.Items);

        this.setState({items: this.Items});
    }

    shouldComponentUpdate?(nextProps: Readonly<DashboardProperties>, nextState: Readonly<DashboardState>, nextContext: any): boolean {
        //console.log("Dashboard:shouldComponentUpdate");
        return true;
    }

    componentDidMount?(): void {
        //console.log("Dashboard:componentDidMount");

        this.setState({
            mounted: true
        });

        const layoutItem = MapboxLayoutItem.GetPanel(this.onRemoveItem, line_JSON);

        this.onAddItem(layoutItem);
    }

    componentWillUnmount?(): void {
        //console.log("Dashboard:componentWillUnmount");
    }

    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void {
        //console.log("Dashboard:componentDidCatch");
    }

    renderItems(): Array<React.ReactNode> {
        return Array.from(this.Items.values()).map((value) => {
            const Component = value.Component;

            return (
                <Fabric applyTheme={true} key={value.LayoutProperties.i} data-grid={value.LayoutProperties}>
                    <Component LayoutProperties={value.LayoutProperties} HeaderProperties={value.HeaderProperties} ComponentProperties={value.ComponentProperties} />
                </Fabric>
            );
        });
    }

    render(): React.ReactNode {
        //console.log("Dashboard:render");  ref={this.ElementRef}
        return (
            <Fabric className="dashboard" applyTheme={true}>
                <CommandBar items={this.Controls} />
                <SizedResponsiveReactGridLayout
                    containerPadding={[5, 5]}
                    draggableHandle=".react-grid-item-header"
                    onLayoutChange={this.onLayoutChange}
                    onBreakpointChange={this.onBreakpointChange}
                    onDragStart={this.onDragStart}
                    onDrag={this.onDrag}
                    onDragStop={this.onDragStop}
                    onResizeStart={this.onResizeStart}
                    onResize={this.onResize}
                    onResizeStop={this.onResizeStop}
                    onDrop={this.onDrop}
                    compactType={null}
                    isDraggable={true}
                    isResizable={true}
                    preventCollision={true}
                    measureBeforeMount={true}
                    useCSSTransforms={true}
                    {...this.props}
                >
                    {this.renderItems()}
                </SizedResponsiveReactGridLayout>
            </Fabric>
        );
    }

    triggerForceUpdate() {
        this.forceUpdate();
    }

    onWidthChange(containerWidth: number, margin: [number, number], cols: number, containerPadding: [number, number]): void {
        //console.log("Dashboard:onWidthChange");
    }

    // Calls when drag starts.
    onDragStart(
        layout: Array<ReactGridLayout.Layout>,
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        //console.log("Dashboard:onDragStart");
    }

    // Calls on each drag movement.
    onDrag(
        layout: Array<ReactGridLayout.Layout>,
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        //console.log("Dashboard:onDrag");
    }

    // Calls when drag is complete.
    onDragStop(
        layout: Array<ReactGridLayout.Layout>,
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        //console.log("Dashboard:onDragStop");
    }

    // Calls when resize starts.
    onResizeStart(
        layout: Array<ReactGridLayout.Layout>,
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        //console.log("Dashboard:onResizeStart");
    }

    static ResizeItems: Set<OnResizeCallback> = new Set<OnResizeCallback>();

    static AddResize(item: OnResizeCallback): void {
        Dashboard.ResizeItems.add(item);
    }

    static RemoveResize(item: OnResizeCallback): void {
        Dashboard.ResizeItems.delete(item);
    }

    // Calls when resize movement happens.
    onResize(
        layout: Array<ReactGridLayout.Layout>,
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        //console.log("Dashboard:onResize");

        Dashboard.ResizeItems.forEach((item) => {
            item(this);
        });

        //    if (!this.mounted) {
        //        return;
        //    }
        //    const node = ReactDOM.findDOMNode(this);
        //    if (node instanceof HTMLElement) {
        //        this.setState({
        //            width: node.offsetWidth,
        //            height: node.offsetHeight
        //        });
        //    }
    }

    // Calls when resize is complete.
    onResizeStop(
        layout: Array<ReactGridLayout.Layout>,
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        //console.log("Dashboard:onResizeStop");

        Dashboard.ResizeItems.forEach((item) => {
            item(this);
        });
    }

    // Calls when an element has been dropped into the grid from outside.
    onDrop(elemParams: {x: number; y: number; w: number; h: number; e: Event}): void {
        //console.log("Dashboard:onDrop");
    }
}

//export class SizeMe({
//    monitorWidth: true,
//    monitorHeight: true
//})(Dashboard);
