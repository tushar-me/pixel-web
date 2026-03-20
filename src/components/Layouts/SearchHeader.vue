<script setup>
import Container from "@/components/Container.vue";
import { useWishlistStore } from "@/stores/useWishlistStore.js";
import { inject, onMounted, ref, watch, computed } from 'vue';
import Icon from "@/components/Icon.vue";
import { RouterLink } from "vue-router";
import SubMenuBar from "@/components/Layouts/SubMenuBar.vue";
import { useAuthStore } from '@/stores/useAuthStore.js';
import { useApi } from "vue-laravel-sanctum";
import Pagination from "@/components/Pagination.vue";
import { useCartStore } from "@/stores/useCartStore.js";

const cartStore = useCartStore();
const { $api, loading } = useApi();
const wishlistStore = useWishlistStore();
const data = inject('data');
const authStore = useAuthStore();
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


// update cart quantity
const updateCartQuantity = async (item, action) => {
  await cartStore.updateQuantity(item, action);
};


//  Delete Cart Item
const deleteCartItem = async (item) => {
  await cartStore.removeFromCart(item.id, item.product_id, item.product_variant_price_id);
};

onMounted(() => {
  cartStore.fetchCartItems();
})

const userInitials = computed(() => {
  const name = authStore?.user?.user?.name || "";
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
});
</script>
<template>
  <section class="hidden lg:block w-full bg-white border-b border-gray-300">
    <Container>
      <div class="flex justify-between items-center py-3">
        <div>
          <button @click="isSearchBar = !isSearchBar" class="flex gap-1 items-center justify-center">
            <Icon name="hugeicons:search-01" class="text-2xl " />
            <span class="text-base">Search</span>
          </button>
        </div>
        <div class="flex items-center gap-5">
          <RouterLink to="/">
            <img class="w-44 h-auto  object-contain" :src="data?.logo_light" alt="">
          </RouterLink>
        </div>
        <div class="flex gap-2">

          <RouterLink v-if="authStore?.user?.user" to="/dashboard">
            <img v-if="authStore.user.user.image" :src="authStore.user.user.image" alt="User"
              class="w-9 h-9 rounded-full object-cover" />
            <div v-else
              class="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold uppercase">
              {{ userInitials }}
            </div>
          </RouterLink>
          <RouterLink v-else to="/login" class="">
            <svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" fill="none"
              xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="#000000" stroke-width="1.10" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
          </RouterLink>

          <!-- Cart Buttons -->
          <button @click="cartSideBar = !cartSideBar" class="flex items-center gap-2 px-1 py-1 relative">
            <span
              class="size-4 flex items-center text-xs justify-center bg-primary absolute rounded-full text-white -top-1 -right-1">
              {{ cartStore.totalItems }}
            </span>
            <img class="size-5" src="@/assets/images/cart.svg" alt="">
          </button>
          <!-- Cart Buttons end -->

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
      </div>
    </Container>
  </section>

  <section
    class="fixed  z-20 transition-all ease-in-out duration-300 bg-white w-[550px] overflow-y-scroll top-0 h-screen shadow"
    :class="{ 'right-0': isSearchBar, '-right-[550px]': !isSearchBar }">
    <div class="px-2">
      <button @click="isSearchBar = !isSearchBar" class="hover:rotate-90 transition-all ease-in-out duration-500">
        <Icon class="text-3xl text-primary" name="material-symbols:close" />
      </button>
      <div class="w-full">
        <div>
          <div class="relative">

            <input v-model="form.query" type="search" class="border border-primary pl-3 focus:outline-none  py-2 w-full"
              placeholder="Pixels Search Here" />
            <button
              class="absolute top-0 bottom-0 right-0 bg-primary border-none  hover:bg-secondary transition-all ease-in-out duration-500 h-[42px] px-2">
              <Icon name="heroicons:magnifying-glass" class="text-2xl top-8 right-8  text-white" />
            </button>
          </div>
        </div>

        <div v-if="isSearchBar">
          <div class="flex flex-col gap-2">
            <p v-if="!form?.query || form?.query.length < 3">
              Please enter at least 3 characters
            </p>
            <p v-else>
              Filtering for '{{ form?.query }}'
            </p>
            <!-- <p v-if="form?.query">Filtering for '{{form?.query}}'</p> -->
            <div class="flex gap-4 mt-3" v-if="loading" v-for="(item, i) in 10" :key="i">
              <div class="bg-slate-200 animate-pulse size-24 rounded-md"></div>
              <div>
                <div class="mb-3 w-60 h-5 bg-slate-200 animate-pulse rounded"></div>
                <div class="mb-1 w-28 h-5 bg-slate-200 animate-pulse rounded"></div>
              </div>
            </div>
            <RouterLink :to="`/product/${product?.slug}`" v-else class="w-full flex gap-2 hover:bg-slate-100 rounded-md"
              :key="product?.id" v-for="product in products?.data">
              <div class="size-24 object-contain rounded overflow-hidden">
                <img class="w-full h-full object-contain" :src="product?.cover_image_url">
              </div>
              <div class="w-full p-2">
                <h3 class="block text-xl font-normal">{{ product?.title }}</h3>
                <p class="text-sm font-bold">{{ data?.currency_symbol }}{{ product?.price }}</p>
              </div>
            </RouterLink>
            <Pagination :meta="products?.meta" @page-change="getProduct" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--  Cart  sideBar -->
  <div :class="{ 'right-0': cartSideBar, '-right-96': !cartSideBar }" class="fixed top-0  bottom-0 w-96 h-full z-40 transition-all
                    ease-in-out duration-500 bg-white text-white  shadow-lg">
    <div :class="{ 'right-0': cartSideBar, '-right-96': !cartSideBar }" class="transition-all
                    ease-in-out duration-500 flex justify-between px-4 py-2 bg-primary fixed z-50 top-0 w-96">
      <p class="text-2xl lg:text-3xl text-white font-medium">Cart</p>
      <button @click="cartSideBar = false">
        <Icon name="material-symbols:close-rounded" class="text-2xl " />
      </button>
    </div>

    <div class=" pt-14 overflow-y-scroll h-[90vh] pb-32">
      <div class="w-full mb-5" v-for="item in cartStore.cartItems"
        :key="item.product_id + '-' + (item.product_variant_price_id || 0)">
        <div class="w-full relative p-2 flex justify-between">
          <div class="w-1/4">
            <img class="w-full h-auto" :src="item?.cover_image" />
          </div>
          <div class="w-3/4 lg:flex justify-between pl-3">
            <div class="flex flex-col gap-2 w-full">

              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ item?.product?.title }}</p>
                  <p class="text-sm font-medium text-gray-800">TK.{{ item?.price }}</p>
                  <p class="text-xs text-gray-800" v-if="item?.design">Design: {{ item?.design }}</p>
                  <p class="text-xs text-gray-800" v-if="item?.color">Color: {{ item?.color }}</p>
                  <p class="text-xs text-gray-800" v-if="item?.size">Size: {{ item?.size }}</p>
                </div>
                <button @click="deleteCartItem(item)">
                  <Icon name="material-symbols:delete-outline" class="text-gray-500 text-xl" />
                </button>
              </div>
              <div class="flex justify-between items-center">
                <div class="w-32 h-5  flex  items-center">
                  <button @click="updateCartQuantity(item, 'decrease')"
                    class="text-black size-7 flex items-center justify-center">
                    <Icon name="ic:baseline-minus" />
                  </button>
                  <input type="text" class="cartinput size-6 text-black border-none text-center" :value="item?.quantity"
                    readonly />
                  <button @click="updateCartQuantity(item, 'increase')"
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
    <div v-if="cartStore.cartItems.length > 0" :class="{ 'right-0': cartSideBar, '-right-96': !cartSideBar }" class="transition-all
                    ease-in-out duration-500 w-96 bg-[#F6C2FF] fixed z-50 bottom-0">
      <div class="rounded-lg p-2 mb-2">
        <!--            <h2 class="text-lg text-black font-semibold">Overview</h2>-->
        <ul class="text-sm text-black font-sm">
          <li class="flex items-center justify-between">
            <p class="text-lg font-semibold text-gray-900">Total</p>
            <p class="flex flex-col text-lg font-semibold">
              TK. {{ cartStore.totalAmount }}
              <!-- <span class=" text-xs  text-gray-800 font-normal">Weight: 12.5kg</span> -->
            </p>
          </li>
          <li>
            <p class="text-xs text-bl text-center py-2">Shipping Charge will be calculated at Checkout</p>
          </li>
        </ul>
        <RouterLink to="/checkout" @click="cartSideBar = false"
          class="w-full block py-2 bg-primary text-white font-bold text-center ">Checkout
        </RouterLink>
      </div>
    </div>
  </div>

</template>