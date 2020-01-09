export function debounce(fun:()=>any, duration: number) {
  let curDelay:number|null = null;
  function _debounced() {
    if (!curDelay) {
      fun();
      curDelay = window.setTimeout(() => {
        curDelay = null;
      }, duration);
    }
  }
  return _debounced;
}

export function deepCopy<T>(obj: T & {[index: string]: any}): T {
  const _obj: any = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    const temp = obj[i];
    if (typeof temp === 'object') {
      _obj[i] = deepCopy(obj[i]);
    } else {
      _obj[i] = obj[i];
    }
  }
  return _obj as T;
}
