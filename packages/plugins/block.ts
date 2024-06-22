import { InjectionKey, provide } from "vue";
import BlockComponent from "./BlockComponent";
import { IDeclarativeLayout, IDeclarativeUI } from "../framework/src/layout.type";
export { BlockComponent };

export const BlockSymbol =  Symbol('block');
export const BLOCKS_MAP: InjectionKey<Record<string, IDeclarativeUI<typeof BlockSymbol>>> = Symbol('block-map');

export function blockInit(config: IDeclarativeLayout) {
  provide(BLOCKS_MAP, config.blocks || {})
}