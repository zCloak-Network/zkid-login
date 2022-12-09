// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  EncryptionAlgorithms,
  Keystore,
  KeystoreSigningData,
  RequestData,
  ResponseData,
  SigningAlgorithms
} from '@kiltprotocol/types';
import { hexToU8a, u8aFixLength } from '@polkadot/util';

import { BaseProvider } from '@zcloak/login-providers/base/Provider';

const supportedAlgs = { ...EncryptionAlgorithms, ...SigningAlgorithms };

export class Keyring implements Keystore<SigningAlgorithms, EncryptionAlgorithms> {
  #provider: BaseProvider;

  constructor(provider: BaseProvider) {
    this.#provider = provider;
  }

  public supportedAlgs(): Promise<Set<SigningAlgorithms | EncryptionAlgorithms>> {
    return Promise.resolve(new Set(Object.values(supportedAlgs)));
  }

  public async sign<A extends SigningAlgorithms>({
    alg,
    data
  }: KeystoreSigningData<A>): Promise<ResponseData<A>> {
    const signature = await this.#provider.sign(data);

    return Promise.resolve({ alg, data: hexToU8a(signature.signature) });
  }

  public async encrypt<A extends 'x25519-xsalsa20-poly1305'>({
    alg,
    data,
    peerPublicKey
  }: RequestData<A> & { peerPublicKey: Uint8Array }): Promise<
    ResponseData<A> & { nonce: Uint8Array }
  > {
    const sealed = await this.#provider.encrypt(data, peerPublicKey);
    const nonce = u8aFixLength(hexToU8a(sealed), 192);

    return { data: hexToU8a(sealed), alg, nonce };
  }

  public async decrypt<A extends 'x25519-xsalsa20-poly1305'>({
    alg,
    data,
    peerPublicKey
  }: RequestData<A> & {
    peerPublicKey: Uint8Array;
    nonce: Uint8Array;
  }): Promise<ResponseData<A>> {
    const decrypted = await this.#provider.decrypt(data, peerPublicKey);

    return { data: hexToU8a(decrypted), alg };
  }

  public hasKeys(keys: Array<Pick<RequestData<string>, 'alg' | 'publicKey'>>): Promise<boolean[]> {
    return Promise.resolve([]);
  }
}
