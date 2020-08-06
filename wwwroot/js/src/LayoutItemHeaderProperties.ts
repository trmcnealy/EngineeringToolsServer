
import {ICommandBarItemProps} from "office-ui-fabric-react/lib/CommandBar";


export interface LayoutItemHeaderProperties {
    title: string;
    HeaderControlsLeft?: ICommandBarItemProps[];
    HeaderControlsRight?: ICommandBarItemProps[];
}