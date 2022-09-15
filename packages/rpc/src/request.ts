import { RequestMethods, RequestRpcs, SubscriptionMethods, SubscriptionRpcs } from './rpcs';

export type Unsub = () => void;

export abstract class Request {
  public abstract request<Method extends RequestMethods>(
    method: Method,
    params: RequestRpcs[Method][0]
  ): Promise<RequestRpcs[Method][1]>;

  public abstract request<Method extends SubscriptionMethods>(
    method: Method,
    params: SubscriptionRpcs[Method][0],
    subscriber: (data: SubscriptionRpcs[Method][2]) => void
  ): Promise<SubscriptionRpcs[Method][1]>;
}
