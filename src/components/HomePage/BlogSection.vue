<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import {inject} from 'vue';

const modules = [Navigation]

import Container from "@/components/Container.vue";
import BlogCard from "@/components/BlogCard.vue";

const data = inject('data')
</script>

<template>
  <section class="py-5 lg:py-10 product-section h-full">
    <Container>
      <div class="relative mb-5 lg:mb-10 text-center">
        <p class="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary">Blogs</p>
        <RouterLink to="/blogs" class="text-[10px] text-primary underline">
          VIEW ALL
        </RouterLink>
        
      </div>

      <div>
        <swiper
            :breakpoints="{
            '320': {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            '768': {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            '1024': {
                slidesPerView: 3,
                spaceBetween: 15,
                },
            }"

            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"

            :modules="modules"
            class="mySwiper py-5"
        >
          <swiper-slide v-for="item in data?.home_blogs" :key="item?.id">
            <BlogCard :blog="item" />
          </swiper-slide>
        </swiper>

      </div>
    </Container>
  </section>
</template>

<style scoped>
.swiper-slide{
  height: unset;
  min-height: 100%;
}
</style>
