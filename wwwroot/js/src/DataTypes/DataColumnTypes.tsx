import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";
import * as chroma from "chroma-js";

import {IPromise, As, DistictAdd} from "Utilities";
import {StringExtensions} from "Extensions";

export interface ValueRange<T> {
    min?: T;
    max?: T;
}

export type NumberRange = ValueRange<number>;

export type ValueType = string | number | boolean | Date;

export interface IStyleInfo {
    className?: string;
}

export interface IColorInfo extends IStyleInfo {
    value: string;
}

export interface IColorPalette {
    GetColor(value: Date | number | {valueOf(): number}): number | string | any | IColorInfo;
    GetColor(value: number | {valueOf(): number}): number | string | any | IColorInfo;
    GetColor(value: {toString(): string} | any): number | IColorInfo | undefined;
    GetColor(value: number | string | Date | any): number | string | any | IColorInfo;

    Reset(): IColorPalette;
}

export type StructuralObjectValue = Fill | FillRule | SemanticFilter | DefaultValueDefinition | ImageValue | Paragraphs | GeoJson | DataBars;

export interface GeoJsonDefinitionGeneric<T> {
    type: T;
    name: T;
    content: T;
}

export type GeoJson = GeoJsonDefinitionGeneric<string>;

export interface DataBars {
    minValue?: number;
    maxValue?: number;
    positiveColor: Fill;
    negativeColor: Fill;
    axisColor: Fill;
    reverseDirection: boolean;
    hideText: boolean;
}

export interface Fill {
    solid?: {
        color?: string;
    };
    gradient?: {
        startColor?: string;
        endColor?: string;
    };
    pattern?: {
        patternKind?: string;
        color?: string;
    };
}

export interface RuleColorStopGeneric<TColor, TValue> {
    color: TColor;
    value?: TValue;
}

export interface NullColoringStrategyGeneric<TStrategy, TColor> {
    strategy: TStrategy;
    color?: TColor;
}

export interface LinearGradient2Generic<TColor, TValue, TStrategy> {
    max: RuleColorStopGeneric<TColor, TValue>;
    min: RuleColorStopGeneric<TColor, TValue>;
    nullColoringStrategy?: NullColoringStrategyGeneric<TStrategy, TColor>;
}

export interface LinearGradient3Generic<TColor, TValue, TStrategy> {
    max: RuleColorStopGeneric<TColor, TValue>;
    mid: RuleColorStopGeneric<TColor, TValue>;
    min: RuleColorStopGeneric<TColor, TValue>;
    nullColoringStrategy?: NullColoringStrategyGeneric<TStrategy, TColor>;
}

export interface FillRuleGeneric<TColor, TValue, TStrategy> {
    linearGradient2?: LinearGradient2Generic<TColor, TValue, TStrategy>;
    linearGradient3?: LinearGradient3Generic<TColor, TValue, TStrategy>;
}

export type FillRule = FillRuleGeneric<string, number, string>;

export interface ISemanticFilter {}

export type SemanticFilter = ISemanticFilter;

export interface IKeyState {
    ctrl?: boolean;
    shift?: boolean;
}

export interface IBrushSelectionDelta<T> {
    added: Array<T>;
    removed: Array<T>;
}

export interface ISemanticFilter {}

export interface ISQExpr {}

export interface ISQExprVisitorWithArg<T, TArg> {
    visitEntity(expr: SQEntityExpr, arg?: TArg): T;
    visitColumnRef(expr: SQColumnRefExpr, arg?: TArg): T;
    visitMeasureRef(expr: SQMeasureRefExpr, arg?: TArg): T;
    visitAggr(expr: SQAggregationExpr, arg?: TArg): T;
    visitAnd(expr: SQAndExpr, arg?: TArg): T;
    visitBetween(expr: SQBetweenExpr, arg?: TArg): T;
    visitIn(expr: SQInExpr, arg?: TArg): T;
    visitOr(expr: SQOrExpr, arg?: TArg): T;
    visitCompare(expr: SQCompareExpr, arg?: TArg): T;
    visitContains(expr: SQContainsExpr, arg?: TArg): T;
    visitExists(expr: SQExistsExpr, arg?: TArg): T;
    visitNot(expr: SQNotExpr, arg?: TArg): T;
    visitStartsWith(expr: SQStartsWithExpr, arg?: TArg): T;
    visitConstant(expr: SQConstantExpr, arg?: TArg): T;
    visitDateSpan(expr: SQDateSpanExpr, arg?: TArg): T;
    visitDateAdd(expr: SQDateAddExpr, arg?: TArg): T;
    visitNow(expr: SQNowExpr, arg?: TArg): T;
}

export abstract class SQExpr {
    constructor() {}

    static equals(x: SQExpr, y: SQExpr, ignoreCase?: boolean): boolean {
        return SQExprEqualityVisitor.run(x, y, ignoreCase);
    }

    abstract accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T;
}

export enum TimeUnit {
    Day = 0,
    Week = 1,
    Month = 2,
    Year = 3,
    Decade = 4,
    Second = 5,
    Minute = 6,
    Hour = 7
}

export enum QueryAggregateFunction {
    Sum = 0,
    Avg = 1,
    Count = 2,
    Min = 3,
    Max = 4,
    CountNonNull = 5,
    Median = 6,
    StandardDeviation = 7,
    Variance = 8
}

export enum QuerySortDirection {
    Ascending = 1,
    Descending = 2
}

export enum QueryComparisonKind {
    Equal = 0,
    GreaterThan = 1,
    GreaterThanOrEqual = 2,
    LessThan = 3,
    LessThanOrEqual = 4
}

export class SQEntityExpr extends SQExpr {
    schema: string;
    entity: string;
    variable?: string;

    constructor(schema: string, entity: string, variable?: string) {
        super();

        this.schema = schema;
        this.entity = entity;

        if (variable) {
            this.variable = variable;
        }
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitEntity(this, arg);
    }
}

export abstract class SQPropRefExpr extends SQExpr {
    ref: string;
    source: SQExpr;

    constructor(source: SQExpr, ref: string) {
        super();
        this.source = source;
        this.ref = ref;
    }
}

export class SQColumnRefExpr extends SQPropRefExpr {
    constructor(source: SQExpr, ref: string) {
        super(source, ref);
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitColumnRef(this, arg);
    }
}

export class SQMeasureRefExpr extends SQPropRefExpr {
    constructor(source: SQExpr, ref: string) {
        super(source, ref);
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitMeasureRef(this, arg);
    }
}

