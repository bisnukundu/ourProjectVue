<script setup>
import moment from "moment";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
const props = defineProps(["team"]);
</script>
<template>
  <table class="border-collapse table-auto w-full text-sm mt-10">
    <thead>
      <tr>
        <th
          class="border border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left"
        >
          ID
        </th>
        <th
          class="border border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-200 text-left"
        >
          User Name
        </th>
        <th
          class="border border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-200 text-left"
        >
          Phone
        </th>
        <th
          class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
        >
          Date
        </th>
        <th
          class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
        >
          Status
        </th>
      </tr>
    </thead>
    <tbody class="bg-slate-800">
      <tr v-for="(user, index) in team" :key="user.id">
        <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
          {{ index + 1 }}
        </td>
        <td class="border-b border-slate-700 p-4 text-slate-400">
          {{ user.user_name }}
        </td>
        <td class="border-b border-slate-700 p-4 text-slate-400">
          {{ user.phone }}
        </td>
        <td
          :title="moment(user.created_at)"
          class="border-b border-slate-700 p-4 pr-8 text-slate-400"
        >
          {{ moment(user.created_at).fromNow() }}
        </td>
        <td class="border-b border-slate-700 p-4 text-slate-400">
          <!-- Active   -->
          <check-icon
            v-if="user.status"
            class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
          />

          <!-- InActive  -->
          <x-mark-icon
            v-else
            class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
