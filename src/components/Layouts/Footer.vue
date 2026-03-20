<script setup>
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
import { inject } from "vue";
const data = inject("data");
</script>

<template>
  <footer>
    <section class="h-auto bg-primary">
      <Container>
        <div class="">
          <div class="flex flex-wrap border-b border-primary py-7 lg:-mx-5">
            <div class="w-full lg:w-5/12 px-5 mb-5">
              <div class="flex flex-col gap-2 text-white">
                <p class="text-2xl font-bold">About Us</p>
                <p class="text-sm font-normal max-w-md">
                  Art is not always about pretty things. It is about who we are,
                  what happened to us and how our lives are affected.
                </p>
                <p class="text-sm font-normal max-w-md">
                  Pixels brings you the biggest collection of luxury stationery
                  in Bangladesh. We hope that our quality products and
                  consistent service will captivate every stationery lover,
                  artist, crafter, and aesthetic person.
                </p>
                <p class="text-sm font-normal max-w-md">
                  Delivering all over Bangladesh within 3 to 5 days.
                </p>
                <p class="text-sm font-normal">
                  License No.: TRAD/DNCC/076790/2022.<br />
                  Registered Address: 2, Outer Circular Road, Mogbazar, Dhaka 1217
                </p>
              </div>
            </div>
            <div class="w-full sm:w-1/2 lg:w-4/12 px-5 mb-5">
              <div class="text-white">
                <p class="text-2xl font-bold mb-4">Quick Links</p>
                <ul class="flex flex-col gap-3 text-sm font-normal" v-for="column in data?.footer_columns"
                  :key="column.id">

                  <li v-for="page in column?.pages || []" :key="page?.slug">
                    <RouterLink :to="`/${page.slug}`"
                      class="hover:text-secondary transition-all ease-in-out duration-500">
                      {{ page.title }}
                    </RouterLink>
                  </li>

                  <!-- <li>
                    <RouterLink to="/" class="hover:text-secondary transition-all ease-in-out duration-500">Terms
                      and Conditions
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/" class="hover:text-secondary transition-all ease-in-out duration-500">Privacy
                      Policy
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/" class="hover:text-secondary transition-all ease-in-out duration-500"> Return &
                      Refund Policy
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/" class="hover:text-secondary transition-all ease-in-out duration-500">
                      Shop
                    </RouterLink>
                  </li> -->

                </ul>
                <ul class="flex flex-col pt-3 text-sm font-normal">
                  <li>
                    <RouterLink to="/blogs" class="hover:text-secondary transition-all ease-in-out duration-500 ">
                      Blog
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>

            <!-- <div class="w-full flex flex-wrap p-4 gap-4">
              <div v-for="column in data?.footer_columns" :key="column.id"
                class="flex-1 min-w-[150px] lg:min-w-[200px] px-4">
                <div class="flex flex-col">
                  <div class="flex items-center gap-4 justify-center lg:justify-start">
                    <span class="flex-1 h-px bg-primary"></span>
                    <h4 class="text-sm font-semibold text-white whitespace-nowrap lg:text-base xl:text-lg">
                      {{ column?.title }}
                    </h4>
                    <span class="flex-1 h-px bg-primary"></span>
                  </div>

                  <ul class="mt-4 space-y-2">
                    <li v-for="page in column?.pages || []" :key="page?.slug">
                      <a :href="`/${page.slug}`" class="block hover:underline transition-all duration-300">
                        {{ page.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->

            <div class="w-full sm:w-1/2 lg:w-3/12 px-5">
              <div class="text-white">
                <p class="text-2xl font-bold mb-4">Customer Service</p>
                <div class="flex flex-col gap-3">
                  <RouterLink to="/contact" class="border border-white py-2 max-w-xs inline-block text-center">
                    Contact Us
                  </RouterLink>
                  <p class="text-sm font-medium">All Day : 11AM to 8PM</p>
                </div>
              </div>
              <div class="w-full lg:pl-0 pt-5">
                <p class="text-2xl font-bold text-white mb-2">Social Media</p>
                <ul class="flex items-center gap-3">
                  <li>
                    <a target="_blank" class="block" :href="data?.facebook_link">
                      <Icon name="gg:facebook" class="text-2xl text-white" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" class="block" :href="data?.instagram_link">
                      <Icon name="ri:instagram-line" class="text-2xl text-white" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" class="block" :href="data?.pinterest_link">
                      <Icon name="bx:bxl-pinterest-alt" class="text-2xl text-white" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" class="block" :href="data?.youtube_link">
                      <Icon name="tdesign:logo-youtube" class="text-2xl text-white" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" class="block" :href="`https://wa.me/${data?.whatsapp_number}`">
                      <Icon name="meteor-icons:whatsapp" class="text-2xl text-white" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class=" flex-wrap items-center justify-center">
            <div class="w-full text-center">
              <p class="text-2xl font-bold text-white mb-2">Payment Option</p>
              <img class="w-full max-w-5xl mx-auto" src="@/assets/images/SSL_logo.webp" alt="SSLCommerz"
                title="SSLCommerz" />
            </div>
            <!-- <div class="w-full lg:w-1/2 pl-5 lg:pl-0 mb-8 lg:mb-0">
              <div class="flex flex-col items-start justify-center ">
                <p class="text-2xl font-bold text-white mb-2">Payment Option</p>
                <div class="flex gap-2 hidden">
                  <RouterLink to="/">
                    <img class="w-14 h-auto" src="@/assets/images/COD.svg" alt="" />
                  </RouterLink>
                  <RouterLink to="/">
                    <img class="w-14 h-auto" src="@/assets/images/Bkash.svg" alt="" />
                  </RouterLink>
                  <RouterLink to="/">
                    <img class="w-14 h-auto" src="@/assets/images/nagad.svg" alt="" />
                  </RouterLink>
                  <RouterLink to="/">
                    <img class="w-14 h-auto" src="@/assets/images/Visa.svg" alt="" />
                  </RouterLink>
                  <RouterLink to="/">
                    <img class="w-14 h-auto" src="@/assets/images/Mastercard.svg" alt="" />
                  </RouterLink>
                </div>
              </div>
            </div> -->
            <!-- <a  target="_blank" href="https://www.sslcommerz.com/" title="SSLCommerz" alt="SSLCommerz"><img class="w-full max-w-5xl mx-auto" src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png" /></a> -->
            <!-- <img class="w-full max-w-5xl mx-auto" src="@/assets/images/SSL_logo.webp" alt="SSLCommerz"
              title="SSLCommerz" /> -->
          </div>
          <div class="flex flex-col gap-2 text-white justify-between items-center py-7">
            <p class="text-xs lg:text-sm">
              © 2025 PixelsUltra All Rights Reserved.
            </p>
            <p class="text-xs lg:text-sm 2">
              <a href="https://creativetechpark.com/">Development Company</a>
              Creative Tech Park.
            </p>
          </div>
        </div>
      </Container>
    </section>
  </footer>
</template>
