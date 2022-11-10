<template>
  <h1>Vue Query suspense issue demo</h1>
  <Suspense timeout="0">
    <template #default>
      <Content />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Content from './components/Content.vue';

export default defineComponent({
  name: 'App',
  components: {
    Content,
  },
  setup() {
    return {};
  },
});
</script>
