// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Request, ZkpGenRequest } from '@zcloak/login-rpc';
import type { HexString } from '@zcloak/login-rpc/types';

import { BaseProvider } from './base/Provider';

const injectWindow: { zkid?: { request: Request; events: any } } = (window as any)?.zkid;

export class ZkidWalletProvider extends BaseProvider {
  public static isInstalled(): boolean {
    return !!(window as any).zkid;
  }

  constructor() {
    if (!injectWindow.zkid) throw new Error('Zkid Wallet not install');

    super(injectWindow.zkid.request);

    injectWindow.zkid.events.on?.('zkID_Wallet_didLoggedChanged', this.#didChanged);
    injectWindow.zkid.events.on?.('zkID_Wallet_lock', this.#lock);
    injectWindow.zkid.events.on?.('zkID_Wallet_unlock', this.#unlock);
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

  importCredential(data: HexString) {
    return injectWindow.zkid?.request('credential_import' as any, { credential: data });
  }

  generateZkp(option: ZkpGenRequest) {
    return injectWindow.zkid?.request('proof_generate', option);
  }
}
