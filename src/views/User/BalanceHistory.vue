<script setup>
import { onMounted, ref } from "vue";
import moment from "moment";
import Layout from "../../components/Dashboard/Layout.vue";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/vue/24/outline";
import Td from "../../components/table/Td.vue";
import Th from "../../components/table/Th.vue";
import { useUserStore } from "../../stores/User/User";
import Pagination from "../../components/table/Pagination.vue";
import { useConfig } from "../../composable/useConfig";
import Loading from "../../components/Loading.vue";
const userStore = useUserStore();
const balanceHistory = ref([]);
const config = useConfig();
const user = config.getUserInfo();
const paginate_next = ref();
const paginate_prev = ref();
const table_sl = ref();
const paginateLoading = ref(false);
let msg = ref("");

const dataProcess = (response) => {
  if (response.status !== "faild") {
    table_sl.value = response.data.from;
    balanceHistory.value = response.data.data;
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
  const response = await userStore.balanceHistory();
  dataProcess(response);
});

const paginate_controll = async (page) => {
  paginateLoading.value = true;
  const response = await userStore.balanceHistory(page);
  dataProcess(response);
  paginateLoading.value = false;
};

// const reload = async () => {
//   const response = await userStore.balanceHistory();
//   ls.set("balanceHistory", response);

//   const getResponseLocal = ls.get("referral_friend", {
//     decrypt: true,
//   });
//   dataProcess(getResponseLocal);
// };
</script>

<template>
  <Layout title="Balance-History">
    <table class="border-collapse text-left table-auto w-full text-sm">
      <thead>
        <Th>ID</Th>
        <Th>From</Th>
        <Th>To</Th>
        <Th>Amount</Th>
        <Th>Type</Th>
        <Th>Status</Th>
        <Th>Date</Th>
      </thead>
      <tbody>
        <template v-if="balanceHistory.length == 0">
          <tr>
            <td colspan="7" class="text-center mx-auto text-lg font-bold py-5">
              <Loading v-if="!msg" />
              <span v-else>{{ msg }}</span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(history, index) in balanceHistory" :key="history.id">
            <Td>{{ index + table_sl }}</Td>
            <Td>{{ history.from_user_name }}</Td>
            <Td>{{ history.to_user_name }}</Td>
            <Td>{{ history.amount }}</Td>
            <Td>{{ history.status }}</Td>
            <Td>
              <ArrowTrendingUpIcon
                v-if="user.user_name == history.from_user_name"
                class="w-5 h-5 text-green-500 stroke-[3px]"
              />
              <ArrowTrendingDownIcon
                v-else
                class="w-5 h-5 rotate-90 text-red-500 stroke-[3px]"
              />
            </Td>

            <Td>{{ moment(history.created_at).fromNow() }}</Td>
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
