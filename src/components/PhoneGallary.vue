<template>
  <div>
    <Swiper
        :style="{
                '--swiper-navigation-color': '#000',
                '--swiper-pagination-color': '#000',
              }"
        :loop="true"
        :spaceBetween="10"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="mySwiper2"
    >
    <SwiperSlide>   
      <img class="w-full h-auto object-cover pb-2" :src="coverImg" />
    </SwiperSlide>
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <img class="w-full h-auto object-cover" :src="image?.image_url" />
    </SwiperSlide>
    </Swiper>
    <Swiper
        @swiper="setThumbsSwiper"
        :loop="true"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :modules="modules"
        class="mySwiper px-2"
    >
    <SwiperSlide>
      <img :src="coverImg"
          class="w-full h-auto  object-cover border border-gray-300 shadow-sm cursor-pointer"
      />
    </SwiperSlide>
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <img :src="image?.image_url"
          class="w-full h-auto object-cover border border-gray-300 shadow-sm cursor-pointer"
      />
    </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '@websitebeaver/vue-magnifier/styles.css'
import InnerImageZoom from 'vue-inner-image-zoom';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const modules  = [FreeMode, Navigation, Thumbs];
const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

defineProps({
  images:{
    type:Array,
    required:true
  },
  coverImg:String,
})
</script>