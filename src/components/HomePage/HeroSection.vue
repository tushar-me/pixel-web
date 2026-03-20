
<script setup  >
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { inject } from 'vue';
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';


const modules = [EffectFade, Navigation, Pagination, Autoplay]
const data = inject('data');
</script>

<template>
  <section class="">
    <swiper
        :spaceBetween="30"
        :effect="'fade'"
        :navigation="false"
        :pagination="{
          clickable: true,
        }"
        :speed= "1500"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="slider in data?.hero_slider" :key="slider?.id">
        <RouterLink :to="slider?.url" class="w-full block">
          <img class="w-full h-auto" :src="slider?.image_url" />
        </RouterLink>
      </swiper-slide>
    </swiper>
  </section>
</template>

