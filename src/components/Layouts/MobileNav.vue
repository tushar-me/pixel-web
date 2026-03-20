<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterLink } from "vue-router";
import Icon from "@/components/Icon.vue";
import Container from "@/components/Container.vue";
import SubMenuBar from "@/components/Layouts/SubMenuBar.vue";
import { Vue3Marquee } from 'vue3-marquee'
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
const modules = [Autoplay];
import { inject } from "vue";
import { useApi } from 'vue-laravel-sanctum';
import { useCartStore } from "@/stores/useCartStore.js";
import { useWishlistStore } from "@/stores/useWishlistStore.js";
import { useAuthStore } from "@/stores/useAuthStore.js";


const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const { $api, loading } = useApi();
const data = inject('data');
const toggleNav = ref(false);
const isSearchBar = ref(false);
const cartSideBar = ref(false);

const products = ref(null);
const form = ref({
  query: null
});

const getProduct = async (page) => {
  const response = await $api(`/api/frontend/v1/product?page=${page}`, {
    method: 'get',
    params: form.value
  });
  if (response) {
    products.value = response.data;
  }
}

// watch(form, getProduct, {deep:true})
watch(
  () => form.value.query,
  (newQuery) => {
    if (newQuery && newQuery.length >= 3) {
      getProduct(0)
    } else {
      products.value = null
    }
  }
)


onMounted(() => {
  cartStore.fetchCartItems();
})
</script>

