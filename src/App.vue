<script setup>
import { RouterView } from "vue-router";
import { VOffline } from "v-offline";
import { ref } from "vue";
// Lotti animation
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import OfflineAnimation from "./assets/lotti/lf20_3pdwvmlm.json";
const connected = ref(false);
const setConnected = (e) => {
  connected.value = e;
};
</script>

<template>
  <div class="container mx-auto">
    <v-offline @detected-condition="setConnected">
      <template v-if="connected">
        <router-view></router-view>
      </template>
      <template v-if="!connected">
        <div class="h-screen relative">
          <h1
            class="text-xl text-white z-10 font-extrabold text-center absolute block inset-y-16 w-full"
          >
            আপনার ইন্টারনেট সংযোগ বিছিন্ন হয়েছে, দয়া করে চেক করুন!
          </h1>
          <Vue3Lottie
            :animationData="OfflineAnimation"
            class="h-screen w-full"
          />
        </div>
      </template>
    </v-offline>
  </div>
</template>
