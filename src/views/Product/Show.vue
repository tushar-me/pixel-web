<script setup>
import Container from "@/components/Container.vue";
import Gallary from "@/components/Gallary.vue";
import PolicySection from "@/components/HomePage/PolicySection.vue";
import ReturnpolicySection from "@/components/HomePage/ReturnpolicySection.vue";
import AppLayout from "@/components/Layouts/AppLayout.vue";
import PhoneGallary from "@/components/PhoneGallary.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useCartStore } from "@/stores/useCartStore.js";
import { useWishlistStore } from "@/stores/useWishlistStore.js";
import moment from "moment";
import Accordion from "primevue/accordion";
import AccordionContent from "primevue/accordioncontent";
import AccordionHeader from "primevue/accordionheader";
import AccordionPanel from "primevue/accordionpanel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, onMounted, ref, watch } from "vue";
import { useApi } from "vue-laravel-sanctum";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const { $api, loading } = useApi();
const modules = [Scrollbar, Navigation];
const route = useRoute();
const router = useRouter();
const quantity = ref(1);
const authStore = useAuthStore();

const product = ref(null);
const getProduct = async () => {
  const response = await $api(`/api/frontend/v1/product/${route.params.slug}`);
  product.value = response.data;
};
const selectedDesignId = ref(null);
const selectedColorId = ref(null);
const selectedSizeId = ref(null);

const uniqueDesigns = computed(() => {
  const map = new Map();
  product.value?.variations.forEach((v) => {
    if (!map.has(v.design_id)) {
      map.set(v.design_id, {
        id: v.design_id,
        name: v.design?.name,
        image: v.design?.image_url,
      });
    }
  });
  return Array.from(map.values());
});
const availableColors = computed(() => {
  return product.value?.variations
    .filter((v) => v.design_id == selectedDesignId.value)
    .reduce((acc, curr) => {
      if (curr.color && !acc.some((c) => c.id == curr.color.id)) {
        acc.push({
          id: curr.color.id,
          name: curr.color.name,
          code: curr.color.code,
        });
      }
      return acc;
    }, []);
});

const availableSizes = computed(() => {
  return product.value?.variations
    .filter(
      (v) =>
        v.design_id == selectedDesignId.value &&
        v.color_id == selectedColorId.value
    )
    .reduce((acc, curr) => {
      if (!acc.some((s) => s.id == curr.size_id)) {
        acc.push({
          id: curr.size_id,
          name: curr.size?.name,
        });
      }
      return acc;
    }, []);
});

const autoSelectDefault = () => {
  if (!product.value || !product.value.variations.length) return;
  const firstVariation = product.value.variations[0];
  selectedDesignId.value = firstVariation.design_id;
  const firstColor = product.value.variations.find(
    (v) => v.design_id == firstVariation.design_id
  )?.color;
  if (firstColor) {
    selectedColorId.value = firstColor.id;
  }
  const firstSize = product.value.variations.find(
    (v) =>
      v.design_id == selectedDesignId.value &&
      v.color_id == selectedColorId.value
  )?.size;

  if (firstSize) {
    selectedSizeId.value = firstSize.id;
  }
};

