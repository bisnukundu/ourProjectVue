<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
import ls from "localstorage-slim";
import { useConfig } from "../../composable/useConfig";
import { useNumberConverter } from "../../composable/useNumberConverter.js";
import PageReload from "../../components/PageReload.vue";
import { useUserStore } from "../../stores/User/User";
import { onMounted, ref } from "vue";
import ActiveBalance from "../../components/balance/ActiveBalance.vue";

const config = useConfig();
const userStore = useUserStore();

const user = ref();

onMounted(() => {
  user.value = config.getUserInfo();
});

const reload = async () => {
  const response = await userStore.getUser();
  ls.set("userinfo", response.data[0]);
  user.value = config.getUserInfo();
};
</script>
<template>
  <Layout>
    <div class="mt-10 text-right">
      <PageReload :reload-fn="reload" />
    </div>
    <template v-if="user">
      <div class="grid grid-cols-2 gap-10">
        <ActiveBalance :balance="user" />

        <div class="bg-slate-800 p-10 rounded-md border-gray-700 border">
          <h1 class="font-bold italic text-lg">ইনকাম ব্যালেন্স!</h1>
          <p class="mt-2">{{ useNumberConverter(user.income_balance) }} টাকা</p>
        </div>
        <div class="bg-slate-800 p-10 rounded-md border-gray-700 border">
          <h1 class="font-bold italic text-lg">শপিং ব্যালেন্স!</h1>
          <p class="mt-2">
            {{ useNumberConverter(user.shoping_balance) }} টাকা
          </p>
        </div>
        <div class="bg-slate-800 p-10 rounded-md border-gray-700 border">
          <h1 class="font-bold italic text-lg">বোনাস ব্যালেন্স!</h1>
          <p class="mt-2">{{ useNumberConverter(user.bonus_balance) }} টাকা</p>
        </div>
      </div>
    </template>
  </Layout>
</template>
