<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Left Panel: Image -->
      <v-col cols="12" md="8" class="d-none d-md-flex">
        <v-img
          src="https://i.pinimg.com/736x/59/76/74/5976743c8007bd1d0369bc57f89a41ba.jpg"
          alt="login background"
          cover
          height="100vh"
        />
      </v-col>

      <!-- Right Panel: Login Form -->
      <v-col cols="12" md="4" class="d-flex align-center justify-center">
        <v-card flat class="pa-8" max-width="400" width="100%">
          <div class="text-center mb-6">
            <v-avatar size="100" class="mx-auto mb-4">
              <v-icon size="100">mdi-account-circle</v-icon>
            </v-avatar>
            <h3 class="font-weight-bold">เข้าสู่ระบบ</h3>
            <p class="text-subtitle-2">ยินดีต้อนรับสู่เว็บไซต์ Product Shop</p>
          </div>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              label="อีเมล :"
              v-model="email"
              placeholder="example@mail.com"
              type="email"
              variant="outlined"
              density="comfortable"
              class="mb-3"
            />
            <v-text-field
              label="รหัสผ่าน :"
              v-model="password"
              placeholder="password"
              type="password"
              variant="outlined"
              density="comfortable"
              class="mb-3"
            />
            <v-btn block color="indigo-lighten-1" class="mt-2" @click="handleLogin">
              เข้าสู่ระบบ
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../plugins/stores/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();

const handleLogin = () => {
  if (email.value === "admin" && password.value === "12345") {
    auth.setup("mock-token-xyz"); // บันทึก token ลง store
    router.push({ name: "home" }); // ไปหน้า Home
  } else {
    alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
