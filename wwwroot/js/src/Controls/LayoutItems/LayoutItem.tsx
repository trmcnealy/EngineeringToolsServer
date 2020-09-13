import * as React from "react";

import {Stack} from "@fluentui/react";

import {LayoutItemHeader, LayoutItemHeaderProperties} from "./LayoutItemHeader";

export interface LayoutItemProperties<TComponentProperties = any> {
    LayoutProperties: ReactGridLayout.Layout;
    HeaderProperties: LayoutItemHeaderProperties;
    ComponentProperties: TComponentProperties;
}

export interface PanelProperties<TComponentProperties = any> {
    LayoutProperties: ReactGridLayout.Layout;
    HeaderProperties: LayoutItemHeaderProperties;
    ComponentProperties: TComponentProperties;
    Component: React.ComponentType<LayoutItemProperties<TComponentProperties>>;
}

export abstract class LayoutItem<TComponentProperties = any> extends React.Component<LayoutItemProperties<TComponentProperties>> {
    constructor(props) {
        super(props);
    }

    abstract renderComponent(): React.ReactNode;

    renderHeader(): React.ReactNode {
        return (
            <LayoutItemHeader
                title={this.props.HeaderProperties.title}
                Panel={this.props.HeaderProperties.Panel}
                Properties={this.props.HeaderProperties.Properties}
                onClose={this.props.HeaderProperties.onClose}
            />
        );
    }

    render(): React.ReactNode {
        return (
            <Stack className="react-grid-item-container">
                {this.renderHeader()}
                {this.renderComponent()}
            </Stack>
        );
    }
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

//export class function CreateLayoutItem<P>(WrappedComponent: React.ComponentType<P>) {

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
