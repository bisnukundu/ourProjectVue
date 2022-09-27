<script setup>
import { onMounted, ref } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { useUserStore } from "../../stores/User/User";

const userStore = useUserStore();
const referrel_users = ref([]);

onMounted(async () => {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const loginToken = localStorage.getItem("loginToken");
  const response = await userStore.referral_friend(
    userInfo.user_name,
    loginToken
  );
  referrel_users.value = response.data;
});
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
            Name
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody class="bg-slate-800">
        <template v-if="referrel_users.length == 0">
          <tr>
            <td colspan="3" class="text-center text-lg font-bold py-5">Loading...</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="user in referrel_users" :key="user.id">
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
              {{ user.id }}
            </td>
            <td class="border-b border-slate-700 p-4 text-slate-400">
              {{ user.full_name }}
            </td>
            <td class="border-b border-slate-700 p-4 pr-8 text-slate-400">
              {{ user.created_at }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </Layout>
</template>