export class SQAggregationExpr extends SQExpr {
    arg: SQExpr;
    func: QueryAggregateFunction;

    constructor(arg: SQExpr, func: QueryAggregateFunction) {
        super();
        this.arg = arg;
        this.func = func;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitAggr(this, arg);
    }
}

export class SQAndExpr extends SQExpr {
    left: SQExpr;
    right: SQExpr;

    constructor(left: SQExpr, right: SQExpr) {
        super();
        this.left = left;
        this.right = right;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitAnd(this, arg);
    }
}

export class SQBetweenExpr extends SQExpr {
    arg: SQExpr;
    lower: SQExpr;
    upper: SQExpr;

    constructor(arg: SQExpr, lower: SQExpr, upper: SQExpr) {
        super();
        this.arg = arg;
        this.lower = lower;
        this.upper = upper;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitBetween(this, arg);
    }
}

export class SQInExpr extends SQExpr {
    args: SQExpr[];
    values: SQExpr[][];

    constructor(args: SQExpr[], values: SQExpr[][]) {
        super();
        this.args = args;
        this.values = values;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitIn(this, arg);
    }
}

export class SQOrExpr extends SQExpr {
    left: SQExpr;
    right: SQExpr;

    constructor(left: SQExpr, right: SQExpr) {
        super();
        this.left = left;
        this.right = right;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitOr(this, arg);
    }
}

export class SQCompareExpr extends SQExpr {
    kind: QueryComparisonKind;
    left: SQExpr;
    right: SQExpr;

    constructor(kind: QueryComparisonKind, left: SQExpr, right: SQExpr) {
        super();
        this.kind = kind;
        this.left = left;
        this.right = right;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitCompare(this, arg);
    }
}

export class SQContainsExpr extends SQExpr {
    left: SQExpr;
    right: SQExpr;

    constructor(left: SQExpr, right: SQExpr) {
        super();
        this.left = left;
        this.right = right;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitContains(this, arg);
    }
}

export class SQStartsWithExpr extends SQExpr {
    left: SQExpr;
    right: SQExpr;

    constructor(left: SQExpr, right: SQExpr) {
        super();
        this.left = left;
        this.right = right;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitStartsWith(this, arg);
    }
}

export class SQExistsExpr extends SQExpr {
    arg: SQExpr;

    constructor(arg: SQExpr) {
        super();
        this.arg = arg;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitExists(this, arg);
    }
}

export class SQNotExpr extends SQExpr {
    arg: SQExpr;

    constructor(arg: SQExpr) {
        super();
        this.arg = arg;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitNot(this, arg);
    }
}

export class SQConstantExpr extends SQExpr {
    type: ValueType;

    /** The native JavaScript representation of the value. */
    value: any;

    /** The string encoded, lossless representation of the value. */
    valueEncoded: string;

    constructor(type: ValueType, value: any, valueEncoded: string) {
        super();
        this.type = type;
        this.value = value;
        this.valueEncoded = valueEncoded;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitConstant(this, arg);
    }
}

export class SQDateSpanExpr extends SQExpr {
    unit: TimeUnit;
    arg: SQExpr;

    constructor(unit: TimeUnit, arg: SQExpr) {
        super();
        this.unit = unit;
        this.arg = arg;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitDateSpan(this, arg);
    }
}

export class SQDateAddExpr extends SQExpr {
    unit: TimeUnit;
    amount: number;
    arg: SQExpr;

    constructor(unit: TimeUnit, amount: number, arg: SQExpr) {
        super();
        this.unit = unit;
        this.arg = arg;
        this.amount = amount;
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitDateAdd(this, arg);
    }
}

export class SQNowExpr extends SQExpr {
    constructor() {
        super();
    }

    accept<T, TArg>(visitor: ISQExprVisitorWithArg<T, TArg>, arg?: TArg): T {
        return visitor.visitNow(this, arg);
    }
}

export class SQExprEqualityVisitor implements ISQExprVisitorWithArg<boolean, SQExpr> {
    private static instance: SQExprEqualityVisitor = new SQExprEqualityVisitor(/* ignoreCase */ false);
    private static ignoreCaseInstance: SQExprEqualityVisitor = new SQExprEqualityVisitor(true);
    private ignoreCase: boolean;

    static run(x: SQExpr | null, y: SQExpr | null, ignoreCase?: boolean): boolean {

        if (x === null || y === null) {
            return false;
        }

        if (x === y) {
            return true;
        }

        if (!x !== !y) {
            return false;
        }

        if (ignoreCase) {
            return x.accept(SQExprEqualityVisitor.ignoreCaseInstance as any, y);
        }

        return x.accept(SQExprEqualityVisitor.instance as any, y);
    }

    constructor(ignoreCase: boolean) {
        this.ignoreCase = ignoreCase;
    }

    visitColumnRef(expr: SQColumnRefExpr, comparand: SQColumnRefExpr): boolean {
        return comparand instanceof SQColumnRefExpr && expr.ref === As<SQColumnRefExpr>(comparand).ref && this.equals(expr.source, As<SQColumnRefExpr>(comparand).source);
    }

    visitMeasureRef(expr: SQMeasureRefExpr, comparand: SQMeasureRefExpr): boolean {
        return comparand instanceof SQMeasureRefExpr && expr.ref === As<SQMeasureRefExpr>(comparand).ref && this.equals(expr.source, As<SQMeasureRefExpr>(comparand).source);
    }

    visitAggr(expr: SQAggregationExpr, comparand: SQExpr): boolean {
        return comparand instanceof SQAggregationExpr && expr.func === As<SQAggregationExpr>(comparand).func && this.equals(expr.arg, As<SQAggregationExpr>(comparand).arg);
    }

    visitBetween(expr: SQBetweenExpr, comparand: SQExpr): boolean {
        return (
            comparand instanceof SQBetweenExpr &&
            this.equals(expr.arg, As<SQBetweenExpr>(comparand).arg) &&
            this.equals(expr.lower, As<SQBetweenExpr>(comparand).lower) &&
            this.equals(expr.upper, As<SQBetweenExpr>(comparand).upper)
        );
    }

    visitIn(expr: SQInExpr, comparand: SQExpr): boolean {
        if (!(comparand instanceof SQInExpr) || !this.equalsAll(expr.args, As<SQInExpr>(comparand).args)) return false;

        const values = expr.values,
            compareValues = As<SQInExpr>(comparand).values;
        if (values.length !== compareValues.length) return false;

        for (let i = 0, len = values.length; i < len; i++) {
            if (!this.equalsAll(values[i], compareValues[i])) return false;
        }

        return true;
    }

