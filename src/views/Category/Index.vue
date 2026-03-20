<script setup>
import ProductCard from "@/components/ProductCard.vue";
import CategoryAutoPlay from "@/components/CategoryAutoPlay.vue";
import PolicySection from "@/components/HomePage/PolicySection.vue";
import Slider from 'primevue/slider';
import InputText  from 'primevue/inputtext';
import { useApi } from 'vue-laravel-sanctum';
import {useRoute} from 'vue-router';
const route = useRoute();
const { data, loading } = useApi(`/api/frontend/v1/category-product/${route?.params?.slug}`);
import {ref, onMounted, watch, inject} from "vue";
import Icon from "@/components/Icon.vue";
import BlogSection from "@/components/HomePage/BlogSection.vue";
const value = ref(1000);
const sidebar = ref(false);
</script>

<template>
  <AppLayout>
    <CategoryAutoPlay v-if="data?.children?.length > 0" :categories="data?.children" />
    <section class="mt-3">
      <div v-if="loading" class="bg-slate-200 animate-pulse h-40 lg:h-72 overflow-hidden relative mb-5"></div>
      <div v-else class=" h-40 lg:h-72 overflow-hidden relative mb-5">
        <img :src="data?.banner_url"
             class="w-full h-full object-cover">
      </div>

      <!--filter sidebar-->
      <Container>
        <div class="mb-3 hidden lg:block">
          <ul class="flex items-center gap-2 text-primary">
            <li>
              Home
            </li>
            <Icon name="iconamoon:arrow-right-2" class="text-2xl" />
            <li>
             {{ route?.params?.slug }}
            </li>
          </ul>
        </div>
        <div class="hidden  items-center justify-between mb-3">
          <h3>All Products</h3>
          <button  @click="sidebar = !sidebar" class="block">
            <Icon name="ic:outline-filter-alt" class="text-2xl text-primary" />
          </button>
        </div>
        <div class="flex flex-wrap ">
          <div class="w-full">
            <div class="flex flex-wrap -mx-2" v-if="loading">
              <div class="w-1/2 lg:w-1/4 px-2  mb-5" v-for="item in 10">
                <div>
                  <div class="w-full h-60 rounded-md bg-slate-200 mb-2"></div>
                  <div class="w-8/12 h-4 bg-slate-200 rounded animate-pulse mb-1"></div>
                  <div class="w-11/12 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3" v-else>
              <div  v-for="product in data?.products" :key="product?.id">
                <ProductCard :product="product" />
              </div>
            </div>
            <div v-if="!loading && data?.products?.length < 1">
              <h3 class="text-4xl font-bold text-primary text-center">Product Not Found</h3>
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
          </div>
        </div>
      </Container>
      <!-- end filter sidebar-->
      <BlogSection />
      <PolicySection />
    </section>
  </AppLayout>
</template>


<style scoped>
input[type="radio"]:checked + label{
  span {
    background-color: #4C2746;
  }
}
</style>