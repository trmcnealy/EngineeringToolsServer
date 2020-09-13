import * as React from "react";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";

import {
    IKeyState,
    IBrushSelectionDelta,
    ISelectableItem,
    ISelectionId,
    SelectorsByColumn,
    DataScopeIdentity,
    SelectorForColumn,
    ISelectionIdBuilder,
    DataCategoryColumn,
    DataValueColumns,
    DataValueColumn,
    DataValueColumnGroup,
    DataMatrixNode,
    DataHierarchyLevel,
    DataTable,
    Selector,
    DataRepetitionSelector
} from "DataTypes/index";

import {As} from "./UtilityMethods";
import {Action} from "./Decorators";

export class SelectionManager<T extends ISelectableItem<any>> {
    protected internalSelectionDontUseDirectly: T[] = [];

    protected internalBrushingSelection: T[] = [];

    protected keyState: IKeyState = {};

    protected internalDragging = false;

    protected internalBrushMode = false;

    protected internalItems: T[];

    private selectionListener: (items: T[]) => void;

    private shiftPivot: T;

    private internalPreviousBrushedItem: T;

    private internalSingleSelectDontUse = false;

    constructor(onSelectionChanged?: (items: T[]) => void) {
        this.selectionListener = onSelectionChanged!;
    }

    get items(): T[] {
        return this.internalItems;
    }

    set items(value: T[]) {
        this.internalItems = value || [];
    }

    get selection(): T[] {
        return this.internalSelectionDontUseDirectly;
    }

    set selection(value: T[]) {
        this.setSelection(value);
    }

    get singleSelect(): boolean {
        return this.internalSingleSelectDontUse;
    }

    set singleSelect(value: boolean) {
        this.internalSingleSelectDontUse = value;

        this.selection = this.selection.slice(0);
    }

    get brushingSelection(): T[] {
        return this.internalBrushingSelection;
    }

    get dragging(): boolean {
        return this.internalDragging;
    }

    get brushMode(): boolean {
        return this.internalBrushMode;
    }

    set brushMode(value: boolean) {
        this.internalBrushMode = value;
    }

    itemHovered(item: T): IBrushSelectionDelta<T> {
        const delta: IBrushSelectionDelta<T> = {added: [], removed: []};
        if (this.internalDragging && this.internalBrushMode) {
            if (this.internalBrushingSelection.length >= 1 && this.items && this.items.length) {
                let lowIndex: number;
                let highIndex: number;
                const newSel: T[] = this.internalBrushingSelection.slice(0);

                if (this.findIndex(item, newSel) > -1) {
                    // remove item if dragging back
                    newSel.splice(newSel.indexOf(this.internalPreviousBrushedItem), 1);
                    delta.removed.push(this.internalPreviousBrushedItem);
                } else {
                    // add the item to selection list
                    newSel.push(item);
                    delta.added.push(item);
                }

                newSel.forEach((n: T) => {
                    const currIndex: number = this.internalItems.indexOf(n);
                    if (lowIndex === undefined || currIndex < lowIndex) {
                        lowIndex = currIndex;
                    }
                    if (highIndex === undefined || currIndex > highIndex) {
                        highIndex = currIndex;
                    }
                });

                this.internalBrushingSelection = this.items.slice(lowIndex, highIndex + 1);
            } else if (this.findIndex(item, this.internalBrushingSelection) < 0) {
                this.internalBrushingSelection.push(item);
                delta.added.push(item);
            }
            this.internalPreviousBrushedItem = item;
        }

        return delta;
    }

    itemClicked(item: T): void {
        // Toggles the selected item out of the selection
        const toggleItem: Action = (): void => {
            const idx: number = this.findIndex(item);
            const newSel: T[] = this.selection.slice(0);
            if (idx < 0) {
                newSel.push(item);
            } else {
                newSel.splice(idx, 1);
            }
            this.selection = newSel;
        };

        if (!this.keyState.ctrl) {
            // If the user just selected the first item
            if (this.keyState.shift && !this.shiftPivot) {
                this.shiftPivot = item;
            }
            if (this.keyState.shift && this.items && this.items.length) {
                const idx: number = this.findIndex(this.shiftPivot, this.items);
                const lastIdx: number = this.findIndex(item, this.items);

                // The selection is the range between the first and second indexes
                this.selection = this.items.slice(idx < lastIdx ? idx : lastIdx, (idx < lastIdx ? lastIdx : idx) + 1);
            } else if (this.internalBrushMode) {
                // If the user is in "brush" mode, but just single clicks an item,
                // then just deselect it, otherwise set the item
                this.selection = this.selection.length === 1 && this.selection[0].id === item.id ? [] : [item];
            } else {
                toggleItem();
            }
        } else {
            toggleItem();
        }
    }

