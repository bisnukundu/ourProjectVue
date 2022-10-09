<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
import Th from "../../components/table/Th.vue";
import Td from "../../components/table/Td.vue";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
const searchUser = ref("");
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
          <Td>1</Td>
          <Td>bisnukundu</Td>
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
        </tbody>
      </table>
    </div>
  </Layout>
</template>
