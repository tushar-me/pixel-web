
<script setup  >
import { Swiper, SwiperSlide } from 'swiper/vue';
import {Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { inject } from 'vue';
const data = inject('data');

const props = defineProps({
  categories: Array
})

const modules  = [ Autoplay];
</script>

<template>
  <section class="category ">
    <!-- <Container> -->
      <Swiper
          :breakpoints="{
                  '320': {
                      slidesPerView:4,
                      spaceBetween: 10,
                  },
                  '768': {
                      slidesPerView: 6,
                      spaceBetween: 10,
                  },
                  '1024': {
                      slidesPerView:8,
                      spaceBetween: 10,
                  },
              }"
          :modules="modules"
          class="mySwiper"
      >
        <SwiperSlide v-for="item in categories" :key="item?.id">
          <div class="flex flex-col items-center justify-center">
            <RouterLink :to="`/categories/${item?.slug}`" class="bg-white size-20 lg:size-32  p-1 lg:p-2 shadow-lg mt-2 rounded-full">
              <img class="w-full h-full object-cover rounded-full" :src="item?.icon_url" alt="" />
            </RouterLink>
            <p class="text-sm lg:text-base text-primary">{{ item?.name }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    <!-- </Container> -->
  </section>
</template>