    keyPressed(state: IKeyState): void {
        this.keyState.ctrl = state.ctrl;
        if (this.keyState.shift !== state.shift) {
            // User started pressing shift
            if (state.shift) {
                this.shiftPivot = this.selection[this.selection.length - 1];
            } else {
                delete this.shiftPivot;
            }
            this.keyState.shift = state.shift;
        }
    }

    startDrag(): void {
        this.internalDragging = true;
        this.internalBrushingSelection = [];
    }

    endDrag(): void {
        if (this.internalDragging) {
            this.internalDragging = false;
            if (this.brushMode) {
                if (this.keyState.ctrl) {
                    this.internalBrushingSelection = [...this.internalBrushingSelection, ...this.selection];
                }
                this.selection = this.internalBrushingSelection.slice(0);
            }
            this.internalBrushingSelection = [];
        }
    }

    protected findIndex(item: T, list?: T[]): number {
        if (!list) {
            list = this.selection;
        }
        for (let i = 0; i < list.length; i += 1) {
            const toCompare: T = list[i];
            if (toCompare.id === item.id) {
                return i;
            }
        }

        return -1;
    }

    protected setSelection(value: T[]): boolean {
        value = value || [];

        // We are single select, limit to one
        if (this.singleSelect && value.length) {
            value = [value[value.length - 1]];
        }

        const oldSelection: T[] = this.selection || [];
        const newSelection: T[] = value;

        // Are there any selected items which do not appear in the new selection
        let hasChanged: boolean = oldSelection.filter((n: T) => newSelection.filter((m: T) => n.id === m.id).length === 0).length > 0;

        // Are there any selected items which do not appear in the old selection
        hasChanged = hasChanged || newSelection.filter((n: T) => oldSelection.filter((m: T) => n.id === m.id).length === 0).length > 0;

        if (hasChanged) {
            this.internalSelectionDontUseDirectly = value;
            if (this.selectionListener) {
                this.selectionListener(value);
            }

            return true;
        }

        return false;
    }
}

export class SelectionId implements ISelectionId {
    private selector: Selector;
    private selectorsByColumn: SelectorsByColumn;
    private key: string;

    highlight: boolean;

    constructor(selector: Selector, highlight: boolean) {
        this.selector = selector;
        this.highlight = highlight;
        this.key = JSON.stringify({selector: selector ? Selector.getKey(selector) : null, highlight: highlight});
    }

    includes(other: ISelectionId, ignoreHighlight?: boolean): boolean {
        return false;
    }

    equals(other: SelectionId): boolean {
        if (!this.selector || !other.selector) {
            return !this.selector === !other.selector && this.highlight === other.highlight;
        }
        return this.highlight === other.highlight && Selector.equals(this.selector, other.selector);
    }

    //    includes(other: SelectionId, ignoreHighlight: boolean = false): boolean {
    //        var thisSelector = this.selector;
    //        var otherSelector = other.selector;
    //        if (!thisSelector || !otherSelector) {
    //            return false;
    //        }
    //        var thisData = thisSelector.data;
    //        var otherData = otherSelector.data;
    //        if (!thisData && (thisSelector.metadata && thisSelector.metadata !== otherSelector.metadata)) return false;
    //        if (!ignoreHighlight && this.highlight !== other.highlight) return false;
    //        if (thisData) {
    //            if (!otherData) return false;
    //            if (thisData.length > 0) {
    //                for (var i = 0, ilen = thisData.length; i < ilen; i++) {
    //                    var thisValue = As<DataScopeIdentity>(thisData[i]);
    //                    if (!otherData.some((otherValue: DataScopeIdentity) => DataScopeIdentity.equals(thisValue, otherValue))) return false;
    //                }
    //            }
    //        }
    //        return true;
    //    }

    getKey(): string {
        return this.key;
    }

    hasIdentity(): boolean {
        return this.selector && !!this.selector.data;
    }

    getSelector(): Selector {
        return this.selector;
    }

    getSelectorsByColumn(): SelectorsByColumn {
        return this.selectorsByColumn;
    }

    //    static createNull(highlight: boolean = false): SelectionId {
    //        return new SelectionId(null, highlight);
    //    }

