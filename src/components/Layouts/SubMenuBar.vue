
<script setup>

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

</script>

  <template>
    <div class="card" >
      <Accordion value="0" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
        <AccordionPanel value="1">
          <AccordionHeader  >All Products </AccordionHeader>
          <AccordionContent class="bg-primary">
           <div class="flex flex-wrap ">
              <div class="w-1/2 px-1 mb-2" v-for="item in 4">
                <div class="flex items-center gap-2 bg-white py-2 px-1">
                  <div class="bg-primary size-8 min-w-8 rounded-full">
                  </div>
                  <p class="text-xs font-normal uppercase">
                    PAINT
                  </p>
                </div>
              </div>
             <RouterLink to="/products" class="text-white mx-auto underline text-xs pt-3">Discover All</RouterLink>
           </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2">
          <AccordionHeader >Categories</AccordionHeader>
          <AccordionContent class="bg-primary">
            <div class="flex flex-wrap ">
              <div class="w-1/2 px-1 mb-2" v-for="item in 4">
                <div class="flex items-center gap-2 bg-white py-2 px-1">
                  <div class="bg-primary size-8 min-w-8 rounded-full">
                  </div>
                  <p class="text-xs font-normal uppercase">
                    PAINT
                  </p>
                </div>
              </div>
              <RouterLink to="/categories" class="text-white mx-auto underline text-xs pt-3">Discover All</RouterLink>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </template>
<style scoped>

</style>

