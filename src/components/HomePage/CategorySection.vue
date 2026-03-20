  <script setup>
import Container from '@/components/Container.vue';
import { inject } from 'vue';
import CategoryCard from "@/components/CategoryCard.vue";
const data = inject('data');
</script>
<template>
	<section class="">
		<Container class="py-3 lg:py-4">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
			  <CategoryCard :category="item" v-for="item in data?.home_categories" :key="item?.id" />
			</div>
		</Container>
	</section>
</template>