    visitEntity(expr: SQEntityExpr, comparand: SQExpr): boolean {
        return (
            comparand instanceof SQEntityExpr &&
            expr.schema === As<SQEntityExpr>(comparand).schema &&
            expr.entity === As<SQEntityExpr>(comparand).entity &&
            this.optionalEqual(expr.variable!, As<SQEntityExpr>(comparand).variable!)
        );
    }

    visitAnd(expr: SQAndExpr, comparand: SQExpr): boolean {
        return comparand instanceof SQAndExpr && this.equals(expr.left, As<SQAndExpr>(comparand).left) && this.equals(expr.right, As<SQAndExpr>(comparand).right);
    }

    visitOr(expr: SQOrExpr, comparand: SQExpr): boolean {
        return comparand instanceof SQOrExpr && this.equals(expr.left, As<SQOrExpr>(comparand).left) && this.equals(expr.right, As<SQOrExpr>(comparand).right);
    }

    visitCompare(expr: SQCompareExpr, comparand: SQExpr): boolean {
        return (
            comparand instanceof SQCompareExpr &&
            expr.kind === As<SQCompareExpr>(comparand).kind &&
            this.equals(expr.left, As<SQCompareExpr>(comparand).left) &&
            this.equals(expr.right, As<SQCompareExpr>(comparand).right)
        );
    }

    visitContains(expr: SQContainsExpr, comparand: SQExpr): boolean {
        return (
            comparand instanceof SQContainsExpr && this.equals(expr.left, As<SQContainsExpr>(comparand).left) && this.equals(expr.right, As<SQContainsExpr>(comparand).right)
        );
    }

    visitDateSpan(expr: SQDateSpanExpr, comparand: SQExpr): boolean {
        return comparand instanceof SQDateSpanExpr && expr.unit === As<SQDateSpanExpr>(comparand).unit && this.equals(expr.arg, As<SQDateSpanExpr>(comparand).arg);
    }

    visitDateAdd(expr: SQDateAddExpr, comparand: SQExpr): boolean {
        return (
            comparand instanceof SQDateAddExpr &&
            expr.unit === As<SQDateAddExpr>(comparand).unit &&
            expr.amount === As<SQDateAddExpr>(comparand).amount &&
            this.equals(expr.arg, As<SQDateAddExpr>(comparand).arg)
        );
    }

    visitExists(expr: SQExistsExpr, comparand: SQExpr): boolean {
        return comparand instanceof SQExistsExpr && this.equals(expr.arg, As<SQExistsExpr>(comparand).arg);
    }

    visitNot(expr: SQNotExpr, comparand: SQExpr): boolean {
        return comparand instanceof SQNotExpr && this.equals(expr.arg, As<SQNotExpr>(comparand).arg);
    }

    visitNow(expr: SQNowExpr, comparand: SQExpr): boolean {
        return comparand instanceof SQNowExpr;
    }

    visitStartsWith(expr: SQStartsWithExpr, comparand: SQExpr): boolean {
        return (
            comparand instanceof SQStartsWithExpr &&
            this.equals(expr.left, As<SQStartsWithExpr>(comparand).left) &&
            this.equals(expr.right, As<SQStartsWithExpr>(comparand).right)
        );
    }

    visitConstant(expr: SQConstantExpr, comparand: SQExpr): boolean {
        if (comparand instanceof SQConstantExpr && expr.type === As<SQConstantExpr>(comparand).type)
            return expr.type && this.ignoreCase
                ? StringExtensions.equalIgnoreCase(expr.valueEncoded, As<SQConstantExpr>(comparand).valueEncoded)
                : expr.valueEncoded === As<SQConstantExpr>(comparand).valueEncoded;

        return false;
    }

    private optionalEqual(x: string, y: string) {
        // Only check equality if both values are specified.
        if (x && y) return x === y;

        return true;
    }

    private equals(x: SQExpr, y: SQExpr): boolean {
        return x.accept(this as any, y);
    }

    private equalsAll(x: SQExpr[], y: SQExpr[]): boolean {
        const len = x.length;
        if (len !== y.length) return false;

        for (let i = 0; i < len; i++) {
            if (!this.equals(x[i], y[i])) return false;
        }

        return true;
    }
}

export type ISQConstantExpr = ISQExpr;

export interface DefaultValueDefinition {
    value: ISQConstantExpr;
    identityFieldsValues?: Array<ISQConstantExpr>;
}

export type ImageValue = ImageDefinitionGeneric<string>;

export interface ImageDefinitionGeneric<T> {
    name: T;
    url: T;
    scaling?: T;
}

export interface TextRunStyle {
    fontFamily?: string;
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string;
    color?: string;
    textDecoration?: string;
}

export interface TextRun {
    textStyle?: TextRunStyle;
    url?: string;
    value: string;
    valueExpr?: ISQExpr;
}

export interface Paragraph {
    horizontalTextAlignment?: string;
    textRuns: Array<TextRun>;
}

export type Paragraphs = Array<Paragraph>;

export type EnumMemberValue = string | number;

export interface IStringResourceProvider {
    get(id: string): string;
    getOptional(id: string): string;
}

export type DisplayNameGetter = ((resourceProvider: IStringResourceProvider) => string) | string;

export interface IEnumMember {
    value: EnumMemberValue;
    displayName: DisplayNameGetter;
}

export interface IEnumType {
    members(validMembers?: Array<EnumMemberValue>): Array<IEnumMember>;
}

export interface ValueTypeDescriptor {
    // Simplified primitive types
    readonly text?: boolean;
    readonly numeric?: boolean;
    readonly integer?: boolean;
    readonly bool?: boolean;
    readonly dateTime?: boolean;
    readonly duration?: boolean;
    readonly binary?: boolean;
    readonly none?: boolean; //TODO: 5005022 remove none type when we introduce property categories.

    // Extended types
    readonly temporal?: TemporalTypeDescriptor;
    readonly geography?: GeographyTypeDescriptor;
    readonly misc?: MiscellaneousTypeDescriptor;
    readonly formatting?: FormattingTypeDescriptor;
    /*readonly*/
    enumeration?: IEnumType;
    readonly scripting?: ScriptTypeDescriptor;
    readonly operations?: OperationalTypeDescriptor;

    // variant types
    readonly variant?: Array<ValueTypeDescriptor>;
}

export interface ScriptTypeDescriptor {
    readonly source?: boolean;
}

export interface TemporalTypeDescriptor {
    readonly year?: boolean;
    readonly quarter?: boolean;
    readonly month?: boolean;
    readonly day?: boolean;
    readonly paddedDateTableDate?: boolean;
}

