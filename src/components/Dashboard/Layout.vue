<script setup>
import { ref } from "vue";
import Header from "../../components/Dashboard/Header.vue";
import Sidebar from "../../components/Dashboard/Sidebar.vue";
import { useConfig } from "../../composable/useConfig";
const props = defineProps(["title"]);
const config = useConfig();
window.document.title = `${props.title} | ${config.APP_NAME}`;
const sidebar = ref(false);
const sidebarToggle = () => {
  sidebar.value = !sidebar.value;
};
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full">
      <Header @sidebar="sidebarToggle" />
    </div>
    <div
      class="lg:block lg:col-span-2 absolute lg:static lg:left-0 z-50"
      :class="[sidebar ? '' : 'hidden -left-full']"
    >
      <Sidebar @sidebar="sidebarToggle" />
    </div>

    <div
      class="col-span-12 overflow-auto h-full lg:col-span-9 lg:pl-16 text-slate-400"
    >
      <slot></slot>
    </div>
  </div>
</template>
