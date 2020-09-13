import * as React from "react";
import {Theme} from "@fluentui/react-theme-provider";

import {IButtonProps, IStackStyles, Fabric, Stack, IconButton} from "@fluentui/react";

import {Themes} from "Themes";

export interface LayoutItemHeaderProperties {
    title: string;
    Panel: React.ComponentType<any>;
    Properties: any;
    onClose: () => void;
}

export class LayoutItemHeader extends React.Component<LayoutItemHeaderProperties> {
    //SettingsControl: IButtonProps;
    MenuControl: IButtonProps;

    constructor(props) {
        super(props);

        //this.SettingsControl = {
        //    iconProps: {iconName: "Settings"},
        //    onClick: this.props.onSettingsClicked
        //};

        this.MenuControl = {
            iconProps: {iconName: "MoreVertical"},
            menuProps: {
                items: [
                    //{
                    //    key: "export",
                    //    text: "Export As",
                    //    iconProps: {iconName: "SaveAs"},
                    //    onClick: () => {
                    //        console.log("Export As happened");
                    //    }
                    //},
                    {
                        key: "close",
                        text: "Close",
                        iconProps: {iconName: "ChromeClose"},
                        onClick: this.props.onClose
                    }
                ]
            }
        };
    }

    render(): React.ReactNode {

        const theme: Theme = Themes.getTheme();

        const stackStyles: IStackStyles = {
            root: [
                {
                    backgroundColor: theme.tokens.body.background
                }
            ]
        };

        const Panel = this.props.Panel;
        
        return (
            <Fabric className="react-grid-item-header" applyTheme={true}>
                <div className="react-grid-item-header-title-container">
                    <div className="react-grid-item-header-title" title={this.props.title}>
                        {this.props.title}
                    </div>
                </div>
                <Stack horizontal className="react-grid-item-header-commandBar-container" styles={stackStyles}>
                    <Panel {...this.props.Properties}/>
                    <IconButton {...this.MenuControl} />
                </Stack>
            </Fabric>
        );
    }
}
