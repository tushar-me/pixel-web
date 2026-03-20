<script setup>
import ProductCard from "@/components/ProductCard.vue";
import CategoryAutoPlay from "@/components/CategoryAutoPlay.vue";
import PolicySection from "@/components/HomePage/PolicySection.vue";
import Pagination from "@/components/Pagination.vue";
import Slider from 'primevue/slider';
import InputText  from 'primevue/inputtext';
import { useApi } from 'vue-laravel-sanctum';
import {ref, onMounted, watch, inject} from "vue";
import Icon from "@/components/Icon.vue";
import { useRoute } from 'vue-router';

// price range
const { $api, loading } = useApi();
const data = inject('data');
const route = useRoute();

const extractPage = (url) => {
  if (!url) return 1;
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1]) : 1;
};
const sidebar = ref(true);
const form = ref({
  size: null,
  color: null,
  search: null,
  price: 1000,
  category_id: null,
  brand_id: null,
})

const products = ref(null);
const getProducts = async (page) => {
  window.scrollTo(0, 0);
  const response = await $api(`/api/frontend/v1/product?page=${page}`,{
    method:'get',
    params: form.value
  });
  if(response){
    products.value = response.data

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "all_products",
        item_list_name: "All Products",
        items: products.value.data.map((item, index) => ({
          item_id: item.id,
          item_name: item.title,
          index: index + 1,
          price: item.discount_price || item.price,
          item_brand: item.brand?.name || "Pixels",
          item_category: item.category?.name || "Uncategorized",
        })),
      },
    });
    console.log('GA4: view_item_list pushed (All Products)');
  }
}
watch(form, getProducts, {deep:true});

onMounted(() => {
  getProducts();
})
</script>

<template>
  <AppLayout>
    <section class="mt-2 ">
      <Container class="mb-5">
        <CategoryAutoPlay />
      </Container>

