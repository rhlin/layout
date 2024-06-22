import { Fragment, PropType, camelize, capitalize, defineAsyncComponent, defineComponent, h, toRaw } from 'vue';
import type { IBaseComponent } from './layout.type';
import { useChildrenPlugins, useConfigPlugins, useEventPlugins } from './use-plugins';

const ViewUI = defineAsyncComponent(() => import('./ViewUI'))

export default defineComponent({
  name: 'base-component',
  props: {
    component: {
      type: Object as PropType<IBaseComponent['component']>,
      require: true,
    },
    props: {
      type: Object as PropType<IBaseComponent['props']>,
      require: false,
    },
    slots: {
      type: Object as PropType<IBaseComponent['slots']>,
      require: false,
    },
    events: {
      type: Object as PropType<IBaseComponent['events']>,
      require: false,
    },
    config: {
      type: Object as PropType<IBaseComponent['config']>,
      require: false,
    },
    children: {
      type: Object as PropType<IBaseComponent['children']>,
      require: false,
    },
  },
  setup(props) {
    const { applyPlugins: applyConfigPlugins } = useConfigPlugins();
    const { applyPlugins: applyEventPlugins } = useEventPlugins();
    const { applyPlugins: applyChildrenPlugins } = useChildrenPlugins();

    const children = props.children
      ? Array.isArray(props.children)
        ? { default: props.children }
        : props.children
      : {};

    const childrenRenderSlots = Object.fromEntries(
      Object.entries(applyChildrenPlugins(children)).map(([slotName, views]) => (
        [
          slotName,
          () => h(Fragment, views.map(view => h(ViewUI, { config: view })))
        ]
      ))
    );

    return () => h(
      props.component,
      {
        ...props.props,
        config: {
          ...props.props?.config,
          ...applyConfigPlugins(props.config),
        },
        ...props.events && Object.fromEntries(
          Object.entries(applyEventPlugins(props.events)).map(
            ([k, v]) => ([`on${capitalize(camelize(k))}`, v])
          )
        )
      },
      {
        ...props.slots,
        ...childrenRenderSlots
      }
    )
  }
})