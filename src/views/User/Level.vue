<script setup>
import { onMounted, ref } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useUserLevelStore } from "../../stores/User/UserLevel";
import Td from "../../components/table/Td.vue";
import Th from "../../components/table/Th.vue";
const level = useUserLevelStore();
const user_level = ref([]);
onMounted(async () => {
  const level_data = await level.userLevel();
  user_level.value = level_data.data;
});

const level_number = (arr = []) => {
  return arr.length;
};
const level_complete = (arr = [], completeNumber) => {
  return arr.length >= completeNumber;
};
</script>
<template>
  <Layout>
    <table class="border-collapse table-auto w-full text-sm mt-10">
      <thead>
        <tr>
          <Th>লেভেল</Th>
          <Th>সর্বনিম্ন মেম্বার</Th>
          <Th>বর্তমান মেম্বার</Th>
          <Th> বোনাস</Th>
          <Th>বেতন</Th>
          <Th>তারিখ</Th>
          <Th>কমপ্লিট</Th>
        </tr>
      </thead>
      <tbody class="bg-slate-800">
        <tr>
          <Td>লেভেল-১</Td>
          <Td>২০ জন</Td>
          <Td>{{ level_number(user_level["level_1"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>
          <Td>20-3-2022</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="level_complete(user_level['level_1'], 20)"
              class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
            />

            <!-- InActive  -->
            <x-mark-icon
              v-else
              class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
            />
          </Td>
        </tr>
      </tbody>
    </table>
  </Layout>
</template>
