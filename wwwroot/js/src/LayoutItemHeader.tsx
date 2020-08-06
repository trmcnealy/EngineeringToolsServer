import * as React from "react";
import {CommandBar} from "office-ui-fabric-react/lib/CommandBar";
import {Guid} from "./guid";

import {LayoutItemHeaderProperties} from "./LayoutItemHeaderProperties";
import {NullishCoalescing} from "./UtilityMethods";

export class LayoutItemHeader extends React.Component<LayoutItemHeaderProperties> {

    static defaultProps = {
        HeaderControlsLeft: [],
        HeaderControlsRight: [
            {
                key: "settings",
                text: "Settings",
                ariaLabel: "Settings",
                iconOnly: true,
                iconProps: {iconName: "Settings"},
                onClick: () => {
                    console.log("onSettingsClick happened");
                }
            },
            {
                key: "menu",
                text: "Menu",
                ariaLabel: "Menu",
                cacheKey: Guid.newGuid().toString(),
                iconOnly: true,
                iconProps: {iconName: "MoreVertical"},
                subMenuProps: {
                    items: [
                        {
                            key: "export",
                            text: "Export As",
                            iconProps: {iconName: "SaveAs"},
                            onClick: () => {
                                console.log("Export As happened");
                            }
                        },
                        {
                            key: "close",
                            text: "Close",
                            iconProps: {iconName: "ChromeClose"},
                            onClick: () => {
                                console.log("onCloseClick happened");
                            }
                        }
                    ]
                }
            }
        ]
    };

    constructor(props) {
        super(props);
    }

    render() {
        const headerItems = NullishCoalescing(this.props.HeaderControlsLeft, LayoutItemHeader.defaultProps.HeaderControlsLeft);
        const headerFarItems = NullishCoalescing(this.props.HeaderControlsRight, LayoutItemHeader.defaultProps.HeaderControlsRight);

        return (
            <header className="react-grid-item-header">
                <div className="react-grid-item-title-container">
                    <div className="react-grid-item-title" title={this.props.title}>
                        {this.props.title}
                    </div>
                </div>
                <CommandBar items={headerItems} farItems={headerFarItems} />
            </header>
        );
    }
}
