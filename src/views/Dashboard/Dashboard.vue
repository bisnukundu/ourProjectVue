<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
</script>

<template>
  <layout>
    <div class="grid grid-cols-2 gap-10 mt-10">
      <div class="bg-slate-800 p-10 rounded-md">
        <h1 class="font-bold italic text-lg">আপনার বর্তমান ব্যালেন্স!</h1>
        <p class="mt-2">
          <b>৮০০ টাকা</b>
        </p>
      </div>

      <div class="bg-slate-800 p-10 rounded-md">
        <h1 class="font-bold italic">আপনার লেভেল!</h1>
        <p></p>
      </div>
    </div>
  </layout>
</template>
