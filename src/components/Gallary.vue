<template>
  <div class="flex gap-3 product">
    <div class="w-20 md:h-[400px] lg:h-[580px] overflow-hidden">
      <Swiper
          @swiper="setThumbsSwiper"
          :loop="true"
          :direction="'vertical'"
          :spaceBetween="3"
          :slidesPerView="6"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper flex flex-col items-center overflow-hidden"
      >
      <SwiperSlide style="height:90px">
        <img :src="coverImg"
            class="w-full h-auto object-cover  border border-gray-300 shadow-sm cursor-pointer"
        />
      </SwiperSlide>
      <SwiperSlide style="height:90px" v-for="(image, index) in images" :key="index">
        <img :src="image?.image_url"
            class="w-full h-auto object-cover border border-gray-300 shadow-sm cursor-pointer"
        />
      </SwiperSlide>
      </Swiper>
    </div>
    <Swiper 
        :loop="true"
        :spaceBetween="10"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="mySwiper2 flex-1">
      <SwiperSlide>
        <img class="w-full h-auto object-cover" :src="coverImg">       
      </SwiperSlide>
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <img class="w-full h-auto object-cover" :src="image?.image_url">       
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import InnerImageZoom from 'vue-inner-image-zoom';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
const modules = [FreeMode, Navigation, Thumbs];
const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
// Define Props
defineProps({
  coverImg: String,
  images: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped>
.mySwiper {
  height: 629px;
}
</style>