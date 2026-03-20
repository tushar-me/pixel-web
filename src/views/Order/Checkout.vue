<template>
  <AppLayout>
    <section class="bg-white">
      <Container>
        <div class="flex flex-wrap justify-center py-9 lg:py-10">
          <div class="w-full lg:w-1/2 lg:pr-5 mb-5 ">
            <div class=" p-3">

              <p class="text-base font-semibold mb-2">Contact</p>
              <input v-model="form.contact" type="text" id="contact" name="contact"
                class="p-2 w-full border border-gray-400" placeholder="Email or Phone Number"
                :class="{ 'border-red-600': error?.errors?.contact }">
              <template v-if="error?.errors?.contact">
                <p v-for="(item, index) in error?.errors?.contact" :key="index"
                  class="text-red-600 text-sm font-normal">
                  {{ item }}
                </p>
              </template>
              <div class="flex items-center gap-1 pt-2 ">
                <input type="checkbox" />
                <p class="text-xs text-gray-500 ">Email me with newsletter and offers</p>
              </div>
            </div>
            <p class="text-base font-semibold px-2">Delivery</p>
            <div class="flex flex-wrap bg-white  p-3 lg:shadow-md">
              <div class="w-full lg:w-1/2 px-2 mb-4">
                <input v-model="form.name" type="text" id="name" name="name" class="p-2  w-full border border-gray-400"
                  placeholder="Full Name" :class="{ 'border-red-600': error?.errors?.name }">
                <template v-if="error?.errors?.name">
                  <p v-for="(item, index) in error?.errors?.name" :key="index" class="text-red-600 text-sm font-normal">
                    {{ item }}
                  </p>
                </template>
              </div>

              <div class="w-full lg:w-1/2 px-2 mb-4">
                <input v-model="form.phone" type="text" name="phone" id="phone"
                  class="p-2  w-full border border-gray-400" placeholder="Primary Contact Number"
                  :class="{ 'border-red-600': error?.errors?.phone }">
                <template v-if="error?.errors?.phone">
                  <p v-for="(item, index) in error?.errors?.phone" :key="index"
                    class="text-red-600 text-sm font-normal">
                    {{ item }}
                  </p>
                </template>
              </div>
              <div class="w-full lg:w-1/2 px-2 mb-4">
                <input v-model="form.secondary_phone" type="text" class="p-2  w-full border border-gray-400"
                  placeholder="Secondary Contact Number" :class="{ 'border-red-600': error?.errors?.secondary_phone }">
                <template v-if="error?.errors?.secondary_phone">
                  <p v-for="(item, index) in error?.errors?.secondary_phone" :key="index"
                    class="text-red-600 text-sm font-normal">
                    {{ item }}
                  </p>
                </template>
              </div>
              <div class="w-full px-2 mb-4">
                <textarea v-model="form.address" type="text" id="address" name="address"
                  class="p-2  w-full border border-gray-400" placeholder="Address"
                  :class="{ 'border-red-600': error?.errors?.address }">
    </textarea>
                <template v-if="error?.errors?.address">
                  <p v-for="(item, index) in error?.errors?.address" :key="index"
                    class="text-red-600 text-sm font-normal">
                    {{ item }}
                  </p>
                </template>
              </div>
              <div class="w-full px-2 mb-4">
                <Dropdown v-model="selectedDeliveryCharge" :options="delivery_charges" optionLabel="label"
                  placeholder="Select Zone" class="w-full" />
              </div>
              <div class="flex items-center gap-1">
                <input type="checkbox" />
                <p class="text-xs text-gray-500 ">Save this information for the next time</p>
              </div>
              <div class="w-full">
                <p class="text-base font-semibold mt-5">Note</p>
                <textarea v-model="form.note"
                  class="w-full h-20 foucs:outline-none focus:border-primary p-2 border border-gray-400"></textarea>
              </div>
            </div>
            <div class="mt-9">
              <p class="text-base font-semibold my-3">Shipping Charge upto 1 kg</p>
              <ul>
                <li>
                  <!-- <input v-model="form.delivery_charge" value="70" class="hidden peer" type="radio" id="inside-dhaka" name="delivery-charge"> -->
                  <label for="inside-dhaka"
                    class="border p-3 flex text-xs lg:text-base justify-between peer-checked:bg-primary peer-checked:text-white">
                    <span>Inside Dhaka City</span>
                    <span class="font-semibold ">Tk. 70</span>
                  </label>
                </li>
                <li>
                  <!-- <input v-model="form.delivery_charge" value="100" class="hidden peer" type="radio" id="dhaka-suburbs" name="delivery-charge"> -->
                  <label for="dhaka-suburbs"
                    class="border p-3 flex text-xs lg:text-base justify-between peer-checked:bg-primary peer-checked:text-white">
                    <span>Dhaka Suburbs*</span>
                    <span class="font-semibold">Tk. 100</span>
                  </label>
                </li>
                <li>
                  <!-- <input v-model="form.delivery_charge" value="130" class="hidden peer" type="radio" id="outside-dhaka" name="delivery-charge"> -->
                  <label for="outside-dhaka"
                    class="border p-3 flex text-xs lg:text-base justify-between peer-checked:bg-primary peer-checked:text-white">
                    <span>Outside Dhaka City</span>
                    <span class="font-semibold ">Tk. 130</span>
                  </label>
                </li>
              </ul>
              <p class="text-xs lg:text-base px-3 text-gray-500 py-2">After 1 KG Tk. 20 will be added for every kilogram
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2">
            <div class="bg-white lg:shadow-lg p-4">
              <div v-if="data?.all_coupons && data?.all_coupons.length > 0">
                <p>Coupon</p>
                <div class="flex items-center">
                  <input v-model="couponCode" type="text" placeholder="Enter coupon code"
                    class="border border-primary focus:outline-none p-2 w-full text-sm" />
                  <button @click="applyCoupon" :disabled="!couponCode" class="bg-primary text-white px-5 py-3 text-xs">
                    Apply
                  </button>
                </div>
                <span v-if="discount && couponCode" class="block text-sm font-medium text-primary mt-1">Congratulations!
                  You got TK.{{ discount }} discount.</span>
              </div>
              <div>
                <p class="text-base font-semibold my-4">Payment</p>
                <ul>
                  <li>
                    <input type="radio" value="COD" id="cod" name="payment_method" v-model="form.payment_method"
                      class="peer hidden">
                    <label for="cod"
                      class="flex items-center text-xs lg:text-base justify-between  border border-primary border-b-0 p-3 peer-checked:bg-primary peer-checked:text-white">
                      <span>Cash on Delivery</span>
                      <img class="w-10 h-auto" src="@/assets/images/COD.svg" alt="">
                    </label>
                  </li>
                  <li>
                    <input type="radio" value="sslcommerz" id="sslcommerz" name="payment_method"
                      v-model="form.payment_method" class="peer hidden">
                    <label for="sslcommerz"
                      class="flex items-center text-xs lg:text-base justify-between border border-primary p-3  peer-checked:bg-primary peer-checked:text-white">
                      <span>Online Payment</span>
                      <div class="flex gap-2">
                        <img class="w-10 h-auto" src="@/assets/images/Bkash.svg" alt="">
                        <img class="w-10 h-auto" src="@/assets/images/nagad.svg" alt="">
                        <img class="w-10 h-auto" src="@/assets/images/Visa.svg" alt="">
                        <img class="w-10 h-auto" src="@/assets/images/Mastercard.svg" alt="">
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
              <div>
                <p class="text-base font-semibold my-4">Order Summary</p>
                <ul>
                  <li class="flex items-center justify-between text-xs lg:text-base  border p-3 "
                    v-for="item in cartStore?.cartItems" :key="item?.id">
                    <div>
                      <p class="">{{ item?.product?.title }} x {{ item?.quantity }}</p>
                      <div class="text-xs flex flex-col gap-1 lg:hidden">
                        <span v-if="item?.design">Design: {{ item?.design }}</span>
                        <span v-if="item?.color">Color: {{ item?.color }}</span>
                        <span v-if="item?.size">Size: {{ item?.size }}</span>
                      </div>
                    </div>
                    <div class="text-xs items-center gap-1 hidden lg:flex">
                      <span v-if="item?.design">Design: {{ item?.design }}</span>
                      <Icon v-if="item?.color" name="ci:dot-05-xl" />
                      <span v-if="item?.color">Color: {{ item?.color }}</span>
                      <Icon v-if="item?.size && item?.color" name="ci:dot-05-xl" />
                      <span v-if="item?.size">Size: {{ item?.size }}</span>
                    </div>
                    <p class=" font-semibold">Tk. {{ item?.price * item?.quantity }}</p>
                  </li>
                  <li v-if="discount" class="flex justify-between p-3 border text-xs lg:text-base font-semibold">
                    <p>Coupon Discount</p>
                    <p>Tk. {{ discount }}</p>
                  </li>
                  <li class="flex justify-between p-3 border text-xs lg:text-base font-semibold">
                    <p>Delivery Charge</p>
                    <div>
                      <p class="text-end">Tk. {{ form?.delivery_charge }}</p>
                      <p v-if="extraDeliveryCharge > 0" class="text-xs font-normal text-end">
                        Weight {{ extraDeliveryCharge / 20 }} KG +{{ extraDeliveryCharge }} TK</p>
                    </div>
                  </li>
                  <li class="flex justify-between p-3 border text-xs lg:text-base font-semibold">
                    <p>Total</p>
                    <p>Tk. {{ Number(form?.grand_total).toFixed(0) }}</p>
                  </li>
                </ul>
              </div>

              <div class="flex flex-col gap-3 mt-5 ">
                <div>
                  <div class="flex gap-2 py-2">
                    <input type="checkbox" v-model="agreeToTerms" id="agree" />
                    <p class="text-[12px] text-black">
                      I AGREE TO THE
                      <RouterLink to="/terms-and-conditions" class="underline hover:text-primary">
                        TERMS & CONDITIONS
                      </RouterLink>,
                      <RouterLink to="/privacy-policy" class="underline  hover:text-primary">
                        PRIVACY POLICY
                      </RouterLink>, &
                      <RouterLink to="/return-refund-policy" class="underline  hover:text-primary">
                        RETURN & REFUND POLICY
                      </RouterLink>
                    </p>
                  </div>
                </div>
                <button v-if="loading"
                  class="py-2 w-full bg-primary flex items-center justify-center  text-white font-semibold text-lg"
                  disabled>
                  <Icon name="svg-spinners:ring-resize" class="text-2xl" />
                </button>
                <button v-else @click="placeOrder"
                  class="bg-primary text-white text-center py-3 font-medium">CONFIRM</button>
                <!-- <button class="bg-primary text-white text-center py-3 font-medium">PAY NOW</button> -->
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>


    <div class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 w-full h-screen  flex items-center justify-center"
      :class="{ 'z-40': confirmBox, '-z-40': !confirmBox }">
      <div class="bg-white w-full max-w-2xl z-50  fixed transition-all ease-in-out duration-500"
        :class="{ 'opacity-100 z-50': confirmBox, 'opacity-0 -z-10': !confirmBox }">
        <div>
          <div v-html="data?.order_confirmation_message"></div>
          <p class="text-sm lg:text-lg text-center font-semibold text-[#77468C]">Your Order Number: {{ order?.order_code
          }}</p>
        </div>
        <div class="flex items-center justify-between p-4">
          <RouterLink :to="`/order-detail/${order?.id}`" class=" underline text- font-semibold  text-[#77468C]">View
            Order</RouterLink>
          <RouterLink to="/" class="underline text-base font-semibold  text-[#77468C]">Go to Home Page</RouterLink>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/Layouts/AppLayout.vue";
