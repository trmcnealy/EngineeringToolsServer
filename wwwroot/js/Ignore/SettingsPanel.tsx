//import * as React from "react";
//import * as ReactDOM from "react-dom";
//import * as mapboxgl from "mapbox-gl";

//import {Fabric} from "@fluentui/react";
//import {useConstCallback} from "@uifabric/react-hooks/lib/useConstCallback";
//import {Panel} from "office-ui-fabric-react/lib/Panel";
//import {DefaultButton, PrimaryButton} from "office-ui-fabric-react/lib/Button";

//import {
//    useObject,
//    FormContext,
//    UITypes,
//    InputTypes,
//} from "react-hook-form-jsonschema";

//function fromJSON(typ: any): any {
//    if (typ.jsonToJS === undefined) {
//        const map: any = {};
//        typ.props.forEach((p: any) => (map[p.json] = {key: p.js, typ: p.typ}));
//        typ.jsonToJS = map;
//    }
//    return typ.jsonToJS;
//}

//function ToJSON(typ: any): any {
//    if (typ.jsToJSON === undefined) {
//        const map: any = {};
//        typ.props.forEach((p: any) => (map[p.js] = {key: p.json, typ: p.typ}));
//        typ.jsToJSON = map;
//    }
//    return typ.jsToJSON;
//}

//export interface SettingsPanelProperties<TOwner, TPayload> {
//    headerText: string;
//    Owner: TOwner;
//    Payload: TPayload;
//    onClose: () => void;
//}

//export interface SettingsPanelState {
//    IsOpen: boolean;
//}

//export class Panel<TOwner, TPayload> extends React.PureComponent<SettingsPanelProperties<TOwner, TPayload>, SettingsPanelState> {

//    private _isOpen: boolean;
//    get IsOpen(): boolean {
//        return this._isOpen;
//    }
//    set IsOpen(value: boolean) {
//        if (this._isOpen !== value) {
//            this._isOpen = value;
//            this.setState({IsOpen: this._isOpen}, () => this.ElementRef.current.focus());
//        }
//    }

//    ElementRef: React.RefObject<HTMLDivElement>;

//    openPanel: () => boolean; //(callback: TPayload) => TPayload;
//    dismissPanel: () => boolean; //(callback: TPayload) => TPayload;

//    Owner: TOwner;
//    Payload: TPayload;

//    constructor(props: SettingsPanelProperties<TOwner, TPayload>) {
//        super(props);

//        this.Owner = this.props.Owner;
//        this.Payload = this.props.Payload;

//        this.ElementRef = React.createRef();

//        this.openPanel = useConstCallback(() => (this.IsOpen = true));
//        this.dismissPanel = useConstCallback(() => (this.IsOpen = false));

//    }

//    componentDidMount?(): void {
//        this.bf.render(this.ElementRef.current, ToJSON(this.Payload));
//    }

//    componentWillUnmount?(): void {
//        (this.Owner as any).Update(fromJSON(this.bf.getData()));
//    }

//    render(): React.ReactNode {
//        const onRenderFooterContent = useConstCallback(() => (
//            <div>
//                <PrimaryButton onClick={this.dismissPanel}>Save</PrimaryButton>
//                <DefaultButton onClick={this.dismissPanel}>Cancel</DefaultButton>
//            </div>
//        ));

//        //ref={this.ElementRef}

//        return (
//            <Fabric applyTheme={true}>
//                <Panel
//                    onDismissed={this.props.onClose}
//                    headerText={this.props.headerText}
//                    onRenderFooterContent={onRenderFooterContent}
//                    hasCloseButton={false}
//                    isOpen={this.IsOpen}
//                    onDismiss={this.dismissPanel}
//                    closeButtonAriaLabel="Cancel"
//                    isFooterAtBottom={true}
//                >
//                    {props.content}
//                </Panel>
//            </Fabric>
//        );
//    }
//}
