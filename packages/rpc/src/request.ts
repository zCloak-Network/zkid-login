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
