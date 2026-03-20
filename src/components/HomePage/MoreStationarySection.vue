<script setup>
import 'swiper/css';
import 'swiper/css/scrollbar';
// import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Container from "@/components/Container.vue";

import {inject} from 'vue';

const data = inject('data');
</script>

<template>
    <section class=" my-5 lg:my-10 hidden lg:block">
        <Container>
          <div>
            <h3 class="text-5xl font-medium mb-1 ">More than just stationeries</h3>
            <p class="lg:text-base py-2">Wide range of gifts & collectibles</p>
          </div>
          <Swiper
              :breakpoints="{
                    '320': {
                        slidesPerView:2,
                        spaceBetween:3,
                    },
                    '768': {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    '1024': {
                        slidesPerView: 6,
                        spaceBetween: 0,
                        },
                    }"

              class="mySwiper pt-4">
            <SwiperSlide v-for="category in data?.stationary_categories" :key="category?.id">
                <RouterLink :to="`/categories/${category?.slug}`"  class=" relative  bg-stone-100 h-72 block  overflow-hidden">
                    <img class="w-full h-full object-cover hover:scale-110 transition-all ease-in-out duration-500"
                         :src="category?.icon_url">
                    <p class="absolute top-3 left-3 text-sm lg:text-base font-semibold">{{ category?.name }}</p>
                </RouterLink>
            </SwiperSlide>

          </Swiper>
        </Container>
    </section>
  <section class="lg:hidden">
    <Container>
      <div>
        <h3 class="text-4xl font-medium mb-1 ">More Than Just Stationeries</h3>
        <p class="text-base">Wide range of gifts & collectibles</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
        <RouterLink :to="`/categories/${category?.slug}`"  class="relative  bg-gray-700 h-60 overflow-hidden"  v-for="category in data?.stationary_categories" :key="category?.id">
          <img class="w-full h-full object-cover" :src="category?.icon_url" />
          <p class="absolute top-3 left-3 text-base font-semibold">{{ category?.name }}</p>
        </RouterLink>
      </div>
    </Container>
  </section>
</template>