import type { Request } from '@zcloak/login-rpc';

import { BaseProvider } from './base/Provider';

const zkid: { request: Request; on: (eventName?: string, ...args: any[]) => void } = (window as any)
  ?.zkid;

export class ZkidWalletProvider extends BaseProvider {
  constructor() {
    if (!zkid) throw new Error('Zkid Wallet not install');

    super(zkid.request);

    zkid.on('did_changed', this.#didChanged);
    zkid.on('lock', this.#lock);
    zkid.on('unlock', this.#unlock);
  }

  #didChanged = (...args: any[]) => {
    this.emit('did_changed', ...args);
  };

  #lock = () => {
    this.emit('lock');
  };

  #unlock = () => {
    this.emit('unlock');
  };
}
