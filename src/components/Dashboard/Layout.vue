<script setup>
import Header from "../../components/Dashboard/Header.vue";
import Sidebar from "../../components/Dashboard/Sidebar.vue";
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full">
      <Header />
    </div>
    <div
      class="hidden lg:block lg:col-span-2 absolute lg:static -left-full lg:left-0"
    >
      <Sidebar />
    </div>

    <div class="col-span-12 h-full lg:col-span-9 lg:pl-16 text-slate-400">
      <slot></slot>
    </div>
  </div>
</template>
