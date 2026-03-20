
<script setup  >
import Container from "@/components/Container.vue";
</script>

<template>
  <section class="bg-[#A7226B] py-6 lg:py-14">
    <Container>
        <div>
          <h2 class="text-4xl sm:text-5xl  text-white font-medium pb-6 lg:pb-8">Why Choose Pixels?</h2>
        </div>
      <div class="flex  flex-wrap  -mx-1">
        <div class="w-full  lg:w-1/4 px-1 mb-3">
          <div class="flex items-center">
            <div class="size-16 min-w-20">
              <img class="w-full h-full object-cover" src="@/assets/images/2.svg" alt="">
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-base text-white font-medium">Excellent Customer Service</p>
              <p class="text-xs text-white">
                Enjoy extraordinary before & after sales customer service
                for any kind of issues faced with the provided products.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full  lg:w-1/4 px-1  mb-3">
          <div class="flex items-center">
            <div class="size-16 min-w-20">
              <img class="w-full h-full object-cover" src="@/assets/images/3.svg" alt="">
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-base text-white font-medium">Fast & Secure Delivery</p>
              <p class="text-xs text-white">
                Customers usually receives their orders within 3 days
                accross the country.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full  lg:w-1/4 px-1  mb-3">
          <div class="flex items-center">
            <div class=" size-16 min-w-20">
              <img class="w-full h-full object-cover" src="@/assets/images/4.svg" alt="">
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-base text-white font-medium">Smooth Return & Exchange Policy</p>
              <p class="text-xs text-white">
                Check your parcel infront of the delivery person.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full  lg:w-1/4 px-1">
          <div class="flex items-center">
            <div class="size-16 min-w-20">
              <img class="w-full h-full object-cover" src="@/assets/images/1.svg" alt="">
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-base text-white font-medium">Trusted by Thousands</p>
              <p class="text-xs text-white">
                We have 700+ returning customers every month and
                thousands of reviews on social media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>