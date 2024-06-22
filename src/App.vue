<script setup lang="ts">
import { UILayout } from '../packages/framework';
import { blockInit } from '../packages/plugins/block';
import { i18nInit } from '../packages/plugins/i18n';
import { demoConfig } from './demo.config';
i18nInit()
blockInit(demoConfig)
</script>

<template>
  <UILayout :config="demoConfig"></UILayout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