export interface GeographyTypeDescriptor {
    readonly address?: boolean;
    readonly city?: boolean;
    readonly continent?: boolean;
    readonly country?: boolean;
    readonly county?: boolean;
    readonly region?: boolean;
    readonly postalCode?: boolean;
    readonly stateOrProvince?: boolean;
    readonly place?: boolean;
    readonly latitude?: boolean;
    readonly longitude?: boolean;
}

export interface MiscellaneousTypeDescriptor {
    readonly image?: boolean;
    readonly imageUrl?: boolean;
    readonly webUrl?: boolean;
    readonly barcode?: boolean;
}

export interface FormattingTypeDescriptor {
    readonly color?: boolean;
    readonly formatString?: boolean;
    readonly alignment?: boolean;
    readonly labelDisplayUnits?: boolean;
    readonly fontSize?: boolean;
    readonly fontFamily?: boolean;
    readonly labelDensity?: boolean;
    readonly bubbleSize?: boolean;
    readonly altText?: boolean;
}

export interface OperationalTypeDescriptor {
    readonly searchEnabled?: boolean;
}

export interface DataObjects {
    [name: string]: DataObject;
}

export interface DataObject {
    [propertyName: string]: DataPropertyValue;
    Instances: DataObjectMap;
}

export interface DataObjectWithId {
    id: string;
    object: DataObject;
}

export interface DataObjectPropertyIdentifier {
    objectName: string;
    propertyName: string;
}

export type DataObjectMap = Map<string, DataObject>;

export type DataPropertyValue = ValueType | StructuralObjectValue;

export interface Data {
    metadata: DataMetadata;
    categorical?: DataCategorical;
    single?: DataSingle;
    tree?: DataTree;
    table?: DataTable;
    matrix?: DataMatrix;
    scriptResult?: DataScriptResultData;
}

export interface DataMetadata {
    columns: Array<DataMetadataColumn>;
    objects?: DataObjects;
    segment?: DataSegmentMetadata;
    dataReduction?: DataReductionMetadata;
}

export interface DataMetadataColumn {
    displayName: string;
    queryName?: string;
    format?: string;
    type?: ValueTypeDescriptor;
    isMeasure?: boolean;
    index?: number;
    roles?: Map<string, boolean>;
    objects?: DataObjects;
    groupName?: ValueType;
    sort?: SortDirection;
    sortOrder?: number;
    kpi?: DataKpiColumnMetadata;
    discourageAggregationAcrossGroups?: boolean;
    aggregates?: DataAggregatesColumn;
    expr?: ISQExpr;
    identityExprs?: Array<ISQExpr>;
    parameter?: DataParameterColumnMetadata;
}

export type DataColumnMetadataMap = Map<string, DataMetadataColumn>;

export interface DataSegmentMetadata {}

export interface DataReductionMetadata {
    categorical?: DataCategoricalReductionMetadata;
}

export interface DataCategoricalReductionMetadata {
    categories?: DataReductionAlgorithmMetadata;
    values?: DataReductionAlgorithmMetadata;
    metadata?: DataReductionAlgorithmMetadata;
}

export interface DataReductionAlgorithmMetadata {
    binnedLineSample?: any;
}

export interface DataValueColumns extends Array<DataValueColumn> {
    grouped(): Array<DataValueColumnGroup>;
    identityFields?: Array<ISQExpr>;
    source?: DataMetadataColumn;
}

export interface DataValueColumnGroup {
    values: Array<DataValueColumn>;
    identity?: CustomVisualOpaqueIdentity;
    objects?: DataObjects;
    name?: ValueType;
}

export interface DataSingle {
    value: ValueType;
}

export interface DataTree {
    root: DataTreeNode;
}

export interface DataTreeNode {
    name?: ValueType;
    value?: ValueType;
    values?: Map<number, DataTreeNodeValue>;
    children?: Array<DataTreeNode>;
    identity?: CustomVisualOpaqueIdentity;
    objects?: DataObjects;
    childIdentityFields?: Array<ISQExpr>;
}

export interface DataTreeNodeValue {
    value?: ValueType;
}

export interface DataTreeNodeMeasureValue extends DataTreeNodeValue, DataAggregatesColumn {
    highlight?: ValueType;
}

export interface DataTreeNodeGroupValue extends DataTreeNodeValue {
    count?: ValueType;
}

export interface DataTable {
    columns: Array<DataMetadataColumn>;
    identity?: Array<CustomVisualOpaqueIdentity>;
    identityFields?: Array<ISQExpr>;
    rows?: Array<DataTableRow>;
    totals?: Array<ValueType>;
}

export interface DataTableRow extends Array<ValueType> {
    /** The data repetition objects. */
    objects?: Array<DataObjects>;
}

export interface DataMatrix {
    rows: DataHierarchy;
    columns: DataHierarchy;

    /**
     * The metadata columns of the measure values.
     * In visual Data, this array is sorted in projection order.
     */
    valueSources: Array<DataMetadataColumn>;
}

export interface DataMatrixNode extends DataTreeNode {
    /** Indicates the level this node is on. Zero indicates the outermost children (root node level is undefined). */
    level?: number;

    children?: Array<DataMatrixNode>;

    /* If this DataMatrixNode represents the  inner-most dimension of row groups (i.e. a leaf node), then this property will contain the values at the
     * matrix intersection under the group. The valueSourceIndex property will contain the position of the column in the select statement to which the
     * value belongs.
     *
     * When this DataMatrixNode is used under the context of matrix.columns, this property is not used.
     */
    values?: Map<number, DataMatrixNodeValue>;

    /**
     * Indicates the source metadata index on the node's level. Its value is 0 if omitted.
     *
     * DEPRECATED: This property is deprecated and exists for backward-compatibility only.
     * New visuals code should consume the new property levelSourceIndex on DataMatrixGroupValue instead.
     */
    levelSourceIndex?: number;

    /**
     * The values of the particular group instance represented by this node.
     * This array property would contain more than one element in a composite group
     * (e.g. Year == 2016 and Month == 'January').
     */
    levelValues?: Array<DataMatrixGroupValue>;

    /** Indicates whether or not the node is a subtotal node. Its value is false if omitted. */
    isSubtotal?: boolean;
}

