import * as React from "react";
import * as ReactDOM from "react-dom";

import {Fabric, initializeIcons, ICustomizations, Customizer} from "office-ui-fabric-react";
import {getTheme, mergeStyleSets, FontWeights, ContextualMenu, Toggle, IDragOptions, IconButton, Overlay} from "office-ui-fabric-react";

import {Spinner, SpinnerSize} from "office-ui-fabric-react/lib/Spinner";
import {DefaultButton, PrimaryButton} from "office-ui-fabric-react/lib/Button";
import {Dialog, DialogFooter} from "office-ui-fabric-react/lib/Dialog";
import {ProgressIndicator} from "office-ui-fabric-react/lib/ProgressIndicator";

import {property, sealed} from "./Decorators";
import * as MapView from "./MapView";

export interface ProgressOverlayProperties {
    label: string;
    description: string;
    OnClickCancel: () => void;
}

export interface ProgressOverlayState {
    percentComplete: number;
    setPercentComplete: number;
}

@sealed
export default class ProgressOverlay extends React.PureComponent<ProgressOverlayProperties, ProgressOverlayState> {
    //static defaultProperties: ProgressOverlayProperties = {
    //    label: "Progress",
    //    description: ""
    //} as ProgressOverlayProperties;

    //static defaultState: ProgressOverlayState = {
    //    percentComplete: 0,
    //    setPercentComplete: 0
    //} as ProgressOverlayState;

    constructor(props: Readonly<ProgressOverlayProperties>) {
        super(props);

        //this.Properties = {...props, ...ProgressOverlay.defaultProperties};

        this.state = {
            percentComplete: 0,
            setPercentComplete: 0
        };
    }

    shouldComponentUpdate?(nextProps: Readonly<ProgressOverlayProperties>, nextState: Readonly<ProgressOverlayState>, nextContext: any): boolean {
        if (this.state.percentComplete !== nextState.percentComplete) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <Dialog
                hidden={false}
                modalProps={{
                    isBlocking: true,
                    topOffsetFixed: true
                }}>
                <ProgressIndicator label={this.props.label} description={this.props.description} percentComplete={this.state.percentComplete} />

                <DialogFooter>
                    <PrimaryButton onClick={this.props.OnClickCancel} text="Cancel" />
                </DialogFooter>
            </Dialog>
        );
    }
}

//<Overlay isDarkThemed={false} onClick={toggleIsOverlayVisible}>
//<Spinner size={SpinnerSize.large} label="Loading..."  labelPosition="left" />
//</Overlay>
