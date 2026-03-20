<template>
    <div class="flex justify-center p-2">
      <ul class="flex items-center gap-2">
        <li v-for="link in meta?.links" :key="link?.label">
          <button
            @click="$emit('page-change', extractPage(link.url))"
            class="size-5 text-sm lg:text-lg lg:size-8 border border-primary flex items-center justify-center text-primary"
            :class="{ 'bg-primary text-white': link.active }"
            v-html="link.label">
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineProps({
    meta: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['page-change']);
  
  const extractPage = (url) => {
    if (!url) return 1;
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : 1;
  };
  </script>
  