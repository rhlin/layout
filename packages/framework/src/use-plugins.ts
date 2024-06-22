import { InjectionKey, inject, provide } from 'vue';
import { CONFIG_PLUGINS, CHILDREN_PLUGINS, EVENT_PLUGINS } from './token';
import { IDeclarativePlugin } from './layout.type';

export function usePlugins<T extends IDeclarativePlugin = IDeclarativePlugin>(token: InjectionKey<Array<T>>) {
  const plugins = inject(token);
  function addPlugins(...args: Array<T>) {
    provide(token, (plugins || [])?.concat(...args));
  }
  function applyPlugins(config: Record<string | symbol, unknown>):Record<string | symbol, ReturnType<T>> {
    if (!config) {
      return config;
    }
    return Object.fromEntries([
      ...Object.entries(config),
      ...Object.getOwnPropertySymbols(config).map((symbol) => ([symbol, config[symbol]])) // 保留symbol类型配置
    ].map(([k, v]) => (
      [
        k,
        (plugins || [])?.reduce((acc, plugin)=> plugin(acc), v) as ReturnType<T>
      ]
    )));
  }
  return {
    plugins,
    addPlugins,
    applyPlugins
  };
}
export function useConfigPlugins() {
  return usePlugins(CONFIG_PLUGINS)
}

export function useChildrenPlugins() {
  return usePlugins(CHILDREN_PLUGINS)
}

export function useEventPlugins() {
  return usePlugins(EVENT_PLUGINS)
}