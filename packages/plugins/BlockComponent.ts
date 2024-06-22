import { PropType, defineAsyncComponent, defineComponent, h, inject } from 'vue';
import type { IBaseComponent } from '../framework/src/layout.type';

import { useDefRef } from './ref';
import { BLOCKS_MAP, BlockSymbol } from './block';
const ViewUI = defineAsyncComponent(() => import('../framework/src/ViewUI'));

export default defineComponent({
  name: 'block-component',
  props: {
    config: {
      type: Object as PropType<IBaseComponent['config'] & {
        [BlockSymbol]: string
      }>,
      require: true,
    },
    children: {
      type: Object as PropType<IBaseComponent['children']>,
      require: false,
    },
  },
  setup(props, slots) {
    const blockConfig = inject(BLOCKS_MAP)![props.config[BlockSymbol]];
    useDefRef({
      blockConfig,
      config: props.config,
      children: slots
    });

    return () => h(ViewUI, { config:  blockConfig });
  }
})