    //    static createWithId(id: DataScopeIdentity, highlight: boolean = false): SelectionId {
    //        var selector: Selector = null;
    //        if (id) {
    //            selector = {
    //                data: [id]
    //            };
    //        }
    //        return new SelectionId(selector, highlight);
    //    }

    //    static createWithMeasure(measureId: string, highlight: boolean = false): SelectionId {
    //        debug.assertValue(measureId, "measureId");

    //        var selector: Selector = {
    //            metadata: measureId
    //        };

    //        var selectionId = new SelectionId(selector, highlight);
    //        selectionId.selectorsByColumn = {metadata: measureId};
    //        return selectionId;
    //    }

    //    static createWithIdAndMeasure(id: DataScopeIdentity, measureId: string, highlight: boolean = false): SelectionId {
    //        var selector: Selector = {};
    //        if (id) {
    //            selector.data = [id];
    //        }
    //        if (measureId) selector.metadata = measureId;
    //        if (!id && !measureId) selector = null;

    //        var selectionId = new SelectionId(selector, highlight);

    //        return selectionId;
    //    }

    //    static createWithIdAndMeasureAndCategory(id: DataScopeIdentity, measureId: string, queryName: string, highlight: boolean = false): SelectionId {
    //        var selectionId = this.createWithIdAndMeasure(id, measureId, highlight);

    //        if (selectionId.selector) {
    //            selectionId.selectorsByColumn = {};
    //            if (id && queryName) {
    //                selectionId.selectorsByColumn.dataMap = {};
    //                selectionId.selectorsByColumn.dataMap[queryName] = id;
    //            }
    //            if (measureId) selectionId.selectorsByColumn.metadata = measureId;
    //        }

    //        return selectionId;
    //    }

    //    static createWithIds(id1: DataScopeIdentity, id2: DataScopeIdentity, highlight: boolean = false): SelectionId {
    //        var selector: Selector = null;
    //        var selectorData = SelectionId.idArray(id1, id2);
    //        if (selectorData) selector = {data: selectorData};

    //        return new SelectionId(selector, highlight);
    //    }

    static createWithIdsAndMeasure(id1: DataScopeIdentity, id2: DataScopeIdentity, measureId: string, highlight = false): SelectionId {
        const selector: Selector = {} as Selector;
        const selectorData = SelectionId.idArray(id1, id2);

        if (selectorData) {
            selector.data = selectorData;
        }

        if (measureId) {
            selector.metadata = measureId;
        }
        if (!id1 && !id2 && !measureId) {
            return new SelectionId({} as Selector, highlight);
        }

        return new SelectionId(selector, highlight);
    }

    static createWithSelectorForColumnAndMeasure(dataMap: SelectorForColumn, measureId: string, highlight = false): ISelectionId {
        let selectionId: SelectionId;

        const keys = Object.keys(dataMap);

        if (keys.length === 2) {
            selectionId = this.createWithIdsAndMeasure(As<DataScopeIdentity>(dataMap[keys[0]]), As<DataScopeIdentity>(dataMap[keys[1]]), measureId, highlight);
        } else if (keys.length === 1) {
            selectionId = this.createWithIdsAndMeasure(As<DataScopeIdentity>(dataMap[keys[0]]), null as DataScopeIdentity, measureId, highlight);
        } else {
            selectionId = this.createWithIdsAndMeasure(null as DataScopeIdentity, null as DataScopeIdentity, measureId, highlight);
        }

        const selectorsByColumn: SelectorsByColumn = {};

        if (Array.isArray(dataMap) && dataMap.length > 0) {
            selectorsByColumn.dataMap = dataMap;
        }
        if (measureId) {
            selectorsByColumn.metadata = measureId;
        }
        if (!dataMap && !measureId) {
            return selectionId;
        }

        selectionId.selectorsByColumn = selectorsByColumn;

        return selectionId;
    }

    //    static createWithHighlight(original: SelectionId): SelectionId {
    //        debug.assertValue(original, "original");
    //        debug.assert(!original.highlight, "!original.highlight");

    //        return new SelectionId(original.getSelector(), /*highlight*/ true);
    //    }

    private static idArray(id1: DataScopeIdentity, id2: DataScopeIdentity): DataScopeIdentity[] {
        const data = new Array<DataScopeIdentity>();
        if (id1 || id2) {
            if (id1) {
                data.push(id1);
            }

            if (id2 && id2 !== id1) {
                data.push(id2);
            }
        }
        return data;
    }
}

export class SelectionIdBuilder implements ISelectionIdBuilder {
    private dataMap: SelectorForColumn;
    private measure: string;

