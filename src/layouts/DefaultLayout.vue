<template>
  <v-app>
    <v-toolbar height="80" color="indigo-lighten-1" dark>
      <router-link to="/home" class="text-white no-underline"
        ><v-toolbar-title class="text-h4"
          ><v-icon>mdi mdi-alphabet-piqad</v-icon>M&P</v-toolbar-title
        ></router-link
      >

      <v-spacer />

      <v-btn icon to="/cart" class="d-flex mr-5">
        <v-badge :content="cart.cartCount" color="red" overlap v-if="cart.cartCount > 0">
          <v-icon style="font-size: 40px">mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else style="font-size: 40px">mdi-cart</v-icon>
      </v-btn>
      <div>
        <v-menu v-model="menu" location="bottom" offset="10">
          <template #activator="{ props }">
            <v-btn  v-bind="props" color="#ffff" class="d-flex mr-5">
              <v-icon size="40">mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item >
              <v-btn @click="logout()">ออกจากระบบ</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>

    <v-main style="background-color: #f9f9f9">
      <router-view />
    </v-main>

    <v-footer
      class="text-center d-flex flex-column ga-1 py-2"
      color="indigo-lighten-3"
      height="60px"
    >
      <div class="d-flex ga-2">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          density="compact"
          size="24"
          variant="text"
        />
      </div>

      <v-divider class="my-1" thickness="1" width="40"></v-divider>
      <v-divider />
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/plugins/stores/cartStore";
import { useAuthStore } from '@/plugins/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const cart = useCartStore();
const menu = ref(false);
const icons = ref(["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]); 


function logout() {
  auth.clear() // เคลียร์ token
  router.push('/login') // กลับไปหน้า login
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
  border: none;
  box-shadow: none;
}
</style>
