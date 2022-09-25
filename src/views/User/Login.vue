<script setup>
import Logo from "../../assets/img/logo.png";
</script>
<template>
  <div class="bg-slate-900 grid content-center items-center h-screen">
    <div>
      <img class="w-40 mx-auto" :src="Logo" alt="logo" />
    </div>
    <div
      class="bg-slate-800 text-slate-400 p-10 w-full md:w-1/2 rounded-md lg:w-1/3 mx-auto my-auto"
    >
      <form>
        <input
          class="text-black rounded-md block w-full mb-5"
          type="text"
          placeholder="User Name..."
        />
        <input
          class="text-black rounded-md block mb-5 w-full p-2"
          type="pasword"
          placeholder="Password..."
        />
        <button class="bg-red-900 font-bold text-white px-4 py-2 rounded-md">
          Login
        </button>
        <div class="mt-3">
          <router-link :to="{ name: 'user.register' }">
            <b class="text-sm"
              >একাউন্ট রেজিস্ট্রেশন করতে চান?</b
            >
            <span class="font-bold text-red-900 hover:text-red-700"
              >এখানে চাপুন</span
            >
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
