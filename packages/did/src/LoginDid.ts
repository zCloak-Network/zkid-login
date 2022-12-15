// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {
  DidKeys,
  EncryptedData,
  IDidDetails,
  IDidKeyring,
  SignedData
} from '@zcloak/did/types';
import type { DidUrl } from '@zcloak/did-resolver/types';

import { hexToU8a } from '@polkadot/util';

import { Did } from '@zcloak/did';
import { BaseProvider } from '@zcloak/login-providers/base/Provider';

type HexString = `0x${string}`;

export class LoginDid extends Did implements IDidKeyring {
  public provider: BaseProvider;

  constructor(didDetails: IDidDetails, provider: BaseProvider) {
    super(didDetails);
    this.provider = provider;
  }

  public override async sign(message: Uint8Array | HexString, idIn: DidUrl): Promise<SignedData> {
    const { id, signature, type } = await this.provider.sign(message, idIn);

    return {
      id,
      type,
      signature: hexToU8a(signature)
    };
  }

  public override async encrypt(
    message: Uint8Array | HexString,
    receiverUrlIn: DidUrl
  ): Promise<EncryptedData> {
    const { data, receiverUrl, senderUrl, type } = await this.provider.encrypt(
      message,
      receiverUrlIn
    );

    return {
      data: hexToU8a(data),
      receiverUrl,
      senderUrl,
      type
    };
  }

  public override async decrypt(
    encryptedMessageWithNonce: Uint8Array | HexString,
    senderUrl: DidUrl
  ): Promise<Uint8Array> {
    const decrypted = await this.provider.decrypt(encryptedMessageWithNonce, senderUrl);

    return hexToU8a(decrypted);
  }

  public override signWithKey(
    message: Uint8Array | HexString,
    key: Exclude<DidKeys, 'keyAgreement'>
  ): Promise<SignedData> {
    return this.sign(message, this.getKeyUrl(key));
  }
}