const selectDesign = (id) => {
  selectedImage.value =
    product.value?.variations.find(
      (v) =>
        v.design_id == id &&
        v.color_id == selectedColorId.value &&
        v.size_id == selectedSizeId.value
    )?.image_url || product.value?.cover_image_url;

  selectedDesignId.value = id;
  const colorInDesign = product.value?.variations.find(
    (v) => v.design_id == id && v.color_id == selectedColorId.value
  )?.color;

  if (colorInDesign) {
    selectedColorId.value = colorInDesign.id;
  } else {
    const firstColor = product.value?.variations.find(
      (v) => v.design_id == id
    )?.color;
    selectedColorId.value = firstColor?.id || null;
  }
  const sizeInDesign = product.value?.variations.find(
    (v) =>
      v.design_id == id &&
      v.color_id == selectedColorId.value &&
      v.size_id == selectedSizeId.value
  )?.size;

  if (sizeInDesign) {
    selectedSizeId.value = sizeInDesign.id;
  } else {
    const firstSize = product.value?.variations.find(
      (v) => v.design_id == id && v.color_id == selectedColorId.value
    )?.size;
    selectedSizeId.value = firstSize?.id || null;
  }
};
const selectColor = (id) => {
  selectedColorId.value = id;
  selectedImage.value =
    product.value?.variations.find(
      (v) =>
        v.design_id == selectedDesignId.value &&
        v.color_id == id &&
        v.size_id == selectedSizeId.value
    )?.image_url || product.value?.cover_image_url;

  const sizeInColor = product.value?.variations.find(
    (v) =>
      v.design_id == selectedDesignId.value &&
      v.color_id == id &&
      v.size_id == selectedSizeId.value
  )?.size;

  if (sizeInColor) {
    selectedSizeId.value = sizeInColor.id;
  } else {
    const firstSize = product.value?.variations.find(
      (v) => v.design_id == selectedDesignId.value && v.color_id == id
    )?.size;
    selectedSizeId.value = firstSize?.id || null;
  }
};

const selectSize = (id) => {
  selectedSizeId.value = id;
  selectedImage.value =
    product.value?.variations.find(
      (v) =>
        v.design_id == selectedDesignId.value &&
        v.color_id == selectedColorId.value &&
        v.size_id == id
    )?.image_url || product.value?.cover_image_url;
};

const selectedVariant = computed(() => {
  return product.value?.variations.find(
    (v) =>
      v.design_id == selectedDesignId.value &&
      v.color_id == selectedColorId.value &&
      v.size_id == selectedSizeId.value
  );
});
const selectedImage = ref(null);
// const selectedImage = computed(() => {
//   if (selectedVariant.value) {
//     quantity.value = 1;
//     return selectedVariant.value.image_url || product.value?.cover_image_url;
//   }
//   return product.value?.cover_image_url;
// });

const getNameById = (list, id) => {
  return list?.find((item) => item.id == id)?.name || "";
};

const selectError = ref(false);
const addToCart = async () => {
  selectError.value = false;

  if (
    product.value?.variations.length > 0 &&
    !selectedDesignId.value &&
    !selectedColorId.value &&
    !selectedSizeId.value
  ) {
    toast.warning("Please select Variant", {
      autoClose: 2000,
      transition: "slide",
    });
    selectError.value = true;
    return;
  }
  const designName = getNameById(uniqueDesigns.value, selectedDesignId.value);
  const colorName = getNameById(availableColors.value, selectedColorId.value);
  const sizeName = getNameById(availableSizes.value, selectedSizeId.value);

  const itemData = {
    user_id: authStore?.user?.user?.id ?? null,
    product_id: product.value.id,
    sku: selectedVariant.value?.code ?? product.value?.sku,
    product_variant_price_id: selectedVariant.value?.id ?? null,
    title: product.value.title,
    weight: product.value.weight ?? 0,
    cover_image:
      selectedVariant.value?.image_url ?? product.value?.cover_image_url,
    price: selectedVariant.value?.price ?? product.value?.price,
    design: designName ?? null,
    color: colorName ?? null,
    size: sizeName ?? null,
    quantity: quantity.value,
    total: quantity.value * (selectedVariant.value?.price ?? product.value?.price),
    type: "cart",
  };

  const success = await cartStore.addToCart(itemData);
  if (success) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "BDT",
        value: itemData.total,
        items: [
          {
            item_id: itemData.product_id,
            item_name: itemData.title,
            price: itemData.price,
            item_brand: product.value?.brand?.name || "Pixels",
            item_category: product.value?.category?.name || "Uncategorized",
            item_variant: (itemData.design || "") + (itemData.color ? "-" + itemData.color : "") + (itemData.size ? "-" + itemData.size : ""),
            quantity: itemData.quantity
          }
        ]
      }
    });
    console.log('GA4: add_to_cart pushed', itemData.title);

    toast.success("Product added to cart successfully");
  }
};