export interface DataMatrixGroupValue extends DataTreeNodeValue {
    /**
     * Indicates the index of the corresponding column for this group level value
     * (held by DataHierarchyLevel.sources).
     *
     * @example
     * // For example, to get the source column metadata of each level value at a particular row hierarchy node:
     * let matrixRowsHierarchy: DataHierarchy = dataView.matrix.rows;
     * let targetRowsHierarchyNode = <DataMatrixNode>matrixRowsHierarchy.root.children[0];
     * // Use the DataMatrixNode.level property to get the corresponding DataHierarchyLevel...
     * let targetRowsHierarchyLevel: DataHierarchyLevel = matrixRows.levels[targetRowsHierarchyNode.level];
     * for (let levelValue in rowsRootNode.levelValues) {
     *   // columnMetadata is the source column for the particular levelValue.value in this loop iteration
     *   let columnMetadata: DataMetadataColumn =
     *     targetRowsHierarchyLevel.sources[levelValue.levelSourceIndex];
     * }
     */
    levelSourceIndex: number;
}

export interface DataMatrixNodeValue extends DataTreeNodeValue {
    highlight?: ValueType;

    /** The data repetition objects. */
    objects?: DataObjects;

    /** Indicates the index of the corresponding measure (held by DataMatrix.valueSources). Its value is 0 if omitted. */
    valueSourceIndex?: number;
}

export interface DataHierarchy {
    root: DataMatrixNode;
    levels: Array<DataHierarchyLevel>;
}

export interface DataHierarchyLevel {
    /**
     * The metadata columns of this hierarchy level.
     * In visual Data, this array is sorted in projection order.
     */
    sources: Array<DataMetadataColumn>;
}

export interface DataKpiColumnMetadata {
    graphic: string;

    // When false, five state KPIs are in: { -2, -1, 0, 1, 2 }.
    // When true, five state KPIs are in: { -1, -0.5, 0, 0.5, 1 }.
    normalizedFiveStateKpiRange?: boolean;
}

export interface DataParameterColumnMetadata {}

export interface DataScriptResultData {
    payloadBase64: string;
}

export interface DataPercentileAggregate {
    key: number;
    value: ValueType;
}

export interface DataCategorical {
    categories?: Array<DataCategoryColumn>;
    values?: DataValuesColumn;
}

export interface DataCategoricalColumn {
    source: DataMetadataColumn;
    objects?: Array<DataObjects>;
}

export interface DataCategoryColumn extends DataCategoricalColumn {
    values: Array<ValueType>;
    identity?: Array<CustomVisualOpaqueIdentity>;
    identityFields?: Array<ISQExpr>;
}

export interface DataValueColumn extends DataCategoricalColumn, DataAggregatesColumn {
    values: Array<ValueType>;
    highlights?: Array<ValueType>;
    identity?: any;
}

export interface DataValuesColumn extends Array<DataValueColumn> {
    source?: DataMetadataColumn;
}

export interface DataAggregatesColumn {
    count?: number;
    subtotal?: ValueType;
    max?: ValueType;
    min?: ValueType;
    average?: ValueType;
    median?: ValueType;
    percentiles?: Array<DataPercentileAggregate>;
    single?: ValueType;
    maxLocal?: ValueType;
    minLocal?: ValueType;
}

export const enum SortDirection {
    Ascending = 1,
    Descending = 2
}

export enum ClassificationMethod {
    Quantile,
    Equidistant,
    Logarithmic,
    NaturalBreaks
}

export function getClassCount(values: Array<number>): number {
    const MAX_BOUND_COUNT = 6;
    const classCount = Math.min(values.length, MAX_BOUND_COUNT) - 1;
    return classCount;
}

export function getBreaks(values: Array<number>, method: ClassificationMethod, classCount: number): Array<number> {
    let chromaMode: "e" | "q" | "l" | "k";

    switch (method) {
        case ClassificationMethod.Equidistant:
            chromaMode = "e";
            break;
        case ClassificationMethod.Logarithmic:
            chromaMode = "l";
            break;
        case ClassificationMethod.NaturalBreaks:
            chromaMode = "k";
            break;
        case ClassificationMethod.Quantile:
            chromaMode = "q";
            break;
        default:
            chromaMode = "e";
            break;
    }

    return chroma.limits(values, chromaMode, classCount);
}

export function filterValues(values: Array<number>, minValue: number, maxValue: number) {
    let filterFn;

    if (minValue != null && maxValue != null) {
        filterFn = (val) => val >= minValue && val <= maxValue;
    } else if (maxValue != null) {
        filterFn = (val) => val <= maxValue;
    } else if (minValue != null) {
        filterFn = (val) => val >= minValue;
    } else {
        return values;
    }

    return values.filter(filterFn);
}

export interface Limits {
    min: number;
    max: number;
    values: Array<number>;
}

export function getLimits(data, myproperty): Limits {
    let min: any = null;
    let max: any = null;
    const values = new Array<any>();

    if (data && data.length >= 0 && myproperty !== "") {
        if (data[0]["type"]) {
            data.forEach((element) => {
                switch (element.type) {
                    case "FeatureCollection": {
                        for (let r = 0; r < element.features.length; r++) {
                            if (element.features[r].properties[myproperty] || element.features[r].properties[myproperty] === 0) {
                                const value = element.features[r].properties[myproperty];

                                if (!min || value < min) {
                                    min = value;
                                }

                                if (!max || value > max) {
                                    max = value;
                                }

                                DistictAdd(values, value);
                            }
                        }

                        break;
                    }
                    case "Feature": {
                        if (element.properties[myproperty] || element.properties[myproperty] === 0) {
                            const value = element.properties[myproperty];

                            if (!min || value < min) {
                                min = value;
                            }

                            if (!max || value > max) {
                                max = value;
                            }

                            DistictAdd(values, value);
                        }
                    }
                }
            });
        } else {
            data.forEach((f) => {
                if (f[myproperty] !== undefined && f[myproperty] !== null) {
                    const value = f[myproperty];
                    if (!min || value < min) {
                        min = value;
                    }
                    if (!max || value > max) {
                        max = value;
                    }
                    DistictAdd(values, value);
                }
            });
        }
    }

    // Min and max must not be equal because of the interpolation.
    // let's make sure with the substraction if it is a number
    if (min && min.toString() !== min && min === max) {
        min = min - 1;
    }

    return {
        min,
        max,
        values
    };
}

export const enum DataRepetitionKind {
    RoleWildcard = 0,
    ScopeIdentity = 1,
    ScopeTotal = 2,
    ScopeWildcard = 3
}

export interface DataScopeIdentity {
    kind: DataRepetitionKind.ScopeIdentity;
    expr: SQExpr;
    key: string;
}

