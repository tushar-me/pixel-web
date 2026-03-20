<script setup>
const props = defineProps({
  data: Object
})
</script>

<template>
  <div class="relative group">
    <div class="relative overflow-hidden">
      <div class="h-auto w-full ">
        <img class="w-full h-full object-cover" :src="data?.cover_image"  alt="">
      </div>
      <div class="flex flex-col gap-4 absolute  right-2 lg:-right-10  top-3 lg:group-hover:right-3 transition-all ease-in-out duration-500">
        <RouterLink to="/" class="bg-[#F6F6F3] p-1 block rounded-full">
          <Icon name="material-symbols:close-small" class="text-[#231F20] text-2xl lg:text-3xl" />
        </RouterLink>
      </div>
      <div class="flex flex-col gap-4 absolute  right-2 lg:-right-10 bottom-3 lg:group-hover:right-3 transition-all ease-in-out duration-500">
        <RouterLink :to="`/product/${data?.slug}`"  class="bg-[#F6F6F3] p-1 block rounded-lg">
          <img class="size-5" src="@/assets/images/cart.svg" alt="">
<!--          <Icon name="hugeicons:shopping-bag-03" class="text-[#231F20] text-2xl lg:text-3xl" />-->
        </RouterLink>
      </div>
    </div>


    <div class="flex flex-col gap-1 bg-white p-2 text-center">
      <p class="text-sm text-gray-500">{{ product?.category }}</p>
      <RouterLink to="/product" class="text-xl lg:text-2xl font-normal text-primary">
        <h2>{{ data?.title }}</h2>
      </RouterLink>
      <p class="text-sm  text-primary">{{ data?.price }}</p>
    </div>
  </div>
</template>