import { useCartStore } from "@/stores/useCartStore.js";
import { useAuthStore } from '@/stores/useAuthStore.js';
import { useApi } from "vue-laravel-sanctum";
const authStore = useAuthStore();
import { ref, onMounted, inject, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Container from "@/components/Container.vue";
import { toast } from "vue3-toastify";
import useAxios from '@/composables/useAxios.js'

const cartStore = useCartStore();
const data = inject('data');
const confirmBox = ref(false);
const order = ref(null);
const agreeToTerms = ref(false);
const delivery_charges = [
  {
    value: 70,
    charge: 70,
    label: 'Inside Dhaka City'
  },
  {
    value: 100,
    charge: 100,
    label: 'Dhaka Suburbs*'
  },
  {
    value: 130,
    charge: 130,
    label: 'Outside Dhaka City'
  },
];


const { sendRequest, error, loading } = useAxios();
const selectedDeliveryCharge = ref(delivery_charges[0]);
const router = useRouter();
const couponCode = ref("");
let discount = ref(0);
const applyCoupon = () => {
  const enteredCode = couponCode.value.trim();
  const cartTotal = Number(cartStore?.totalAmount);
  const coupon = data.value.all_coupons.find(
    (c) => c.code.trim() === enteredCode
  );

  if (!coupon) {
    toast.warning(`Invalid coupon code`, { autoclose: 500 });
    discount.value = 0;
    return;
  }
  if (cartTotal < Number(coupon.min_purchase_amount)) {
    toast.warning(
      `Minimum purchase amount of ৳${coupon.min_purchase_amount} required for this coupon.`,
      { autoclose: 800 }
    );
    discount.value = 0;
    return;
  }
  if (coupon.type == "fixed_amount") {
    discount.value = coupon.discount;
  } else if (coupon.type == "percentage") {
    discount.value = (cartTotal * Number(coupon.discount)) / 100;
  }

  toast.success(`Coupon "${coupon.code}" applied!`, { autoclose: 800 });
};

const extraDeliveryCharge = computed(() => {
  const totalWeight = cartStore?.cartItems?.reduce((acc, item) => {
    const weight = item?.product?.weight || 0;
    const quantity = item?.quantity || 0;
    return acc + quantity * weight;
  }, 0);

  const extraKg = Math.max(0, totalWeight - 1);
  return Math.ceil(extraKg) * 20;
});

const form = ref({
  user_id: computed(() => authStore?.user?.user?.id),
  contact: null,
  name: null,
  note: null,
  address: null,
  zone: computed(() => selectedDeliveryCharge.value?.label),
  phone: null,
  secondary_phone: null,
  payment_method: 'COD',
  delivery_charge: computed(() => selectedDeliveryCharge.value?.charge),
  order_items: computed(() => cartStore?.cartItems),
  sub_total: computed(() => cartStore?.totalAmount),
  discount: computed(() => discount.value),
  grand_total: computed(() => (Number(cartStore?.totalAmount) + Number(form.value.delivery_charge) + extraDeliveryCharge.value) - Number(discount.value)),
})
const placeOrder = async () => {
  if (!agreeToTerms.value) {
    toast.error("You must agree to the terms & conditions before placing the order.");
    return;
  }
  const headers = {};
  if (authStore?.user?.token) {
    headers.authorization = `Bearer ${authStore?.user?.token}`;
  }

  const response = await sendRequest({
    url: '/frontend/v1/order',
    method: "POST",
    data: form.value,
    headers: headers,
  });
  if (response) {
    if (response?.data?.order) {
      if (!authStore.user) {
        localStorage.setItem('guest_order_id', response.data.order.id);
      }
      cartStore.clearCart();
      order.value = response?.data?.order;
      confirmBox.value = true;
      router.push({ path: '/success', query: { order_code: order.value.id } });
    } else if (response?.data?.data) {
      window.location.href = response.data.data;
    }
    else {
      toast.error(response?.response?.data?.message);
    }
  }
};

onMounted(() => {
  cartStore.fetchCartItems();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "begin_checkout",
    ecommerce: {
      currency: "BDT",
      value: cartStore.totalAmount,
      items: cartStore.cartItems.map((item) => ({
        item_id: item.product_id,
        item_name: item.product?.title || item.title,
        price: item.price,
        item_brand: "Pixels",
        item_category: "Uncategorized",
        item_variant: (item.design || "") + (item.color ? "-" + item.color : "") + (item.size ? "-" + item.size : ""),
        quantity: item.quantity,
      })),
    },
  });
  console.log('GA4: begin_checkout pushed');
});
</script>
