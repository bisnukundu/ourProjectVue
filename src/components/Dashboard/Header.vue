<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/User/User";

import {
  UserCircleIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import ls from "localstorage-slim";

let profileMenu = ref(false);
const userStore = useUserStore();
const router = useRouter();

const loading = ref(false);

const logout = async () => {
  loading.value = true;
  await userStore.userLogout();
  localStorage.removeItem("loginToken");
  localStorage.removeItem("userinfo");
  localStorage.removeItem("userLevel");
  localStorage.removeItem("referral_friend");
  ls.remove("team");
  loading.value = false;
  router.push({ name: "user.login" });
};
</script>
<template>
  <header
    class="border grid-flow-col border-gray-600 w-full bg-slate-800 grid content-center"
  >
    <div class="w-20 place-self-start text-right block lg:hidden">
      <button @click="$emit('sidebar')">
        <bars-3-icon class="w-10 h-10 text-white" />
      </button>
    </div>
    <div class="w-20 relative place-self-end">
      <!-- //Profile Menu Button  -->
      <button @click="profileMenu = !profileMenu">
        <user-circle-icon class="w-10 h-10 text-white" />
      </button>

      <!-- //DropDown Menu  -->
      <div
        v-show="profileMenu"
        class="bg-slate-800 text-white border-gray-600 border space-y-5 p-5 rounded-md absolute right-0"
      >
        <!-- //Profile  -->
        <div class="flex flex-row space-x-2 items-center">
          <UserCircleIcon class="w-5 h-5" />

          <router-link :to="{ name: 'user.profile' }">
            <span>Profile</span>
          </router-link>
        </div>

        <!-- //Logout    -->
        <div class="flex flex-row space-x-2 items-center">
          <arrow-left-on-rectangle-icon class="w-5 h-5" />

          <button @click="logout" :disabled="loading">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
