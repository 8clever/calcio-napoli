
export class Queue<T> {

  count = 0;

  lastResolve = new Date().valueOf();

  resolve = async (fn: () => Promise<T>) => {
    this.count += 1;
    for (let i = this.count; i > 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    const time = (new Date().valueOf() - this.lastResolve)/1000;
    console.info(`last resolve: ${time} sec`);
    this.lastResolve = new Date().valueOf();
    return fn();
  }
}