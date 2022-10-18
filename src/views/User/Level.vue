<script setup>
import { onMounted, ref } from "vue";
import Layout from "../../components/Dashboard/Layout.vue";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useUserLevelStore } from "../../stores/User/UserLevel";
import Td from "../../components/table/Td.vue";
import Th from "../../components/table/Th.vue";
import PageReload from "../../components/PageReload.vue";

import ls from "localstorage-slim";

const level = useUserLevelStore();
const user_level = ref([]);

const teams = ref();
onMounted(async () => {
  if (localStorage.getItem("userLevel") == null) {
    const level_data = await level.userLevel();
    ls.set("userLevel", level_data.data);
  }
  user_level.value = ls.get("userLevel", {
    decrypt: true,
  });

  if (localStorage.getItem("team") == null) {
    const getTeam = await level.getTeam();
    ls.set("team", getTeam.data);
  }
  teams.value = ls.get("team", {
    decrypt: true,
  });
});

const level_number = (arr = []) => {
  return arr.length;
};
const level_complete = (arr = [], completeNumber) => {
  return arr.length >= completeNumber;
};
const reloadPage = async () => {
  const level_data = await level.userLevel();
  ls.set("userLevel", level_data.data);
  user_level.value = level_data.data;
};
</script>
<template>
  <Layout>
    <div class="text-right mt-10 mb-2">
      <PageReload :reloadFn="reloadPage" />
    </div>
    <table class="border-collapse table-auto w-full text-sm">
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
          <Td>
            <router-link
              class="hover:underline"
              :to="{ name: 'user.team', params: { level: 'level_1' } }"
            >
              লেভেল-১</router-link
            ></Td
          >
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
          <Td>
            <router-link  class="hover:underline"
              :to="{ name: 'user.team', params: { level: 'level_2' } }"
            >
              লেভেল-২</router-link
            ></Td
          >
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
          <Td>
            <router-link  class="hover:underline"
              :to="{ name: 'user.team', params: { level: 'level_3' } }"
            >
              লেভেল-৩</router-link
            ></Td
          >
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
          <Td>
            <router-link  class="hover:underline"
              :to="{ name: 'user.team', params: { level: 'level_4' } }"
            >
              লেভেল-৪</router-link
            ></Td
          >
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
          <Td>
            <router-link  class="hover:underline"
              :to="{ name: 'user.team', params: { level: 'level_5' } }"
            >
              লেভেল-৫</router-link
            ></Td
          >
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
          <Td>
            <router-link  class="hover:underline"
              :to="{ name: 'user.team', params: { level: 'level_6' } }"
            >
              লেভেল-৬</router-link
            ></Td
          >
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
          <Td>
            <router-link  class="hover:underline"
              :to="{ name: 'user.team', params: { level: 'level_7' } }"
            >
              লেভেল-৭</router-link
            ></Td
          >
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
