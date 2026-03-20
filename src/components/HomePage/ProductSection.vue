<script setup>
import Container from "@/components/Container.vue";
import ProductCard from "@/components/ProductCard.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const modules = [Navigation]

const porps = defineProps({
  slug: String,
  title: String,
  products: Array,
});
</script>
<!-- <template>
  <section class="py-5 lg:py-10 product-section">
    <Container>
      <div class="relative mb-5 lg:mb-10 text-center">
        <p class="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary">{{ title }}</p> 
        <RouterLink to="/products" class="text-[10px] text-primary underline">VIEW ALL</RouterLink>    
        <div
          class="absolute w-72 lg:w-[500px] flex left-1/2 -translate-x-1/2 right-0 top-[2px] lg:top-0  justify-between">
          <div :class="`${slug}-swiper-button-prev hover:bg-primary/20 rounded-full cursor-pointer`">
            <Icon class="lg:text-5xl text-3xl text-primary" name="prime:chevron-left" />
          </div>
          <div :class="`${slug}-swiper-button-next hover:bg-primary/20 rounded-full cursor-pointer`">
            <Icon class="lg:text-5xl text-3xl text-primary" name="prime:chevron-right" />
          </div>
        </div>

      </div>
      <div>
        <swiper :breakpoints="{
            '320': {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            '768': {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            '1024': {
                slidesPerView: 4,
                spaceBetween: 15,
                },
            }" :navigation="{
              nextEl: `.${slug}-swiper-button-next`,
              prevEl: `.${slug}-swiper-button-prev`,
            }" :modules="modules" class="mySwiper">
          <swiper-slide v-for="product in products" :key="product?.id">
            <ProductCard :product="product" />
          </swiper-slide>
        </swiper>
      </div>
    </Container>
  </section>`
</template> -->
<template>
  <section class="py-5 lg:py-10 product-section">
    <Container>
      <div class="relative mb-5 lg:mb-10 flex flex-col items-center">
        <div class="flex items-center lg:gap-2 gap-1 relative">
          <div :class="`${slug}-swiper-button-prev hover:bg-primary/20 rounded-full cursor-pointer`">
            <Icon class="lg:text-5xl text-3xl text-primary" name="prime:chevron-left" />
          </div>
          <p class="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary whitespace-nowrap lg:px-2 px-1">
            {{ title }} 
          </p>
          <div :class="`${slug}-swiper-button-next hover:bg-primary/20 rounded-full cursor-pointer`">
            <Icon class="lg:text-5xl text-3xl text-primary" name="prime:chevron-right" />
          </div>
        </div>
        <RouterLink to="/products" class="text-[10px] text-primary underline mt-1 text-center">
          VIEW ALL
        </RouterLink>
      </div>
      <div>
        <Swiper :breakpoints="{
          320: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
        }" :navigation="{
            nextEl: `.${slug}-swiper-button-next`,
            prevEl: `.${slug}-swiper-button-prev`,
          }" :modules="modules" class="mySwiper">
          <SwiperSlide v-for="product in products" :key="product?.id">
            <ProductCard :product="product" />
          </SwiperSlide>
        </Swiper>
      </div>
    </Container>
  </section>
</template>
