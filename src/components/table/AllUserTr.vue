<script setup>
import Td from "../../components/table/Td.vue";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import LoadingIcon from "../../components/LoadingIcon.vue";
import { useAdminStore } from "../../stores/admins/Admin";
import { ref } from "vue";
const props = defineProps(["data", "index"]);
const { deactiveUser, activeUser, deleteUser } = useAdminStore();
const loading = ref(false);
const deleteLoading = ref(false);
const user = ref(props.data);
const userRow = ref();

const active = async (id) => {
  if (window.confirm("Are you sure?")) {
    loading.value = true;
    const response = await activeUser(id);
    user.value = response.data[0];
    loading.value = false;
  }
};

const deactive = async (id) => {
  if (window.confirm("Are you sure?")) {
    loading.value = true;
    const response = await deactiveUser(id);
    user.value = response.data[0];
    loading.value = false;
  }
};
const userDelete = async (id) => {
  if (window.confirm("Are you sure?")) {
    const response = await deleteUser(id);
    user.value = props.data;
    userRow.value.remove();
    console.log(userRow.value);
  }
};
</script>
<template>
  <tr ref="userRow">
    <Td>{{ index + 1 }}</Td>
    <Td>{{ user.user_name }}</Td>
    <Td>
      <small
        v-if="user.status"
        class="bg-green-500 text-white px-3 py-1 font-bold rounded-md"
        >Active</small
      >
      <small v-else class="bg-red-500 text-white px-3 py-1 font-bold rounded-md"
        >Deactive</small
      >
    </Td>
    <Td class="space-x-5">
      <!-- Delete Button  -->
      <button
        class="cursor-pointer"
        title="Delete"
        @click="userDelete(user.id)"
      >
        <LoadingIcon v-show="deleteLoading" />
        <trash-icon v-show="!deleteLoading" class="w-5 h-5 stroke-2" />
      </button>
      <!-- Active button  -->
      <button
        v-if="!user.status"
        class="cursor-pointer"
        title="Active"
        @click="active(user.id)"
      >
        <LoadingIcon v-show="loading" />
        <check-icon v-show="!loading" class="w-5 h-5 stroke-2" />
      </button>
      <!-- Deactive button  -->
      <button
        @click="deactive(user.id)"
        v-else
        :class="['cursor-pointer']"
        title="DeActive"
      >
        <LoadingIcon v-show="loading" />
        <x-mark-icon v-show="!loading" class="w-5 h-5 stroke-2" />
      </button>
    </Td>
  </tr>
</template>
