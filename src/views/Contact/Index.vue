<template>
  <AppLayout>
    <section>
      <div class="mb-4">
        <img class="w-full h-auto " src="@/assets/images/contact-banner.jpg" alt="Contact">
      </div>
      <Container>
        <div class="bg-[#ffffff] flex flex-col items-center justify-center min-h-screen px-12 pt-12 py-8">
          <div
            class="relative w-full max-w-6xl bg-[#f4edf8] rounded-2x0 shadow-xl card-group flex flex-col md:flex-row text-white font-medium">

            <div
              class="flex-1 bg-[#662773] p-12 text-center zoom-card cursor-pointer rounded-t-2x0 md:rounded-l-2x0 md:rounded-tr-none">
              <div class="text-4xl mb-2">
                <lord-icon src="https://cdn.lordicon.com/ntutieqm.json" trigger="loop"
                  colors="primary:#fad1e6,secondary:#ebe6ef" style="width:70px;height:70px">
                </lord-icon>
              </div>
              <h3 class="text-lg font-semibold mb-1">Hotline</h3>
              <p class="text-sm opacity-90 leading-tight">
                01992636297<br>11AM – 8PM
              </p>
            </div>
            <a href="https://wa.me/8801752898448" target="_blank"
              class="flex-1 bg-[#9855a6] p-12 text-center zoom-card cursor-pointer">
              <div class="text-4xl mb-2">
                <lord-icon src="https://cdn.lordicon.com/edecmgef.json" trigger="loop" state="hover-draw"
                  colors="primary:#d2ffbf,secondary:#ebe6ef" style="width:70px;height:70px">
                </lord-icon>
              </div>
              <h3 class="text-lg font-semibold mb-1">WhatsApp</h3>
              <p class="text-sm opacity-90 leading-tight">
                01752 898 448
              </p>
            </a>
            <a href="https://facebook.com/pixelsultra" target="_blank"
              class="flex-1 bg-[#ba7ecc] p-12 text-center zoom-card cursor-pointer">
              <div class="text-4xl mb-2">
                <lord-icon src="https://cdn.lordicon.com/kwttodke.json" trigger="loop" state="loop-roll"
                  colors="primary:#8c43cc,secondary:#b3dbff" style="width:70px;height:70px">
                </lord-icon>
              </div>
              <h3 class="text-lg font-semibold mb-1">Facebook</h3>
              <p class="text-sm opacity-90 leading-tight">
                Pixels
              </p>
            </a>
            <a href="https://instagram.com/pixels.ultra" target="_blank"
              class="flex-1 bg-[#cc91e3] p-12 text-center zoom-card cursor-pointer">
              <div class="text-4xl mb-2">
                <lord-icon src="https://cdn.lordicon.com/wgtaryar.json" trigger="loop" state="hover-rotate"
                  colors="primary:#9e1059,secondary:#ff3b9a" style="width:70px;height:70px">
                </lord-icon>
              </div>
              <h3 class="text-lg font-semibold mb-1">Instagram</h3>
              <p class="text-sm opacity-90 leading-tight">
                @pixels.ultra
              </p>
            </a>

            <div
              class="flex-1 bg-[#daa7e8] p-8 text-center zoom-card cursor-pointer rounded-b-2x0 md:rounded-r-2x0 md:rounded-bl-none"
              @click="sendEmail">
              <div class="text-4xl mb-2">
                <lord-icon src="https://cdn.lordicon.com/ipyszerf.json" trigger="loop" state="in-reveal"
                  colors="primary:#a61e85,secondary:#f74a4a" style="width:70px;height:70px">
                </lord-icon>
              </div>
              <h3 class="text-lg font-semibold mb-1">Email</h3>
              <p class="text-sm opacity-90 leading-tight">
                pixelsultra@gmail.com
              </p>
            </div>
          </div>

          <div class="w-full max-w-xl p-8 mt-16 rounded-2xl shadow-lg bg-[#fde8ff] text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-[#4c2746] mb-4">Stay in the loop!</h2>
            <p class="text-[#6b4d7e] mb-6">Subscribe to our newsletter for updates, <br><b>surprise offers</b>, and
              creative
              inspiration ✨</p>

            <form @submit.prevent="subscribe" class="flex flex-col md:flex-row items-center gap-4">
              <input v-model="email" type="email" required placeholder="Enter your email"
                class="flex-1 w-full px-4 py-3 rounded-xl border border-[#d4c0e3] focus:outline-none focus:ring-2 focus:ring-[#a77cc2] transition" />
              <button type="submit"
                class="bg-[#6b4d7e] text-white px-6 py-3 rounded-xl w-full md:w-auto transition duration-300 ease-in-out hover:bg-[#fa210a] hover:shadow-lg animate-pulse-glow">
                <b>Subscribe</b>
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
    <VisitShopSection />
    <PolicySection />
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VisitShopSection from "@/components/HomePage/VisitShopSection.vue";
import PolicySection from "@/components/HomePage/PolicySection.vue";
const email = ref('')

const callPhone = () => {
  window.location.href = 'tel:01992636297'
}

const sendEmail = () => {
  window.location.href = 'mailto:pixelsultra@gmail.com'
}

const subscribe = () => {
  alert(`Thank you for subscribing with ${email.value}!`)
  email.value = ''
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.lordicon.com/lordicon.js'
  document.head.appendChild(script)
})
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif;
}

.card-group {
  overflow: visible;
}

.zoom-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
  z-index: 0;
}

.zoom-card:hover {
  transform: scale(1.15);
  z-index: 10;
  box-shadow: 0 10px 30px rgba(126, 89, 185, 0.4), 0 0 20px rgba(126, 89, 185, 0.3);
}

@keyframes pulseGlow {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(108, 67, 125, 0.5);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 2s infinite;
}
</style>