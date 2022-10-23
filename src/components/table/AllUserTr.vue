<script setup>
import Td from "../../components/table/Td.vue";
import {
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

import LoadingIcon from "../../components/LoadingIcon.vue";
import { useAdminStore } from "../../stores/admins/Admin";
import { onMounted, ref, watch } from "vue";
import { useToast } from "../../composable/useToast.js";
import Swal from "sweetalert2";
const props = defineProps(["data", "index"]);
const { deactiveUser, activeUser, deleteUser, adminSendBalance } =
  useAdminStore();
const loading = ref(false);
const sendBalanceLoading = ref(false);
const deleteLoading = ref(false);
const user = ref();
const userRow = ref();

watch(
  () => {
    props.data;
  },
  () => {
    user.value = props.data;
  },
  {
    deep: true,
  }
);

onMounted(() => {
  user.value = props.data;
});
const active = async (id) => {
  if (window.confirm("Do you want to Active account?")) {
    loading.value = true;
    const response = await activeUser(id);

    if (response.status == "pass") {
      user.value = response.data[0];
      useToast.fire({
        title: response.message,
        icon: "success",
      });
    }
    if (response.status == "faild") {
      useToast.fire({
        title: "পর্যাপ্ত পরিমান ব্যালেন্স নেই",
        icon: "error",
      });
    }
    loading.value = false;
  }
};

const deactive = async (id) => {
  if (window.confirm("Do you want to Deactive account?")) {
    loading.value = true;
    const response = await deactiveUser(id);
    user.value = response.data[0];
    loading.value = false;
  }
};
const userDelete = async (id) => {
  if (window.confirm("Do you want to Delete?")) {
    deleteLoading.value = true;
    const response = await deleteUser(id);

    userRow.value.remove();

    useToast.fire({
      title: "Delete Successfully",
      icon: "success",
    });
  }
};

const sendBalanceInput = async (id) => {
  const res = await Swal.fire({
    title: "কত টাকা পাঠাতে চান?",
    input: "number",
    inputLabel: "(Active Balance) টাকা লিখুন",
    inputValue: "",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  if (res.isConfirmed) {
    sendBalanceLoading.value = true;
    const response = await adminSendBalance({
      id,
      balance: res.value,
      balance_type: "active",
    });
    if (response.status == "pass") {
      user.value = response.data[0];
      useToast.fire({
        title: response.message,
        icon: "success",
      });
    }
    sendBalanceLoading.value = false;
  }
};
const sendIncomeBalanceInput = async (id) => {
  const res = await Swal.fire({
    title: "কত টাকা পাঠাতে চান?",
    input: "number",
    inputLabel: "(Income Balance) টাকা লিখুন",
    inputValue: "",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  if (res.isConfirmed) {
    sendBalanceLoading.value = true;
    const response = await adminSendBalance({
      id,
      balance: res.value,
      balance_type: "income",
    });
    if (response.status == "pass") {
      user.value = response.data[0];
      useToast.fire({
        title: response.message,
        icon: "success",
      });
    }
    console.log(response);
    sendBalanceLoading.value = false;
  }
};
</script>
<template>
  <tr
    v-if="user"
    ref="userRow"
    :class="[{ 'animate-pulse': deleteLoading }, { 'animate-pulse': loading }]"
  >
    <Td>{{ index }}</Td>
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
        :disabled="deleteLoading"
      >
        <trash-icon v-show="!deleteLoading" class="w-5 h-5 stroke-2" />
        <LoadingIcon v-show="deleteLoading" />
      </button>
      <!-- Active button  -->
      <button
        v-if="!user.status"
        class="cursor-pointer"
        title="Active"
        @click="active(user.id)"
        :disabled="loading"
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
        :disabled="loading"
      >
        <LoadingIcon v-show="loading" />
        <x-mark-icon v-show="!loading" class="w-5 h-5 stroke-2" />
      </button>

      <!-- Send active balance  -->
      <button
        title="Send 500 TK"
        :disabled="sendBalanceLoading"
        @click="sendBalanceInput(user.id)"
      >
        <LoadingIcon v-show="sendBalanceLoading" />
        <paper-airplane-icon
          v-show="!sendBalanceLoading"
          class="w-5 h-5 strock-2"
        />
      </button>

      <!-- Send Income balance  -->
      <button
        title="Send 500 TK"
        :disabled="sendBalanceLoading"
        @click="sendIncomeBalanceInput(user.id)"
      >
        <LoadingIcon v-show="sendBalanceLoading" />
        <currency-dollar-icon
          v-show="!sendBalanceLoading"
          class="w-5 h-5 strock-2"
        />
      </button>
    </Td>
  </tr>
</template>
