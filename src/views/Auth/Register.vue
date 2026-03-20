<template>
  <AppLayout>
    <div class=" w-full flex justify-center items-center bg-white pt-10 pb-5 lg:py-10">
      <div class="w-[90%] max-w-4xl bg-white flex flex-wrap rounded-xl shadow border items-center p-4">
        <div class="w-full lg:w-1/2 lg:pr-5 lg:pt-10">
          <h3 class="text-3xl font-semibold mb-2 text-center text-gray-600  ">Create a Pixels Account</h3>
          <div class="flex flex-col gap-2">
            <div class="">
              <!--            <label for="email" class="block pb-1 text-sm" :class="{' text-red-600': authStore?.error?.errors?.name}">Name</label>-->
              <input type="text" name="name" id="name" v-model="state.name"
                :class="{ ' text-red-600 border-red-600': authStore?.error?.errors?.name, 'border': !authStore?.error?.errors?.name }"
                class="block w-full  p-2 shadow-sm border focus:outline-none  placeholder:text-gray-400 px-3 mb-2"
                placeholder="Full Name">
              <span v-if="authStore?.error?.errors?.name" v-for="item in authStore?.error?.errors?.name"
                class="text-sm font-normal text-red-600 block mb-1">{{ item }}</span>
            </div>
            <div class="">
              <!--            <label for="email" class="block pb-1 text-sm"  :class="{' text-red-600': authStore?.error?.errors?.phone}">Phone</label>-->
              <input type="text" name="phone" id="phone" v-model="state.phone"
                :class="{ ' text-red-600 border-red-600': authStore?.error?.errors?.phone, 'border': !authStore?.error?.errors?.phone }"
                class="block w-full  p-2 shadow-sm border  focus:outline-none  placeholder:text-gray-400 px-3 mb-2"
                placeholder="Contact Number">
              <span v-if="authStore?.error?.errors?.phone" v-for="item in authStore?.error?.errors?.phone"
                class="text-sm font-normal text-red-600 block mb-1">{{ item }}</span>
            </div>
            <div class="">
              <!--            <label for="email" class="block pb-1 text-sm"  :class="{' text-red-600': authStore?.error?.errors?.email}">Email</label>-->
              <input type="email" name="email" id="email" v-model="state.email"
                :class="{ ' text-red-600 border-red-600': authStore?.error?.errors?.email, 'border': !authStore?.error?.errors?.email }"
                class="block w-full  p-2 shadow-sm border focus:outline-none  placeholder:text-gray-400 px-3 mb-2"
                placeholder="Email">
              <span v-if="authStore?.error?.errors?.email" v-for="item in authStore?.error?.errors?.email"
                class="text-sm font-normal text-red-600 block mb-1">{{ item }}</span>
            </div>

            <div class="">
              <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" name="password" v-model="state.password" id="password"
                  :class="{ ' text-red-600 border-red-600': authStore?.error?.errors?.password, 'border': !authStore?.error?.errors?.password }"
                  class="block w-full p-2 shadow-sm border focus:outline-none placeholder:text-gray-400 px-3 mb-2 pr-10"
                  placeholder="Password">
                <span class="absolute right-3 top-2 cursor-pointer" @click="showPassword = !showPassword">
                  <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="text-gray-500 text-xl" />
                </span>
              </div>
              <span v-if="authStore?.error?.errors?.password" v-for="item in authStore?.error?.errors?.password"
                class="text-sm font-normal text-red-600 block mb-1">{{ item }}</span>
            </div>

            <div class="">
              <div class="relative">
                <input :type="showConfirmPassword ? 'text' : 'password'" name="confirm_password"
                  v-model="state.confirm_password" id="confirm_password"
                  :class="{ ' text-red-600 border-red-600': authStore?.error?.errors?.confirm_password, 'border': !authStore?.error?.errors?.confirm_password }"
                  class="block w-full p-2 shadow-sm border focus:outline-none placeholder:text-gray-400 px-3 mb-2 pr-10"
                  placeholder="Confirm Password">
                <span class="absolute right-3 top-2 cursor-pointer" @click="showConfirmPassword = !showConfirmPassword">
                  <Icon :name="showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'" class="text-gray-500 text-xl" />
                </span>
              </div>
              <span v-if="authStore?.error?.errors?.confirm_password"
                v-for="item in authStore?.error?.errors?.confirm_password"
                class="text-sm font-normal text-red-600 block mb-1">{{ item }}</span>
            </div>


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
            Continue with Google
          </button>

          <div class="text-center py-5">
            <button v-if="authStore?.loading"
              class="py-2 w-full bg-primary flex items-center justify-center rounded-full text-white font-semibold text-lg hover:bg-secondary transition-all ease-in-out duration-500"
              disabled>
              <Icon name="svg-spinners:ring-resize" class="text-2xl" />
            </button>
            <button v-else
              class="py-2 w-full bg-primary rounded-full text-white font-semibold text-lg hover:bg-secondary transition-all ease-in-out duration-500"
              @click="handleRegister">Create Account</button>
          </div>
          <p class="text-sm text-center">Already Have an Account ?
            <RouterLink to="/login" @click="authStore.error = null" class="text-primary font-semibold underline  pt-4">
              Login</RouterLink>
          </p>

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
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore.js'
import { useRouter, useRoute } from 'vue-router'
import { toast } from "vue3-toastify";
import PolicySection from "@/components/HomePage/PolicySection.vue";

const authStore = useAuthStore();
const router = useRouter()
const route = useRoute()

const state = ref({
  email: null,
  name: null,
  phone: null,
  password: null,
  confirm_password: null,
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleRegister = async () => {

  if (state.value.password !== state.value.confirm_password) {
    toast.error("Passwords do not match", { autoClose: 1000 });
    return;
  }
  const response = await authStore.signup(state.value);
  if (response) {
    toast.success('Account Created Successfully', { autoClose: 500 });
    const redirectPath = route.query.redirect || '/dashboard';
    router.push(redirectPath);
  }
}
const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/google/redirect`;
};

</script>