import * as React from "react";

import {DefaultButton, PrimaryButton} from "office-ui-fabric-react/lib/Button";
import {Panel} from "office-ui-fabric-react/lib/Panel";
import {useConstCallback} from "@uifabric/react-hooks";

import {useObject, FormContext, UITypes, InputTypes, JSONSchemaType} from "react-hook-form-jsonschema";

import {sealed} from "Utilities";
import {Guid} from "DataTypes";
import {MapboxMap, MapboxMapProperties} from "Controls";
import {LayoutItem, LayoutItemProperties, PanelProperties} from "./LayoutItem";
import {LayoutItemHeader, LayoutItemHeaderProperties} from "./LayoutItemHeader";
import {SettingsPanel} from "./SettingsPanel";

//type Callback = (callback: any) => any;


@sealed
export class MapboxLayoutItem extends LayoutItem<MapboxMapProperties> {
    static defaultLayoutProperties: ReactGridLayout.Layout = {
        i: Guid.Empty.ToString(),
        x: 0,
        y: 0,
        w: 20,
        h: 15
    };

    constructor(props: LayoutItemProperties<MapboxMapProperties>) {
        super(props);
        //console.log(this.props);
    }

    renderComponent(): React.ReactNode {
        //console.log(this.props.ComponentProperties);
        return <MapboxMap {...this.props.ComponentProperties} />;
    }

    static GetPanel(onRemoveItem: (i: string) => void, schema: JSONSchemaType) {
    
        const settingsPanelProperties = {
            title: "Map Options",
            Schema: schema
        };

        const key = Guid.newGuid().ToString();

        const header: LayoutItemHeaderProperties = {
            title: "Map",
            Panel: SettingsPanel,
            Properties: settingsPanelProperties,
            onClose: () => onRemoveItem(key)
        };

        const layout: ReactGridLayout.Layout = {
            i: key,
            x: MapboxLayoutItem.defaultLayoutProperties.x,
            y: MapboxLayoutItem.defaultLayoutProperties.y,
            w: MapboxLayoutItem.defaultLayoutProperties.w,
            h: MapboxLayoutItem.defaultLayoutProperties.h
        };

        const layoutItem: PanelProperties = {
            LayoutProperties: layout,
            HeaderProperties: header,
            ComponentProperties: MapboxMap.defaultProperties,
            Component: MapboxLayoutItem
        };

        return layoutItem;
    }
}
