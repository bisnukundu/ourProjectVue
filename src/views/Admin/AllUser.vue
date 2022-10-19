<script setup>
import { onMounted, ref, watch } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import Th from "../../components/table/Th.vue";

import { useAdminStore } from "../../stores/admins/Admin.js";
import Loading from "../../components/Loading.vue";
import Pagination from "../../components/table/Pagination.vue";
import AllUserTr from "../../components/table/AllUserTr.vue";
import PageReload from "../../components/PageReload.vue";
const searchUser = ref("");
const { getAllUser } = useAdminStore();
const allUser = ref([]);
const paginate_next = ref();
const paginate_prev = ref();
const table_sl = ref();
const current_page = ref();

const paginateLoading = ref(false);
let msg = ref("");

watch(searchUser, async () => {
  const response = await getAllUser(1, searchUser.value);
  dataProcess(response);
});

const dataProcess = (response) => {
  if (response.status !== "faild") {
    allUser.value = response.data.data;
    paginate_next.value =
      response.data.next_page_url == null
        ? null
        : response.data.next_page_url.split("=")[1];
    paginate_prev.value =
      response.data.prev_page_url == null
        ? null
        : response.data.prev_page_url.split("=")[1];
  } else {
    msg.value = "ইউজার খুজে পাওয়া যাইনি!";
  }
};

onMounted(async () => {
  const response = await getAllUser();
  table_sl.value = response.data.from;
  current_page.value = response.data.current_page;
  dataProcess(response);
});

const paginate_controll = async (page) => {
  paginateLoading.value = true;
  const response = await getAllUser(page);
  table_sl.value = response.data.from;
  current_page.value = response.data.current_page;
  dataProcess(response);
  paginateLoading.value = false;
};

const reload = async () => {
  const response = await getAllUser(current_page.value);
  table_sl.value = response.data.from;
  current_page.value = response.data.current_page;
  dataProcess(response);
};
</script>

<template>
  <Layout>
    <div class="mt-10 text-right space-x-5">
      <PageReload :reload-fn="reload" />
      <input
        type="text"
        placeholder="Search User.."
        class="inline-block rounded-md ml-auto bg-slate-800 mb-2"
        v-model.trim="searchUser"
      />
      <table class="border-collapse text-left table-auto w-full text-sm">
        <thead>
          <Th>ID</Th>
          <Th>UserName</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </thead>
        <tbody>
          <template v-if="allUser.length == 0">
            <tr>
              <td colspan="5" class="text-center text-lg font-bold py-5">
                <Loading v-if="!msg" />
                <span v-else>{{ msg }}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <template v-for="(user, index) in allUser" :key="user.id">
              <AllUserTr :data="user" :index="table_sl + index" />
            </template>
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
    </div>
  </Layout>
</template>
