<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useRoute, useRouter } from 'vue-router';
import useAxios from '@/composables/useAxios.js';
import { ref, onMounted } from 'vue';
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { sendRequest } = useAxios();
const order = ref(null);
const getOrder = async () => {
    // Guest: only allow access to their own order stored in localStorage
    if (!authStore.user) {
        const guestOrderId = localStorage.getItem('guest_order_id');
        if (!guestOrderId || String(guestOrderId) !== String(route?.params?.id)) {
            router.push('/');
            return;
        }
    }
    const response = await sendRequest({
        url: `/frontend/v1/order/${route?.params?.id}`,
        method: 'GET',
    });
    if (response?.response?.status === 403 || response?.response?.status === 404 || response?.status === 403 || response?.status === 404) {
        router.push('/');
        return;
    }
    if (response?.data) {
        order.value = response.data;
    }
}

onMounted(() => {
    getOrder();
})
</script>
<template>

    <AppLayout>
        <Loading :value="loading" />
        <Container class="py-10">
            <div class="flex flex-col lg:flex-row items-center justify-between p-4 bg-white shadow-md gap-2 lg:gap-0">
                <h3>Order Id: <span class="text-red-600 font-medium">{{ order?.order_code }}</span></h3>
                <div>
                    <p class="uppercase">Order Status: {{ order?.order_status }}</p>
                </div>
                <div>
                    <p class="uppercase">Payment Status: {{ order?.payment_status }}</p>
                </div>
                <div class="flex items-center gap-4">
                    <div>
                        <RouterLink :to="`/order-invoice/${order?.id}`"
                            class="bg-primary text-white text-sm font-normal px-4 py-2 rounded ">Print</RouterLink>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap mt-5">
                <div class="w-full lg:w-4/6">
                    <div class=" bg-white shadow-md mb-10  overflow-x-scroll">
                        <h3 class="text-lg p-3">Order Summary</h3>
                        <table class="w-full text-sm text-left rtl:text-right text-black">
                            <thead class="text-xs text-white uppercase bg-primary">
                                <tr>
                                    <th class="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Variant
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Total
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Review
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-for="item in order?.order_details" :key="item.id">
                                    <td class="py-1 px-6 flex items-center gap-4 w-80">
                                        <img :src="item?.product?.cover_image_url" class="w-20 max-w-full max-h-full"
                                            alt="Apple Watch">
                                        <div>
                                            <h3>{{ item?.product?.title }}</h3>
                                            <p class="text-xs font-medium text-black">Price: {{ item?.price }}</p>
                                        </div>
                                    </td>
                                    <td class="px-6 py-1 font-semibold text-xs">
                                        <div>
                                            <p v-if="item?.design">Design: {{ item?.design }}</p>
                                            <p v-if="item?.color">Color: {{ item?.color }}</p>
                                            <p v-if="item?.size">Size: {{ item?.size }}</p>
                                            <p v-if="!item?.design && !item?.color && !item?.size"
                                                class="text-gray-400">—</p>
                                        </div>
                                    </td>
                                    <td class="px-6 py-1 font-semibold text-xs">
                                        {{ item?.quantity }}
                                    </td>
                                    <td class="px-6 py-1 font-semibold text-xs">
                                        {{ item?.total_amount }} TK
                                    </td>
                                    <td class="px-6 py-1 font-semibold text-xs">
                                        <RouterLink v-if="order?.order_status == 'delivered'"
                                            :to="`/write-review/${item?.product?.slug}`"
                                            class="bg-primary px-3 py-2 inline-block text-sm font-normal text-white rounded-md">
                                            Write Review</RouterLink>
                                        <button v-else
                                            class="bg-primary px-3 py-2 inline-block text-sm font-normal text-white rounded-md cursor-not-allowed"
                                            disabled>Write Review</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-full flex flex-wrap">
                        <div class="w-full lg:w-1/2 lg:pr-2">
                            <div class="p-4 bg-white mb-5 shadow-md">
                                <h3 class="text-lg mb-3">Shipping Information</h3>
                                <div v-if="order?.address" class="flex flex-col gap-4">
                                    <div class="w-full flex items-center justify-between">
                                        <span>Contact</span>
                                        <span>{{ order?.address?.contact }}</span>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Name</span>
                                        <span>{{ order?.address?.full_name }}</span>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Phone</span>
                                        <span>{{ order?.address?.phone }}</span>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Secondary Phone</span>
                                        <span>{{ order?.address?.secondary_phone }}</span>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Address</span>
                                        <span>{{ order?.address?.address }}</span>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Zone</span>
                                        <span>{{ order?.address?.zone }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 lg:pr-2">
                            <div class="p-4 bg-white mb-5 shadow-md">
                                <h3 class="text-lg mb-3">Customer Information</h3>
                                <div class="flex flex-col gap-4">
                                    <div class="w-full flex items-center justify-between">
                                        <span>Name</span>
                                        <span>{{ order?.customer?.name ?? order?.address?.full_name }}</span>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Phone</span>
                                        <span>{{ order?.customer?.phone ?? order?.address?.phone }}</span>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Email</span>
                                        <span>{{ order?.customer?.email ?? order?.address?.contact }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-2/6 lg:pl-5">
                    <div class="p-4 bg-white mb-5 shadow-md">
                        <h3 class="text-lg mb-4">Order Summary</h3>
                        <div class="flex flex-col gap-4">
                            <div class="w-full flex items-center justify-between">
                                <span>Order Created</span>
                                <span>{{ order?.order_date }}</span>
                            </div>
                            <div class="w-full flex items-center justify-between">
                                <span>Sub Total</span>
                                <span>{{ order?.sub_total }} TK</span>
                            </div>
                            <div class="w-full flex items-center justify-between">
                                <span>Delivery Fee</span>
                                <span>{{ order?.delivery_charge }} TK</span>
                            </div>
                            <div class="w-full flex items-center justify-between">
                                <span>Discount</span>
                                <span>{{ order?.discount }} TK</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-white shadow-md">
                        <div class="w-full flex items-center justify-between">
                            <span>Total</span>
                            <span class="font-bold text-xl text-black">{{ order?.grand_total }} TK</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </AppLayout>
</template>