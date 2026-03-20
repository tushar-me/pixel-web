<template>
  <AppLayout>
    <div class=" w-full flex justify-center items-center bg-white pt-10 pb-5 lg:py-20">
      <div class="w-[90%] max-w-4xl bg-white flex flex-wrap items-center shadow rounded-xl p-4 border">
        <div class="w-full lg:w-1/2 lg:pr-5 lg:pt-10">
          <h3 class="text-3xl font-semibold mb-2 text-center text-gray-600">Login</h3>
          <p class="text-center text-sm text-gray-500 mb-5">Already have an account? Please log in</p>
          <div class="pb-2">
            <!--            <label for="email" class="block pb-1 text-sm" :class="{' text-red-600': authStore?.error?.errors?.email}">Email</label>-->
            <input type="email" name="email" id="email" v-model="state.email"
              :class="{ ' border-red-600 text-red-600': authStore?.error?.errors?.email, 'border': !authStore?.error?.errors?.email }"
              class="block w-full p-2 shadow-sm border   focus:outline-none  placeholder:text-gray-400 px-3 mb-2"
              placeholder="Email">
            <span v-if="authStore?.error?.errors?.email" v-for="item in authStore?.error?.errors?.email"
              class="text-sm font-normal text-red-600 block mb-1">{{ item }}</span>
          </div>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" name="password" v-model="state.password" id="password"
              :class="{ ' border-red-600': authStore?.error?.errors?.password, 'border': !authStore?.error?.errors?.password }"
              class="block w-full p-2 shadow-sm border focus:outline-none placeholder:text-gray-400 px-3 mb-2 pr-10"
              placeholder="Password">
            <span class="absolute right-3 top-2 cursor-pointer" @click="showPassword = !showPassword">
              <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="text-gray-500 text-xl" />
            </span>
            <span v-if="authStore?.error?.errors?.password" v-for="item in authStore?.error?.errors?.password"
              class="text-sm font-normal text-red-600 block mb-1">{{ item }}</span>
          </div>

          <div class=" py-2">
            <p class="text-sm text-gray-500 mb-3">Forgot your password?</p>
            <button v-if="authStore?.loading"
              class="py-2 w-full bg-primary flex items-center justify-center rounded-full text-white font-semibold text-lg hover:bg-secondary transition-all ease-in-out duration-500r"
              disabled>
              <Icon name="svg-spinners:ring-resize" class="text-2xl" />
            </button>
            <button v-else
              class="py-2 w-full bg-primary rounded-full text-white font-semibold text-lg hover:bg-secondary transition-all ease-in-out duration-500"
              @click="handleLogin">Sign In</button>
          </div>

          <!-- OR Divider -->
          <div class="flex items-center my-4">
            <div class="flex-1 h-px bg-gray-300"></div>
            <span class="px-3 text-gray-500 text-sm">OR</span>
            <div class="flex-1 h-px bg-gray-300"></div>
          </div>

          <!-- Login with Google Button -->
          <button
            class="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition"
            @click="handleGoogleLogin">
            <Icon name="logos:google-icon" class="text-xl" />
            Login with Google
          </button>

          <RouterLink :to="{ path: '/register', query: { redirect: route.query.redirect || '/dashboard' } }"
            @click="authStore.error = null" class="text-primary text-center font-semibold underline block pt-4">Create a
            Pixels account
          </RouterLink>
        </div>
        <div class="hidden lg:block w-1/2">
          <img class="w-full h-auto object-cover rounded" src="@/assets/images/login.jpg" alt="">
        </div>
      </div>
    </div>
    <PolicySection />
  </AppLayout>
</template>

<script setup>
import { ref, computed ,onMounted} from 'vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { useRouter, useRoute } from 'vue-router';
import PolicySection from "@/components/HomePage/PolicySection.vue";
import Dashboard from '../Customer/Dashboard.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const state = ref({
  email: '',
  password: ''
});
const showPassword = ref(false);

const handleLogin = async () => {
  await authStore.login(state.value);
  const redirectPath = route.query.redirect || '/dashboard';
  router.push(redirectPath);
}

const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/google/redirect`;
};


onMounted(() => {
    if (route.query.token) {
        const user = {}
        for (const key in route.query) {
            if (key.startsWith("user[")) {
                const cleanKey = key.replace("user[", "").replace("]", "")
                user[cleanKey] = route.query[key]
            }
        }
        authStore.socialLoginCallback({
            token: route.query.token,
            user
        })
       router.push('/dashboard') 
    }
})
</script>