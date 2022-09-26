<script setup>
import Header from "../../components/Dashboard/Header.vue";
import Sidebar from "../../components/Dashboard/Sidebar.vue";
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full">
      <Header />
    </div>
    <div class="col-span-2">
      <Sidebar />
    </div>

    <div class="col-span-9 pl-16 text-slate-400">
      <slot></slot>
    </div>
  </div>
</template>
