<script setup>
import AppLayout from "@/components/Layouts/AppLayout.vue";
import {useRoute} from "vue-router";
const route = useRoute();

import {useApi} from "vue-laravel-sanctum";

const {data , loading} = useApi(`/api/frontend/v1/blog-details/${route?.params?.slug}`);
</script>

<template>
 <AppLayout>

   <Container>
     <main class="mt-10 w-full max-w-3xl mx-auto">

       <div class="mb-4 sm:mb-0 w-full mx-auto relative">
         <div class="px-4 lg:px-0 mb-10">
           <h2 class="text-4xl font-semibold text-gray-800 leading-tight">{{ data?.title}} </h2>
         </div>
         <img :src="data?.blog_image_url" class="w-full object-cover lg:rounded"/>
       </div>

       <div class="flex flex-col">
         <div class="mt-12 text-gray-700 text-lg leading-relaxed w-full">
           <div class="pb-6" v-html="data?.content"></div>
         </div>
       </div>
     </main>
   </Container>
 </AppLayout>
</template>

<style scoped>

</style>