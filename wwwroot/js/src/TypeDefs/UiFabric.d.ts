﻿//import * as office_ui_fabric_react from "office-ui-fabric-react";

//import * as Button from 'office-ui-fabric-react/lib/Button';
//import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
//import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

//export = UiFabric;
//export as export module UiFabric;

//declare export module UiFabric {

//    export * from "office-ui-fabric-react";

//    //export * from import("office-ui-fabric-react/lib/ActivityItem");
//    //export * from "office-ui-fabric-react/lib/Announced";
//    //export * from "office-ui-fabric-react/lib/Autofill";
//    //export * from "office-ui-fabric-react/lib/Breadcrumb";
//    //export * from "office-ui-fabric-react/lib/Button";
//    //export * from "office-ui-fabric-react/lib/Calendar";
//    //export * from "office-ui-fabric-react/lib/Callout";
//    //export * from "office-ui-fabric-react/lib/Check";
//    //export * from "office-ui-fabric-react/lib/Checkbox";
//    //export * from "office-ui-fabric-react/lib/ChoiceGroup";
//    //export * from "office-ui-fabric-react/lib/ChoiceGroupOption";
//    //export * from "office-ui-fabric-react/lib/Coachmark";
//    //export * from "office-ui-fabric-react/lib/Color";
//    //export * from "office-ui-fabric-react/lib/ColorPicker";
//    //export * from "office-ui-fabric-react/lib/ComboBox";
//    //export * from "office-ui-fabric-react/lib/CommandBar";
//    //export * from "office-ui-fabric-react/lib/ContextualMenu";
//    //export * from "office-ui-fabric-react/lib/DatePicker";
//    //export * from "office-ui-fabric-react/lib/DetailsList";
//    //export * from "office-ui-fabric-react/lib/Dialog";
//    //export * from "office-ui-fabric-react/lib/Divider";
//    //export * from "office-ui-fabric-react/lib/DocumentCard";
//    //export * from "office-ui-fabric-react/lib/Dropdown";
//    //export * from "office-ui-fabric-react/lib/ExtendedPicker";
//    //export * from "office-ui-fabric-react/lib/Fabric";
//    //export * from "office-ui-fabric-react/lib/Facepile";
//    //export * from "office-ui-fabric-react/lib/FloatingPicker";
//    //export * from "office-ui-fabric-react/lib/FocusTrapZone";
//    //export * from "office-ui-fabric-react/lib/FocusZone";
//    //export * from "office-ui-fabric-react/lib/Foundation";
//    //export * from "office-ui-fabric-react/lib/Grid";
//    //export * from "office-ui-fabric-react/lib/GroupedList";
//    //export * from "office-ui-fabric-react/lib/HoverCard";
//    //export * from "office-ui-fabric-react/lib/Icon";
//    //export * from "office-ui-fabric-react/lib/Icons";
//    //export * from "office-ui-fabric-react/lib/Image";
//    //export * from "office-ui-fabric-react/lib/index.bundle";
//    //export * from "office-ui-fabric-react/lib/index";
//    //export * from "office-ui-fabric-react/lib/Keytip";
//    //export * from "office-ui-fabric-react/lib/KeytipData";
//    //export * from "office-ui-fabric-react/lib/KeytipLayer";
//    //export * from "office-ui-fabric-react/lib/Label";
//    //export * from "office-ui-fabric-react/lib/Layer";
//    //export * from "office-ui-fabric-react/lib/Link";
//    //export * from "office-ui-fabric-react/lib/List";
//    //export * from "office-ui-fabric-react/lib/MarqueeSelection";
//    //export * from "office-ui-fabric-react/lib/MessageBar";
//    //export * from "office-ui-fabric-react/lib/Modal";
//    //export * from "office-ui-fabric-react/lib/Nav";
//    //export * from "office-ui-fabric-react/lib/OverflowSet";
//    //export * from "office-ui-fabric-react/lib/Overlay";
//    //export * from "office-ui-fabric-react/lib/Panel";
//    //export * from "office-ui-fabric-react/lib/Persona";
//    //export * from "office-ui-fabric-react/lib/PersonaCoin";
//    //export * from "office-ui-fabric-react/lib/PersonaPresence";
//    //export * from "office-ui-fabric-react/lib/Pickers";
//    //export * from "office-ui-fabric-react/lib/Pivot";
//    //export * from "office-ui-fabric-react/lib/Popup";
//    //export * from "office-ui-fabric-react/lib/PositioningContainer";
//    //export * from "office-ui-fabric-react/lib/ProgressIndicator";
//    //export * from "office-ui-fabric-react/lib/Rating";
//    //export * from "office-ui-fabric-react/lib/ResizeGroup";
//    //export * from "office-ui-fabric-react/lib/ScrollablePane";
//    //export * from "office-ui-fabric-react/lib/SearchBox";
//    //export * from "office-ui-fabric-react/lib/SelectableOption";
//    //export * from "office-ui-fabric-react/lib/SelectedItemsList";
//    //export * from "office-ui-fabric-react/lib/Selection";
//    //export * from "office-ui-fabric-react/lib/Separator";
//    //export * from "office-ui-fabric-react/lib/Shimmer";
//    //export * from "office-ui-fabric-react/lib/ShimmeredDetailsList";
//    //export * from "office-ui-fabric-react/lib/Slider";
//    //export * from "office-ui-fabric-react/lib/SpinButton";
//    //export * from "office-ui-fabric-react/lib/Spinner";
//    //export * from "office-ui-fabric-react/lib/Stack";
//    //export * from "office-ui-fabric-react/lib/Sticky";
//    //export * from "office-ui-fabric-react/lib/Styling";
//    //export * from "office-ui-fabric-react/lib/SwatchColorPicker";
//    //export * from "office-ui-fabric-react/lib/TeachingBubble";
//    //export * from "office-ui-fabric-react/lib/Text";
//    //export * from "office-ui-fabric-react/lib/TextField";
//    //export * from "office-ui-fabric-react/lib/ThemeGenerator";
//    //export * from "office-ui-fabric-react/lib/Toggle";
//    //export * from "office-ui-fabric-react/lib/Tooltip";
//    //export * from "office-ui-fabric-react/lib/Utilities";

