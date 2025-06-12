import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/plugins/stores/auth' // นำเข้า store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/ProductView",
      name: "productview",
      component: () => import("@/views/ProductView.vue"),
    },

    {
      path: "/",
      name: "defaultlayout",
      component: () => import("@/layouts/DefaultLayout.vue"),
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
          meta: { requiresAuth: false },
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'productview' }) // ถ้าไม่ได้ login ให้กลับไปหน้า home
  } else {
    next() // ปล่อยให้ไปได้
  }
})

export default router;
