<script setup>
import AppLayout from "@/components/Layouts/AppLayout.vue";
import Container from "@/components/Container.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const route = useRoute();
const category = ref(null);
const getCategory = async() => {
	const response = await sendRequest({
		url:`/public/category-product/${route?.params?.slug}`,
		method:'get'
	});
	if(response){
		category.value = response.data;

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({ ecommerce: null });
		window.dataLayer.push({
			event: "view_item_list",
			ecommerce: {
				item_list_id: `category_${category.value.id}`,
				item_list_name: category.value.name,
				items: category.value.products.map((item, index) => ({
					item_id: item.id,
					item_name: item.title,
					index: index + 1,
					price: item.discount_price || item.price,
					item_brand: item.brand?.name || "Pixels",
					item_category: category.value.name,
				})),
			},
		});
		console.log('GA4: view_item_list pushed (Category)', category.value.name);
	}
}

onMounted(() => {
	getCategory();
})
</script>

<template>
  <AppLayout>
      <section>
	  	<Container>
			<div class="mb-5">
				<img :src="category?.banner_url" class="w-full h-48" alt="">
			</div>
		</Container>
    </section>

      <section>
          <Container>
              <div class="grid grid-cols-2 lg:grid-cols-5 gap-5">
                 <ProductCard :data="product" v-for="product in category?.products" :key="product.id" />
              </div>
        </Container>
      </section>
  </AppLayout>
</template>