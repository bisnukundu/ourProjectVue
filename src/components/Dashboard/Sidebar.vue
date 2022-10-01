<script setup>
import {
  HomeIcon,
  LinkIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
</script>
<template>
  <aside class="border border-gray-700 h-screen w-60 bg-slate-800">
    <p class="italic font-bold text-slate-400 text-center mt-5">LOGO</p>
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

      <!-- //Team  -->
      <div class="flex flex-row space-x-2 items-center">
        <user-group-icon class="w-5 h-5" />
        <router-link to="/">
          <span>My Team</span>
        </router-link>
      </div>

      <!-- //Balance  -->
      <div class="flex flex-row space-x-2 items-center">
        <currency-dollar-icon class="w-5 h-5" />
        <router-link to="/">
          <span>Balance</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>
