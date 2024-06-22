import { PropType, defineComponent, h, markRaw } from 'vue';
import { IDeclarativeLayout } from '../packages/framework/src/layout.type';
import { I18nPlugin, I18nSymbol } from '../packages/plugins/i18n';

import { refPlugin, refSymbol } from '../packages/plugins/ref';
import BlockComponent from '../packages/plugins/BlockComponent';
import { BlockSymbol } from '../packages/plugins/block';
const Main =  defineComponent({
  props: {
    config: Object,
  },
  setup(_props, {slots}) {
    return () => h('span', null,slots)
  }
})

export const demoConfig: IDeclarativeLayout = {
  configPlugins: [I18nPlugin, refPlugin],
  childrenPlugins: [refPlugin],
  blocks: {
    'a-block':  { type: 'icon', config: { iconName: { [refSymbol]: 'config.icon'} } }
  },
  typeComponents: {
    'icon': {
      component: markRaw(defineComponent({
        props: {
          config: Object as PropType<{iconName?: string}>,
        },
        setup(props) {
          return () => h('span', props.config?.iconName)
        }
      }))
    },
    [BlockSymbol]: {
      component: markRaw(BlockComponent)
    }
  },
  services: [],
  fragments: {},
  viewMapper: () => 'default',
  views: {
    default: {
      component: markRaw(Main),
      children: {
        default: [
          { type: 'icon', config: { iconName: '左' } },
          { type: 'icon', config: { iconName: { [I18nSymbol]: 'home'} } },
          { type: BlockSymbol, config: {
            [BlockSymbol]: 'a-block',
            icon: 'haha'
          }}
        ]
      }
    }
  }
}