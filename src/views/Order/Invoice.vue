<script setup>
import AppLayout from "@/components/Layouts/AppLayout.vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { onMounted, ref } from "vue";
import { useApi } from "vue-laravel-sanctum";
import { useRoute } from "vue-router";
// const data = inject('data');
const route = useRoute();
const authStore = useAuthStore();
// const printInvoice = (areaID) => {
//   var printContent = document.getElementById(areaID).innerHTML;
//   var originalContent = document.body.innerHTML;
//   document.body.innerHTML = printContent;
//   window.print();
//   document.body.innerHTML = originalContent;
// };
const printInvoice = () => {
  window.print();
}
const { $api } = useApi();
const order = ref(null);
const getOrder = async () => {
  const response = await $api(`/api/frontend/v1/order/${route?.params?.id}`, {
    method: 'get',
    headers: {
      authorization: `Bearer ${authStore?.user?.token}`,
    },
  });
  if (response) {
    order.value = response.data;
  }
}
onMounted(async () => {
  await getOrder();
});
</script>
<template>
  <AppLayout>
    <section class="overflow-hidden py-5">
      <div class="flex justify-center">
        <!-- <button class="bg-primary px-2 py-1 text-white" @click="printInvoice('areaOfPrient')">
          Print Invoice
        </button> -->
          <button class="bg-primary px-2 py-1 text-white" @click="printInvoice()">
          Print Invoice
        </button>
      </div>
      <div class="w-full max-w-2xl mx-auto p-3" id="areaOfPrient">
        <div class="border border-gray-300 py-10 px-5">
          <div class="flex justify-between pb-4">
            <div class="mb-4">
              <img class="w-32 h-auto" src="@/assets/images/mainlogo.webp" />
            </div>
            <div class="text-right">
              <h3 class="text-base font-medium mb-1">Invoice No. :{{ order?.order_code }}</h3>
              <ul class="flex flex-col gap-2 text-base font-medium">
                <li>Order Date: {{ order?.order_date }}</li>
              </ul>
            </div>
          </div>
          <div class="py-4">
            <h3 class="text-xl font-medium mb-3">Shipping Information</h3>
            <ul class="flex flex-col gap-3 text-sm">
              <li v-if="order?.address?.full_name">{{ order?.address?.full_name }}</li>
              <li v-if="order?.address?.phone">Phone: {{ order?.address?.phone }}</li>
              <li v-if="order?.address?.secondary_phone">Emergency Phone: {{ order?.address?.secondary_phone }}</li>
              <li v-if="order?.address?.address">Address: {{ order?.address?.address }}</li>
              <li v-if="order?.address?.zone">Zone: {{ order?.address?.zone }}</li>
            </ul>
          </div>
            <div class="pb-4">
            <span class="px-3 py-1 text-xl font-medium" :class="order?.payment_status === 'paid'
              ? 'bg-black text-white border border-black'
              : 'bg-black text-white border border-black'">
              {{ order?.payment_status === 'paid' ? 'Paid' : 'Due BILL : ' + order?.grand_total + ' TK' }}
            </span>
          </div>
          <!-- Invoice Description starts -->
          <table class="table w-full border border-gray-500 py-10">
            <thead>
              <tr class="border border-gray-500">
                <th class="py-1 px-3 text-left font-medium">Product</th>
                <th class="py-1 px-3 text-left font-medium">Variant</th>
                <th class="py-1 px-3 text-left font-medium">Quantity</th>
                <th class="py-1 px-3 text-left font-medium">Price</th>
                <th class="py-1 px-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in order?.order_details" :key="`single-details-item-${index}`">
                <td class="py-2 px-3 text-sm border-r border-b border-gray-500">
                  {{ item?.product?.title }}
                </td>
                <td class="p-2 text-left border-r border-b border-gray-500">
                  <p class="text-xs mb-1" v-if="item?.design">
                    Design: {{ item?.design }}
                  </p>
                  <p class="text-xs mb-1" v-if="item?.color">
                    Color: {{ item?.color }}
                  </p>
                  <p class="text-xs mb-1" v-if="item?.size">
                    Size: {{ item?.size }}
                  </p>
                </td>
                <td class="py-2 text-center border-r border-b border-gray-500">
                  {{ item?.quantity }}
                </td>
                <td class="py-2 text-center border-r border-b border-gray-500">
                  TK. {{ item?.price }}
                </td>
                <td class="py-2 text-center border-r border-b border-gray-500">
                  TK. {{ item?.total_amount }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-between pt-8">
            <div>
            </div>
            <div class="w-4/12">
              <div v-if="order?.sub_total" class="flex w-full justify-between items-center text-sm mb-2">
                <p>Sub Total</p>
                <p>TK. {{ order?.sub_total }}</p>
              </div>
              <div class="flex w-full justify-between items-center text-sm mb-2">
                <p>Delivery Charge</p>
                <p>TK. {{ order?.delivery_charge }}</p>
              </div>
              <div class="flex w-full justify-between items-center text-sm">
                <p>Discount</p>
                <p>TK. {{ order?.discount }}</p>
              </div>
              <hr class="my-4" />
              <div class="flex w-full justify-between items-center pt-2">
                <p class="font-semibold">Grand Total</p>
                <p class="font-semibold">TK. {{ order?.grand_total }}</p>
              </div>
            </div>
          </div>
          <div class="pt-10" v-if="order?.note">
            <h3 class="text-lg mb-3">Note</h3>
            <p class="text-sm">{{ order?.note }}</p>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>
<style>
@media print {
  body * {
    visibility: hidden;
  }

  #areaOfPrient, #areaOfPrient * {
    visibility: visible;
  }

  #areaOfPrient {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
