<script setup>
import {onMounted, inject} from 'vue';
import {useWishlistStore} from '@/stores/useWishlistStore.js';
import AppLayout from "@/components/Layouts/AppLayout.vue";
import Container from "@/components/Container.vue";
import PolicySection from "@/components/HomePage/PolicySection.vue";
import {useAuthStore} from '@/stores/useAuthStore.js';
import {useCartStore} from '@/stores/useCartStore.js';
import { useApi } from 'vue-laravel-sanctum';
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();
const {$api, loading} = useApi();
const cartStore = useCartStore();

const data = inject('data');
// update cart quantity
const update = async (item) => {

	const response = await $api(`/api/frontend/v1/cart/${item?.id}`,
  {
		method: 'post',
     headers: {
            authorization: `Bearer ${authStore?.user?.token}`,
        },
		params: {
			_method: 'PUT',
      type: 'wishlist_to_cart'
		}
	});
	if (response) {
		cartStore.fetchCartItems()
		wishlistStore.fetchWishlistItems()
	}
};


//  Delete Cart Item
const deleteItem = async (id) => {
        try {
            const response = await $api(`/api/frontend/v1/cart/${id}`, {
              method: 'DELETE',
              headers: {
                  authorization: `Bearer ${authStore?.user?.token}`,
              }
            });
            if (response) {
              wishlistStore.fetchWishlistItems();
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
onMounted(() => {
  wishlistStore.fetchWishlistItems();
})
</script>

<template>
    <AppLayout>
      <section class="mb-10">
        <div class="mb-4">
          <img class="w-full h-auto " src="@/assets/images/wishlist-banner.png" alt="Wishlist">
        </div>
        <Container>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="relative group" v-for="item in wishlistStore?.items" :key="item?.id">
              <div class="relative overflow-hidden">
                <RouterLink :to="`/product/${item?.product?.slug}`" class="h-auto w-full block">
                  <img class="w-full h-full object-cover" :src="item?.cover_image"  alt="">
                </RouterLink>
                <div class="flex flex-col gap-4 absolute  right-2 lg:-right-10  top-3 lg:group-hover:right-3 transition-all ease-in-out duration-500">
                  <button @click="deleteItem(item?.id)" class="bg-[#F6F6F3] p-1 block rounded-full">
                    <Icon name="material-symbols:close-small" class="text-[#231F20] text-2xl lg:text-3xl" />
                  </button>
                </div>
                <div class="flex flex-col gap-4 absolute  right-2 lg:-right-10 bottom-3 lg:group-hover:right-3 transition-all ease-in-out duration-500">
                  <button @click="update(item)"  class="bg-[#F6F6F3] p-1 block rounded-lg">
                    <img class="size-5" src="@/assets/images/cart.svg" alt="">
                  </button>
                </div>
              </div>
          
          
              <div class="flex flex-col gap-1 bg-white p-2 text-center">
                <p class="text-[10px] sm:text-xl lg:text-sm text-gray-500">{{ item?.product?.category?.name }}</p>
                <RouterLink :to="`/product/${item?.product?.slug}`"  class="text-sm sm:text-xl lg:text-2xl font-medium text-primary">
                  <h2>{{ item?.title }}</h2>
                </RouterLink>
                <p class="text-lg sm:text-xl text-primary">{{data?.currency_symbol}} {{ item?.price }}</p>
              </div>
            </div>
          </div>

          <!-- <div class="p-5">
            <div class="flex justify-center">
              <ul class="flex items-center gap-3">
                <li  v-for="link in 4">
                  <button
                      class="size-8 border border-primary flex items-center justify-center">
                  </button>
                </li>
              </ul>
            </div>
          </div> -->
        </Container>
      </section>
      <PolicySection />
    </AppLayout>
</template>