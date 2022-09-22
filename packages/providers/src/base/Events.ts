import type { ProviderEvents } from '../types';

import EventEmitter from 'eventemitter3';

export abstract class Events {
  #eventemitter = new EventEmitter();

  protected emit(type: ProviderEvents, ...args: unknown[]): boolean {
    return this.#eventemitter.emit(type, ...args);
  }

  public on(type: ProviderEvents, handler: (...args: any[]) => any): this {
    this.#eventemitter.on(type, handler);

    return this;
  }

  public off(type: ProviderEvents, handler: (...args: any[]) => any): this {
    this.#eventemitter.removeListener(type, handler);

    return this;
  }

  public once(type: ProviderEvents, handler: (...args: any[]) => any): this {
    this.#eventemitter.once(type, handler);

    return this;
  }
}
