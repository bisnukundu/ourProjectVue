<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
import { UserCircleIcon } from "@heroicons/vue/24/outline";
import { UseCopyText } from "../../composable/UseCopyText.js";
import { useConfig } from "../../composable/useConfig.js";
const config = useConfig();

const userInfo = config.getUserInfo();
let ref_link = `${config.DOMAIN}/user/register/?sopnser=${userInfo.user_name}`;
</script>

<template>
  <Layout title="Profile">
    <div class="w-full text-center mt-28 rounded-md border border-dashed py-5">
      <user-circle-icon
        :class="[userInfo.status ? 'stroke-green-700' : 'stroke-red-700']"
        class="w-16 block mx-auto mb-2"
      />

      <div class="space-y-3 text-left inline-block">
        <p class="bg-slate-800 py-2 px-5 rounded-md">
          <b>Your Account</b> : {{ userInfo.status ? "Active" : "InActive" }}
        </p>
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
        <p
          @click="
            UseCopyText(ref_link, 'আপনার রেফারেল লিঙ্ক কপি করা সম্পূর্ণ হয়েছে!')
          "
          class="bg-slate-800 py-2 cursor-pointer px-5 rounded-md"
        >
          <b>Referral Link</b>:
          {{ ref_link }}
        </p>
      </div>
    </div>
  </Layout>
</template>
