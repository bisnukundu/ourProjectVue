<script setup>
import Layout from "../../components/Dashboard/Layout.vue";
</script>
<template>
  <Layout>
    <table class="border-collapse table-auto w-full text-sm mt-10">
      <thead>
        <tr>
          <th
            class="border border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left"
          >
            লেভেল
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-200 text-left"
          >
            সর্বনিম্ন মেম্বার
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-200 text-left"
          >
            বর্তমান মেম্বার
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
          >
            বোনাস
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
          >
            বেতন
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
          >
            তারিখ
          </th>
          <th
            class="border border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-200 text-left"
          >
            কমপ্লিট
          </th>
        </tr>
      </thead>
      <tbody class="bg-slate-800">
        <tr>
          <td class="border-b border-slate-700 p-4 text-slate-400">লেভেল-১</td>
          <td class="border-b border-slate-700 p-4 text-slate-400">২০ জন</td>
          <td class="border-b border-slate-700 p-4 text-slate-400">১ জন</td>
          <td class="border-b border-slate-700 p-4 text-slate-400">0</td>
          <td class="border-b border-slate-700 p-4 text-slate-400">0</td>
          <td class="border-b border-slate-700 p-4 text-slate-400">
            20-3-2022
          </td>
          <td class="border-b border-slate-700 p-4 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3.5"
              stroke="currentColor"
              class="w-6 h-6 text-green-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </Layout>
</template>
