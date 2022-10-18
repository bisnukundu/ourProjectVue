<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ls from "localstorage-slim";
import TeamShowTable from "../../components/table/TeamShowTable.vue";
import { onMounted, watch } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { useUserLevelStore } from "../../stores/User/UserLevel";
import PageReload from "../../components/PageReload.vue";
const level = useUserLevelStore();
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

const reloadPage = async () => {
  const getTeam = await level.getTeam();
  ls.set("team", getTeam.data);

  const response = ls.get("team", { decrypt: true });
  const levelValue = response[route.params.level];
  user.value = levelValue;
};
</script>

<template>
  <Layout>
    <div class="text-right mt-10">
      <!-- Reload Button  -->
      <PageReload :reloadFn="reloadPage" />
    </div>
    <div class="grid-flow-col space-x-3 space-y-3 text-center">
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_1' } }"
        activeClass="text-red-500 font-extrabold"
      >
        লেভেল-১</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_2' } }"
        activeClass="text-red-500 font-extrabold"
      >
        লেভেল-২</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_3' } }"
        activeClass="text-red-500 font-extrabold"
      >
        লেভেল-৩</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_4' } }"
        activeClass="text-red-500 font-extrabold"
      >
        লেভেল-৪</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_5' } }"
        activeClass="text-red-500 font-extrabold"
      >
        লেভেল-৫</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_6' } }"
        activeClass="text-red-500 font-extrabold"
      >
        লেভেল-৬</router-link
      >
      <router-link
        class="border inline-block border-gray-500 px-3 py-1 rounded-md"
        :to="{ name: 'user.team', params: { level: 'level_7' } }"
        activeClass="text-red-500 font-extrabold"
      >
        লেভেল-৭</router-link
      >
    </div>
    <template v-if="user">
      <TeamShowTable :team="user" />
    </template>
  </Layout>
</template>
