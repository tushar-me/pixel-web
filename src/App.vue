<template>
  <router-view :key="routeKey"></router-view>
</template>
<script setup>
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import {useAuthStore} from '@/stores/useAuthStore.js';

  const authStore = useAuthStore();
  const route = useRoute();
  const routeKey = computed(() => route.path + '-' + JSON.stringify(route.query));
  onMounted(() => {
    authStore.fetchUser()
  })
</script>
<style>
:root {
  --toastify-icon-color-success: #4C2746!important;
  --toastify-color-progress-success: #4C2746!important;
}
</style>

<!-- <template>
  <Preloader v-if="loading" />
  <router-view v-else :key="routeKey" />
</template>
<script setup>
import Preloader from "@/components/Preloader.vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const authStore = useAuthStore();
const route = useRoute();
const routeKey = computed(() => route.fullPath);
const loading = ref(true);
onMounted(() => {
  authStore.fetchUser();
  setTimeout(() => {
    loading.value = false;
  }, 5000);
});
</script>
<style>
:root {
  --toastify-icon-color-success: #4C2746!important;
  --toastify-color-progress-success: #4C2746!important;
}
</style> -->