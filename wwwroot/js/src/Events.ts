
import EventEmitter3, { EventEmitter } from "eventemitter3";

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type Subtract<T, K> = Omit<T, keyof K>;

const typeList: Set<string> = new Set<string>();

export function eventFactory<T = undefined>(name: string): AppEvent<T> {

    if (typeList.has(name)) {
        throw new Error(`There is already an event defined with type '${name}'`);
    }

    typeList.add(name);
    return { name };
}

export interface AppEvent<T> {
    readonly name: string;
    payload?: T;
}

export type AlertPayload = [string, string?];
export type AlertErrorPayload = [string, (string | Error)?];

export const alertSuccess = eventFactory<AlertPayload>('alert-success');
export const alertWarning = eventFactory<AlertPayload>('alert-warning');
export const alertError = eventFactory<AlertErrorPayload>('alert-error');


export class Emitter {
    

  private emitter: EventEmitter3;

  constructor() {
    this.emitter = new EventEmitter();
  }

  /**
   * Emits an `event` with `payload`.
   */
  //emit<T extends undefined>(event: AppEvent<T>): void;
  //emit<T extends (U extends any ? Partial<T> : unknown) extends T ? Partial<T> : never, U = any>(
  //  event: AppEvent<T>
  //): void;
  //emit<T>(event: AppEvent<T>, payload: T): void;
  emit<T>(event: AppEvent<T> | string, payload?: T | any): void {
    if (typeof event === 'string') {
      console.warn(`Using strings as events is deprecated and will be removed in a future version. (${event})`);
      this.emitter.emit(event, payload);
    } else {
      this.emitter.emit(event.name, payload);
    }
  }

  /**
   * Handles `event` with `handler()` when emitted.
   */
  //on<T extends undefined>(event: AppEvent<T>, handler: () => void, scope?: any): void;
  //on<T extends (U extends any ? Partial<T> : unknown) extends T ? Partial<T> : never, U = any>(
  //  event: AppEvent<T>,
  //  handler: () => void,
  //  scope?: any
  //): void;
  //on<T>(event: AppEvent<T>, handler: (payload: T) => void, scope?: any): void;
  on<T>(event: AppEvent<T> | string, handler: (payload?: T | any) => void, scope?: any) {
    if (typeof event === 'string') {
      console.warn(`Using strings as events is deprecated and will be removed in a future version. (${event})`);
      this.emitter.on(event, handler);

      if (scope) {
        const unbind = scope.$on('$destroy', () => {
          this.emitter.off(event, handler);
          unbind();
        });
      }
      return;
    }

    this.emitter.on(event.name, handler);

    if (scope) {
      const unbind = scope.$on('$destroy', () => {
        this.emitter.off(event.name, handler);
        unbind();
      });
    }
  }

  //off<T extends undefined>(event: AppEvent<T>, handler: () => void): void;
  //off<T extends (U extends any ? Partial<T> : unknown) extends T ? Partial<T> : never, U = any>(
  //  event: AppEvent<T>,
  //  handler: () => void,
  //  scope?: any
  //): void;
  //off<T>(event: AppEvent<T>, handler: (payload: T) => void): void;
  off<T>(event: AppEvent<T> | string, handler: (payload?: T | any) => void) {
    if (typeof event === 'string') {
      console.warn(`Using strings as events is deprecated and will be removed in a future version. (${event})`);
      this.emitter.off(event, handler);
      return;
    }

    this.emitter.off(event.name, handler);
  }

  removeAllListeners(evt?: string) {
    this.emitter.removeAllListeners(evt);
  }

  getEventCount(): number {
    return (this.emitter as any)._eventsCount;
  }
}
