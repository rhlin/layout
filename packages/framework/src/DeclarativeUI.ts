import { PropType, defineComponent, h, inject } from 'vue';
import type { IDeclarativeUI, IView } from './layout.type';
import { TYPE_COMPONENTS_MAP } from './token';
import BaseComponent from './BaseComponent';

export default defineComponent({
  name: 'declarative-ui',
  props: {
    type: {
      type: [String, Symbol] as PropType<IDeclarativeUI['type']>,
      require: true,
    },
    id: {
      type: String as PropType<IDeclarativeUI['id']>,
      require: false,
    },
    config: {
      type: Object as PropType<IDeclarativeUI['config']>,
      require: false,
    },
    children: {
      type: [Object, Array] as PropType<IDeclarativeUI['children']>,
      require: false,
    },
  },
  setup(props) {
    const typeComponentsMap = inject(TYPE_COMPONENTS_MAP)!;
    const typeComponentConfig = typeComponentsMap[props.type];

    const childrenToObject = (children: Record<string, Array<IView>> | Array<IView> | undefined) => {
      if (!children) {
        return {};
      }
      return Array.isArray(children)
        ? { default: children }
        : children
    }

    return () => h(
      BaseComponent,
      {
        ...typeComponentConfig,
        config: {
          ...typeComponentConfig.config,
          ...props.config,
        },
        children: {
          ...childrenToObject(typeComponentConfig.children),
          ...childrenToObject(props.children)
        }
      }
    )
  }
});
