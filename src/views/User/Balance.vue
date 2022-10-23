<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
import { useConfig } from "../../composable/useConfig";
import { useNumberConverter } from "../../composable/useNumberConverter.js";
import PageReload from "../../components/PageReload.vue";
import { useUserStore } from "../../stores/User/User";
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/admins/Admin.js";
import { useToast } from "../../composable/useToast";
import ls from "localstorage-slim";
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import Verify from "../../assets/img/verify.svg";
import Swal from "sweetalert2";

const config = useConfig();
const userStore = useUserStore();
const loading = ref(false);
const { activeUser } = useAdminStore();
const user = ref();

onMounted(() => {
  user.value = config.getUserInfo();
});
const { sendActiveBalance, sendIncomeBalance } = useAdminStore();

const reload = async () => {
  const response = await userStore.getUser();
  ls.set("userinfo", response.data[0]);
  user.value = response.data[0];
};

const active = async (id) => {
  if (window.confirm("Do you want to Active account?")) {
    loading.value = true;
    const response = await activeUser(id);
    if (response.status == "pass") {
      ls.set("userinfo", response.data[0]);
      user.value = response.data[0];
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
  <Layout>
    <div class="mt-10 text-right">
      <PageReload :reload-fn="reload" />
    </div>
    <template v-if="user">
      <div class="grid grid-cols-2 gap-10">
        <div
          class="bg-slate-800 p-10 relative rounded-md border-gray-700 border"
        >
          <h1 class="font-bold italic text-lg">এক্টিভ ব্যালেন্স!</h1>
          <p aria-disabled="" class="mt-2">
            {{
              user.active_balance ? useNumberConverter(user.active_balance) : 0
            }}
            টাকা
          </p>
          <!-- send active balance  -->
          <router-link
            class="bottom-0 right-0 p-3 absolute"
            :to="{ name: 'user.sendMoney' }"
          >
            <PaperAirplaneIcon class="w-7 h-w-7" />
          </router-link>

          <button
            @click="active(user.id)"
            v-if="
              user.active_balance >= 250 &&
              user.income_balance >= 250 &&
              !user.status
            "
            :disabled="user.status"
            :class="[
              { 'text-green-500': user.status },
              { 'text-red-500': !user.status },
            ]"
            class="top-0 right-0 font-extrabold absolute border px-3 py-1 rounded-md"
          >
            <small>এক্টিভ করুন</small>
          </button>
          <img
            class="top-0 w-20 right-0 font-extrabold absolute px-3 py-1 rounded-md"
            :src="Verify"
            v-if="user.status"
            alt="verify_img"
          />
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
