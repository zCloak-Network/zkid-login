// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RpcRequests, RpcResponses } from './types';

// [RpcRequestMethod]: [Params, Returns]
export type RequestRpcs<T extends keyof RpcRequests> = Record<T, [RpcRequests[T], RpcResponses[T]]>;

export type RequestMethods = keyof RequestRpcs<keyof RpcRequests>;
