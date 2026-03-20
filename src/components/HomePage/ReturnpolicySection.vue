<script setup>
import {inject} from 'vue'
import Container from "@/components/Container.vue";
const data = inject('data')
</script>

<template>
  <section class="bg-[#F6C2FF] py-7">
    <Container>
      <div class="flex flex-col gap-3 p-4 text-primary">
        <h2  class="text-4xl font-medium mb-3 inline-block pb-2">Exchange & Return Policy</h2>
        <div v-html="data?.product_exchange_return_policy" class="editor_data"></div>
      </div>
    </Container>
  </section>
</template>