<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
  popup: {
    type: Object,
    default: null,
  },
});
const isVisible = ref(false);
const dontShowAgain = ref(false);
const STORAGE_KEY = 'pixels_popup_dismissed';
onMounted(() => {
  const dismissed = localStorage.getItem(STORAGE_KEY);
  if (dismissed) {
    const dismissedDate = new Date(dismissed);
    const now = new Date();
    const hoursDiff = (now - dismissedDate) / (1000 * 60 * 60);
    if (hoursDiff < 24) {
      return;
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  
  if (props.popup && props.popup.status === false) {
     return;
  }

  setTimeout(() => {
    isVisible.value = true;
  }, 800);
});
function closeModal() {
  if (dontShowAgain.value) {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  }
  isVisible.value = false;
}
function closeOnBackdrop() {
  closeModal();
}
</script>
<template>
  <Transition name="popup-fade">
    <div v-if="isVisible" class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      @click.self="closeOnBackdrop">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeOnBackdrop"></div>
      <div class="popup-box relative w-full max-w-lg  bg-white shadow-2xl overflow-hidden rounded-sm">
        <button
          class="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-95"
          @click="closeModal" aria-label="Close popup">
          <Icon name="material-symbols:close" class="text-gray-700 text-xl" />
        </button>
        <div class="relative overflow-hidden w-full">
          <a v-if="popup?.link" :href="popup.link" class="block">
            <img v-if="popup?.image" :src="popup.image" :alt="popup?.title || 'Promotion'"
              class="w-full h-auto object-cover object-center" />
          </a>
          <img v-else-if="popup?.image" :src="popup.image" :alt="popup?.title || 'Promotion'"
            class="w-full h-auto object-cover object-center" />
        </div>
        <div class="px-6 py-3 bg-white">
          <div class="flex items-center gap-2">
            <input id="dontShowAgain" v-model="dontShowAgain" type="checkbox"
              class="w-4 h-4 accent-primary cursor-pointer" />
            <label for="dontShowAgain"
              class="text-xs text-gray-500 cursor-pointer select-none hover:text-gray-700 transition-colors">
              Don't show this again today
            </label>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.35s ease;
}

.popup-fade-enter-active .popup-box,
.popup-fade-leave-active .popup-box {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

.popup-fade-enter-from .popup-box {
  transform: scale(0.88) translateY(20px);
  opacity: 0;
}

.popup-fade-leave-to .popup-box {
  transform: scale(0.92) translateY(10px);
  opacity: 0;
}
</style>
