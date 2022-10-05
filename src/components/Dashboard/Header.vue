<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/User/User";
import { UserCircleIcon, Bars3Icon } from "@heroicons/vue/24/outline";
let profileMenu = ref(false);
const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  let t = await userStore.userLogout();
  localStorage.removeItem("loginToken");
  localStorage.removeItem("userinfo");
  router.push({ name: "user.login" });
};
</script>
<template>
  <header
    class="border grid-flow-col border-gray-600 w-full bg-slate-800 grid content-center"
  >
    <div class="w-20 place-self-start text-right block lg:hidden">
      <button>
        <bars-3-icon class="w-10 h-10 text-white" />
      </button>
    </div>
    <div class="w-20 relative place-self-end">
      <!-- //Profile Menu Button  -->
      <button @click="profileMenu = !profileMenu">
        <user-circle-icon class="w-10 h-10 text-white" />
      </button>

      <!-- //DropDown Menu  -->
      <div
        v-show="profileMenu"
        class="bg-slate-800 text-white border-gray-600 border space-y-5 p-5 rounded-md absolute right-0"
      >
        <!-- //Profile  -->
        <div class="flex flex-row space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <router-link :to="{ name: 'user.profile' }">
            <span>Profile</span>
          </router-link>
        </div>

        <!-- //Logout    -->
        <div class="flex flex-row space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <button @click="logout">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
