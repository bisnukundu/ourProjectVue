<script setup>
import LoadingIcon from "../LoadingIcon.vue";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
const props = defineProps([
  "paginate_next",
  "paginate_prev",
  "controll",
  "loading",
]);
</script>
<template>
  <div
    v-if="props.paginate_next != null || props.paginate_prev != null"
    class="flex justify-between w-full mt-2 mb-10"
  >
    <!-- //Left BUtton  -->
    <template v-if="props.paginate_prev == null">
      <button
        disabled
        class="border p-3 py-2 rounded-md text-white opacity-20 border-red-800"
      >
        <ArrowLeftIcon class="w-6 h-6 stroke-2" />
      </button>
    </template>
    <button
      v-else
      :class="[
        props.paginate_prev == null
          ? 'opacity-20  border-red-800 disabled'
          : '',
      ]"
      @click="props.controll(props.paginate_prev)"
      class="border p-3 py-2 border-gray-600 rounded-md text-white"
      :disabled="loading"
    >
      <ArrowLeftIcon v-show="!loading" class="w-6 h-6 stroke-2" />
      <LoadingIcon v-show="loading" />
    </button>

    <!-- //RIght button  -->

    <template v-if="props.paginate_next == null">
      <button
        disabled
        class="border p-3 py-2 rounded-md text-white opacity-20 border-red-800"
      >
        <ArrowRightIcon class="w-6 h-6 stroke-2" />
      </button>
    </template>
    <button
      v-else
      :class="[props.paginate_next == null ? 'opacity-20  border-red-800' : '']"
      @click="props.controll(props.paginate_next)"
      class="border p-3 py-2 border-gray-600 rounded-md text-white"
      :disabled="loading"
    >
      <ArrowRightIcon class="w-6 h-6" v-show="!loading" />
      <LoadingIcon v-show="loading" />
    </button>
  </div>
</template>
