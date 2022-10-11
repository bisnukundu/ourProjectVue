<script setup>
import { reactive, ref } from "vue";
import Logo from "../../assets/img/logo.png";

import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import { minLength, required } from "@vuelidate/validators";
import { useAdminStore } from "../../stores/Admins/Admin";

const loginData = reactive({
  user_name: "",
  password: "password",
});
const router = useRouter();
const rules = {
  user_name: { required },
  password: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, loginData);
let msg = ref("");

const userStore = useAdminStore();

const login = async () => {
  const validate = v$.value.$validate();
  if (validate) {
    const user = await userStore.AdminLogin(loginData);

    if (user.data.status == "faild") {
      msg.value = "আপনার UserName অথবা Password ভুল হয়েছে";
      return;
    }
    const token = user.data[0].plainTextToken;
    localStorage.setItem("loginToken", token);
    localStorage.setItem("userinfo", JSON.stringify(user.data[1]));
    router.push({ name: "user.dashboard" });
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
      <p
        v-show="msg"
        class="text-center mb-3 bg-red-900 text-white text-xs p-2 rounded-md font-bold"
      >
        {{ msg }}
      </p>
      <form @submit.prevent="login">
        <input
          class="text-black rounded-md block w-full mb-5"
          type="text"
          placeholder="User Name..."
          v-model="loginData.user_name"
        />
        <input
          class="text-black rounded-md block mb-5 w-full p-2"
          type="password"
          placeholder="Password..."
          v-model="loginData.password"
        />
        <button class="bg-red-900 font-bold text-white px-4 py-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  </div>
</template>
