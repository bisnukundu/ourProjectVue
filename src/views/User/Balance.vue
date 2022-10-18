<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
import ls from "localstorage-slim";
import { useConfig } from "../../composable/useConfig";
import { useNumberConverter } from "../../composable/useNumberConverter.js";
import PageReload from "../../components/PageReload.vue";
import { useUserStore } from "../../stores/User/User";
import { onMounted, ref } from "vue";

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
        <div
          :class="[{ 'opacity-60 select-none': user.status }]"
          class="bg-slate-800 p-10 relative rounded-md border-gray-700 border"
        >
          <h1 class="font-bold italic text-lg">এক্টিভ ব্যালেন্স!</h1>
          <p class="mt-2">{{ useNumberConverter(user.active_balance) }} টাকা</p>
          <button
            v-if="user.active_balance >= 250"
            :disabled="[user.status == 0]"
            :class="[
              { 'text-green-500': user.status },
              { 'text-red-500': !user.status },
            ]"
            class="top-0 right-0 font-extrabold absolute border px-3 py-1 rounded-md"
          >
            <small v-show="!user.status">এক্টিভ করুন</small>
            <small v-show="user.status"> এক্টিভ হয়েছে</small>
          </button>
        </div>

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
