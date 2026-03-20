<script setup>
const props = defineProps({
data:Object
})
</script>

<template>
    <div class="shadow-lg rounded-md border border-gray-400">
      <RouterLink :to="`/shop/${data?.slug}`" class="relative block p-4">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="absolute top-2 right-2 text-blue-500 " height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></svg>
        <img class="w-full h-auto object-contain  rounded-lg" :src="data?.logo_url" alt="">
      </RouterLink>
      <div class="px-4 py-5 border-t">
          <ul class="flex flex-col gap-3">
            <li class="text-xs text-gray-400">{{data?.bio}}</li>
            <li class="text-xs lg:text-sm text-black"><RouterLink to="/vendor">{{data?.name}}</RouterLink></li>
          </ul>
      </div>
    </div>
</template>