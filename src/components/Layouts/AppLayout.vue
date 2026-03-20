<script setup>
import Header from "@/components/Layouts/Header.vue";
import Footer from "@/components/Layouts/Footer.vue";
import MobileNav from "@/components/Layouts/MobileNav.vue";
</script>

<template>
  <MobileNav />
    <Header />
      <main class="pt-20 lg:pt-0">
	  	<slot />
	  </main>
    <Footer />
</template>

<style scoped>

</style>