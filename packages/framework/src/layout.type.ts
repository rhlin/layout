import { InjectionKey, Raw } from 'vue';
export type VueComponent<T = any> = Raw<T>;
export type IClass = any;
export type TODO<T = any> = T;

// token / key
export type ViewName = string;
export type FragmentName = string;
export type ServiceToken = string | symbol | InjectionKey<any>;
export type TypeToken = string | symbol;
export type RegistryKey = string;
export type BlockSymbol = symbol;
export type BlockRefSymbol = symbol;


export interface IBaseComponent {
  component: VueComponent;
  props?: Record<string, any>;
  slots?: Record<string, ((...args: any) => Vnode)>
  events?: Record<string, TODO>;
  config?: TODO;
  children?: {
    [slotName: string]: Array<IView>;
  } | Array<IView>;
}
export interface ITypeComponent extends  Omit<IBaseComponent, 'id'> { }
export interface ICustomComponent extends Omit<IBaseComponent, 'config'> { }

export interface IDeclarativeUI<K extends TypeToken = any, T = any> {
  id?: RegistryKey;
  type: K;
  config?: TODO<T>;
  children?: {
    [slotName: string]: Array<IView>;
  } | Array<IView>;
}

export type IView = IDeclarativeUI | ICustomComponent | FragmentName
export type IFragment = IDeclarativeUI | ICustomComponent;
export type IService = IClass | Record<string, any>;

// plugins
export type IDeclarativePlugin<C = unknown, D = unknown> = (configItem: C) => D;
export type IConfigPlugin<C = unknown> = IDeclarativePlugin<C, unknown>;
export type IChildrenPlugin<C = unknown> = IDeclarativePlugin<C, Array<IView>>;
export type IEventPlugin<C = unknown> = IDeclarativePlugin<C, (...args: unknown[]) => void>;

export interface IDeclarativeLayout {
  configPlugins?: Array<IConfigPlugin<any>>;
  childrenPlugins?: Array<IChildrenPlugin<any>>;
  eventPlugins?: Array<IEventPlugin<any>>;
  typeComponents: {
    [typeName: TypeToken]: ITypeComponent;
  };
  services: Array<{
    token: ServiceToken;
    service: IService | (() => IService) | (() => Promise<IService>);
    deps?: Array<{ token: ServiceToken } | { value: any }>;
    lazyInit?: boolean;
  }>;
  fragments: {
    [fragmentName: FragmentName]: IFragment;
  };
  viewMapper: () => ViewName;
  views: {
    [viewName: ViewName]: IView;
  },
  [context: string]: any;
}

