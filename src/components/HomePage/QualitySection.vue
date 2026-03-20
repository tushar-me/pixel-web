<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

// import required modules
import { Scrollbar,Navigation } from 'swiper/modules';

const modules = [Scrollbar, Navigation]

import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
</script>

<template>
    <section class="bg-[#D8B3D7] py-8 lg:py-16">
       <Container>
         <div class="">
           <h2 class="text-3xl sm:text-5xl font-normal pb-10">Highest standards, No compromises</h2>
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
                slidesPerView: 4,
                spaceBetween: 15,
                },
            }"

               :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
               :scrollbar="{
                hide: true,
            }"

               :modules="modules"
               class="mySwiper"
           >
             <swiper-slide>
               <div class=" mb-6">
                 <img class="size-7 mb-3" src="@/assets/images/fixed1.svg" alt="">
                 <p class="text-lg mb-2 font-normal">Origin & Quality</p>
                 <p class="text-[11px] lg:text-sm ">
                   We source the best stationeries
                   from Brands accross the world.
                 </p>
               </div>
             </swiper-slide>
             <swiper-slide>
               <div class=" mb-6">
                 <img class="size-7 mb-3" src="@/assets/images/fixed2.svg" alt="">
                 <p class="text-lg mb-2 font-normal">Design & Artistry</p>
                 <p class="text-[11px] lg:text-sm ">
                   Aesthetic collection to quench
                   your thirst as a stationery enthusiast
                 </p>
               </div>
             </swiper-slide>
             <swiper-slide>
               <div class=" mb-6">
                 <img class="size-7 mb-3" src="@/assets/images/fixed3.svg" alt="">
                 <p class="text-lg mb-2 font-normal">Variety & Choice</p>
                 <p class="text-[11px] lg:text-sm ">
                   Choose from a wide array
                   of unique products.
                 </p>
               </div>
             </swiper-slide>
             <swiper-slide>
               <div class=" mb-6">
                 <img class="size-7 mb-3" src="@/assets/images/fixed4.svg" alt="">
                 <p class="text-lg mb-2 font-normal">Service & Experience</p>
                 <p class="text-[11px] lg:text-sm ">
                   Shop with ease and get a
                   premium customer service
                 </p>
               </div>
             </swiper-slide>
           </swiper>
<!--           <div class="flex flex-wrap">-->
<!--             <div class="w-1/2 lg:w-1/4 " v-for="item in 4">-->
<!--               <div class="flex flex-col gap-1">-->

<!--               </div>-->
<!--             </div>-->

<!--           </div>-->
         </div>
       </Container>
    </section>
</template>