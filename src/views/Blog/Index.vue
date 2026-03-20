<script setup>
import AppLayout from "@/components/Layouts/AppLayout.vue";
import Container from "@/components/Container.vue";
import BlogCard from "@/components/BlogCard.vue";
import {useApi} from "vue-laravel-sanctum";

const {data , loading} = useApi('/api/frontend/v1/allBlog');

</script>

<template>
  <AppLayout>
    <section class="mb-10">
      <div class="py-5 lg:py-10">
        <h3 class="text-3xl lg:text-7xl text-center text-primary font-bold">Blog</h3>
      </div>
      <Container>
        <div class="flex flex-wrap -mx-2">
          <div class="w-1/2 lg:w-1/3 px-2 mb-4" v-for="item in data" :key="item?.id">
            <BlogCard :blog="item" />
          </div>
        </div>
      </Container>
    </section>
  </AppLayout>
</template>