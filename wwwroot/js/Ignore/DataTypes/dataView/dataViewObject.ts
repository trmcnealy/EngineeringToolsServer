/// <reference path="../_references.ts"/>

/** Represents evaluated, named, custom objects in a DataView. */
export interface DataViewObjects {
    [name: string]: DataViewObject | DataViewObjectMap;
}

/** Represents an object (name-value pairs) in a DataView. */
export interface DataViewObject {
    [propertyName: string]: DataViewPropertyValue;
}

export type DataViewPropertyValue = PrimitiveValue | StructuralObjectValue;

export interface DataViewObjectMap {
    [id: string]: DataViewObject;
}

export interface DataViewObjectPropertyIdentifier {
    objectName: string;
    propertyName: string;
}

export module DataViewObjects {
    /** Gets the value of the given object/property pair. */
    export function getValue<T>(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultValue?: T): T {
        //debug.assertAnyValue(objects, 'objects');
        //debug.assertValue(propertyId, 'propertyId');

        if (!objects) return defaultValue;

        return DataViewObject.getValue(objects[propertyId.objectName], propertyId.propertyName, defaultValue);
    }
    /** Gets an object from objects. */
    export function getObject(objects: DataViewObjects, objectName: string, defaultValue?: DataViewObject): DataViewObject {
        if (objects && objects[objectName]) {
            return objects[objectName];
        } else {
            return defaultValue;
        }
    }
    /** Gets the solid color from a fill property. */
    export function getFillColor(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultColor?: string): string {
        var value: Fill = getValue(objects, propertyId);
        if (!value || !value.solid) return defaultColor;

        return value.solid.color;
    }
}

export export module DataViewObject {
    export function getValue<T>(object: DataViewObject, propertyName: string, defaultValue?: T): T {
        //debug.assertAnyValue(object, 'object');
        //debug.assertValue(propertyName, 'propertyName');

        if (!object) return defaultValue;

        var propertyValue = <T>object[propertyName];
        if (propertyValue === undefined) return defaultValue;

        return propertyValue;
    }
}
