import { createRouter, createWebHistory } from "vue-router";
import { useConfig } from "../composable/useConfig";
const config = useConfig();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/user/login",
    },
    {
      path: "/user/login",
      name: "user.login",
      component: () => import("../views/User/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/admin/login",
      name: "admin.login",
      component: () => import("../views/Admin/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/user/register",
      name: "user.register",
      component: () => import("../views/User/Register.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/user/dashboard",
      name: "user.dashboard",
      component: () => import("../views/Dashboard/Dashboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/user/profile",
      name: "user.profile",
      component: () => import("../views/User/Profile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/user/referral-friend",
      name: "user.referral_friend",
      component: () => import("../views/User/ReferralFriend.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/user/level",
      name: "user.level",
      component: () => import("../views/User/Level.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin/all-user",
      name: "admin.allUser",
      component: () => import("../views/Admin/AllUser.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  let authCheck = to.meta.requiresAuth;
  const user = config.getUserInfo();

  // If not login then redirect to login page
  if (authCheck && !localStorage.getItem("loginToken")) {
    router.push({ name: "user.login" });
  }

  // If user login then redirect to user dashboard
  if (authCheck == false && localStorage.getItem("loginToken")) {
    router.push({ name: "user.dashboard" });
  }

  //If not admin then redirect user dashboard
  if (authCheck && to.name.includes("admin") && user?.admin === undefined) {
    router.push({ name: "user.login" });
  }
});

export default router;
