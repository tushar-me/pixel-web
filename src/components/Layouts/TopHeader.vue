<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
const modules = [Autoplay];
import { inject } from "vue";
const data = inject('data');
</script>
<template>
  <!-- #D17CA6 -->
  <section class="bg-[#D8B3D7] hidden lg:block py-2">
    <Container>
      <swiper :centeredSlides="true" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="item in data?.header_marquee" :key="item?.id">
          <p class="text-center text-black font-medium">{{ item?.title }}</p>
        </swiper-slide>
      </swiper>
    </Container>
  </section>
</template>