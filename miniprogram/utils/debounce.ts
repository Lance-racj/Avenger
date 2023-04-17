const debounce = (fn: Function, time: number) => {
  let timeout: number | undefined | null;
  return function(this: any, ...args: any[]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.call(this, ...args);
    }, time);
  }
}

export default debounce;