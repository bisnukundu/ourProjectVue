<script setup>
const props = defineProps(["paginate_next", "paginate_prev", "controll"]);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
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
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </button>

    <!-- //RIght button  -->

    <template v-if="props.paginate_next == null">
      <button
        disabled
        class="border p-3 py-2 rounded-md text-white opacity-20 border-red-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </template>
    <button
      v-else
      :class="[props.paginate_next == null ? 'opacity-20  border-red-800' : '']"
      @click="props.controll(props.paginate_next)"
      class="border p-3 py-2 border-gray-600 rounded-md text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </button>
  </div>
</template>
