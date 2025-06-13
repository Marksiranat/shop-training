import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/plugins/stores/auth"; // นำเข้า store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      meta: { requiresAuth: false }, // เพิ่ม meta สำหรับหน้าที่ไม่ต้อง login
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/NotFoundView.vue"),
      meta: { requiresAuth: false }, // เพิ่ม meta สำหรับหน้าที่ไม่ต้อง login
    },
    {
      path: "/ProductView",
      name: "productview",
      component: () => import("@/views/ProductView.vue"),
      meta: { requiresAuth: false }, // เพิ่ม meta สำหรับหน้าที่ไม่ต้อง login
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: { requiresAuth: false }, // หน้า login ไม่ต้อง login
    },
    {
      path: "/",
      name: "defaultlayout",
      component: () => import("@/layouts/DefaultLayout.vue"),
      children: [
        {
          path: "",
          redirect: "/home" // เพิ่ม redirect สำหรับ root path
        },
        {
          path: "home",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/product/:id",
          name: "ProductDetail",
          component: () => import("@/views/ProductView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/views/CartView.vue"),
          meta: { requiresAuth: true }, // หน้า cart ต้อง login
        },
        {
          path: '/product/:id',
          name: 'ProductDetail',
          component: () => import('@/views/ProductView.vue'),
          meta : {requiresAuth: true} ,

        }
      ],
    },
    // เพิ่ม catch-all route สำหรับ 404
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home"
    }
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // ใช้ token เช็คว่า login แล้วหรือยัง
  const isAuthenticated = auth.isLoggedIn

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
});

export default router;