<script setup>
import { inject, computed } from 'vue'
const data = inject('data');
const selectedBranch = computed({
  get() {
    return data?.value?.selectedBranch || (data?.value?.branch ? data.value.branch[0] : null)
  },
  set(value) {
    data.value.selectedBranch = value
  }
})
</script>

<template>
    <section class="py-10">
      <Container>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/4">
            <div class="p-3 w-full h-full bg-[#D8B3D7]">
                <div>
                  <h3 class="text-3xl sm:text-5xl lg:text-4xl py-3">Visit Our Stationery Shop</h3>
                  <p class="text-sm my-2">
                    If you love what you see online, why not visit our stationery shop in person? You can find us at:
                  </p>
                </div>
                <div class="relative" v-for="item in data?.branch" :key="item?.id">
                  <input type="radio" :id="item?.slug" :value="item" v-model="selectedBranch" name="brach" class="peer hidden" />
                  <span class="absolute h-full w-0.5 bg-primary top-0 bottom-0 left-0 hidden peer-checked:block"></span>
                   <label :for="item?.slug" class="block mb-2 pl-1">
                     <div class="flex items-center gap-2">
                       <Icon name="material-symbols:android-emergency-location-service" class="" />
                       <h3 class="text-lg font-light"> {{ item?.branch_name }}:</h3>
                     </div>
                     <ul class=" text-xs pl-7" >
                       <li class="mb-2">
                         {{ item?.address }}
                       </li>
                       <li>
                        {{ item?.service_period }}
                       </li>
                        <li class=" mb-2">
                          {{ item?.break_time }}
                        </li>
                       <li class="text-sm font-semibold">
                         {{ item?.contact_number }}
                       </li>
                     </ul>
                   </label>
                </div>
                <div>
                  <p class="text-sm">
                    Please note that our store does not carry the full range you see online, so if you are looking for something specific, we recommend you call or message before travelling, to ensure it is available in store.
                  </p>
                </div>
          </div>
          </div>
          <div class="w-full lg:w-3/4">
            <div class="flex flex-wrap h-full">
                <div class="w-full lg:w-1/2">
                  <div class="h-full w-full ">
                    <img class="w-full h-full object-cover" :src="selectedBranch?.branch_image_url">
                  </div>
                </div>
                <div class="w-full lg:w-1/2">
                  <div class="h-full" v-html="selectedBranch?.map"></div>
                </div>
            </div>
          </div>
          </div>
      </Container>
    </section>
</template>
