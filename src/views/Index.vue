
<script setup>
import HeroSection from "@/components/HomePage/HeroSection.vue";
import CategorySection from "@/components/HomePage/CategorySection.vue";
import ProductSection from "@/components/HomePage/ProductSection.vue";
import BlogSection from "@/components/HomePage/BlogSection.vue";
import VisitShopSection from "@/components/HomePage/VisitShopSection.vue";
import PolicySection from "@/components/HomePage/PolicySection.vue";
import Headline from "@/components/Layouts/Headline.vue";
import QualitySection from "@/components/HomePage/QualitySection.vue";
import ReviweSection from "@/components/HomePage/ReviweSection.vue";
import MoreStationarySection from "@/components/HomePage/MoreStationarySection.vue";
import HomepagePopup from "@/components/HomePage/HomepagePopup.vue";
import {ref, inject} from 'vue';
import NewArrivalsSection from "@/components/HomePage/NewArrivalsSection.vue";
import BestSellerSection from "@/components/HomePage/BestSellerSection.vue";
const data = inject('data');
</script>

<template>
  <AppLayout>
      <HomepagePopup v-if="data?.popup?.status" :popup="data?.popup" />
      <Headline />
      <HeroSection />
      <CategorySection />
      <NewArrivalsSection title="New Arrivals" :products="data?.new_arrivals"  />
      <BestSellerSection title="Best Seller" :products="data?.best_sellers"  />
      <QualitySection />
      <ReviweSection />
      <ProductSection :slug="`section-${section?.id}`" :title="section?.title" :products="section?.products" v-for="section in data?.home_section" :key="section?.id" />
      <MoreStationarySection />
      <BlogSection />
      <VisitShopSection />
      <PolicySection />
  </AppLayout>
</template>

<style scoped>

</style>


