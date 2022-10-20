<script setup>
import {
  HomeIcon,
  LinkIcon,
  ChartBarIcon,
  UserGroupIcon,
  XCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
import Verify from "../../assets/img/verify.svg";
import { useConfig } from "../../composable/useConfig";

const config = useConfig();
const userInfo = config.getUserInfo();
</script>
<template>
  <aside class="border border-gray-700 h-screen w-60 bg-slate-800">
    <div class="w-full lg:hidden text-right">
      <button @click="$emit('sidebar')">
        <x-circle-icon class="w-8 h-8 text-white inline-block text-right" />
      </button>
    </div>
    <div class="grid grid-flow-col items-center mt-2">
      <p
        style="font-family: 'Gabriola'"
        :class="[userInfo.status ? 'text-right' : 'text-center']"
        class="font-bold text-xl text-slate-400"
      >
        {{ userInfo.user_name }}
      </p>
      <img
        v-if="userInfo.status"
        class="w-8 inline-block"
        :src="Verify"
        alt="verify_img"
      />
    </div>

    <div
      class="text-slate-400 space-y-5 text-sm px-5 cursor-pointer py-3 rounded-md mt-5"
    >
      <!-- //Dashboard    -->
      <router-link
        class="flex rounded-md py-2 flex-row space-x-2 items-center"
        :to="{ name: 'user.dashboard' }"
        active-class="border border-gray-600 px-5 font-bold"
      >
        <home-icon class="w-5 h-5" />
        <span>Dashboard</span>
      </router-link>
      <!-- admin menu  -->
      <template v-if="userInfo?.admin">
        <!-- //All Users    -->
        <router-link
          class="flex rounded-md py-2 flex-row space-x-2 items-center"
          :to="{ name: 'admin.allUser' }"
          active-class="border border-gray-600 px-5 font-bold"
        >
          <user-group-icon class="w-5 h-5" />
          <span>All Users</span>
        </router-link>
      </template>

      <!-- //Users Menu  -->
      <template v-if="!userInfo?.admin">
        <!-- //Referral Friend  -->
        <router-link
          class="flex rounded-md py-2 flex-row space-x-2 items-center"
          :to="{ name: 'user.referral_friend' }"
          active-class="border border-gray-600 px-5 font-bold"
        >
          <link-icon class="w-5 h-5" />
          <span>Referral Friend</span>
        </router-link>

        <!-- //Level  -->
        <router-link
          class="flex rounded-md py-2 flex-row space-x-2 items-center"
          :to="{ name: 'user.level' }"
          active-class="border border-gray-600 px-5 font-bold"
        >
          <chart-bar-icon class="w-5 h-5" />
          <span>Level</span>
        </router-link>

        <!-- //Balance  -->

        <router-link
          class="flex rounded-md py-2 flex-row space-x-2 items-center"
          :to="{ name: 'user.balance' }"
          active-class="border border-gray-600 px-5 font-bold"
        >
          <currency-dollar-icon class="w-5 h-5" />
          <span>Balance</span>
        </router-link>
      </template>
    </div>
  </aside>
</template>