//export class SemanticFilter {
//    private fromValue: SQFrom;
//    private whereItems: Array<SQFilter>;

//    constructor(from: SQFrom, where: Array<SQFilter>) {

//        this.fromValue = from;
//        this.whereItems = where;
//    }

//    static fromSQExpr(contract: SQExpr): SemanticFilter {

//        var from = new SQFrom();

//        var rewrittenContract = SQExprRewriterWithSourceRenames.rewrite(contract, from);
//        // DEVNOTE targets of some filters are visual specific and will get resolved only during query generation.
//        //         Thus not setting a target here.
//        var where: Array<SQFilter> = [
//            {
//                condition: rewrittenContract
//            }
//        ];

//        return new SemanticFilter(from, where);
//    }

//    from(): SQFrom {
//        return this.fromValue.clone();
//    }

//    conditions(): Array<SQExpr> {
//        var expressions: Array<SQExpr> = Array<>;

//        var where = this.whereItems;
//        for (var i = 0, len = where.length; i < len; i++) {
//            var filter = where[i];
//            expressions.push(filter.condition);
//        }
//        return expressions;
//    }

//    where(): Array<SQFilter> {
//        var result: Array<SQFilter> = Array<>;

//        var whereItems = this.whereItems;
//        for (var i = 0, len = whereItems.length; i < len; i++) result.push(whereItems[i]);

//        return result;
//    }

//    rewrite(exprRewriter: ISQExprVisitor<SQExpr>): SemanticFilter {
//        var rewriter = new SemanticQueryRewriter(exprRewriter);
//        var from = rewriter.rewriteFrom(this.fromValue);
//        var where = rewriter.rewriteWhere(this.whereItems, from);

//        return new SemanticFilter(from, where);
//    }

//    validate(schema: FederatedConceptualSchema, errors?: Array<SQExprValidationError>): Array<SQExprValidationError> {
//        var validator = new SQExprValidationVisitor(schema, errors);
//        this.rewrite(validator);
//        return validator.errors;
//    }

//    /** Merges a list of SemanticFilters into one. */
//    static merge(filters: Array<SemanticFilter>): SemanticFilter {
//        if (ArrayExtensions.isUndefinedOrEmpty(filters)) return null;

//        if (filters.length === 1) return filters[0];

//        var firstFilter = filters[0];
//        var from = firstFilter.from(),
//            where: Array<SQFilter> = ArrayExtensions.take(firstFilter.whereItems, firstFilter.whereItems.length);

//        for (var i = 1, len = filters.length; i < len; i++) SemanticFilter.applyFilter(filters[i], from, where);

//        return new SemanticFilter(from, where);
//    }

//    private static applyFilter(filter: SemanticFilter, from: SQFrom, where: Array<SQFilter>): void {
//        debug.assertValue(filter, "filter");
//        debug.assertValue(from, "from");
//        debug.assertValue(where, "where");

//        // Where
//        var filterWhereItems = filter.whereItems;
//        for (var i = 0; i < filterWhereItems.length; i++) {
//            var filterWhereItem = filterWhereItems[i];

//            var updatedWhereItem: SQFilter = {
//                condition: SQExprRewriterWithSourceRenames.rewrite(filterWhereItem.condition, from)
//            };

//            if (filterWhereItem.target) updatedWhereItem.target = _.map(filterWhereItem.target, (e) => SQExprRewriterWithSourceRenames.rewrite(e, from));

//            where.push(updatedWhereItem);
//        }
//    }
//}

namespace DataScopeIdentity {
    export function equals(x: DataScopeIdentity, y: DataScopeIdentity, ignoreCase?: boolean): boolean {
        // Normalize falsy to null
        x = x || null;
        y = y || null;

        if (x === y) return true;

        if (!x !== !y) return false;

        //debug.assertValue(x, "x");
        //debug.assertValue(y, "y");

        return SQExpr.equals(x.expr, y.expr, ignoreCase);
    }

    //export function filterFromIdentity(identities: Array<DataScopeIdentity>, isNot?: boolean): SemanticFilter {
    //    if (ArrayExtensions.isUndefinedOrEmpty(identities)) return;

    //    var expr: SQExpr;
    //    for (var i = 0, len = identities.length; i < len; i++) {
    //        var identity = identities[i];

    //        expr = expr ? SQExprBuilder.or(expr, identity.expr) : identity.expr;
    //    }

    //    if (expr && isNot) expr = SQExprBuilder.not(expr);

    //    return SemanticFilter.fromSQExpr(expr);
    //}
}

export interface DataScopeWildcard {
    kind: DataRepetitionKind.ScopeWildcard;
    exprs: Array<ISQExpr>;
    key: string;
}

export interface DataRoleWildcard {
    kind: DataRepetitionKind.RoleWildcard;
    roles: Array<string>;
    key: string;
}

export interface DataScopeTotal {
    kind: DataRepetitionKind.ScopeTotal;
    exprs: Array<ISQExpr>;
    key: string;
}

export type DataRepetitionSelector = DataScopeIdentity | DataScopeWildcard | DataRoleWildcard | DataScopeTotal;

export interface ISelectableItem<T> {
    id: string;
}

export interface Selector {
    data: Array<DataRepetitionSelector>;
    metadata: string;
    id: string;
}

//export export module ScopeIdentityKeyExtractor {

//    export function run(expr: SQExpr): Array<SQExpr> {
//        var extractor = new KeyExtractorImpl();
//        expr.accept(extractor);

//        if (extractor.malformed)
//            return null;

//        return ArrayExtensions.emptyToNull(extractor.keys);
//    }

//    /**
//     * Recognizes expressions of the form:
//     * 1) Equals(ColRef, Constant)
//     * 2) And(Equals(ColRef1, Constant1), Equals(ColRef2, Constant2))
//     */
//    class KeyExtractorImpl extends DefaultSQExprVisitor<void> {
//        keys: Array<SQExpr> = Array<>;
//        malformed: boolean;

//        visitAnd(expr: SQAndExpr): void {
//            expr.left.accept(this);
//            expr.right.accept(this);
//        }

//        visitCompare(expr: SQCompareExpr): void {
//            if (expr.kind !== QueryComparisonKind.Equal) {
//                this.visitDefault(expr);
//                return;
//            }

//            expr.left.accept(this);
//            expr.right.accept(this);
//        }

//        visitColumnRef(expr: SQColumnRefExpr): void {
//            this.keys.push(expr);
//        }

//        visitConstant(expr: SQConstantExpr): void {
//            // Do nothing -- comparison against constants is expected.
//        }

