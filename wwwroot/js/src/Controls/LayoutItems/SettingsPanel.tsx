import * as React from "react";

import {IconButton} from "@fluentui/react";
import {DefaultButton, PrimaryButton} from "office-ui-fabric-react/lib/Button";
import {Panel} from "office-ui-fabric-react/lib/Panel";
import {useConstCallback} from "@uifabric/react-hooks";

import {useObject, FormContext, UITypes, InputTypes, JSONSchemaType} from "react-hook-form-jsonschema";

import {sealed} from "Utilities";
import {Guid} from "DataTypes";
import {MapboxMap, MapboxMapProperties} from "Controls";
import {LayoutItem, LayoutItemProperties, PanelProperties} from "./LayoutItem";
import {LayoutItemHeader, LayoutItemHeaderProperties} from "./LayoutItemHeader";

//type Callback = (callback: any) => any;

export interface SettingsPanelState {
    IsOpen: boolean;
}

export interface SettingsPanelProperties {
    title: string;
    Schema: JSONSchemaType;
}

//export const SettingsPanel: React.FunctionComponent<SettingsPanelProperties> = (props:SettingsPanelProperties) => {
//    const [isOpen, setIsOpen] = React.useState(false);

//    const openPanel = useConstCallback(() => setIsOpen(true));
//    const dismissPanel = useConstCallback(() => setIsOpen(false));

//    const onRenderFooterContent = useConstCallback(() => (
//        <div>
//            <PrimaryButton onClick={dismissPanel}>Save</PrimaryButton>
//            <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
//        </div>
//    ));

//    const SettingsControl = {
//        iconProps: {iconName: "Settings"},
//        onClick: openPanel
//    };

//    return (
//        <div>
//            <IconButton {...SettingsControl} />
//            <Panel
//                isOpen={isOpen}
//                onDismiss={dismissPanel}
//                headerText="Panel with footer at bottom"
//                closeButtonAriaLabel="Close"
//                onRenderFooterContent={onRenderFooterContent}
//                isFooterAtBottom={true}
//            >
//                <FormContext schema={props.Schema} />
//            </Panel>
//        </div>
//    );
//};

export class SettingsPanel extends React.PureComponent<SettingsPanelProperties, SettingsPanelState> {

    setIsOpen(value: boolean) {
        this.setState({IsOpen: value});
    }

    constructor(props: SettingsPanelProperties) {
        super(props);

        this.state = { IsOpen: false };

        this.OpenPanel = this.OpenPanel.bind(this);
        this.DismissPanel = this.DismissPanel.bind(this);
    }

    OpenPanel() {
        this.setIsOpen(true);
    };

    DismissPanel() {
        this.setIsOpen(false);
    };

    render() {

        const SettingsControl = {
            iconProps: {iconName: "Settings"},
            onClick: this.OpenPanel
        };

        const onRenderFooterContent = () => (
            <div>
                <PrimaryButton onClick={this.DismissPanel}>Save</PrimaryButton>
                <DefaultButton onClick={this.DismissPanel}>Cancel</DefaultButton>
            </div>
        );

        //<ObjectRenderer pointer="#" UISchema={UISchema} />

        return (
            <div>
                <IconButton {...SettingsControl} />
                <Panel
                    type="Medium"
                    isOpen={this.state.IsOpen}
                    onDismiss={this.DismissPanel}
                    headerText={this.props.title}
                    closeButtonAriaLabel="Close"
                    onRenderFooterContent={onRenderFooterContent}
                    isFooterAtBottom={true}
                >
                    <FormContext schema={this.props.Schema} />
                </Panel>
            </div>
        );
    }
}
