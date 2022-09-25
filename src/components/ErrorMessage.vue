<script setup>
const props = defineProps(["msg", "fild"]);
</script>
<template>
  <span
    class="text-red-500 font-bold text-xs italic block"
    >{{ msg }}</span
  >
</template>
