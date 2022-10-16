<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ls from "localstorage-slim";
import TeamShowTable from "../../components/table/TeamShowTable.vue";
import { onMounted, watch } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { useUserLevelStore } from "../../stores/User/UserLevel";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
const level = useUserLevelStore();
const route = useRoute();
const reloadCheck = ref(true);
const user = ref(null);
const timerCount = ref(30);

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
  if (reloadCheck.value) {
    reloadCheck.value = false;

    const getTeam = await level.getTeam();
    ls.set("team", getTeam.data);

    const response = ls.get("team", { decrypt: true });
    const levelValue = response[route.params.level];
    user.value = levelValue;

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
  <Layout>
    <div class="text-right mt-10">
      <!-- Reload Button  -->
      <b v-show="!reloadCheck">{{ timerCount }}</b>
      <button @click="reloadPage" v-show="reloadCheck">
        <arrow-path-icon stroke-width="4" class="w-5 h-5 stroke-2" />
      </button>
    </div>
    <div class="grid-flow-col space-x-3 space-y-3 text-center">
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
