<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";

import { useUserStore } from "../../stores/User/User";

import { useToast } from "../../composable/useToast";
import { useAdminStore } from "../../stores/admins/Admin";
import LoadingIcon from "../../components/LoadingIcon.vue";

const { getUserByUserName } = useUserStore();
const { sendBalance } = useAdminStore();

const info = reactive({
  user_name: "",
  balance: "",
  balance_type: "",
});

const isLoading = ref(false);
const sendBalanceToUser = async () => {
  if (
    info.balance.length == 0 ||
    info.balance_type.length == 0 ||
    info.user_name.length == 0
  ) {
    useToast.fire({
      title: "সব গুলো ফিল্ড পুরন করুন",
      icon: "error",
    });
  } else {
    isLoading.value = true;
    const res = await getUserByUserName(info.user_name);
    console.log(res);
    if (res.data.length > 0) {
      const response = await sendBalance({
        id: res.data[0].id,
        balance: info.balance,
        balance_type: info.balance_type,
      });
      console.log(response);
      if (response.status == "faild") {
        useToast.fire({
          title: response.message,
          icon: "error",
        });
        isLoading.value = false;
      } else {
        useToast.fire({
          title: "টাকা চলে গেছে",
          icon: "success",
        });
        isLoading.value = false;
      }
    } else {
      useToast.fire({
        title: "ইউজার নেম ভুল হয়েছে",
        icon: "error",
      });
      isLoading.value = false;
    }
  }
};
</script>
<template>
  <Layout title="SendMoney">
    <div class="bg-slate-800 border border-gray-700 p-10 rounded-md mt-5">
      <form class="space-y-4" @submit.prevent="sendBalanceToUser">
        <input
          v-model.trim="info.user_name"
          placeholder="কাকে টাকা পাঠাতে চান?"
          type="text"
          class="rounded-md block text-black"
        />

        <input
          v-model="info.balance"
          placeholder="কত টাকা পাঠাতে চান?"
          type="number"
          min="1"
          class="rounded-md block text-black"
        />
        <label class="flex space-x-2 center items-center" for="activeMoney">
          <input
            v-model="info.balance_type"
            name="balance"
            type="radio"
            id="activeMoney"
            class="rounded-md block"
            value="active"
          />
          <p>Active Balance</p>
        </label>

        <label class="flex space-x-2 center items-center" for="incomeMoney">
          <input
            v-model="info.balance_type"
            name="balance"
            type="radio"
            id="incomeMoney"
            value="income"
            class="rounded-md block"
          />
          <p>Income Balance</p>
        </label>
        <button
          :disabled="isLoading"
          type="submit"
          class="border px-10 rounded-md py-2"
        >
          <PaperAirplaneIcon class="w-5 h-5" v-show="!isLoading" />
          <LoadingIcon v-show="isLoading" />
        </button>
      </form>
    </div>
  </Layout>
</template>
