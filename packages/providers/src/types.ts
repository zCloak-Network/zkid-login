// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { WrapperDidUrl } from '@zcloak/login-rpc/types';

export type ProviderEvents = 'did_changed' | 'lock' | 'unlock';

export type ZkpGenRequest = {
  ctype: `0x${string}`;
  attester: WrapperDidUrl;
  program: string;
};

export type ZkpGenResponse = {
  outputs: number[];
  starkproof: unknown;
  programHash: `0x${string}`;
  ctype: `0x${string}`;
  attester: WrapperDidUrl;
};
