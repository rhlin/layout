import { InjectionKey, getCurrentInstance, inject, provide } from 'vue';
export function injectFromOnlySelf<T>(token: InjectionKey<T> | string ) {
  return (getCurrentInstance() as unknown as { provides: Record<string | symbol, any>}).provides[token as symbol | string];
}

export const refSymbol = Symbol('ref-symbol');
export const defRefSymbol = Symbol('def-ref-symbol');
export const REF_GETTER: InjectionKey<(key: string | Array<string>) => any> = Symbol('ref-symbol-getter');
export interface IRef {
  [refSymbol]: string;
}

export function useDefRef(def: Record<string | symbol, any>, inherit = false) {
  function getter(key: string | Array<string>) {
    const keys = Array.isArray(key)? key : key.split('.');
    return keys.reduce((acc, cur) => acc[cur], def)
  }
  const parentGetter = inherit ? inject(REF_GETTER, null): null
  const inheritGetter = (key: string | Array<string>) => {
    return getter?.(key) || parentGetter?.(key);
  }
  provide(REF_GETTER, inherit && parentGetter ? inheritGetter : getter );
}

export function useRef() {
  const getter = inject(REF_GETTER, null)
  return {
    ref: (key: string) => getter?.(key)
  };
}

// use in IDeclarativeLayout
export function refPlugin(configItem: any) {
  if (configItem[refSymbol]) {
    const { ref } = useRef();
    return ref(configItem[refSymbol]);
  }
  return configItem;
}

export function defRefPlugin(configItem: any) {
  if (configItem[defRefSymbol]) {
    useDefRef(configItem[defRefSymbol], true);
  }
  return configItem;
}