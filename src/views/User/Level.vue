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
          <Th>কমপ্লিট</Th>
        </tr>
      </thead>
      <tbody class="bg-slate-800">
        <tr>
          <Td>লেভেল-১</Td>
          <Td>{{ user_level["level_1_complete"] }} জন</Td>
          <Td>{{ level_number(user_level["level_1"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="
                level_complete(
                  user_level['level_1'],
                  user_level['level_1_complete']
                )
              "
              class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
            />

            <!-- InActive  -->
            <x-mark-icon
              v-else
              class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
            />
          </Td>
        </tr>
        <tr>
          <Td>লেভেল-২</Td>
          <Td>{{ user_level["level_2_complete"] }} জন</Td>
          <Td>{{ level_number(user_level["level_2"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="
                level_complete(
                  user_level['level_2'],
                  user_level['level_2_complete']
                )
              "
              class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
            />

            <!-- InActive  -->
            <x-mark-icon
              v-else
              class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
            />
          </Td>
        </tr>
        <tr>
          <Td>লেভেল-৩</Td>
          <Td>{{ user_level["level_3_complete"] }} জন</Td>
          <Td>{{ level_number(user_level["level_3"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="
                level_complete(
                  user_level['level_3'],
                  user_level['level_3_complete']
                )
              "
              class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
            />

            <!-- InActive  -->
            <x-mark-icon
              v-else
              class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
            />
          </Td>
        </tr>
        <tr>
          <Td>লেভেল-৪</Td>
          <Td>{{ user_level["level_4_complete"] }} জন</Td>
          <Td>{{ level_number(user_level["level_4"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="
                level_complete(
                  user_level['level_4'],
                  user_level['level_4_complete']
                )
              "
              class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
            />

            <!-- InActive  -->
            <x-mark-icon
              v-else
              class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
            />
          </Td>
        </tr>
        <tr>
          <Td>লেভেল-৫</Td>
          <Td>{{ user_level["level_5_complete"] }} জন</Td>
          <Td>{{ level_number(user_level["level_5"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="
                level_complete(
                  user_level['level_5'],
                  user_level['level_5_complete']
                )
              "
              class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
            />

            <!-- InActive  -->
            <x-mark-icon
              v-else
              class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
            />
          </Td>
        </tr>
        <tr>
          <Td>লেভেল-৬</Td>
          <Td>{{ user_level["level_6_complete"] }} জন</Td>
          <Td>{{ level_number(user_level["level_6"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="
                level_complete(
                  user_level['level_6'],
                  user_level['level_6_complete']
                )
              "
              class="w-6 h-6 font-bold stroke-green-700 stroke-[3]"
            />

            <!-- InActive  -->
            <x-mark-icon
              v-else
              class="w-6 h-6 font-bold stroke-red-700 stroke-[3]"
            />
          </Td>
        </tr>
        <tr>
          <Td>লেভেল-৭</Td>
          <Td>{{ user_level["level_7_complete"] }} জন</Td>
          <Td>{{ level_number(user_level["level_7"]) }}</Td>
          <Td>0</Td>
          <Td>0</Td>

          <Td>
            <!-- Active   -->
            <check-icon
              v-if="
                level_complete(
                  user_level['level_7'],
                  user_level['level_7_complete']
                )
              "
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
