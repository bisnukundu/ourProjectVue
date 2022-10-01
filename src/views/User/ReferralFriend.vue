<script setup>
import { onMounted, ref } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { useUserStore } from "../../stores/User/User";
import moment from "moment";
import Loading from "../../components/Loading.vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

const userStore = useUserStore();
const referrel_users = ref([]);
const paginate_next = ref();
const paginate_prev = ref();

let msg = ref("");

const userInfo = JSON.parse(localStorage.getItem("userinfo"));
const loginToken = localStorage.getItem("loginToken");
onMounted(async () => {
  const response = await userStore.referral_friend(
    userInfo.user_name,
    loginToken
  );

  if (response.status !== "faild") {
    referrel_users.value = response.data.data;
    paginate_next.value =
      response.data.next_page_url == null
        ? null
        : response.data.next_page_url.split("=")[1];
    paginate_prev.value =
      response.data.prev_page_url == null
        ? null
        : response.data.prev_page_url.split("=")[1];
  } else {
    msg.value = "আপনার রেফারেল বন্ধু খুজে পাওয়া যাইনি!";
  }
});
const next_paginate = async (page) => {
  const response = await userStore.referral_friend(
    userInfo.user_name,
    loginToken,
    page
  );

  if (response.status !== "faild") {
    referrel_users.value = response.data.data;

    paginate_next.value =
      response.data.next_page_url == null
        ? null
        : response.data.next_page_url.split("=")[1];
    paginate_prev.value =
      response.data.prev_page_url == null
        ? null
        : response.data.prev_page_url.split("=")[1];
  } else {
    msg.value = "আপনার রেফারেল বন্ধু খুজে পাওয়া যাইনি!";
  }
};
</script>
<template>
  <Layout>
    <table class="border-collapse table-auto w-full text-sm mt-10">
      <thead>
        <tr>
          <th
            class="border border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left"
          >
            ID
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-200 text-left"
          >
            User Name
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-200 text-left"
          >
            Phone
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
          >
            Date
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody class="bg-slate-800">
        <template v-if="referrel_users.length == 0">
          <tr>
            <td colspan="5" class="text-center text-lg font-bold py-5">
              <Loading v-if="!msg" />
              <span v-else>{{ msg }}</span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="user in referrel_users" :key="user.id">
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
              {{ user.id }}
            </td>
            <td class="border-b border-slate-700 p-4 text-slate-400">
              {{ user.user_name }}
            </td>
            <td class="border-b border-slate-700 p-4 text-slate-400">
              {{ user.phone }}
            </td>
            <td
              :title="moment(user.created_at)"
              class="border-b border-slate-700 p-4 pr-8 text-slate-400"
            >
              {{ moment(user.created_at).fromNow() }}
            </td>
            <td class="border-b border-slate-700 p-4 text-slate-400">
              <!-- Active   -->

              <svg
                v-if="user.status"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <!-- InActive  -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3.5"
                stroke="currentColor"
                class="w-6 h-6 text-red-700 font-bold"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Pagination  -->
    <div
      v-if="paginate_next != null || paginate_prev != null"
      class="flex justify-between w-full mt-2 mb-10"
    >
      <!-- //Left BUtton  -->
      <template v-if="paginate_prev == null">
        <button
          disabled
          class="border p-3 py-2 rounded-md text-white opacity-20 border-red-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </template>
      <button
        v-else
        :class="[
          paginate_prev == null ? 'opacity-20  border-red-800 disabled' : '',
        ]"
        @click="next_paginate(paginate_prev)"
        class="border p-3 py-2 border-gray-600 rounded-md text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      <!-- //RIght button  -->

      <template v-if="paginate_next == null">
        <button
          disabled
          class="border p-3 py-2 rounded-md text-white opacity-20 border-red-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </template>
      <button
        v-else
        :class="[paginate_next == null ? 'opacity-20  border-red-800' : '']"
        @click="next_paginate(paginate_next)"
        class="border p-3 py-2 border-gray-600 rounded-md text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  </Layout>
</template>
