<script setup>
import { onMounted, ref } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { useUserStore } from "../../stores/User/User";
import moment from "moment";
import Loading from "../../components/Loading.vue";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import Pagination from "../../components/table/Pagination.vue";
import { useConfig } from "../../composable/useConfig";
import PageReload from "../../components/PageReload.vue";
import ls from "localstorage-slim";

const userStore = useUserStore();
const config = useConfig();
const referrel_users = ref([]);
const paginate_next = ref();
const paginate_prev = ref();
const table_sl = ref();
const paginateLoading = ref(false);

let msg = ref("");

const userInfo = config.getUserInfo();

const dataProcess = (response) => {
  if (response.status !== "faild") {
    table_sl.value = response.data.from;
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

onMounted(async () => {
  if (localStorage.getItem("referral_friend") == null) {
    const response = await userStore.referral_friend(userInfo.user_name);
    ls.set("referral_friend", response);
  }
  const getResponseLocal = ls.get("referral_friend", {
    decrypt: true,
  });
  dataProcess(getResponseLocal);
});

const paginate_controll = async (page) => {
  paginateLoading.value = true;
  const response = await userStore.referral_friend(userInfo.user_name, page);

  dataProcess(response);
  paginateLoading.value = false;
};

const reload = async () => {
  const response = await userStore.referral_friend(userInfo.user_name);
  ls.set("referral_friend", response);

  const getResponseLocal = ls.get("referral_friend", {
    decrypt: true,
  });
  dataProcess(getResponseLocal);
};
</script>
<template>
  <Layout>
    <div class="text-right mb-2 mt-10">
      <PageReload :reload-fn="reload" />
    </div>
    <table class="border-collapse table-auto w-full text-sm">
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
          <tr v-for="(user, index) in referrel_users" :key="user.id">
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
              {{ table_sl + index }}
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
              <check-icon
                v-if="user.status"
                class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
              />

              <!-- InActive  -->
              <x-mark-icon
                v-else
                class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Pagination  -->
    <Pagination
      :paginate_next="paginate_next"
      :paginate_prev="paginate_prev"
      :controll="paginate_controll"
      :loading="paginateLoading"
    />
  </Layout>
</template>