//        visitDefault(expr: SQExpr): void {
//            this.malformed = true;
//        }
//    }
//}

//export export module DataScopeWildcard {

//    export function matches(wildcard: DataScopeWildcard, instance: DataScopeIdentity): boolean {
//        var instanceExprs = ScopeIdentityKeyExtractor.run(instance.expr);
//        if (!instanceExprs)
//            return false;

//        return SQExprUtils.sequenceEqual(wildcard.exprs, instanceExprs);
//    }

//    export function fromExprs(exprs: Array<SQExpr>): DataScopeWildcard {
//        return new DataScopeWildcardImpl(exprs);
//    }

//    class DataScopeWildcardImpl implements DataScopeWildcard {
//        private _exprs: Array<SQExpr>;
//        private _key: Lazy<string>;

//        constructor(exprs: Array<SQExpr>) {
//            debug.assertValue(exprs, 'exprs');

//            this._exprs = exprs;
//            this._key = new Lazy(() => SQExprShortSerializer.serializeArray(exprs));
//        }

//        get exprs(): Array<SQExpr> {
//            return this._exprs;
//        }

//        get key(): string {
//            return this._key.getValue();
//        }
//    }
//}

export namespace Selector {
    //export function filterFromSelector(selectors: Array<Selector>, isNot?: boolean): SemanticFilter {
    //    if (ArrayExtensions.isUndefinedOrEmpty(selectors)) {
    //        return;
    //    }

    //    var expr: SQExpr;

    //    for (var i = 0, ilen = selectors.length; i < ilen; i++) {
    //        var identity = selectors[i];
    //        var data = identity.data;
    //        var exprToAdd: SQExpr = undefined;
    //        if (data && length) {
    //            for (var j = 0, jlen = length; j < jlen; j++) {
    //                exprToAdd = SQExprBuilder.and(exprToAdd, As<DataScopeIdentity>(identity.data[j]).expr);
    //            }
    //        }

    //        expr = SQExprBuilder.or(expr, exprToAdd);
    //    }

    //    if (expr && isNot) {
    //        expr = SQExprBuilder.not(expr);
    //    }

    //    return SemanticFilter.fromSQExpr(expr);
    //}

    export function matchesData(selector: Selector, identities: Array<DataScopeIdentity>): boolean {
        //debug.assertValue(selector, "selector");
        //debug.assertValue(selector.data, "selector.data");
        //debug.assertValue(identities, "identities");

        const selectorData = selector.data;

        if (!selectorData || !selector.data) {
            return false;
        }

        if (selectorData.length !== identities.length) {
            return false;
        }

        let dataItem;
        let selectorDataItem;

        for (let i = 0, len = selectorData.length; i < len; i++) {
            dataItem = selector.data[i];
            selectorDataItem = As<DataScopeIdentity>(dataItem);

            if (selectorDataItem.expr) {
                if (!DataScopeIdentity.equals(selectorDataItem, identities[i])) {
                    return false;
                }
            }
            //else {
            //    if (!DataScopeWildcard.matches(As<DataScopeWildcard>(dataItem), identities[i])) {
            //        return false;
            //    }
            //}
        }

        return true;
    }

    //export function matchesKeys(selector: Selector, keysList: Array<SQExpr>Array<>): boolean {
    //    debug.assertValue(selector, "selector");
    //    debug.assertValue(selector.data, "selector.data");
    //    debug.assertValue(keysList, "keysList");

    //    var selectorData = selector.data,
    //        selectorDataLength = selectorData.length;
    //    if (selectorDataLength !== keysList.length) return false;

    //    for (var i = 0; i < selectorDataLength; i++) {
    //        var selectorDataItem = selector.data[i];
    //        var selectorDataExprs: Array<SQExpr>;

    //        if (As<DataScopeIdentity>(selectorDataItem).expr) {
    //            selectorDataExprs = ScopeIdentityKeyExtractor.run(As<DataScopeIdentity>(selectorDataItem).expr);
    //        } else {
    //            selectorDataExprs = As<DataScopeWildcard>(selectorDataItem).exprs;
    //        }

    //        if (!selectorDataExprs) {
    //            continue;
    //        }
    //        if (!SQExprUtils.sequenceEqual(keysList[i], selectorDataExprs)) {
    //            return false;
    //        }
    //    }

    //    return true;
    //}

    export function equals(x: Selector, y: Selector): boolean {
        // Normalize falsy to null
        x = x || null;
        y = y || null;

        if (x === y) {
            return true;
        }

        if (!x !== !y) {
            return false;
        }

        //debug.assertValue(x, "x");
        //debug.assertValue(y, "y");

        if (x.id !== y.id) {
            return false;
        }
        if (x.metadata !== y.metadata) {
            return false;
        }
        if (!equalsDataArray(x.data, y.data)) {
            return false;
        }

        return true;
    }

    function equalsDataArray(x: Array<DataRepetitionSelector> | null, y: Array<DataRepetitionSelector> | null): boolean {
        // Normalize falsy to null
        x = x || null;
        y = y || null;

        if (!x || !y) {
            return false;
        }

        if (x === y) {
            return true;
        }

        if (!x !== !y) {
            return false;
        }

        if (x.length !== y.length) {
            return false;
        }

        for (let i = 0, len = x.length; i < len; i++) {
            if (!equalsData(x[i], y[i])) {
                return false;
            }
        }

        return true;
    }

    function equalsData(x: DataRepetitionSelector, y: DataRepetitionSelector): boolean {
        if (!As<DataScopeIdentity>(x).expr && As<DataScopeIdentity>(y).expr) {
            // TODO: We need to also check wildcard selectors too (once that's supported/figured out).
            return false;
        }

        return DataScopeIdentity.equals(As<DataScopeIdentity>(x), As<DataScopeIdentity>(y));
    }

    export function getKey(selector: Selector): string {
        const toStringify: any = {};

        if (selector.data) {
            const data = new Array<any>();
            for (let i = 0, ilen = selector.data.length; i < ilen; i++) {
                data.push(selector.data[i].key);
            }
            toStringify.data = data;
        }

        if (selector.metadata) {
            toStringify.metadata = selector.metadata;
        }

        if (selector.id) {
            toStringify.id = selector.id;
        }

        return JSON.stringify(toStringify);
    }

    export function containsWildcard(selector: Selector): boolean {
        //debug.assertValue(selector, "selector");

        const dataItems = selector.data;

        if (!dataItems) {
            return false;
        }

        for (let i = 0, len = dataItems.length; i < len; i++) {
            const wildcard = As<DataScopeWildcard>(dataItems[i]);

            if (wildcard.exprs) {
                return true;
            }
        }

        return false;
    }
}