const isProductInWishlist = computed(() => {
  return wishlistStore.items?.some(
    (item) => item.product_id == product.value?.id
  );
});

// Wishlist
const addWishList = async () => {
  selectError.value = false;
  if (!authStore.isLoggedIn) {
    toast.error("Please login to add product to wishliat");
    router.push(`/login?redirect=product/${product.value?.slug}`);
  }
  // if(product.value?.variations.length > 0 && (!selectedDesignId.value || !selectedColorId.value || !selectedSizeId.value)){
  //   toast.warning('Please select Variant', { autoClose: 2000, transition: 'slide'});
  //   selectError.value = true;
  //   return;
  // }
  if (
    product.value?.variations.length > 0 &&
    !selectedDesignId.value &&
    !selectedColorId.value &&
    !selectedSizeId.value
  ) {
    toast.warning("Please select Variant", {
      autoClose: 2000,
      transition: "slide",
    });
    selectError.value = true;
    return;
  }
  if (isProductInWishlist.value) {
    removeFromWishlist(
      wishlistStore.items.find((item) => item.product_id == product.value?.id)
        .id
    );
  } else {
    const designName = getNameById(uniqueDesigns.value, selectedDesignId.value);
    const colorName = getNameById(availableColors.value, selectedColorId.value);
    const sizeName = getNameById(availableSizes.value, selectedSizeId.value);

    const form = ref({
      user_id: authStore?.user?.user?.id,
      product_id: product.value.id,
      sku: selectedVariant.value?.code ?? product.value?.sku,
      product_variant_price_id: selectedVariant.value?.id ?? null,
      title: product.value.title,
      cover_image:
        selectedVariant.value?.image_url ?? product.value?.cover_image_url,
      price: selectedVariant.value?.price ?? product.value?.price,
      design: designName ?? null,
      color: colorName ?? null,
      size: sizeName ?? null,
      quantity: quantity.value,
      total: computed(
        () =>
          quantity.value *
          (selectedVariant.value?.price ?? product.value?.price)
      ),
      type: "wishlist",
    });

    const response = await $api("/api/frontend/v1/cart", {
      method: "POST",
      data: form.value,
      headers: {
        authorization: `Bearer ${authStore?.user?.token}`,
      },
    });

    if (response) {
      wishlistStore.fetchWishlistItems();
      toast.success("Product added to wishlist successfully");
    }
  }
};

const removeFromWishlist = async (id) => {
  try {
    const response = await $api(`/api/frontend/v1/cart/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${authStore?.user?.token}`,
      },
    });
    if (response) {
      wishlistStore.fetchWishlistItems();
      isProductInWishlist.value = false;
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

const trackViewItem = () => {
  if (product.value) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object.
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        value: product.value.price,
        items: [
          {
            item_id: product.value.id,
            item_name: product.value.title,
            price: product.value.price,
            item_brand: product.value.brand?.name || "Pixels",
            item_category: product.value.category?.name || "Uncategorized",
            quantity: 1
          }
        ]
      }
    });
    console.log('GA4: view_item pushed', product.value.title);
  }
};

onMounted(async () => {
  await getProduct();
  trackViewItem();

  if (authStore.isLoggedIn) {
    await wishlistStore.fetchWishlistItems();
  }
  if (product.value?.variations?.length) {
    autoSelectDefault();
  }
  if (!selectedImage.value) {
    selectedImage.value = product.value?.cover_image_url;
  }

  // autoSelectDefault();
});

watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await getProduct();
    trackViewItem();
  }
});
</script>
<template>
  <AppLayout>
    <!-- single product page -->
    <section>
      <div class="w-full lg:hidden">
        <PhoneGallary :coverImg="selectedImage" :images="product?.images" />
      </div>
      <Container>
        <!-- Lading Skeleton  -->
        <div class="flex flex-wrap" v-if="loading">
          <div class="w-full lg:w-1/2 pr-5 mb-5 lg:mb-0">
            <div class="w-full h-52 lg:h-96 bg-slate-200 animate-pulse rounded"></div>
          </div>
          <div class="w-full lg:w-1/2">
            <div class="w-96 h-6 mb-5 bg-slate-200 animate-pulse rounded"></div>

            <div class="h-6 w-40 bg-slate-200 animate-pulse rounded"></div>
            <ul class="flex gap-5 py-2 mt-3">
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
            </ul>

            <div class="h-6 w-40 bg-slate-200 animate-pulse rounded mt-6"></div>
            <ul class="flex gap-5 py-2 mt-3">
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
              <li class="w-20 h-6 bg-slate-200 animate-pulse"></li>
            </ul>
            <div class="w-96 h-10 mb-10 bg-slate-200 animate-pulse rounded-md mt-10"></div>
          </div>
        </div>
        <!-- Lading Skeleton End -->
        <!-- Main Content -->
        <div v-else class="flex flex-wrap sm:pt-10">
          <div class="w-1/2 px-3 lg:block hidden">
            <Gallary class="sticky top-10 pb-10" :coverImg="selectedImage" :images="product?.images" />
          </div>
          <div class="w-full lg:w-1/2 lg:px-3 pt-5 lg:pt-0">
            <h2 class="text-2xl lg:text-4xl font-bold">{{ product?.title }}</h2>
            <p class="font-normal text-gray-600 text-sm lg:text-base mb-3">
              {{ product?.category?.name }}
            </p>
            <p class="text-sm lg:text-lg font-normal text-gray-600">
              {{ product?.short_description }}
            </p>
            <p class="font-medium text-xl lg:text-3xl my-3 lg:my-5">
              ৳ {{ selectedVariant?.price ?? product?.price }}
            </p>

            <!-- Select Design -->
            <div class="mb-4" v-if="uniqueDesigns?.length > 0 && uniqueDesigns[0]?.id != null">
              <label v-if="selectedVariant?.design?.name">Design: {{ selectedVariant?.design?.name }}</label>
              <label v-else>Select Design</label>
              <div class="flex flex-wrap gap-2 mt-2">
                <div v-for="design in uniqueDesigns" :key="design.id" @click="selectDesign(design.id)"
                  class="cursor-pointer border flex flex-col items-center p-1"
                  :class="{ 'border-primary': selectedDesignId == design.id }">
                  <img :src="design.image" alt="design" class="w-16 h-16 object-cover" />
                </div>
              </div>
              <span v-if="selectError" class="text-red-500 text-base font-medium">Please select design first</span>
            </div>

            <!-- Select Color -->
            <div class="mb-4" v-if="availableColors?.length > 0">
              <label v-if="selectedVariant?.color?.name">Color: {{ selectedVariant?.color?.name }}</label>
              <label v-else>Select Color</label>
              <div class="flex flex-wrap gap-2 mt-2">
                <div v-for="color in availableColors" :key="color.id" @click="selectColor(color.id)"
                  class="w-8 h-8 rounded-full cursor-pointer border-2" :style="{ backgroundColor: color.code }"
                  :class="{ 'border-black': selectedColorId == color.id }" />
              </div>
              <span v-if="selectError" class="text-red-500 text-base font-medium">Please select color first</span>
            </div>

            <!-- Select Size -->

            <div class="mb-4" v-if="availableSizes?.length > 0 && availableSizes[0]?.id != null">
              <label v-if="selectedVariant?.size?.name">Size: {{ selectedVariant?.size?.name }}</label>
              <label v-else>Select Size</label>
              <div class="flex flex-wrap gap-2 mt-2">
                <button v-for="size in availableSizes" :key="size.id" @click="selectSize(size.id)"
                  class="border border-primary text-primary px-4 py-1" :class="{
                    'bg-primary text-white': selectedSizeId == size.id,
                  }">
                  {{ size.name }}
                </button>
              </div>
              <span v-if="selectError" class="text-red-500 text-base font-medium">Please select size first</span>
            </div>

            <div class="mt-3 lg:mt-5">
              <div class="flex flex-wrap lg:flex-col gap-4">
                <!-- Quantity Button -->
                <div class="w-full lg:w-1/5 mb-3 lg:mb-0">
                  <p class="text-lg font-medium py-2">Quantity</p>
                  <div class="w-32 h-10 border border-gray-400 flex items-center">
                    <button @click="quantity = quantity -= 1" :disabled="quantity < 2"
                      class="disabled:cursor-not-allowed text-black w-10 h-10 flex items-center justify-center">
                      <Icon name="ic:baseline-minus" />
                    </button>
                    <input type="text" class="w-10 h-10 border border-gray-400 text-center" :value="quantity"
                      readonly />
                    <button @click="quantity = quantity += 1"
                      class="text-black w-10 h-10 flex items-center justify-center">
                      <Icon name="material-symbols:add" />
                    </button>
                  </div>
                </div>
                <!-- Quantity Button End -->
                <!-- Cart Button -->
                <div class="w-full">
                  <p v-if="product?.stock_status == 'out_of_stock' || (selectedVariant && selectedVariant.stock <= 0)"
                    class="w-full text-base rounded-lg py-3 text-primary border border-primary font-semibold text-center uppercase">
                    Out of Stock
                  </p>
                  <p v-else-if="product?.stock_status == 'up_comming'"
                    class="w-full text-base rounded-lg py-3 text-primary border border-primary font-semibold text-center uppercase">
                    Upcoming
                  </p>
                  <button v-else @click="addToCart"
                    class="w-full text-base rounded-lg py-3 bg-primary text-white font-semibold text-center uppercase">
                    Add To Basket
                  </button>
                </div>
                <!-- Cart Button End -->
                <!-- Cart Button -->
                <div class="w-full">
                  <button @click="addWishList()" class="px-6 py-2 w-full rounded-lg flex justify-center bg-primary/20">
                    <Icon class="text-3xl" :name="isProductInWishlist
                      ? 'solar:heart-bold'
                      : 'solar:heart-outline'
                      " :class="isProductInWishlist ? 'text-red-600' : 'text-gray-800'
                        " />
                  </button>
                </div>
                <!-- Cart Button End -->
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 lg:gap-10 py-10">
              <div class="flex flex-col items-center gap-2">
                <Icon name="hugeicons:truck-delivery" class="text-2xl lg:text-4xl text-gray-600" />
                <p class="text-xs lg:text-SM text-center">
                  Fast Shipping 2 to 4 days
                </p>
              </div>

              <div class="flex flex-col items-center gap-2">
                <Icon name="iconoir:hand-cash" class="text-2xl lg:text-4xl text-gray-600" />
                <p class="text-xs lg:text-sm text-center">Cash on Delivery</p>
              </div>

              <div class="flex flex-col items-center gap-2">
                <Icon name="iconoir:package-lock" class="text-2xl lg:text-4xl text-gray-600" />
                <p class="text-xs lg:text-sm text-center">Safe Packaging</p>
              </div>

              <div class="flex flex-col items-center gap-2">
                <Icon name="ion:wallet-outline" class="text-2xl lg:text-4xl text-gray-600" />
                <p class="text-xs lg:text-sm text-center">Secure Payment</p>
              </div>
            </div>

            <div v-if="product?.product_info" class="mb-5">
              <h2 class="text-3xl lg:text-3xl font-semibold mb-3 text-primary pb-2">
                Description
              </h2>
              <div class="editor_data" v-html="product?.product_info"></div>
            </div>

            <div v-if="product?.key_specification" class="mb-5">
              <h2 class="text-3xl lg:text-3xl font-semibold mb-3 text-primary pb-2">
                Specification
              </h2>
              <table class="w-full border">
                <tbody>
                  <tr v-for="(specification, index) in product?.key_specification" :key="index"
                    class="border-b border-gray-200">
                    <td :class="{ 'bg-[#FFE6FD]': index % 2 == 0 }"
                      class="w-1/2 lg:w-1/4 py-2 px-4 border-r border-gray-200">
                      {{ specification?.name }}
                    </td>
                    <td class="py-2 px-4">{{ specification?.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="product?.faq?.length > 0" class="mb-5">
              <h2 class="text-3xl lg:text-3xl font-semibold mb-3 text-primary pb-2">
                Frequently Asked Questions
              </h2>
              <Accordion value="0">
                <template #collapseicon>
                  <i class="pi pi-chevron-up"></i>
                </template>
                <template #expandicon>
                  <i class="pi pi-chevron-down"></i>
                </template>
                <AccordionPanel :value="index" v-for="(item, index) in product?.faq" :key="item?.id">
                  <AccordionHeader>
                    <div class="flex items-center gap-3">
                      <p class="text-xl font-medium text-capitalize">
                        {{ item?.question }}
                      </p>
                    </div>
                  </AccordionHeader>
                  <AccordionContent>
                    <div class="text-white font-medium text-capitaliz">
                      {{ item?.answer }}
                    </div>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section id="client_reviews" class="mb-5 bg-[#A8226B] py-10 client-review">
      <Container>
        <div>
          <h3 class="text-4xl font-medium mb-3 text-white pb-2">
            Client Reviews
          </h3>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <h4 class="text-xl font-medium text-white">
                {{ product?.averageRating?.toFixed(2) }}
              </h4>
              <div class="flex items-center gap-1 text-white text-lg">
                <Icon :name="product?.averageRating < star
                  ? 'carbon:star'
                  : 'carbon:star-filled'
                  " v-for="star in 5" :key="star" />
              </div>
            </div>
            <p class="text-white text-base">
              {{ product?.review?.length }} Reviews
            </p>
          </div>
          <div>
            <Swiper :breakpoints="{
              '320': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '768': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '1024': {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }" :scrollbar="{ hide: true }" :navigation="true" :modules="modules" class="mySwiper py-10">
              <SwiperSlide v-for="item in product?.review" :key="item?.id" class="px-10 lg:px-0">
                <div class="bg-white p-4 shadow">
                  <img :src="item?.image_url" alt="review" class="mb-2" />
                  <div>
                    <h3 class="text-base font-bold">{{ item?.author_name }}</h3>
                    <span class="flex items-center gap-1">
                      <Icon class="text-lg text-amber-500" :name="review?.rating < star
                        ? 'carbon:star'
                        : 'carbon:star-filled'
                        " v-for="star in 5" :key="star" />
                    </span>
                    <p class="text-sm text-gray-500">
                      {{ moment(item?.created_at).format("MMMM Do YYYY") }}
                    </p>
                  </div>
                  <div>{{ item?.review }}</div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </Container>
    </section>

    <!-- Related Products Section -->
    <section class="py-10">
      <Container>
        <h3 class="text-4xl font-medium mb-3 inline-block pb-2">
          What you might also like!
        </h3>
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          <div v-for="item in product?.relatedProducts" :key="item?.id">
            <ProductCard :product="item" />
          </div>
        </div>
      </Container>
    </section>
    <section v-if="product?.blogs?.length > 0" class="py-5 lg:py-10 product-section h-full">
      <Container>
        <h3 class="text-4xl font-medium mb-3 inline-block pb-2">Blogs</h3>
        <div>
          <swiper :breakpoints="{
            '320': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '768': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }" :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }" :modules="modules" class="mySwiper py-5">
            <swiper-slide v-for="item in product?.blogs" :key="item?.id">
              <BlogCard :blog="item" />
            </swiper-slide>
          </swiper>
        </div>
      </Container>
    </section>
    <ReturnpolicySection />
    <!-- Related Products Section End -->
    <!-- Exchange & Return Policy -->
    <PolicySection />
    <!--    <section id="exchange_return_policy"  class="mb-5 bg-[#FFE6FD] py-10">-->
    <!--      <Container>-->
    <!--        -->
    <!--      </Container>-->
    <!--    </section>-->
    <!-- Exchange & Return Policy End -->
  </AppLayout>
</template>
