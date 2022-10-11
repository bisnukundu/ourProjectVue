<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
import Th from "../../components/table/Th.vue";
import Td from "../../components/table/Td.vue";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/admins/Admin.js";
import Loading from "../../components/Loading.vue";
const searchUser = ref("");
const { getAllUser } = useAdminStore();
const allUser = ref([]);
const paginate_next = ref();
const paginate_prev = ref();
let msg = ref("");
onMounted(async () => {
  const response = await getAllUser();

  console.log(response);

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
    msg.value = "আপনার রেফারেল বন্ধু খুজে পাওয়া যাইনি!";
  }
});
</script>

<template>
  <Layout>
    <div class="mt-10 text-right">
      <input
        type="text"
        placeholder="Search User.."
        class="inline-block rounded-md ml-auto bg-slate-800 mb-2"
        v-model="searchUser"
      />

      <table class="border-collapse text-left table-auto w-full text-sm">
        <thead>
          <Th>ID</Th>
          <Th>UserName</Th>
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
            <tr v-for="(user, index) in allUser" :key="user.id">
              <Td>{{ index + 1 }}</Td>
              <Td>{{ user.user_name }}</Td>
              <Td class="space-x-5">
                <button class="cursor-pointer" title="Delete">
                  <trash-icon class="w-5 h-5 stroke-2" />
                </button>
                <button class="cursor-pointer" title="Active">
                  <check-icon class="w-5 h-5 stroke-2" />
                </button>
                <button class="cursor-pointer" title="DeActive">
                  <x-mark-icon class="w-5 h-5 stroke-2" />
                </button>
              </Td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </Layout>
</template>
