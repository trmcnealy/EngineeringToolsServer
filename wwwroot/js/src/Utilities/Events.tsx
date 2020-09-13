
export type OnResizeCallback = (event: any) => void;

//export const ComponentResizeEvent = new CustomEvent("component-resize", {});

export type EventType = string | symbol;

export type Handler<T = any> = (event?: T) => void;
export type EventHandlerList<T = any> = Array<Handler<T>>;
export type EventHandlerMap<T = any> = Map<EventType, EventHandlerList<T>>;

//export type WildcardHandler<T = any> = (type: EventType, event?: T) => void;
//export type WildCardEventHandlerList<T = any> = Array<WildcardHandler<T>>;
//export type EventHandlerMap<T> = Map<EventType, EventHandlerList<T> | WildCardEventHandlerList<T>>;

//on(type: "*", handler: WildcardHandler): void;
//off(type: "*", handler: WildcardHandler): void;
//emit(type: "*", event?: any): void;

//export interface IEmitterAlt<T = any> {
//    all: EventHandlerMap<T>;

//    on(type: EventType, handler: Handler<T>): void;
//    off(type: EventType, handler: Handler<T>): void;
//    emit(type: EventType, event?: T): void;
//}

export interface IEmitter<T = any> {
    type: EventType;
    all: EventHandlerMap<T>;

    on(handler: Handler<T>): void;
    off(handler: Handler<T>): void;
    emit(event?: T): void;
}

export class Emitter<T = any> implements IEmitter<T> {
    type: EventType;

    all: Map<EventType, EventHandlerList<T>>;

    constructor(type: EventType, all?: Map<EventType, EventHandlerList>) {
        this.type = type;
        this.all = all || new Map<EventType, EventHandlerList<T>>();
    }

    on(handler: Handler<T>): void {
        if (!this.all.has(this.type)) {
            return;
        }

        let handlers = this.all.get(this.type);

        if (!handlers) {
            return;
        }

        const added = handlers.push(handler);

        if (added > 0) {
            this.all.set(this.type, [handler]);
        }
    }

    off(handler: Handler<T>): void {
        if (!this.all.has(this.type)) {
            return;
        }

        const handlers = this.all.get(this.type);

        if (!handlers) {
            return;
        }

        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    }

    emit(event?: T): void {
        if (!this.all.has(this.type)) {
            return;
        }

        const handlers = this.all.get(this.type);

        if (!handlers) {
            return;
        }

        handlers.slice().map((handler) => {
            handler(event);
        });
    }
}

//export function emitter<T = any>(all?: EventHandlerMap<T>, type?: EventType): Emitter<T> | EmitterAlt<T> {
//    all = all || new Map<EventType, EventHandlerList<T>>();

//    if (type) {
//        const name: EventType = type;
//        return {
//            type:name,
//            all,
//            on(handler: Handler<T>) {
//                if (!all.has(name)) {
//                    return;
//                }

//                const handlers = all.get(name);

//                if (!handlers) {
//                    return;
//                }

//                const added = handlers.push(handler);

//                if (added > 0) {
//                    all.set(name, [handler]);
//                }
//            },
//            off(handler: Handler<T>) {
//                if (!all.has(name)) {
//                    return;
//                }

//                const handlers = all.get(name);

//                if (!handlers) {
//                    return;
//                }

//                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
//            },
//            emit(evt: T) {
//                if (!all.has(name)) {
//                    return;
//                }

//                const handlers = all.get(name);

//                if (!handlers) {
//                    return;
//                }

//                handlers.slice().map((handler) => {
//                    handler(evt);
//                });
//            }
//        } as EmitterAlt<T>;
//    }

//    return {
//        all,
//        on(type: EventType, handler: Handler<T>) {
//            if (!all.has(type)) {
//                return;
//            }

//            const handlers = all.get(type);

//            if (!handlers) {
//                return;
//            }

//            const added = handlers.push(handler);

