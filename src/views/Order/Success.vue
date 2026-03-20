<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useCartStore } from "@/stores/useCartStore.js";
import { useApi } from 'vue-laravel-sanctum';
const data = inject('data');
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const { $api } = useApi();
const order = ref(null);
const getOrder = async () => {
	const order_code = route.query.order_code;
	if (!order_code) {
		router.push('/');
		return;
	}
	const response = await $api(`/api/frontend/v1/order/${order_code}`, {
		headers: {
			authorization: `Bearer ${authStore?.user?.token}`,
		},
	});
	if (response) {
		order.value = response.data;

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({ ecommerce: null });
		window.dataLayer.push({
			event: "purchase",
			ecommerce: {
				transaction_id: order.value.id,
				value: order.value.grand_total,
				currency: "BDT",
				customer_name: order.value.name,
				customer_address: order.value.address,
				zip_code: order.value.zip_code || "",
				region: order.value.zone || "",
				country: "Bangladesh",
				phone_no: order.value.phone,
				email: order.value.contact || order.value.user?.email || "",
				items: order.value.order_items.map((item) => ({
					item_id: item.product_id,
					item_name: item.title,
					price: item.price,
					item_brand: "Pixels",
					item_category: "Uncategorized",
					item_variant: (item.design || "") + (item.color ? "-" + item.color : "") + (item.size ? "-" + item.size : ""),
					quantity: item.quantity,
				})),
			},
		});
		console.log('GA4: purchase pushed', order.value.order_code);
	}
}
onMounted(() => {
	getOrder();
	cartStore.clearCart();
	if (!authStore.user && route.query.order_code) {
		localStorage.setItem('guest_order_id', route.query.order_code);
	}
})
</script>

<!-- <template>
	<AppLayout>
		<section>
			<div class="w-full h-screen flex items-center justify-center py-4">
				<div class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
					<div class="bg-white w-full max-w-2xl z-50 fixed transition-all ease-in-out duration-500 p-6">
						<div v-html="data?.order_confirmation_message"></div>
						<p class="text-sm lg:text-lg text-center font-semibold text-[#77468C]">
							Your Order Number: {{ order?.order_code }}
						</p>
						<div class="flex items-center justify-between p-4">
							<RouterLink :to="`/order-detail/${order?.id}`"
								class="underline text-[#77468C] font-semibold">
								View Order
							</RouterLink>
							<RouterLink to="/" class="underline text-[#77468C] font-semibold">
								Go to Home Page
							</RouterLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	</AppLayout>
</template> -->
<template>
	<AppLayout>
		<section class="w-full  flex items-center justify-center py-4 px-2 bg-gray-50">
			<div v-if="order" class="bg-white w-full max-w-2xl p-6 rounded-md shadow-md">
				<div v-html="data?.order_confirmation_message"></div>
				<p class="text-sm lg:text-lg text-center font-semibold text-[#77468C] my-4">
					Your Order Number: {{ order?.order_code }}
				</p>
				<div class="flex items-center justify-between lg:p-4">
					<RouterLink :to="`/order-detail/${order?.id}`" class="underline text-[#77468C] font-semibold">
						View Order
					</RouterLink>
					<RouterLink to="/" class="underline text-[#77468C] font-semibold">
						Go to Home Page
					</RouterLink>
				</div>
			</div>
		</section>
	</AppLayout>
</template>
