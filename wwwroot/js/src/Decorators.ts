import "reflect-metadata";

//Class Decorator
//@sealed
export function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export const DefaultValue = <T>(value: {new (): T}): T => new value();

export interface NotifiedTypedPropertyDescriptor<T> extends TypedPropertyDescriptor<T> {
    onchange?: Event;
    onset?: Event;
    onerror?: Event;
}

export const property = <T>(descriptor?: NotifiedTypedPropertyDescriptor<T>) => (target: T, key: string | symbol) => {
    if (descriptor === null || descriptor === undefined) {
        descriptor = {} as PropertyDescriptor;

        //descriptor.value = DefaultValue<T>({} as any);
        descriptor.configurable = false;
        descriptor.enumerable = false;
        descriptor.get = (): T => target;
        descriptor.set = (value: T): void => {
            target = value;
        };
    } else {
        if (descriptor.configurable === null || descriptor.configurable === undefined) {
            descriptor.configurable = false;
        }

        if (descriptor.enumerable === null || descriptor.enumerable === undefined) {
            descriptor.enumerable = false;
        }

        //if (descriptor.value === null || descriptor.value === undefined) {
        //    descriptor.value = DefaultValue<T>({} as any);
        //}


        if (descriptor.get === null || descriptor.get === undefined) {
            descriptor.get = (): T => target;
        }

        if (descriptor.set === null || descriptor.set === undefined) {
            descriptor.set = (value: T): void => {
                if (target !== value) {
                    target = value;

                    console.log(`key:${String(key)} target:${target}`);
                    //this.setState({ key: target });
                }
            };
        }
        //else if ((descriptor.set === null || descriptor.set === undefined) && (descriptor.onchange !== null || descriptor.onchange !== undefined) ) {
        //    descriptor.set = (value: T): void => {
        //        if (target !== value) {
        //            target = value;
        //            (target as any).dispatchEvent(descriptor.onchange);
        //        }
        //    };
        //}

    }

    Object.defineProperty(target, key, descriptor);
};

export const froozen = <T>() => (target: T | Array<T>) => {
    return Object.freeze(target);
};

export type Action<T0 = never, T1 = never, T2 = never, T3 = never, T4 = never, T5 = never, T6 = never, T7 = never> = (arg0: T0, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => void;

export type Func<TR, T0 = never, T1 = never, T2 = never, T3 = never, T4 = never, T5 = never, T6 = never, T7 = never> = (arg0: T0, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => TR;

export class Nullable<T> {
    @property() HasValue: boolean;

    @property() Value: Readonly<T>;

    constructor(value: T) {
        this.HasValue = true;
        this.Value = value;
    }
}

//function out<T>(target: T, propertyKey: string | symbol, parameterIndex: number): Func<T> {
//    return (): T => target;
//}

//@classDecorator
//function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
//    return class extends constructor {
//        newProperty = "new property";
//        hello = "override";
//    }
//}

//export class DefaultPropertyDescriptor<T> implements PropertyDescriptor {
//    configurable?: boolean;
//    enumerable?: boolean;
//    value?: T;
//    writable?: boolean;
//    get?(): T;
//    set?(newValue: T): void;
//
//    constructor() {
//        this.configurable = false;
//        this.enumerable = false;
//        this.writable = true;
//    }
//}

//export type WatchCallback<V> = (newValue: V, oldValue: V, propertyName: string, target: Accessor) => void;

//export interface WatchHandle extends Object {
//    remove(): void;
//}

//export class Accessor {

//    destroyed: boolean;
//    initialized: boolean;
//    declaredClass: string;

//    constructor(obj?: any) {}

//    destroy(): void {}

//    get<T>(propertyName: string): T {
//        return {} as T;
//    }

//    set<T>(propertyName: string, value: T): Accessor {
//        return this;
//    }

//    watch(path: string | string[], callback: WatchCallback, sync?: boolean): WatchHandle {
//        return {} as WatchHandle;
//    }

//    protected notifyChange(propertyName: string): void {}

//    protected _get<T>(propertyName: string): T {
//        return {} as T;
//    }

//    protected _set<T>(propertyName: string, value: T): Accessor {
//        return this;
//    }
//}

//export function property<T>(target: T,
//                            key: string | symbol,
//                            descriptor: PropertyDescriptor = {
//                                configurable: false,
//                                enumerable: false,
//                                writable: true,
//                                get(): T {
//                                    return target;
//                                },
//                                set(newValue: T): void {
//                                    target = newValue;
//                                }
//                            }
//) {
//    Object.defineProperty(target, key, {
//        get: descriptor.get,
//        set: descriptor.set,
//        writable: descriptor.writable,
//        enumerable: descriptor.enumerable,
//        configurable: descriptor.configurable
//    });
//}
