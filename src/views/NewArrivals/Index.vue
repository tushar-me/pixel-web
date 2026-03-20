<script setup>
import ProductCard from "@/components/ProductCard.vue";
import Pagination from "@/components/Pagination.vue";
import { useApi } from 'vue-laravel-sanctum';
import {ref, onMounted, watch, inject} from "vue";
import Icon from "@/components/Icon.vue";
import { useRoute } from 'vue-router';

// price range
const { $api, loading } = useApi();
const data = inject('data');
const route = useRoute();

const products = ref(null);
const getProducts = async (page) => {
  window.scrollTo(0, 0);
  const response = await $api(`/api/frontend/v1/product?page=${page}`,{
    method:'get',
  });
  if(response){
    products.value = response.data

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "new_arrivals",
        item_list_name: "New Arrivals",
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
    console.log('GA4: view_item_list pushed (New Arrivals)');
  }
}


onMounted(() => {
  getProducts();
})
</script>

<template>
  <AppLayout>
    <section class="mt-2 ">
        <div class="mb-4">
          <img class="w-full  h-auto " src="@/assets/images/new-arrivals.png" alt="New Arrivals">
        </div>
<!--filter sidebar-->
      <Container>
        
        <div class="flex flex-wrap">
          <div class="w-full">
            <div class="flex flex-wrap -mx-2" v-if="loading">
              <div class="w-1/2 lg:w-1/4 px-2  mb-5" v-for="(item, i) in 8" :key="i">
                <div>
                  <div class="w-full h-64 rounded-md bg-slate-200 mb-2"></div>
                  <div class="w-11/12 h-4 bg-slate-200 rounded animate-pulse mx-auto mb-2"></div>
                  <div class="w-8/12 h-4 bg-slate-200 rounded animate-pulse  mx-auto"></div>
                </div>
              </div>
            </div>
        
            <div v-else-if="products?.data?.length > 0 && !loading" class="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div  v-for="product in products?.data" :key="product?.id">
                <ProductCard :product="product" />
              </div>
            </div>
            <div v-else>
              <h3 class="text-center text-3xl text-gray-600 py-10">No Record Funds</h3>
            </div>
            <Pagination :meta="products?.meta" @page-change="getProducts"  />
          </div>
        </div>
      </Container>
    </section>
  </AppLayout>
</template>