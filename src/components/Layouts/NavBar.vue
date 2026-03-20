<script setup>
import Container from "@/components/Container.vue";
import {inject} from 'vue';
const data = inject('data');
import {ref} from 'vue';

const selectedCategory = ref(null);
</script>
 
<template>
  <nav class="bg-primary relative hidden lg:block">
      <Container>
        <ul class="flex justify-center items-center text-white text-sm">
          <li>
            <RouterLink to="/products" class="block tracking-wide p-4">All PRODUCTS</RouterLink>
          </li>
          <li class="uppercase group">
            <div class="block tracking-wide p-4">Categories</div>
            <div class="absolute bg-white p-4 left-0 right-0 px-10 -z-40 group-hover:z-40 top-20 group-hover:top-12 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-lg">
              <div class="flex w-full flex-wrap min-h-[450px] h-auto">
                <div class="flex flex-wrap w-4/5">
                  <div class="w-1/5 mb-5 px-3" @mouseenter="selectedCategory = category" v-for="category in data?.all_parent_categories" :key="category?.id">
                  <div class="">
                    <RouterLink :to="`/categories/${category?.slug}`" class="text-lg font-semibold py-2 text-primary hover:underline">{{category?.name}}</RouterLink>
                    <ul class="flex flex-col gap-2 text-sm font-normal text-gray-700 mt-4">
                      <li v-for="child in category?.children" :key="`/child-${child?.id}`">
                        <RouterLink @mouseenter="selectedCategory = child" :to="`/categories/${child?.slug}`" class="text-primary font-semibold text-sm hover:underline">{{ child?.name }}</RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
                <div class="w-1/5">
                  <RouterLink v-if="selectedCategory" :to="`/categories/${selectedCategory?.slug}`" class="flex flex-col items-center text-black">
                    <img class="w-60 h-64" :src="selectedCategory?.icon_url" alt="">
                    <h2 class="text-lg font-medium py-2 text-gray-700">{{ selectedCategory?.name }}</h2>
                  </RouterLink>
                  <RouterLink v-else-if="data?.all_categories?.length > 0" :to="`/categories/${data?.all_categories[0]?.slug}`" class="flex flex-col items-center text-black"> -->
                    <img class="w-60 h-64" :src="data?.all_categories[0]?.icon_url">
                    <h2 class="text-lg font-medium py-2 text-gray-700">{{ data?.all_categories[0]?.name }}</h2>
                   </RouterLink>
                </div>
              </div>
            </div>
          </li>
          <li class="uppercase" v-for="category in data?.header_categories" :key="category?.id">
            <RouterLink :to="`/categories/${category?.slug}`" class="block tracking-wide p-4"> {{ category?.name }}</RouterLink>
          </li>
        </ul>
      </Container>
  </nav>
</template>