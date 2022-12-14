// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Request } from '@zcloak/login-rpc';

import { BaseProvider } from './base/Provider';

declare module '@zcloak/login-rpc/types' {
  interface RpcRequests {
    credential_import: { credential: HexString };
  }

  interface RpcResponses {
    credential_import: undefined;
  }
}

const injectWindow: { zkid?: { request: Request; events: any } } = window as any;

type HexString = `0x${string}`;

export class ZkidWalletProvider extends BaseProvider {
  public static async isInstalled(): Promise<boolean> {
    await ZkidWalletProvider.isReady();

    return !!injectWindow.zkid;
  }

  public static isReady(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve());
      }
    });
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
    return this.request('credential_import', { credential: data });
  }
}
