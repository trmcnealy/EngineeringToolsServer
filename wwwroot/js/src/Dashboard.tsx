import * as React from "react";
import * as ReactDOM from "react-dom";

import sizeMe from "react-sizeme";

import * as CSS from "csstype";

import ReactGridLayout, {WidthProvider, ItemCallback, Responsive, ResponsiveProps} from "react-grid-layout";

import {Stack} from "office-ui-fabric-react";
import {CommandBar, ICommandBarItemProps} from "office-ui-fabric-react/lib/CommandBar";

//import { Fabric, initializeIcons, ICustomizations, Customizer } from "office-ui-fabric-react";
//import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";

//import { DarkThemeCustomizations } from "./DarkTheme"
//import { LightThemeCustomizations } from "./LightTheme"

import {property, sealed} from "./Decorators";
import {Guid} from "./guid";
import {LayoutItemHeader} from "./LayoutItemHeader";
import {LayoutItemHeaderProperties} from "./LayoutItemHeaderProperties";
import {LayoutItemProperties, LayoutItem, PanelProperties} from "./LayoutItem";
import Mapbox from "./Mapbox";
import MapboxLayoutItem from "./MapboxLayoutItem";
import {MapboxProperties} from "./Mapbox";

export interface DashboardProperties extends ResponsiveProps {}

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
export default class Dashboard extends React.Component<DashboardProperties, DashboardState> {
    static defaultProperties: DashboardProperties = {
        className: "layout root-40",
        //breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
        cols: {lg: 48, md: 40, sm: 20, xs: 16, xxs: 8},
        rowHeight: 30,
        onLayoutChange: (currentLayout: ReactGridLayout.Layout[], allLayouts: ReactGridLayout.Layouts): void => {}
    };

    static defaultState: DashboardState = {
        mounted: false,
        breakpoint: "lg",
        cols: 48,
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

    @property() ElementRef: React.RefObject<HTMLDivElement>;

    @property() Items: Map<string, PanelProperties>;

    @property() Controls: ICommandBarItemProps[];

    constructor(properties: DashboardProperties, context?: any) {
        super(properties, context);

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
                                const header: LayoutItemHeaderProperties = {
                                    title: MapboxLayoutItem.defaultLayoutProperties.i,
                                    onClose: this.onRemoveItem.bind(this, MapboxLayoutItem.defaultLayoutProperties.i)
                                };

                                const layoutItem: PanelProperties = {
                                    LayoutProperties: MapboxLayoutItem.defaultLayoutProperties,
                                    HeaderProperties: header,
                                    ComponentProperties: Mapbox.defaultProps,
                                    Component: MapboxLayoutItem
                                };

                                this.onAddItem(layoutItem);
                            }
                        }
                    ]
                }
            },
            {
                key: "layout",
                text: "Layout",
                iconProps: {iconName: "Table"},
                subMenuProps: {
                    items: [
                        {
                            key: "save",
                            text: "Save",
                            iconProps: {iconName: "Save"},
                            onClick: () => {}
                        },
                        {
                            key: "load",
                            text: "Load",
                            iconProps: {iconName: "DownloadDocument"},
                            onClick: () => {}
                        }
                    ]
                }
            }
        ];
        
        this.onAddItem = this.onAddItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
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
            throw "ASDKUJHASDKH";
        }
    }

    onBreakpointChange(newBreakpoint: string, newCols: number): void {
        console.log(`onBreakpointChange ${newBreakpoint} ${newCols}`);
        this.setState({
            breakpoint: newBreakpoint,
            cols: newCols
        });
    }

    onLayoutChange(currentLayout: ReactGridLayout.Layout[], allLayouts: ReactGridLayout.Layouts): void {
        console.log("onLayoutChange");
        this.props.onLayoutChange(currentLayout, allLayouts);

        //this.Items.clear();

        currentLayout.forEach((item) => {
            let layoutItem = this.Items[item.i];

            layoutItem.LayoutProperties = item;

            //this.Items.set(item.i, this.Items[item.i].);
        });

        console.log(this.Items);

        this.setState({items: this.Items});
    }

    shouldComponentUpdate?(nextProps: Readonly<DashboardProperties>, nextState: Readonly<DashboardState>, nextContext: any): boolean {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentDidMount?(): void {
        console.log("componentDidMount");

        this.setState({
            mounted: true
        });
    }

    componentWillUnmount?(): void {
        console.log("componentWillUnmount");
    }

    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("componentDidCatch");
    }

    //createElement(element: LayoutItem) {

    //    //return element.render();

    //    const layout: ReactGridLayout.Layout = {
    //        i: Guid.newGuid().toString(),
    //        x: 0,
    //        y: 0,
    //        w: 10,
    //        h: 10
    //    };

    //    const header: LayoutItemHeaderProperties = {
    //        title: layout.i,
    //        onClose: this.onRemoveItem.bind(this, layout.i)
    //    };

    //    return (
    //        <Stack key={layout.i} data-grid={layout}>
    //            <LayoutItemHeader title={header.title} onClose={header.onClose} />

    //        </Stack>
    //    );
    //}

    renderItems(): React.ReactNode[] {
        return Array.from(this.Items.values()).map((value) => {
            const Component = value.Component;

            return (
                <Stack key={value.LayoutProperties.i} data-grid={value.LayoutProperties}>
                    <Component LayoutProperties={value.LayoutProperties} HeaderProperties={value.HeaderProperties} ComponentProperties={value.ComponentProperties} />
                </Stack>
            );
        });
    }

    render(): React.ReactNode {
        return (
            <div className="dashboard" ref={this.ElementRef}>
                <CommandBar items={this.Controls} />
                <SizedResponsiveReactGridLayout
                    containerPadding={[0, 0]}
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
                    useCSSTransforms={this.state.mounted}
                    {...this.props}
                >
                    {this.renderItems()}
                </SizedResponsiveReactGridLayout>
            </div>
        );
    }

    onWidthChange(containerWidth: number, margin: [number, number], cols: number, containerPadding: [number, number]): void {
        console.log("onWidthChange");
    }

    // Calls when drag starts.
    onDragStart(
        layout: ReactGridLayout.Layout[],
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        console.log("onDragStart");
    }

    // Calls on each drag movement.
    onDrag(
        layout: ReactGridLayout.Layout[],
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        console.log("onDrag");
    }

    // Calls when drag is complete.
    onDragStop(
        layout: ReactGridLayout.Layout[],
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        console.log("onDragStop");
    }

    // Calls when resize starts.
    onResizeStart(
        layout: ReactGridLayout.Layout[],
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        console.log("onResizeStart");
    }

    // Calls when resize movement happens.
    onResize(
        layout: ReactGridLayout.Layout[],
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        console.log("onResize");
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
        layout: ReactGridLayout.Layout[],
        oldItem: ReactGridLayout.Layout,
        newItem: ReactGridLayout.Layout,
        placeholder: ReactGridLayout.Layout,
        event: MouseEvent,
        element: HTMLElement
    ): void {
        console.log("onResizeStop");
    }

    // Calls when an element has been dropped into the grid from outside.
    onDrop(elemParams: {x: number; y: number; w: number; h: number; e: Event}): void {
        console.log("onDrop");
    }
}