//    export * from "@uifabric/styling";
//    export * from "@uifabric/fluent-theme";
//    export * from "@uifabric/foundation";
//    export * from "@uifabric/icons";
//    export * from "@uifabric/merge-styles";
//    export * from "@uifabric/react-hooks";
//    export * from "@uifabric/set-version";
//    export * from "@uifabric/theme-samples";
//    export * from "@uifabric/utilities";
//    export * from "@uifabric/variants";

//    export * from "@fluentui/react-theming";
//    export * from "@fluentui/date-time-utilities";
//    export * from "@fluentui/keyboard-key";
//    export * from "@fluentui/react-focus";
//    export * from "@fluentui/react-icons";
//    export * from "@fluentui/react-stylesheets";
//    export * from "@fluentui/react-theme-provider";
//}

////export * from "@uifabric/fluent-theme";
////export * from "@uifabric/styling";
////export * from "@uifabric/foundation";
//export * from "@uifabric/icons";
////export * from "@uifabric/merge-styles";
//export * from "@uifabric/react-hooks";
//export * from "@uifabric/set-version";
//export * from "@uifabric/theme-samples";
//export * from "@uifabric/utilities";
//export * from "@uifabric/variants";

////export * from "@fluentui/react-theming";
////export * from "@fluentui/date-time-utilities";
//export * from "@fluentui/keyboard-key";
//export * from "@fluentui/react-focus";
////export * from "@fluentui/react-icons";
//export * from "@fluentui/react-stylesheets";
//export * from "@fluentui/react-theme-provider";

//export * from "office-ui-fabric-react";
