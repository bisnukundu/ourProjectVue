<script setup>
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";
import Logo from "../../assets/img/logo.png";
import { useUserStore } from "../../stores/User/User.js";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  maxLength,
} from "@vuelidate/validators";
import ErrorMessage from "../../components/ErrorMessage.vue";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
let error = ref("");

// just for creating some dummy data git problem solve
let date = new Date();
const RegisterData = reactive({
  full_name: `Bisnu${date.getSeconds()} kundu`,
  email: "bisnu" + date.getSeconds() + "@gmail.com",
  phone: "01477979314",
  sponserId: route.query.sopnser ?? "",
  password: "password",
  password_confirmation: "password",
});

let ruels = {
  full_name: { required },
  email: { required },
  phone: { required, minLength: minLength(11), maxLength: maxLength(11) },
  password: { required, minLength: minLength(6) },
  password_confirmation: {
    required,
    minLength: minLength(6),
  },
};

const v$ = useVuelidate(ruels, RegisterData);

const submitRegister = async () => {
  let validate = await v$.value.$validate();
  if (validate) {
    const userRegister = await userStore.userRegister(RegisterData);
    if (userRegister.status === 200 && userRegister.data.status == "pass") {
      Swal.fire({
        title: "অভিনন্দন!",
        html: `আপনার অ্যাকাউন্টি রেজিস্ট্রেশন সম্পূর্ণ হয়েছে। আপনার Username : <b>${userRegister.data.data.user_name}</b>`,
        icon: "success",
      });
      router.push({ name: "user.login" });
    } else {
      Swal.fire({
        title: "Error",
        text: userRegister.data.message,
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Error",
      text: "দয়া করে ভালো করে চেক করুন, কোথাও ভুলে হয়েছে কিনা!",
      icon: "error",
    });
  }
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
      <p>{{ error }}</p>
      <form @submit.prevent="submitRegister">
        <div class="my-3">
          <error-message
            v-if="v$.full_name.$error"
            msg="দয়া করে আপনার নামটি পুরন করুন"
            fild="full_name"
          />
          <input
            class="text-black rounded-md block w-full"
            type="text"
            placeholder="Full Name..."
            v-model="RegisterData.full_name"
            @blur="v$.full_name.$touch"
            :class="[{ 'border-red-900 border-2': v$.full_name.$error }]"
          />
        </div>

        <div class="my-3">
          <error-message
            v-if="v$.email.$error"
            msg="দয়া করে আপনার জিমেল টি পুরন করুন"
            fild="email"
          />
          <input
            class="text-black rounded-md block w-full"
            type="email"
            placeholder="Email..."
            v-model="RegisterData.email"
            @blur="v$.email.$touch"
            :class="[{ 'border-red-900 border-2': v$.email.$error }]"
          />
        </div>

        <div class="my-3">
          <error-message
            v-if="v$.phone.$error"
            fild="phone"
            msg="দয়া করে আপনার ফোন নাম্বার টি ১১ ডিজিটের লিখুন"
          />
          <input
            class="text-black rounded-md block w-full"
            type="tel"
            placeholder="Phone..."
            v-model="RegisterData.phone"
            @blur="v$.phone.$touch"
            :class="[{ 'border-red-900 border-2': v$.phone.$error }]"
          />
        </div>

        <div class="my-3">
          <error-message
            v-if="v$.password.$error"
            msg="পাসওয়ার্ড মিলে নাই অথবা ৬ টির কম দিয়েছেন!"
            fild="password"
          />
          <input
            class="text-black rounded-md block w-full p-2"
            type="password"
            placeholder="Password..."
            v-model="RegisterData.password"
            @blur="v$.password.$touch"
            :class="[{ 'border-red-900 border-2': v$.password.$error }]"
          />
        </div>

        <div class="my-3">
          <error-message
            v-if="v$.password_confirmation.$error"
            msg="পাসওয়ার্ড মিলে নাই অথবা ৬ টির কম দিয়েছেন!"
            fild="password_confirmation"
          />
          <input
            class="text-black rounded-md block mb-5 w-full p-2"
            type="password"
            placeholder="Confirmed Password..."
            v-model="RegisterData.password_confirmation"
            @blur="v$.password_confirmation.$touch"
            :class="[
              { 'border-red-900 border-2': v$.password_confirmation.$error },
            ]"
          />
        </div>

        <div v-if="RegisterData.sponserId" class="my-3">
          <input
            class="text-gray-700 font-bold bg-gray-300 rounded-md block w-full mb-5"
            type="text"
            disabled="false"
            placeholder="SponserID..."
            v-model="RegisterData.sponserId"
          />
        </div>

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
