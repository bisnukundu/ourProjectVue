<script setup>
import { ref } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { UserCircleIcon } from "@heroicons/vue/24/outline";
const userInfo = ref(JSON.parse(localStorage.getItem("userinfo")));

const copyText = async (mytext) => {
  try {
    await navigator.clipboard.writeText(mytext);
    alert("আপনার রেফারেল লিঙ্ক কপি করা সম্পূর্ণ হয়েছে!");
  } catch ($e) {
    alert("Cannot copy");
  }
};
</script>

<template>
  <Layout>
    <div
      class="w-full border border-gray-600 py-4 text-center mt-28 rounded-md"
    >
      <user-circle-icon class="w-16 block mx-auto mb-2" />

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
        <p
          @click="copyText(userInfo.referral_link)"
          class="bg-slate-800 py-2 cursor-pointer px-5 rounded-md"
        >
          <b>Referral Link</b>: {{ userInfo.referral_link }}
        </p>
      </div>
    </div>
  </Layout>
</template>
