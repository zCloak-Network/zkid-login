import { RequestMethods, RequestRpcs, SubscriptionMethods, SubscriptionRpcs } from './rpcs';

export type Unsub = () => void;

export abstract class Request {
  public abstract request<Method extends RequestMethods>(
    method: Method,
    params: RequestRpcs[Method][0]
  ): Promise<RequestRpcs[Method][1]>;

  public abstract subscribe<Method extends SubscriptionMethods>(
    method: Method,
    params: SubscriptionRpcs[Method][0],
    cb: (result: SubscriptionRpcs[Method][1]) => void
  ): Unsub;
}
