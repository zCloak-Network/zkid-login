// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RpcMethods, RpcRequest, RpcResponse } from './rpcs';

export type Unsub = () => void;

/**
 * request rpc methods
 */
export interface Request {
  <Method extends RpcMethods>(method: Method, params: RpcRequest<Method>): Promise<RpcResponse<Method>>;
}
