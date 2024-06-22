import { InjectionKey, inject, provide } from 'vue';
import { IConfigPlugin } from '../framework/src/layout.type';

// 定义在DeclarativeLayout中的表达式
export const I18nSymbol = Symbol('i18n-text')
export interface Ii18nTextConfig {
  [I18nSymbol]: string | string[];
  args?: Array<any>;
}

export const I18nToken: InjectionKey<any> = Symbol('i18n')
export const I18nPlugin:IConfigPlugin<Ii18nTextConfig> = function (configItem: any) {
  if (configItem[I18nSymbol]) {
    const { t } = useI18n();
    return t(configItem[I18nSymbol] as string);
  }
  return configItem;
}

export function i18nInit() {
  provide(I18nToken, {
    'home': '主页'
  });
}

export function useI18n() {
  const dictionary = inject(I18nToken);
  const t = (key: string) => dictionary[key];
  return {
    t
  };
}
