import * as React from "react";

import {IconButton, IContextualMenuProps, IButtonProps, IIconProps, Stack} from "office-ui-fabric-react";
import {Guid} from "./guid";

import {LayoutItemHeaderProperties} from "./LayoutItemHeaderProperties";
import {NullishCoalescing} from "./UtilityMethods";

export class LayoutItemHeader extends React.Component<LayoutItemHeaderProperties> {

    SettingsControl: IButtonProps;
    MenuControl: IButtonProps;

    constructor(props) {
        super(props);

        this.SettingsControl = {
            iconProps: {iconName: "Settings"},
            onClick: () => {
                console.log("onSettingsClick happened");
            }
        };

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

    render() {
        return (
            <div className="react-grid-item-header">
                <div className="react-grid-item-header-title-container">
                    <div className="react-grid-item-header-title" title={this.props.title}>
                        {this.props.title}
                    </div>
                </div>
                <Stack horizontal className="react-grid-item-header-commandBar-container root-40">
                    <IconButton {...this.SettingsControl} />
                    <IconButton {...this.MenuControl} />
                </Stack>
            </div>
        );
    }
}