export interface ExtensibilityISelectionId {}

export interface CustomVisualOpaqueIdentity {
    kind: any;
    exprs: any;
    key: any;
}

export interface IExtensibilityMeasuredSelecionId extends ExtensibilityISelectionId {
    dataMap: SelectorsForColumn;
    measures: Array<string>;
    getSelector(): Selector;
}

export interface IMeasuredSelectionId extends ISelectionId {
    dataMap: SelectorsForColumn;
    measures: Array<string>;
    compareMetadata(currentDataMap: SelectorsForColumn, otherDataMap: SelectorsForColumn): boolean;
    compareMeasures(currentMeasures: Array<string>, otherMeasures: Array<string>): boolean;
}

export type SelectorsForColumn = Map<string, Array<CustomVisualOpaqueIdentity>>;

export interface SelectorsByColumn {}

export interface ISelectionIdBuilder {
    withCategory(categoryColumn: DataCategoryColumn, index: number): this;
    withSeries(seriesColumn: DataValueColumns, valueColumn: DataValueColumn | DataValueColumnGroup): this;
    withMeasure(measureId: string): this;
    withMatrixNode(matrixNode: DataMatrixNode, levels: Array<DataHierarchyLevel>): this;
    withTable(table: DataTable, rowIndex: number): this;
    createSelectionId(): ISelectionId;
}

export interface ISelectionId {
    equals(other: ISelectionId): boolean;
    includes(other: ISelectionId, ignoreHighlight?: boolean): boolean;
    getKey(): string;
    getSelector(): Selector;
    getSelectorsByColumn(): SelectorsByColumn;
    hasIdentity(): boolean;
}

export interface ISelectionManager {
    select(selectionId: ISelectionId | Array<ISelectionId>, multiSelect?: boolean): IPromise<Array<ISelectionId>>;
    hasSelection(): boolean;
    clear(): IPromise<any>;
    getSelectionIds(): Array<ISelectionId>;
    applySelectionFilter(): void;
    registerOnSelectCallback(callback: (ids: Array<ISelectionId>) => void): void;
}

export interface SelectorForColumn {
    [queryName: string]: DataRepetitionSelector;
}

export interface SelectorsByColumn {
    dataMap?: SelectorForColumn;
    metadata?: string;
    id?: string;
}

export interface SelectEventArgs {
    data: Array<Selector>;
    data2?: Array<SelectorsByColumn>;
}

export interface SelectObjectEventArgs {
    object: DataObjectDescriptor;
}

export interface ParagraphsTypeDescriptor {}

export interface ImageTypeDescriptor {}

export interface GeoJsonTypeDescriptor {}

export interface FilterTypeDescriptor {
    selfFilter?: boolean;
}

export interface FillRuleTypeDescriptor {}

export interface FillTypeDescriptor {
    solid?: {
        color?: FillSolidColorTypeDescriptor;
    };
    gradient?: {
        startColor?: boolean;
        endColor?: boolean;
    };
    pattern?: {
        patternKind?: boolean;
        color?: boolean;
    };
}

export type FillSolidColorTypeDescriptor = boolean | FillSolidColorAdvancedTypeDescriptor;

export interface FillSolidColorAdvancedTypeDescriptor {
    nullable: boolean;
}

export interface DefaultValueTypeDescriptor {
    defaultValue: boolean;
}

export interface FillRuleTypeDescriptor {}

export interface QueryTransformTypeDescriptor {}

export interface DataBarsTypeDescriptor {}

export interface StructuralTypeDescriptor {
    fill?: FillTypeDescriptor;
    fillRule?: FillRuleTypeDescriptor;
    filter?: FilterTypeDescriptor;
    expression?: DefaultValueTypeDescriptor;
    image?: ImageTypeDescriptor;
    paragraphs?: ParagraphsTypeDescriptor;
    geoJson?: GeoJsonTypeDescriptor;
    queryTransform?: QueryTransformTypeDescriptor;
    dataBars?: DataBarsTypeDescriptor;
}

export interface DataObjectDescriptors {
    general: DataObjectDescriptor;
    [objectName: string]: DataObjectDescriptor;
}

export interface DataObjectDescriptor {
    displayName?: DisplayNameGetter;
    properties: DataObjectPropertyDescriptors;
}

export interface DataObjectPropertyDescriptors {
    [propertyName: string]: DataObjectPropertyDescriptor;
}

export interface DataObjectPropertyDescriptor {
    displayName?: DisplayNameGetter;
    description?: DisplayNameGetter;
    type: DataObjectPropertyTypeDescriptor;
    rule?: DataObjectPropertyRuleDescriptor;
}

export type DataObjectPropertyTypeDescriptor = ValueTypeDescriptor | StructuralTypeDescriptor;

export interface DataObjectPropertyRuleDescriptor {
    inputRole?: string;
    output?: DataObjectPropertyRuleOutputDescriptor;
}

export interface DataObjectPropertyRuleOutputDescriptor {
    property: string;
    selector: Array<string>;
}

//export export module DataObjectDescriptors {

//    export function findFormatString(descriptors: DataObjectDescriptors): DataObjectPropertyIdentifier {

//        return findProperty(descriptors, (propDesc: DataObjectPropertyDescriptor) => {
//            var formattingTypeDesc = ValueType.fromDescriptor(propDesc.type).formatting;
//            return formattingTypeDesc && formattingTypeDesc.formatString;
//        });
//    }

//    export function findFilterOutput(descriptors: DataObjectDescriptors): DataObjectPropertyIdentifier {
//        return findProperty(descriptors, (propDesc: DataObjectPropertyDescriptor) => {
//            var propType: StructuralTypeDescriptor = propDesc.type;
//            return propType && !!propType.filter;
//        });
//    }

//    function findProperty(descriptors: DataObjectDescriptors, propPredicate: (propDesc: DataObjectPropertyDescriptor) => boolean): DataObjectPropertyIdentifier {
//        debug.assertAnyValue(descriptors, "descriptors");
//        debug.assertAnyValue(propPredicate, "propPredicate");

//        if (!descriptors) return;

//        for (var objectName in descriptors) {
//            var objPropDescs = descriptors[objectName].properties;

//            for (var propertyName in objPropDescs) {
//                if (propPredicate(objPropDescs[propertyName])) {
//                    return {
//                        objectName: objectName,
//                        propertyName: propertyName
//                    };
//                }
//            }
//        }
//    }
//}