<template>
  <!--  phone nav bar-->
  <section class="bg-[#D8B3D7] fixed lg:hidden w-full z-30 top-0 py-1 max-h-10">
    <Container>
      <swiper :centeredSlides="true" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="item in data?.header_marquee" :key="item?.id">
          <p class="text-center text-white font-normal text-sm">{{ item?.title }}</p>
        </swiper-slide>
      </swiper>
    </Container>
  </section>


  <nav class="lg:hidden z-30 fixed top-7 left-0 right-0 w-full bg-white px-5 border-b-2 ">
    <!--        menu & logo  -->
    <div class="flex items-center justify-between py-3">
      <div class="flex items-center justify-center gap-2">

        <button @click="toggleNav = !toggleNav">
          <!--            <Icon name="prime:bars" class="text-3xl text-black" />-->
          <img class="size-5" src="@/assets/images/menubar.svg" alt="">
        </button>


        <!--        Search Bar-->
        <button @click="isSearchBar = !isSearchBar">
          <Icon name="hugeicons:search-01" class="text-xl " />
        </button>
        <!--        search bar end-->

        <div :class="{ 'translate-x-0': toggleNav, '-translate-x-80': !toggleNav }" class="fixed top-0 left-0 bottom-0 w-80 h-full z-50 lg:hidden transition-all
                    ease-in-out duration-500 bg-primary text-white overflow-y-scroll shadow-lg">
          <div class="flex justify-between p-4">
            <RouterLink to="/">
              <img class="w-24 h-auto  object-contain" src="@/assets/images/logo-light.png" alt="">
            </RouterLink>
            <button @click="toggleNav = false">
              <Icon name="material-symbols:close-rounded" class="text-3xl " />
            </button>
          </div>

          <div class="py-3">
            <!-- <SubMenuBar /> -->
            <ul class="flex flex-col">
              <li>
                <RouterLink to="/products" class="text-sm uppercase p-2 px-5 block border-b border-white font-semibold">
                  All Products</RouterLink>
              </li>
              <li v-for="(category, index) in data?.all_parent_categories" :key="category?.id">
                <Accordion v-if="category?.children?.length > 0" value="0">
                  <template #collapseicon>
                    <i class="pi pi-minus"></i>
                  </template>
                  <template #expandicon>
                    <i class="pi pi-plus"></i>
                  </template>
                  <AccordionPanel :value="index">
                    <AccordionHeader>
                      <span class="text-sm uppercase block font-semibold">
                        {{ category?.name }}
                      </span>
                    </AccordionHeader>
                    <AccordionContent class="bg-primary">
                      <div class="flex flex-wrap ">
                        <div class="w-1/2 px-1 mb-2" v-for="item in category?.children" :key="item?.id">
                          <RouterLink :to="`/categories/${item?.slug}`"
                            class="flex items-center gap-2 bg-white py-2 px-1">
                            <img :src="item?.icon_url" class=" size-8 min-w-8 rounded-full object-cover" alt="">
                            <p class="text-xs font-medium uppercase text-primary">
                              {{ item?.name }}
                            </p>
                          </RouterLink>
                        </div>
                      </div>
                      <div class="flex justify-center">
                        <RouterLink :to="`/categories/${category?.slug}`"
                          class="text-white mx-auto underline text-xs pt-3">Discover All
                        </RouterLink>
                      </div>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
                <RouterLink v-else :to="`/categories/${category?.slug}`"
                  class="text-sm uppercase p-2 px-5 block border-b border-white font-semibold">{{ category?.name }}
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/blogs" class="text-sm uppercase p-2 px-5 block border-b border-white font-semibold">
                  blog</RouterLink>
              </li>
              <li>
                <RouterLink to="/dashboard"
                  class="text-sm uppercase p-2 px-5 block border-b border-white font-semibold">Dashboard
                </RouterLink>
              </li>
            </ul>

            <ul class="flex items-center justify-center gap-7 mt-9">
              <li>
                <a target="_blank" :href="data?.facebook_link">
                  <Icon name="gg:facebook" class="text-2xl text-white" />
                </a>
              </li>
              <li>
                <a target="_blank" :href="data?.instagram_link">
                  <Icon name="ri:instagram-line" class="text-2xl text-white" />
                </a>
              </li>
              <li>
                <a target="_blank" :href="data?.pinterest_link">
                  <Icon name="bx:bxl-pinterest-alt" class="text-2xl text-white" />
                </a>
              </li>
              <li>
                <a target="_blank" :href="data?.youtube_link">
                  <Icon name="tdesign:logo-youtube" class="text-2xl text-white" />
                </a>
              </li>
              <li>
                <a target="_blank" :href="`https://wa.me/${data?.whatsapp_number}`">
                  <Icon name="meteor-icons:whatsapp" class="text-2xl text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-5">
        <RouterLink to="/">
          <img class="w-24 h-auto  object-contain" src="@/assets/images/mainlogo.webp" alt="">
        </RouterLink>
      </div>
      <div class="flex items-center justify-center gap-2">
        <button @click="cartSideBar = !cartSideBar" class="flex items-center gap-2 px-1 py-1 relative">
          <span
            class="size-4 flex items-center text-xs justify-center bg-primary absolute rounded-full text-white -top-1 -right-1">
            {{ cartStore.totalItems }}
          </span>
          <img class="size-5" src="@/assets/images/cart.svg">
        </button>

        <RouterLink v-if="authStore?.user?.user" to="/wishlist" class="flex items-center gap-2 px-1 py-1 relative">
          <span
            class="size-4 flex items-center text-xs justify-center bg-primary absolute rounded-full text-white -top-1 -right-1">{{
              wishlistStore.itemsCount }}</span>
          <img class="size-5" src="@/assets/images/wishlist-icon.svg" alt="">
        </RouterLink>
        <RouterLink v-else to="/login" class="flex items-center gap-2 px-1 py-1 relative">
          <img class="size-5" src="@/assets/images/wishlist-icon.svg" alt="">
        </RouterLink>
      </div>
      <!--        cart sidebar-->
      <div :class="{ 'right-0': cartSideBar, '-right-80': !cartSideBar }" class="fixed top-0  bottom-0 w-80 h-full z-40 transition-all
                    ease-in-out duration-500 bg-white text-white overflow-y-scroll shadow-lg">
        <div :class="{ 'right-0': cartSideBar, '-right-80': !cartSideBar }" class="transition-all
                    ease-in-out duration-500 flex justify-between px-4 py-2 bg-primary fixed z-50 top-0 w-80">
          <p class="text-2xl lg:text-3xl text-white font-medium">Cart</p>
          <button @click="cartSideBar = false">
            <Icon name="material-symbols:close-rounded" class="text-2xl " />
          </button>
        </div>
        <div class="flex flex-wrap pt-14">
          <div class="w-full overflow-y-scroll" v-for="item in cartStore.cartItems"
            :key="item.product_id + '-' + (item.product_variant_price_id || 0)">
            <div class="w-full relative p-2 flex  justify-between  h-full">
              <div class="w-1/4 h-auto">
                <img class="w-full h-auto " :src="item?.cover_image" />
              </div>
              <div class="w-3/4 lg:flex justify-between pl-3">
                <div class="flex flex-col gap-6">
                  <div class="flex justify-between">
                    <div>
                      <p class="text-sm font-semibold text-gray-800">{{ item?.product?.title }}</p>
                      <p class="text-sm font-medium text-gray-800">TK.{{ item?.price }}</p>
                      <p class="text-xs text-gray-800" v-if="item?.design">Design: {{ item?.design }}</p>
                      <p class="text-xs text-gray-800" v-if="item?.color">Color: {{ item?.color }}</p>
                      <p class="text-xs text-gray-800" v-if="item?.size">Size: {{ item?.size }}</p>
                    </div>
                    <button @click="cartStore.removeFromCart(item.id, item.product_id, item.product_variant_price_id)">
                      <Icon name="material-symbols:delete-outline" class="text-gray-500 text-xl" />
                    </button>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="w-32 h-5  flex  items-center">
                      <button @click="cartStore.updateQuantity(item, 'decrease')"
                        class="text-black size-7 flex items-center justify-center">
                        <Icon name="ic:baseline-minus" />
                      </button>
                      <input type="text" class="cartinput size-6 text-black border-none text-center"
                        :value="item?.quantity" readonly />
                      <button @click="cartStore.updateQuantity(item, 'increase')"
                        class="text-black size-7 flex items-center justify-center">
                        <Icon name="material-symbols:add" />
                      </button>
                    </div>
                    <p class="text-sm font-semibold text-gray-800 ">
                      <!--                  <span  class="hidden lg:block absolute px-1 bg-primary text-white text-xs font-normal rounded top-16  right-0">5items</span>-->
                      TK. {{ item?.price * item?.quantity }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="cartStore.totalItems > 0" :class="{ 'right-0': cartSideBar, '-right-80': !cartSideBar }" class="transition-all
                    ease-in-out duration-500 w-80 bg-[#F6C2FF] fixed z-50 bottom-0">
          <div class="rounded-lg p-2 mb-2">
            <!--            <h2 class="text-lg text-black font-semibold">Overview</h2>-->
            <ul class="text-sm text-black font-sm">
              <li class="flex items-center justify-between">
                <p class="text-lg font-semibold text-gray-900">Total</p>
                <p class="flex flex-col text-lg font-semibold">
                  TK. {{ cartStore.totalAmount }}
                  <!-- <span class=" text-xs  text-gray-800 font-normal">Weight: 12.5kg</span>  -->
                </p>
              </li>
              <li>
                <p class="text-xs text-bl text-center py-1">Shipping Charge will be calculated at Checkout</p>
              </li>
            </ul>
            <RouterLink to="/checkout" class="w-full block py-2 bg-primary text-white font-bold text-center ">Checkout
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <section
    class=" lg:hidden fixed top-0 bottom-0 z-40 transition-all ease-in-out duration-300 bg-white w-full  h-screen shadow"
    :class="{ 'left-0': isSearchBar, '-left-[1000px]': !isSearchBar }">
    <div class="p-2">
      <div class="w-full">
        <div class="flex items-center gap-1">
          <div class="relative w-full">
            <input v-model="form.query" type="search"
              class="border border-primary  shadow-lg pl-2 focus:outline-none  py-2 w-full"
              placeholder="Pixels Search Here" />
            <button
              class="absolute top-0 bottom-0 right-0 bg-primary border-none  hover:bg-secondary transition-all ease-in-out duration-500 h-[42px] px-2">
              <Icon name="heroicons:magnifying-glass" class="text-2xl top-8 right-8  text-white" />
            </button>
          </div>
          <button @click="isSearchBar = false">
            <Icon name="material-symbols:close-rounded" class="text-3xl" />
          </button>
        </div>

        <div v-if="isSearchBar">
          <div class="flex flex-col gap-2 mt-4">
            <p v-if="!form?.query || form?.query.length < 3">
              Please enter at least 3 characters
            </p>
            <p v-else>
              Filtering for '{{ form?.query }}'
            </p>
            <!-- <p v-if="form?.query">Filtering for '{{form?.query}}'</p> -->
            <div class="flex gap-4" v-if="loading" v-for="(item, i) in 10" :key="i">
              <div class="bg-slate-200 animate-pulse w-16 h-14 rounded-md"></div>
              <div>
                <div class="mb-3 w-60 h-3 bg-slate-200 animate-pulse rounded"></div>
                <div class="mb-1 w-28 h-3 bg-slate-200 animate-pulse rounded"></div>
              </div>
            </div>

            <!-- <RouterLink :to="`/product/${product?.slug}`" v-else
              class="w-full flex gap-2 hover:bg-slate-100 rounded-md " :key="product?.id"
              v-for="product in products?.data">
              <RouterLink :to="`/product/${product?.slug}`" class="min-w-14 max-w-14 h-14 rounded overflow-hidden">
                <img class="w-full h-full object-contain" :src="product?.cover_image_url">
              </RouterLink>
              <div class="w-full">
                <RouterLink :to="`/product/${product?.slug}`" class="block text-sm font-normal">{{product?.title}}
                </RouterLink>
                <p class="text-sm font-bold">{{data?.currency_symbol}}{{product?.price}}</p>
              </div>
            </RouterLink> -->


            <!-- <div class="h-screen  overflow-y-auto space-y-2  pb-2">
              <div :key="product?.id" v-for="product in products?.data"
                class="w-full flex gap-2 hover:bg-slate-100 rounded-md">
                <RouterLink :to="`/product/${product?.slug}`" class="min-w-14 max-w-14 h-14 rounded overflow-hidden">
                  <img class="w-full h-full object-contain" :src="product?.cover_image_url">
                </RouterLink>
                <div class="w-full">
                 <!-- // {{ product.id }}

            <RouterLink :to="`/product/${product?.slug}`" class="block text-sm font-normal">
              {{ product?.title }}
            </RouterLink>
            <p class="text-sm font-bold">
              {{ data?.currency_symbol }}{{ product?.price }}
            </p>
          </div>
        </div>
      </div> -->

            <div class="max-h-screen overflow-y-auto pb-24">
              <div v-for="product in products?.data" :key="product?.id"
                class="w-full flex gap-2 hover:bg-slate-100 rounded-md mb-2">
                <RouterLink :to="`/product/${product?.slug}`" class="min-w-14 max-w-14 h-14 rounded overflow-hidden">
                  <img class="w-full h-full object-contain" :src="product?.cover_image_url" />
                </RouterLink>
                <div class="w-full">
                  <RouterLink :to="`/product/${product?.slug}`" class="block text-sm font-normal">
                    {{ product?.title }}
                  </RouterLink>
                  <p class="text-sm font-bold">
                    {{ data?.currency_symbol }}{{ product?.price }}
                  </p>
                </div>
              </div>
            </div>



            <!-- ? <Pagination :meta="products?.meta" @page-change="getProduct" /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  phone nav bar end-->
</template>
