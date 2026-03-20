<script setup>
import Pagination from "@/components/Pagination.vue";
import { useApi } from 'vue-laravel-sanctum';
import {ref, onMounted, watch, inject, computed} from "vue";
import Icon from "@/components/Icon.vue";
import { useRoute } from 'vue-router';
import moment from "moment";
// price range
const { $api, loading } = useApi();
const reviews = ref(null);
const getRevoiews = async (page) => {
    window.scrollTo(0, 0);
  const response = await $api(`/api/frontend/v1/get-all-review?page=${page}`,{
    method:'get',
  });
  if(response){
    reviews.value = response.data
  }
}

onMounted(() => {
  getRevoiews();
})
</script>
<template>
    <AppLayout>
        <section class="pb-5">
            <div class="mb-4">
            <img class="w-full  h-auto " src="@/assets/images/review.png" alt="New Arrivals">
            </div>
            <Container>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                    
                    <span class="flex  items-center gap-1">
                        <Icon class="text-lg text-amber-500" :name="Number(reviews?.average_rating).toFixed(2) < star ? 'carbon:star' : 'carbon:star-filled'"
                            v-for="star in 5" />
                    </span>
                    <h4 class="text-xl font-medium ">{{ Number(reviews?.average_rating).toFixed(2) }} out of 5</h4>
                    </div>
                </div>
                <p class="text-sm lg:text-2xl  pt-2 mb-3">Based on {{ reviews?.reviews?.data?.length }} reviews</p>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                    <div class="bg-white shadow" v-for="review in reviews?.reviews?.data" :key="review?.id">
                        <img class="w-full h-auto" :src="review?.image_url">
                        <div class="mb-1 p-2 lg:p-3">
                            <h3 class="text-base font-bold">{{ review?.author_name }}</h3>
                             <span class="flex  items-center gap-1">
                                <Icon class="text-lg text-amber-500" :name="review?.rating < star ? 'carbon:star' : 'carbon:star-filled'"
                                    v-for="star in 5" />
                            </span>
                            <p class="text-sm font-normal text-gray-600 py-1 block">{{ moment(review?.created_at).format('MMMM Do YYYY') }}</p>
                        <div class="text-xs lg:text-base">{{ review?.review }}</div>
                        </div>
                    </div>
                </div>
                 <Pagination :meta="reviews?.reviews" @page-change="getRevoiews"  />
            </Container>
        </section>
    </AppLayout>
</template>