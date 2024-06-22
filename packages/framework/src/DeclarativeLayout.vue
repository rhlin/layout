<script setup lang="ts">
import { computed, provide } from 'vue';
import type { IDeclarativeLayout } from './layout.type';
import { FRAGMENTS_MAP, TYPE_COMPONENTS_MAP, CONFIG_PLUGINS, CHILDREN_PLUGINS, EVENT_PLUGINS } from './token';
import ViewUI from './ViewUI';

const props = defineProps<{ config: IDeclarativeLayout }>();
props.config.services.forEach(({ token, service: ServiceClass }) => {
  provide(token, new ServiceClass())
})
provide(TYPE_COMPONENTS_MAP, props.config.typeComponents);
provide(FRAGMENTS_MAP, props.config.fragments);
provide(CONFIG_PLUGINS, props.config.configPlugins || []);
provide(CHILDREN_PLUGINS, props.config.childrenPlugins || []);
provide(EVENT_PLUGINS, props.config.eventPlugins || []);

const view = computed(props.config.viewMapper)
</script>

<template>
  <ViewUI :config="props.config.views[view]" ></ViewUI>
</template>
