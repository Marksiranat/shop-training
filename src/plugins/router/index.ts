import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/plugins/stores/auth' // นำเข้า store

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
          meta: { requiresAuth: false },
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

  // ตรวจสอบว่าหน้าที่จะไปต้อง login หรือไม่
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    // ถ้าต้อง login แต่ยังไม่ได้ login ให้ไปหน้า login
    next({ name: 'login' })
  } else if (to.name === 'login' && auth.isLoggedIn) {
    // ถ้า login แล้วแต่พยายามเข้าหน้า login ให้ไปหน้า home
    next({ name: 'home' })
  } else {
    // กรณีอื่นๆ ให้ไปได้ตามปกติ
    next()
  }
})

export default router;