//            if (added > 0) {
//                all.set(type, [handler]);
//            }
//        },
//        off(type: EventType, handler: Handler<T>) {
//            if (!all.has(type)) {
//                return;
//            }

//            const handlers = all.get(type);

//            if (!handlers) {
//                return;
//            }

//            handlers.splice(handlers.indexOf(handler) >>> 0, 1);
//        },
//        emit(type: EventType, evt: T) {
//            if (!all.has(type)) {
//                return;
//            }

//            const handlers = all.get(type);

//            if (!handlers) {
//                return;
//            }

//            handlers.slice().map((handler) => {
//                handler(evt);
//            });
//        }
//    } as Emitter<T>;
//    //((all.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => { handler(type, evt); });
//}

export function createEmitter<T = any>(type: EventType, enableLogger: boolean) {
    const eventEmitter = new Emitter<T>(type);

    if (enableLogger) {
        eventEmitter.on(() => {
            console.log(type);
        });
    }

    return eventEmitter;
}

export const resizeEvent = createEmitter("resize", true);

resizeEvent.emit(() => {
    console.log("resizeEvent.emit test");
});

//const event = { a: 'b' };
//inst.emit('foo', event);

//export type EventEmitterHandler<T> = (value: T) => any;

//export type EventEmitter<T> = {
//    // Register an event handler
//    on: (name: string, handler: EventEmitterHandler<T>) => void;

//    // Remove an event handler
//    off: (name: string, handler: EventEmitterHandler<T>) => void;

//    // Remove all event handler
//    offAll: (name: string) => void;

//    // Invoke all handlers
//    emit: (name: string, value: T) => void;
//};

//export const createEvent: <T>() => EventEmitter<T> = <T>() => {
//    const listeners = new Map<string, Set<EventEmitterHandler<T>>>();

//    return {
//        on(name: string, handler: EventEmitterHandler<T>) {
//            if (!listeners.has(name)) {
//                listeners.set(name, new Set<EventEmitterHandler<T>>());
//            }

//            listeners[name].add(handler);
//        },
//        off(name: string, handler: EventEmitterHandler<T>) {
//            if (listeners.has(name)) {
//                listeners[name].delete(handler);
//            }
//        },
//        offAll(name: string) {
//            if (listeners.has(name)) {
//                listeners[name].clear();
//            }
//        },
//        emit(name: string, value: T) {
//            if (listeners.has(name)) {
//                listeners[name].forEach((handler) => handler(value));
//            }
//        }
//    };
//};

////const caller: [number, string][] = [];
////const event = eventEmitter<string>();
////event.on((value) => caller.push([1, value]));
////event.on((value) => caller.push([2, value]));
////const payload = "payload value";
////event.emit(payload);

//if (typeof number === typeof undefined) {
//    export type number = f64;
//}

//AssemblyScript Type 	WebAssembly type 	Description
//i32 	i32 	A 32-bit signed integer.
//u32 	i32 	A 32-bit unsigned integer.
//i64 	i64 	A 64-bit signed integer.
//u64 	i64 	A 64-bit unsigned integer.
//f32 	f32 	A 32-bit float.
//f64 	f64 	A 64-bit float.
//v128 	v128 	A 128-bit vector 🦄.
//anyref 	anyref 	An opaque host reference 🦄.
//Small integer types
//i8 	i32 	An 8-bit signed integer.
//u8 	i32 	An 8-bit unsigned integer.
//i16 	i32 	A 16-bit signed integer.
//u16 	i32 	A 16-bit unsigned integer.
//bool 	i32 	A 1-bit unsigned integer.
//Variable integer types
//isize 	i32 or i64 	A 32-bit signed integer in WASM32.
//A 64-bit signed integer in WASM64 🦄.
//usize 	i32 or i64 	A 32-bit unsigned integer in WASM32.
//A 64-bit unsigned integer in WASM64 🦄.
//Special types
//void 	- 	Indicates no return value.
//auto 	? 	Makes an educated guess. Internal only.