<!--filter sidebar-->
      <Container>
        <div class="mb-3 hidden lg:block">
          <ul class="flex items-center gap-2 text-primary">
            <li>
              Home
            </li>
            <Icon name="iconamoon:arrow-right-2" class="text-2xl" />
            <li>
              All Products
            </li>
            <Icon name="iconamoon:arrow-right-2" class="text-2xl" />
            <li>
             45 Records Found
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-between lg:justify-end mb-3">
          <h3 class="lg:hidden">All Products</h3>
          <button  @click="sidebar = !sidebar" class="block">
            <!-- <Icon name="ic:outline-filter-alt" class="text-2xl text-primary lg:hidden" /> -->
            <Icon name="line-md:menu-fold-left" class="text-3xl text-primary lg:block" />
          </button>
        </div>
        <div class="flex flex-wrap">
          <div :class="{'translate-x-0 lg:hidden' : !sidebar, '-translate-x-72 lg:translate-x-0 lg:block' : sidebar}"  class="min-h-screen overflow-y-scroll lg:h-auto lg:overflow-auto bg-white w-72 fixed top-0 left-0 bottom-0 z-40 lg:z-0 lg:static lg:w-1/5 pe-5 transition-all ease-in-out duration-500">
            <button @click="sidebar = true" class="absolute top-2 right-2 lg:hidden">
              <Icon name="material-symbols:close-small" class="text-3xl text-gray-500" />
            </button>
            <div class="p-2 bg-white border-b pb-6">
              <h3 class="text-lg font-medium mb-2">Price Range</h3>
              <div class="card flex justify-center">
                <div class="w-56">
                  <InputText v-model.number="form.price" class="w-full mb-4" />
                  <Slider v-model="form.price" class="w-full p-slider-range" :max="5000" />
                </div>
              </div>
            </div>
            <div class="p-2 bg-white border-b ">
              <h3 class="text-lg font-medium mb-2">Categories</h3>
              <ul>
                <li>
                  <input v-model="form.category_id" :value="NULL" type="radio" id="all-category" name="category" class="peer hidden" checked>
                  <label @click="sidebar = true" for="all-category" class="flex items-center gap-2 p-1 cursor-pointer uppercase">
                    <span class="size-5 block border border-primary">
                      <Icon name="material-symbols:check" class="text-white" />
                    </span>
                   All Categories
                  </label>
                </li>
                <li v-for="category in data?.all_parent_categories" :key="category?.id">
                  <input v-model="form.category_id" :value="category?.id" type="radio" :id="category?.slug" name="category"  class="peer hidden">
                  <label @click="sidebar = true" :for="category?.slug" class="flex items-center gap-2 p-1 cursor-pointer">
                    <span class="size-5 block border border-primary">
                      <Icon name="material-symbols:check" class="text-white" />
                    </span>
                    {{ category?.name }}
                  </label>
                </li>
              </ul>
            </div>
            <div class="p-2 bg-white border-b">
              <h3 class="text-lg font-medium mb-2">Brands</h3>
              <ul>
                <li>
                  <input v-model="form.brand_id" :value="NULL" type="radio" id="all-brand" name="brand" class="peer hidden" checked>
                   <label @click="sidebar = true" for="all-brand" class="flex items-center gap-2 p-1 cursor-pointer uppercase">
                    <span class="size-5 block border border-primary">
                      <Icon name="material-symbols:check" class="text-white" />
                    </span>
                   All Brands
                  </label>
                </li>
                <li v-for="brand in data?.all_brands" :key="brand?.id">
                  <input v-model="form.brand_id" :value="brand?.id"  type="radio" :id="brand?.slug" name="brand"  class="peer hidden">
                  <label @click="sidebar = true" :for="brand?.slug" class="flex items-center gap-2 p-1 cursor-pointer">
                    <span class="size-5 block border border-primary">
                      <Icon name="material-symbols:check" class="text-white" />
                    </span>
                    {{ brand?.name }}
                  </label>
                </li>
              </ul>
            </div>
            <div class="p-2 bg-white border-b ">
              <h3 class="text-lg font-medium mb-2">Color</h3>
              <ul class="flex gap-2 mb-3">
                <li>
                  <input   id="all-color" type="radio" name="color" checked  class="peer hidden">
                  <label @click="sidebar = true, form.color = null" for="all-color" class="p-1 border border-transparent peer-checked:border-gray-600  block rounded-full">
                    <p class="size-6 rounded-full bg-gradient-to-r from-cyan-400 via-red-500 to-indigo-700 block"></p>
                  </label>
                </li>
                <li>
                  <input  v-model="form.color" value="Red" id="Red" type="radio" name="color"  class="peer hidden">
                  <label @click="sidebar = true" for="Red" class="p-1 border border-transparent peer-checked:border-gray-600  block rounded-full">
                    <p class="size-6 rounded-full bg-red-600 block"></p>
                  </label>
                </li>
                <li>
                  <input  v-model="form.color" value="Blue" id="Blue" type="radio" name="color"  class="peer hidden">
                  <label @click="sidebar = true" for="Blue" class="p-1 border border-transparent peer-checked:border-gray-600  block rounded-full">
                    <p class="size-6 rounded-full bg-blue-600 block"></p>
                  </label>
                </li>
              </ul>
            </div>
            <div class="p-2 bg-white border-b">
              <h3 class="text-lg font-medium mb-2">Size</h3>
              <ul>
                <li>
                  <input type="radio" name="size" id="all-size"  checked class="peer hidden">
                  <label @click="sidebar = true, form.size" for="all-size" class="flex items-center gap-2 p-1 cursor-pointer text-xl">
                    <span class="size-5 block border border-primary"> <Icon name="material-symbols:check" class="text-white" /></span>
                    All Sizes
                  </label>
                </li>
                <li>
                  <input v-model="form.size" id="a3" value="A3" type="radio" name="size"  class="peer hidden">
                  <label @click="sidebar = true" for="a3" class="flex items-center gap-2 p-1 cursor-pointer text-xl">
                    <span class="size-5 block border border-primary"> <Icon name="material-symbols:check" class="text-white" /></span>
                    A3
                  </label>
                </li>
                <li>
                  <input v-model="form.size" id="a4" value="a4" type="radio" name="size"  class="peer hidden">
                  <label @click="sidebar = true" for="a4" class="flex items-center gap-2 p-1 cursor-pointer text-lg">
                    <span class="size-5 block border border-primary"> <Icon name="material-symbols:check" class="text-white" /></span>
                    A4
                  </label>
                </li>
              </ul>
            </div>

          </div>
          <div class="w-full"
            :class="{'lg:w-full' : !sidebar , 'lg:w-4/5' : sidebar}"
          >
            <div class="flex flex-wrap -mx-2" v-if="loading">
              <div class="w-1/2 lg:w-1/4 px-2  mb-5" v-for="(item, i) in 8" :key="i">
                <div>
                  <div class="w-full h-64 rounded-md bg-slate-200 mb-2"></div>
                  <div class="w-11/12 h-4 bg-slate-200 rounded animate-pulse mx-auto mb-2"></div>
                  <div class="w-8/12 h-4 bg-slate-200 rounded animate-pulse  mx-auto"></div>
                </div>
              </div>
            </div>
        
            <div v-else-if="products?.data?.length > 0 && !loading" class="grid grid-cols-2 gap-3" :class="{'sm:grid-cols-3' : sidebar, 'lg:grid-cols-4' : !sidebar}">
              <div  v-for="product in products?.data" :key="product?.id">
                <ProductCard :product="product" />
              </div>
            </div>
            <div v-else>
              <h3 class="text-center text-3xl text-gray-600 py-10">No Record Found</h3>
            </div>
            <Pagination :meta="products?.meta" @page-change="getProducts"  />
          </div>
        </div>
      </Container>
<!-- end filter sidebar-->

      <PolicySection />
    </section>
  </AppLayout>
</template>


<style scoped>
input[type="radio"]:checked + label span {
  background-color: #4C2746;
}
</style>