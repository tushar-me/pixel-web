
<script setup  >
  const props = defineProps({
    blog: Object,
  })
</script>

<template>

    <div class="shadow-lg h-full">
      <RouterLink :to="`/blog/${blog?.slug}`">
        <img class="w-full h-auto" :src="blog?.blog_image_url" :alt="blog?.title">
      </RouterLink>
      <div class="p-1 lg:p-3">
<!--        <p class="text-xs text-gray-500">2025-01-15</p>-->
        <RouterLink :to="`/blog/${blog?.slug}`" class="text-base lg:text-xl font-medium hover:underline  mb-2 lg:mb-3">{{ blog?.title}}</RouterLink>
        <p class="text-sm text-gray-500 mb-2" v-html="blog?.content?.substring(0,100)"></p>
        <RouterLink :to="`/blog/${blog?.slug}`" class="text-xs lg:text-sm hover:underline  text-primary">
          CONTINUE READING
        </RouterLink>
      </div>

    </div>
</template>