import * as React from "react";
import * as ReactDOM from "react-dom";

import * as CSS from "csstype";

import ReactGridLayout, {WidthProvider, ItemCallback, Responsive, ResponsiveProps} from "react-grid-layout";

import {Stack} from "office-ui-fabric-react";

import {LayoutItemHeader} from "./LayoutItemHeader";
import {LayoutItemHeaderProperties} from "./LayoutItemHeaderProperties";

//export interface LayoutItemProperties<P> {
//    LayoutProperties: ReactGridLayout.Layout;
//    HeaderProperties: LayoutItemHeaderProperties;
//    ComponentProperties: P;
//    Component: React.ComponentType<P>;
//}

//export class LayoutItem<P = {}> extends React.Component<LayoutItemProperties<P>> {
//    render() {
//        const WrappedComponent = this.props.Component;

//        return (
//            <Stack key={this.props.LayoutProperties.i} data-grid={this.props.LayoutProperties}>
//                <LayoutItemHeader title={this.props.HeaderProperties.title} onClose={this.props.HeaderProperties.onClose} />
//                <WrappedComponent {...this.props.ComponentProperties} />
//            </Stack>
//        );
//    }
//}

export interface LayoutItemProperties<TComponentProperties={}> {
    LayoutProperties: ReactGridLayout.Layout;
    HeaderProperties: LayoutItemHeaderProperties;
    ComponentProperties: TComponentProperties;
}

export abstract class LayoutItem<TComponentProperties={}> extends React.Component<LayoutItemProperties<TComponentProperties>> {

    constructor(props) {
        super(props);
    }

    renderHeader(): React.ReactNode {
        return <LayoutItemHeader title={this.props.HeaderProperties.title} onClose={this.props.HeaderProperties.onClose} />;
    }

    abstract renderComponent(): React.ReactNode;

    render(): React.ReactNode {
        return (
            <React.Fragment>
                {this.renderHeader()}
                {this.renderComponent()}
            </React.Fragment>

        );
    }
}


export interface PanelProperties<TComponentProperties=any> {
    LayoutProperties: ReactGridLayout.Layout;
    HeaderProperties: LayoutItemHeaderProperties;
    ComponentProperties: TComponentProperties;
    Component: React.ComponentType<LayoutItemProperties<TComponentProperties>>;
}

//export class PanelPlugin {

//    panel?: React.ComponentType;

//    constructor(panel?: React.ComponentType) {

//        this.panel = panel;
//    }
//}

//<Stack key={this.props.LayoutProperties.i} data-grid={this.props.LayoutProperties}>
//    {this.renderHeader()}
//    {this.renderComponent()}
//</Stack>



//export default function CreateLayoutItem<P>(WrappedComponent: React.ComponentType<P>) {

//    return class LayoutItem extends React.Component<LayoutItemProperties<P>> {
//        constructor(props) {
//            super(props);
//        }

//        render(): JSX.Element {
//            const {LayoutProperties, HeaderProperties, ...wrappedComponentProps} = this.props;

//            return (
//                <Stack key={LayoutProperties.i} data-grid={LayoutProperties}>
//                    <LayoutItemHeader title={HeaderProperties.title} onClose={HeaderProperties.onClose} />
//                    <WrappedComponent {...wrappedComponentProps} />
//                </Stack>
//            );
//        }
//    };
//}
