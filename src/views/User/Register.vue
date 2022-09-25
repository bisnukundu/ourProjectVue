<script setup>
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import Logo from "../../assets/img/logo.png";
import { useUserStore } from "../../stores/User/User.js";

const userStore = useUserStore();
const RegisterData = reactive({
  full_name: "",
  email: "",
  phone: "",
  sponserId: "",
  password: "",
  password_confirmation: "",
});

const submitRegister = () => {
  Swal.fire({
    title: "অভিনন্দন!",
    text: "আপনার অ্যাকাউন্টি রেজিস্ট্রেশন সম্পূর্ণ হয়েছে",
    icon: "success",
  });

  userStore.userRegister(RegisterData);
};
</script>
<template>
  <div class="bg-slate-900 grid content-center items-center h-screen">
    <div>
      <img class="w-40 mx-auto" :src="Logo" alt="logo" />
    </div>
    <div
      class="bg-slate-800 text-slate-400 p-10 w-full md:w-1/2 rounded-md lg:w-1/3 mx-auto my-auto"
    >
      <form @submit.prevent="submitRegister">
        <input
          class="text-black rounded-md block w-full mb-5"
          type="text"
          placeholder="Full Name..."
          v-model="RegisterData.full_name"
        />
        <input
          class="text-black rounded-md block w-full mb-5"
          type="email"
          placeholder="Email..."
          v-model="RegisterData.email"
        />

        <input
          class="text-black rounded-md block w-full mb-5"
          type="number"
          placeholder="Phone..."
          v-model="RegisterData.phone"
        />

        <input
          class="text-black rounded-md block mb-5 w-full p-2"
          type="password"
          placeholder="Password..."
          v-model="RegisterData.password"
        />
        <input
          class="text-black rounded-md block mb-5 w-full p-2"
          type="password"
          placeholder="Confirmed Password..."
          v-model="RegisterData.password_confirmation"
        />
        <input
          class="text-black rounded-md block w-full mb-5"
          type="text"
          placeholder="SponserID..."
          v-model="RegisterData.sponserId"
        />
        <button class="bg-red-900 font-bold text-white px-4 py-2 rounded-md">
          Register
        </button>
        <div class="mt-3">
          <router-link :to="{ name: 'user.login' }">
            <b class="text-sm">একাউন্ট আছে? লগইন করতে </b>
            <span class="font-bold text-red-900 hover:text-red-700"
              >এখানে চাপুন</span
            >
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
