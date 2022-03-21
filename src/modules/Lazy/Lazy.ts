/** polyfill */
if (
  typeof window !== "undefined" &&
  typeof requestIdleCallback === "undefined") {
  /** @ts-ignore */
  window.requestIdleCallback = function (cb) {
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  }
}

export class Lazy {
  public static Register = (cb: Function, deadline?: IdleDeadline) => {
    if (typeof requestIdleCallback === "undefined") {
      setTimeout(cb, 4000);
      return;
    }
  
    if (deadline && deadline.timeRemaining() > 45) {
      cb();
      return;
    }
  
    requestIdleCallback(deadline => {
      Lazy.Register(cb, deadline);
    });
  };
}