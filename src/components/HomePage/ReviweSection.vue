<script setup>
import 'swiper/css';
import 'swiper/css/navigation';
import moment from 'moment';
import { inject } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";

const data = inject('data');
</script>
<template>
  <section id="client_reviews" class="mb-5 bg-primary py-10">
    <Container>
      <div>
        <div class="pb-4 flex justify-between  flex-wrap lg:gap-4">
          <h2 class="text-3xl sm:text-5xl font-normal pb-10 text-white">Your opinion matters</h2>
          <div class="flex lg:gap-3">
            <div class="review-swiper-button-prev  cursor-pointer lg:p-2 pt-2">
              <Icon class="lg:text-3xl text-2xl text-white" name="prime:chevron-left" />
            </div>
            <div class="review-swiper-button-next   cursor-pointer lg:p-2 pt-2">
              <Icon class="lg:text-3xl text-2xl text-white" name="prime:chevron-right" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <h4 class="text-xl font-medium text-white">
              {{ Number(data?.average_rating).toFixed(2) }}
            </h4>
            <span class="flex items-center gap-1">
              <Icon v-for="star in 5" :key="star" class="text-lg text-amber-500"
                :name="Number(data?.average_rating) >= star ? 'carbon:star-filled' : 'carbon:star'" />
            </span>
          </div>
        </div>

        <p class="text-white text-sm lg:text-base pt-2">
          Excellent - {{ data?.all_reviews?.length }} Reviews
        </p>

        <Swiper :modules="[Navigation]" :navigation="{
          nextEl: '.review-swiper-button-next',
          prevEl: '.review-swiper-button-prev'
        }" :breakpoints="{
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 15 }
          }" class="mySwiper pt-5">
          <SwiperSlide v-for="(review, index) in data?.all_reviews" :key="review?.id || index">
            <div class="bg-white shadow">
              <img class="w-full h-auto" :src="review?.image_url" />
              <div class="mb-1 p-2 lg:p-3">
                <h3 class="text-base font-bold">{{ review?.author_name }}</h3>
                <span class="flex items-center gap-1">
                  <Icon v-for="star in 5" :key="star" class="text-lg text-amber-500"
                    :name="review?.rating >= star ? 'carbon:star-filled' : 'carbon:star'" />
                </span>
                <p class="text-sm font-normal text-gray-600 py-1 block">
                  {{ moment(review?.created_at).format('MMMM Do YYYY') }}
                </p>
                <div class="text-xs lg:text-base">{{ review?.review }}</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- More Reviews Button -->
        <div class="flex items-center justify-center pt-5 sm:pt-10">
          <RouterLink to="/reviews" class="inline-block px-5 text-sm text-white p-4 border border-white">
            More Reviews
          </RouterLink>
        </div>
      </div>
    </Container>
  </section>
</template>
