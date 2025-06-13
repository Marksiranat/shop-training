<template>
  <v-app>
    <v-toolbar height="80" color="indigo-lighten-1" dark>
      <v-toolbar-title class="text-h4" ><v-icon>mdi mdi-alphabet-piqad</v-icon>M&P</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-toolbar>

    <v-main>
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

const icons = ref(["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]);
</script>
