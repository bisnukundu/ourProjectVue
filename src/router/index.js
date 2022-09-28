import { createRouter, createWebHistory } from "vue-router";

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
  ],
});

router.beforeEach((to, from) => {
  let authCheck = to.meta.requiresAuth;

  if (authCheck && !localStorage.getItem("loginToken")) {
    router.push({ name: "user.login" });
  }
  if (authCheck == false && localStorage.getItem("loginToken")) {
    router.push({ name: "user.dashboard" });
  }
});

export default router;
