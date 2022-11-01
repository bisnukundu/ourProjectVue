<script setup>
import {
  HomeIcon,
  LinkIcon,
  ChartBarIcon,
  UserGroupIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  BanknotesIcon,
  ShieldCheckIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";

import { useConfig } from "../../composable/useConfig";

const config = useConfig();
const userInfo = config.getUserInfo();
const sideMenu = ref([
  {
    path: "user.dashboard",
    text: "Dashboard",
    icon: HomeIcon,
    isAdmin: false,
  },
  {
    path: "user.referral_friend",
    text: "Referral Friend",
    icon: LinkIcon,
    isAdmin: false,
  },
  {
    path: "user.level",
    text: "Level",
    icon: ChartBarIcon,
    isAdmin: false,
  },
  {
    path: "user.balance",
    text: "Balance",
    icon: CurrencyDollarIcon,
    isAdmin: false,
  },
  {
    path: "user.sendMoney",
    text: "Send Balance",
    icon: PaperAirplaneIcon,
    isAdmin: false,
  },
  {
    path: "user.balanceHistory",
    text: "Balance History",
    icon: BanknotesIcon,
  },
]);

//Admin Menus
const adminMenu = ref([
  {
    path: "admin.allUser",
    text: "All Users",
    icon: UserGroupIcon,
    isAdmin: true,
  },
]);
</script>
<template>
  <aside class="border border-gray-700 h-screen w-60 bg-slate-800">
    <div class="w-full lg:hidden text-right">
      <button @click="$emit('sidebar')">
        <x-circle-icon class="w-8 h-8 text-white inline-block text-right" />
      </button>
    </div>
    <div class="grid grid-flow-col space-x-1 items-center mt-2">
      <p
        style="font-family: 'Gabriola'"
        :class="[userInfo.status ? 'text-right' : 'text-center']"
        class="font-bold text-xl text-slate-400"
      >
        {{ userInfo.user_name }}
      </p>
      <ShieldCheckIcon
        v-if="userInfo.status"
        class="w-5 h-5 stroke-[3px] inline-block text-green-600"
      />
    </div>

    <div
      class="text-slate-400 space-y-5 text-sm px-5 cursor-pointer py-3 rounded-md mt-5"
    >
      <!-- admin menu  -->
      <template v-if="userInfo?.admin">
        <template v-for="(menu, index) in adminMenu" :key="index">
          <router-link
            class="flex rounded-md py-2 flex-row space-x-2 items-center"
            :to="{ name: menu.path }"
            active-class="border border-gray-600 px-5 font-bold"
          >
            <span class="w-5 h-5">
              <component :is="menu.icon"></component>
            </span>
            <span>{{ menu.text }}</span>
          </router-link>
        </template>
      </template>

      <!-- //Users Menu  -->
      <template v-if="!userInfo?.admin">
        <template v-for="(menu, index) in sideMenu" :key="index">
          <router-link
            class="flex rounded-md py-2 flex-row space-x-2 items-center focus:border focus:border-slate-500 focus:px-5"
            :to="{ name: menu.path }"
            active-class="border border-gray-600 px-5 font-bold"
          >
            <span class="w-5 h-5">
              <component :is="menu.icon"></component>
            </span>
            <span>{{ menu.text }}</span>
          </router-link>
        </template>
      </template>
    </div>
  </aside>
</template>
