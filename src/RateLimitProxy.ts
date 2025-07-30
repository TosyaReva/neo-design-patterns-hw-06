import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(service, {
    get(target, prop) {
      const method = target[prop as keyof object]
      if(typeof method === "function") {
        return function (this: unknown, ...args: unknown[]): unknown {
           const now = Date.now();
          if(lastCallTime + intervalMs > now) {
            return console.log("[RateLimit] skipped")
          } else {
            lastCallTime = now
          }
          
          return (method as Function).apply(target, args);
        }
      }
      return method
    },
  });
}
