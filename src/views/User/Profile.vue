<script setup>
import { ref } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
const userInfo = ref(JSON.parse(localStorage.getItem("userinfo")));
</script>

<template>
  <Layout>
    <div class="w-full border py-4 text-center mt-28 rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-16 block mx-auto mb-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

      <!-- //Profile Details  -->
      <div class="space-y-3 text-left inline-block">
        <p class="bg-slate-800 py-2 px-5 rounded-md">
          <b>FullName</b> : {{ userInfo.full_name }}
        </p>
        <p class="bg-slate-800 py-2 px-5 rounded-md">
          <b>UserName</b>: {{ userInfo.user_name }}
        </p>
        <p class="bg-slate-800 py-2 px-5 rounded-md">
          <b>Email</b> : {{ userInfo.email }}
        </p>
        <p class="bg-slate-800 py-2 px-5 rounded-md">
          <b>Phone</b>: {{ userInfo.phone }}
        </p>
        <p class="bg-slate-800 py-2 px-5 rounded-md">
          <b>SponserID</b> : {{ userInfo.sponserId }}
        </p>
        <p class="bg-slate-800 py-2  cursor-copy px-5 rounded-md">
          <b>Referral Link</b>: {{ userInfo.referral_link }}
        </p>
      </div>
    </div>
  </Layout>
</template>
