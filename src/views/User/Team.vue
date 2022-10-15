<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ls from "localstorage-slim";
import TeamShowTable from "../../components/table/TeamShowTable.vue";
import { onMounted, watch } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
const route = useRoute();
const user = ref(null);

onMounted(() => {
  const response = ls.get("team", { decrypt: true });
  const levelValue = response[route.params.level];
  user.value = levelValue;
});

watch(
  () => route.params.level,
  () => {
    const response = ls.get("team", { decrypt: true });
    const levelValue = response[route.params.level];
    user.value = levelValue;
  }
);
</script>

<template>
  <Layout>
    <div class="mt-10 grid-flow-col space-x-3 space-y-3 text-center">
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_1' } }"
      >
        লেভেল-১</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_2' } }"
      >
        লেভেল-২</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_3' } }"
      >
        লেভেল-৩</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_4' } }"
      >
        লেভেল-৪</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_5' } }"
      >
        লেভেল-৫</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_6' } }"
      >
        লেভেল-৬</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_7' } }"
      >
        লেভেল-৭</router-link
      >
    </div>
    <template v-if="user">
      <TeamShowTable :team="user" />
    </template>
  </Layout>
</template>
