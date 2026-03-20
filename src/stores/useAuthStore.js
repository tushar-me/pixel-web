import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref(JSON.parse(localStorage.getItem('user')) ?? null);
    const isLoggedIn = computed(() => !!user.value);
    const error = ref(null);
    const loading = ref(false);

    async function fetchUser() {
        loading.value = true;
        error.value = null;
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser?.token) {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
                    headers: {
                        "Authorization": `Bearer ${storedUser.token}`
                    }
                });
                if (response?.data) {
                   return;
                } else {
                    await clearLocalStorage();
                }
            } else {
                await clearLocalStorage();
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            error.value = err.response?.data?.message || "Failed to fetch user data.";
            await clearLocalStorage();
        } finally {
            loading.value = false;
        }
    }

    async function login(credential) {
        loading.value = true;
        error.value = null;
        try {
            await axios.get(`${import.meta.env.VITE_APP_URL}/sanctum/csrf-cookie`);
            const loginResponse = await axios.post(`${import.meta.env.VITE_API_URL}/customer/login`, credential);
            if (loginResponse.data) {
                await setLocalStorage(loginResponse.data);
                user.value = loginResponse.data;
                return loginResponse;
            }
        } catch (err) {
            error.value = err.response?.data || "Login failed. Please try again.";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function signup(signupData) {
        loading.value = true;
        error.value = null;
        try {
            const signupResponse = await axios.post(`${import.meta.env.VITE_API_URL}/customer/register`, signupData);
            await setLocalStorage(signupResponse?.data);
            user.value = signupResponse?.data;
            return signupResponse;
        } catch (err) {
            error.value = err.response?.data || "Signup failed. Please try again.";
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function socialLoginCallback(data){
        await setLocalStorage(data);       
        user.value = data  
        return data;    
    }

    async function logout() {
        loading.value = true;
        error.value = null;
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/logout`);
            user.value = null;
            await clearLocalStorage();
            router.push({ name: "Home" });
        } catch (err) {
            error.value = err.response?.data?.message || "Logout failed.";
            console.error("Logout failed", error.value);
        } finally {
            loading.value = false;
        }
    }

    async function setLocalStorage(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    async function clearLocalStorage() {
        localStorage.removeItem('user');
    }

    function getToken() {
        return JSON.parse(localStorage.getItem("user"))?.token;
    }

    return { user, login, signup, isLoggedIn, fetchUser, logout, error, loading,socialLoginCallback };
});
