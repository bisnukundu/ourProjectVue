<script setup>
import { useNumberConverter } from "../../composable/useNumberConverter.js";
import LoadingBalance from "./LoadingBalance.vue";
import { useToast } from "../../composable/useToast";
import { useAdminStore } from "../../stores/admins/Admin";
import ls from "localstorage-slim";
import { ref } from "vue";

const { balance } = defineProps(["balance"]);
const { activeUser } = useAdminStore();

const loading = ref(false);

const active = async (id) => {
  if (window.confirm("Do you want to Active account?")) {
    loading.value = true;
    const response = await activeUser(id);

    if (response.status == "pass") {
      ls.set("userinfo", response.data[0]);
      useToast.fire({
        title: response.message,
        icon: "success",
      });
    }
    if (response.status == "faild") {
      useToast.fire({
        title: "পর্যাপ্ত পরিমান ব্যালেন্স নেই",
        icon: "error",
      });
    }
    loading.value = false;
  }
};
</script>
<template>
  <div v-if="!balance || loading">
    <LoadingBalance />
  </div>
  <div
    v-else
    :class="[{ 'opacity-60 select-none': balance.status }]"
    class="bg-slate-800 p-10 relative rounded-md border-gray-700 border"
  >
    <h1 class="font-bold italic text-lg">এক্টিভ ব্যালেন্স!</h1>
    <p class="mt-2">{{ useNumberConverter(balance.active_balance) }} টাকা</p>
    <button
      @click="active(balance.id)"
      v-if="balance.active_balance >= 250"
      :disabled="balance.status"
      :class="[
        { 'text-green-500': balance.status },
        { 'text-red-500': !balance.status },
      ]"
      class="top-0 right-0 font-extrabold absolute border px-3 py-1 rounded-md"
    >
      <small v-show="!balance.status">এক্টিভ করুন</small>
      <small v-show="balance.status"> এক্টিভ হয়েছে</small>
    </button>
  </div>
</template>
