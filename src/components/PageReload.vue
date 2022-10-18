<script setup>
import { ref } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

const props = defineProps(["reloadFn"]);
const reloadCheck = ref(true);
const timerCount = ref(30);

const reloadFn = () => {
  if (reloadCheck.value) {
    reloadCheck.value = false;

    props.reloadFn();

    setTimeout(() => {
      reloadCheck.value = true;
      timerCount.value = 30;
      clearInterval(timerInterval);
    }, 30000);

    const timerInterval = setInterval(() => {
      timerCount.value--;
    }, 1000);
  }
};
</script>
<template>
  <b v-show="!reloadCheck">{{ timerCount }}</b>
  <button :disabled="!reloadCheck" @click="reloadFn" v-show="reloadCheck">
    <arrow-path-icon stroke-width="4" class="w-5 h-5 stroke-2" />
  </button>
</template>
