import { RequestMethods, RequestRpcs, SubscriptionMethods, SubscriptionRpcs } from './rpcs';

export abstract class Request {
  public abstract request<Method extends RequestMethods>(
    method: Method,
    params: RequestRpcs[Method][0]
  ): Promise<RequestRpcs[Method][1]>;

  public abstract on<Method extends SubscriptionMethods>(
    method: Method,
    params: SubscriptionRpcs[Method][0],
    cb: (result: SubscriptionRpcs[Method][1]) => void
  ): void;

  public abstract off<Method extends SubscriptionMethods>(id: number, method: Method): void;
}
