// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUri, ICredential } from '@kiltprotocol/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { VerifiablePresentation } from '@zcloak/vc/types';

export type HexString = `0x${string}`;

export type WrapperCredential = VerifiablePresentation | ICredential;

export type WrapperDidUrl = DidUri | DidUrl;

export type WrapperCredentialDigest =
  | VerifiablePresentation
  | {
      rootHash: HexString;
      ctypeHash: HexString;
      attested: boolean;
      revoked: boolean;
      owner: DidUri;
      attester: DidUri;
      claimerSignature: DidSignature;
      challenge: string;
    };

export type DidSignature = {
  keyUri: WrapperDidUrl;
  signature: string;
};
