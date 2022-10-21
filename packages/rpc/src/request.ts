// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RequestMethods, RequestRpcs } from './rpcs';

export type Unsub = () => void;

/**
 * request rpc methods
 */
export interface Request {
  <Method extends RequestMethods>(method: Method, params: RequestRpcs[Method][0]): Promise<
    RequestRpcs[Method][1]
  >;
}
