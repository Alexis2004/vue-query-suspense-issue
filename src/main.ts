import { createApp } from 'vue';
import App from './App.vue';
import {VueQueryPlugin, VueQueryPluginOptions} from "@tanstack/vue-query";

const app = createApp(App);
app.use(VueQueryPlugin, {
  contextSharing: true,
} as VueQueryPluginOptions);
app.mount('#app');
