<script setup>
import { useWishlistStore } from '@/stores/useWishlistStore.js'
import { computed } from 'vue'

const props = defineProps({
  product: Object,
})

const wishlistStore = useWishlistStore()

const isProductInWishlist = computed(() => {
  return wishlistStore.getWishlistItems?.some(
    item => item.id === props.product?.id
  )
})

const trackSelectItem = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "select_item",
    ecommerce: {
      item_list_id: "product_card",
      item_list_name: "Product Card",
      items: [
        {
          item_id: props.product?.id,
          item_name: props.product?.title,
          price: props.product?.discount_price || props.product?.price,
          item_brand: props.product?.brand?.name || "Pixels",
          item_category: props.product?.category?.name || "Uncategorized",
        }
      ]
    }
  });
  console.log('GA4: select_item pushed', props.product?.title);
};

const toggleWishlist = () => {
  if (isProductInWishlist.value) {
    wishlistStore.removeFromWishlist(props.product.id)
  } else {
    wishlistStore.addToWishlist({
      id: props.product?.id,
      slug: props.product?.slug,
      sku: props.product?.sku,
      title: props.product?.title,
      cover_image: props.product?.cover_image_url,
      price: props.product?.discount_price
        ? props.product?.discount_price
        : props.product?.price,
      category: props.product?.category?.name,
    })
  }
}
</script>

<template>
  <div class="relative group">
    <div class="relative overflow-hidden">
      <RouterLink :to="`/product/${product?.slug}`" @click="trackSelectItem">
        <img
          class="h-auto w-full object-cover"
          :src="product?.cover_image_url"
          :alt="product?.title"
        />
      </RouterLink>

      <div
        class="flex flex-col gap-2 lg:gap-4 absolute right-2 lg:-right-10 bottom-3 lg:bottom-8 lg:group-hover:right-3 transition-all ease-in duration-200"
      >
        <!-- Wishlist Button -->
        <!-- <button
          @click="toggleWishlist"
          class="bg-[#F6F6F3] size-8 flex items-center justify-center p-1 rounded-lg"
        >
        <img  class="size-5 lg:size-6" v-if="!isProductInWishlist" src="@/assets/images/wishlist-icon.svg">
          <Icon
            v-else
            class="text-2xl text-red-600"
            name="solar:heart-bold"
          />
        </button> -->

        <!-- Cart Button -->
        <RouterLink
          :to="`/product/${product?.slug}`"
          @click="trackSelectItem"
          class="bg-[#F6F6F3] size-8 flex items-center justify-center p-1 rounded-lg"
        >
          <img class="size-5 lg:size-6" src="@/assets/images/cart.svg" alt="" />
        </RouterLink>
      </div>
    </div>

    <!-- Top Sale Tag -->
    <!-- <div class="absolute top-1 left-1 bg-secondary rounded-md px-2 py-1">
      <p class="text-[10px] text-white font-medium">Top Sale</p>
    </div> -->

    <!-- Product Info -->
    <div class="flex flex-col bg-white p-2 text-center">
      <p class="text-[10px] sm:text-xl lg:text-sm text-gray-500">
        {{ product?.category?.name }}
      </p>
      <RouterLink
        :to="`/product/${product?.slug}`"
        @click="trackSelectItem"
        class="text-sm sm:text-xl lg:text-2xl font-medium text-primary"
      >
        <h2>{{ product?.title }}</h2>
      </RouterLink>
      <p class="text-lg sm:text-xl text-primary">
        ৳{{ product?.discount_price ? product?.discount_price : product?.price }}
      </p>
    </div>
  </div>
</template>
