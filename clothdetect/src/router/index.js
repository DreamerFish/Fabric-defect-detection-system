import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../pages/login/index.vue"),
      meta: { index: 1 }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/login/index.vue"),
      meta: { index: 2 }

    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/register/index.vue"),
      meta: { index: 3 }

    },
    {
      path: "/forget",
      name: "forget",
      component: () => import("../pages/forget/index.vue"),
      meta: { index: 4 }

    },
    {
      path: "/home",
      name: "home",
      component: () => import("../pages/manage/home/home.vue"),
      meta: { index: 5 },

      redirect: to => {
        return "/home/mainPage"
      },
      meta: {
        auth: true, //需要登录
      },
      children: [
        {
          path: "mainPage",
          name: "mainPage",
          component: () => import("../pages/manage/home/main/mainPage.vue"),
          meta: { index: 6 },
        },
        {
          path: "history",
          name: "history",
          component: () =>
            import("../pages/manage/home/main/history.vue"),
          meta: { index: 7 },

        },
        {
          path: "history_video",
          name: "history_video",
          component: () =>
            import("../pages/manage/home/main/history_video.vue"),
          meta: { index: 8 },

        },
        {
          path: "video",
          name: "video",
          component: () => import("../pages/manage/home/main/video.vue"),
          meta: { index: 9 },

        },
      ],
    },
  ],

});
