import { InjectionKey } from 'vue';
import type { IChildrenPlugin, IConfigPlugin, IDeclarativeLayout, IEventPlugin } from './layout.type';
export const TYPE_COMPONENTS_MAP: InjectionKey<IDeclarativeLayout['typeComponents']> = Symbol('type-components-map');
export const FRAGMENTS_MAP: InjectionKey<IDeclarativeLayout['fragments']> = Symbol('fragments-map');
export const CONFIG_PLUGINS: InjectionKey<Array<IConfigPlugin>> = Symbol('config-plugins');
export const CHILDREN_PLUGINS: InjectionKey<Array<IChildrenPlugin>> = Symbol('children-plugins');
export const EVENT_PLUGINS: InjectionKey<Array<IEventPlugin>> = Symbol('event-plugins');