    static builder(): SelectionIdBuilder {
        return new SelectionIdBuilder();
    }

    withCategory(categoryColumn: DataCategoryColumn, index: number): this {
        if (categoryColumn && categoryColumn.source && categoryColumn.source.queryName && categoryColumn.identity) {
            this.ensureDataMap()[categoryColumn.source.queryName] = categoryColumn.identity[index];
        }

        return this;
    }

    withSeries(seriesColumn: DataValueColumns, valueColumn: DataValueColumn | DataValueColumnGroup): this {
        if (seriesColumn && seriesColumn.source && seriesColumn.source.queryName && valueColumn) {
            this.ensureDataMap()[seriesColumn.source.queryName] = valueColumn.identity;
        }

        return this;
    }

    withMatrixNode(matrixNode: DataMatrixNode, levels: DataHierarchyLevel[]): this {
        return this;
    }

    withMeasure(measureId: string): this {
        this.measure = measureId;

        return this;
    }

    withTable(table: DataTable, rowIndex: number): this {
        return this;
    }

    createSelectionId(): ISelectionId {
        return SelectionId.createWithSelectorForColumnAndMeasure(this.ensureDataMap(), this.measure);
    }

    private ensureDataMap(): SelectorForColumn {
        if (!this.dataMap) {
            this.dataMap = {};
        }

        return this.dataMap;
    }
}

//var SelectionManager = function() {
//    function SelectionManager(options) {
//        this.dataPointObjectName = "dataPoint", this.filterPropertyIdentifier = {
//            objectName: "general",
//            propertyName: "filter"
//        }, this.hostServices = options.hostServices, this.selectedIds = [], this.promiseFactory = this.hostServices.promiseFactory();
//    }
//    return SelectionManager.prototype.select = function(selectionIds, multiSelect) {
//        void 0 === multiSelect && (multiSelect = !1);
//        var deferred = this.promiseFactory.defer();
//        return selectionIds ? (selectionIds instanceof Array || (selectionIds = [ selectionIds ]),
//        this.hostServices.shouldRetainSelection() ? this.sendSelectionToHost(selectionIds) : (this.selectInternal(selectionIds, multiSelect),
//        this.sendSelectionToHost(this.selectedIds)), deferred.resolve(this.selectedIds),
//        deferred.promise) : (deferred.reject(), deferred.promise);
//    }, SelectionManager.prototype.showContextMenu = function(selectionId, position) {
//        var deferred = this.promiseFactory.defer();
//        return this.sendContextMenuToHost(selectionId, position), deferred.resolve(null),
//        deferred.promise;
//    }, SelectionManager.prototype.hasSelection = function() {
//        return this.selectedIds.length > 0;
//    }, SelectionManager.prototype.clear = function() {
//        var deferred = this.promiseFactory.defer();
//        return this.selectedIds = [], this.sendSelectionToHost([]), deferred.resolve(null),
//        deferred.promise;
//    }, SelectionManager.prototype.getSelectionIds = function() {
//        return this.selectedIds;
//    }, SelectionManager.prototype.sendSelectionToHost = function(ids) {
//        var dataPointObjectName = this.dataPointObjectName, selectArgs = {
//            visualObjects: _.chain(ids).filter(function(value) {
//                return value.hasIdentity();
//            }).map(function(value) {
//                return {
//                    objectName: dataPointObjectName,
//                    selectorsByColumn: value.getSelectorsByColumn()
//                };
//            }).value(),
//            selectors: void 0
//        }, shouldInsertSelectors = !1;
//        _.isEmpty(ids) || (shouldInsertSelectors = ids[0].getSelector() && !ids[0].getSelectorsByColumn()),
//        shouldInsertSelectors && (selectArgs.selectors = _.chain(ids).filter(function(value) {
//            return value.hasIdentity();
//        }).map(function(value) {
//            return value.getSelector();
//        }).value()), this.hostServices.onSelect(selectArgs);
//    }, SelectionManager.prototype.sendContextMenuToHost = function(selectionId, position) {
//        var selectors = SelectionManager.getSelectorsByColumn([ selectionId ]);
//        if (!_.isEmpty(selectors)) {
//            var args = {
//                data: selectors,
//                position: position
//            };
//            this.hostServices.onContextMenu(args);
//        }
//    }, SelectionManager.prototype.selectInternal = function(selectionIds, multiSelect) {
//        var _this = this;
//        selectionIds.length < 1 || (selectionIds.length > 1 ? multiSelect ? this.selectedIds = selectionIds.filter(function(i) {
//            return !_this.selectedIds.some(function(o) {
//                return o.equals(i);
//            });
//        }).concat(this.selectedIds.filter(function(i) {
//            return !selectionIds.some(function(o) {
//                return o.equals(i);
//            });
//        })) : this.selectedIds = selectionIds : SelectionManager.containsSelection(this.selectedIds, selectionIds[0]) ? multiSelect ? this.selectedIds = this.selectedIds.filter(function(d) {
//            return !selectionIds[0].equals(d);
//        }) : this.selectedIds = this.selectedIds.length > 1 ? selectionIds : [] : multiSelect ? this.selectedIds.push(selectionIds[0]) : this.selectedIds = selectionIds);
//    }, SelectionManager.containsSelection = function(list, id) {
//        return list.some(function(d) {
//            return id.equals(d);
//        });
//    }, SelectionManager.getSelectorsByColumn = function(selectionIds) {
//        return _(selectionIds).filter(function(value) {
//            return value.hasIdentity;
//        }).map(function(value) {
//            return value.getSelectorsByColumn();
//        }).compact().value();
//    }, SelectionManager.createChangeForFilterProperty = function(filterPropIdentifier, filter) {
//        var properties = {}, instance = {
//            objectName: filterPropIdentifier.objectName,
//            selector: void 0,
//            properties: properties
//        };
//        return null == filter ? (properties[filterPropIdentifier.propertyName] = {}, {
//            remove: [ instance ]
//        }) : (properties[filterPropIdentifier.propertyName] = filter, {
//            merge: [ instance ]
//        });
//    }, SelectionManager.prototype.getFilterFromSelectors = function() {
//        if (this.hasSelection()) {
//            var selectors = _.chain(this.selectedIds).filter(function(value) {
//                return value.hasIdentity();
//            }).map(function(value) {
//                return value.getSelector();
//            }).value();
//            return powerbi.data.Selector.filterFromSelector(selectors, !1);
//        }
//    }, SelectionManager.prototype.applySelectionFilter = function() {
//        this.hostServices.persistProperties(SelectionManager.createChangeForFilterProperty(this.filterPropertyIdentifier, this.getFilterFromSelectors()));
//    }, SelectionManager;
//}();

