<template>
  <v-card class="ma-auto" width="900">
    <v-row>
      <v-col cols="12" md="6">
        <div class="test text-h1">Variable</div>
      </v-col>
      <v-col cols="12" md="6"><div class="test-mixin text-h1">test-mixin</div></v-col>
    </v-row>
  </v-card>
  <br />
  <v-card
    class="mx-auto"
    prepend-icon="$vuetify"
    subtitle="The #1 Vue UI Library"
    width="400"
  >
    <template v-slot:title>
      <span class="font-weight-black">Welcome to Vuetify</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis
      quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni
      doloremque veniam neque porro libero rerum unde voluptatem!
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.test {
  background-color: $error;
}
.test-mixin {
  @include gradient($primary, $error);
}
</style>
