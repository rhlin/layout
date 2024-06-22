import { PropType, defineComponent, h, inject, provide } from 'vue';
import type { ICustomComponent, IDeclarativeUI, IView } from './layout.type';
import { FRAGMENTS_MAP, TYPE_COMPONENTS_MAP } from './token';
import DeclarativeUI from './DeclarativeUI';
import BaseComponent from './BaseComponent';

export default defineComponent({
  name: 'view-ui',
  props: {
    config: {
      type: [Object, String] as PropType<IView>,
      require: true
    }
  },
  setup(props) {
    const typeComponentsMap = inject(TYPE_COMPONENTS_MAP)!;
    const fragmentsMap = inject(FRAGMENTS_MAP)!;

    if (typeof props.config === 'string' && fragmentsMap[props.config]) {
      return () => h('view-ui', { config: fragmentsMap[props.config as string] });
    }
    if ((props.config as IDeclarativeUI).type && typeComponentsMap[(props.config as IDeclarativeUI).type]) {
      return () => h(DeclarativeUI, props.config as IDeclarativeUI);
    }

    return () => h(BaseComponent, props.config as ICustomComponent);
  }
});