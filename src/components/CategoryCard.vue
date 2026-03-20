
<script setup  >
const props = defineProps({
  category: Object,
})
</script>

<template>
    <RouterLink :to="`/categories/${category?.slug}`" class="relative block">
        <img class="w-full h-auto"
             :src="category?.icon_url" :alt="category?.name">
        <h2 class="absolute bottom-5 left-5 text-4xl text-white font-medium"> {{ category?.name }}</h2>
    </RouterLink>
</template>