//interface CategoryIdentityIndex {
//    categoryIndex: number;
//    identityIndex: number;
//}

//export class SelectionIdBuilder implements ISelectionIdBuilder {

//    private static DefaultCategoryIndex: number = 0;

//    private categories: DataCategoryColumn[];

//    constructor(categories?: DataCategoryColumn[]) {
//        this.categories = categories || [];
//    }

//    withCategory(categoryColumn: DataCategoryColumn, index: number): this {

//        this.categories[this.getIdentityById(index).categoryIndex].values = categoryColumn.source.queryName;
//        this.categories[index].identity = categoryColumn.identity[index];

//        [categoryColumn.source.queryName] = [];

//        return this;
//    }

//    withSeries(seriesColumn: DataValueColumns, valueColumn: DataValueColumn | DataValueColumnGroup): this {
//        return seriesColumn && seriesColumn.source && seriesColumn.source.queryName && valueColumn && (this.ensureDataMap()[seriesColumn.source.queryName] = [ valueColumn.identity ]),
//            this;
//    }

//    withMeasure(measureId: string): this {
//        throw new Error("Not implemented");// return this.measure = measureId, this;
//    }

//    withMatrixNode(matrixNode: DataMatrixNode, levels: DataHierarchyLevel[]): this {
//        throw new Error("Not implemented");
//    }

//    withTable(table: DataTable, rowIndex: number): this {
//        throw new Error("Not implemented");
//    }

//    private getIdentityById(index: number): CategoryIdentityIndex {
//        let categoryIndex: number = SelectionIdBuilder.DefaultCategoryIndex,
//            identityIndex: number = index;

//        for (let length: number = this.categories.length; categoryIndex < length; categoryIndex++) {
//            const amountOfIdentities: number = this.categories[categoryIndex].identity.length;

//            if (identityIndex > amountOfIdentities - 1) {
//                identityIndex -= amountOfIdentities;
//            } else {
//                break;
//            }
//        }

//        return {
//            categoryIndex,
//            identityIndex
//        };
//    }

//    createSelectionId(): ISelectionId {
//        const categoryIdentityIndex: CategoryIdentityIndex = this.getIdentityById(index);

//        return new SelectionIdBuilder().withCategory(this.categories[categoryIdentityIndex.categoryIndex], categoryIdentityIndex.identityIndex).createSelectionId();
//    }
//}
