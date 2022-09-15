import {
  Methods,
  RequestMethods,
  RequestRpcs,
  Rpcs,
  SubscriptionMethods,
  SubscriptionRpcs
} from './rpcs';

type Unsub = () => void;

export abstract class Request {
  public abstract request<Method extends RequestMethods>(
    method: Method,
    params: RequestRpcs[Method][0]
  ): Promise<RequestRpcs[Method][1]>;

  public abstract request<Method extends SubscriptionMethods>(
    method: Method,
    params: SubscriptionRpcs[Method][0],
    cb: (result: SubscriptionRpcs[Method][1]) => void
  ): Unsub;

  public abstract request<Method extends Methods>(
    method: Method,
    params: Rpcs[Method][0],
    cb?: Method extends SubscriptionMethods ? (result: SubscriptionRpcs[Method][1]) => void : never
  ): Method extends RequestMethods ? Promise<RequestRpcs[Method][1]> : Unsub;
}
