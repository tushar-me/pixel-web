import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import { useApi } from 'vue-laravel-sanctum';
import { useAuthStore } from './useAuthStore';

export const useWishlistStore = defineStore('wishlist', () => {
    const items = ref([]);
    const itemsCount = ref(0);
    const {$api, loading} = useApi();
    const authStore = useAuthStore();
    const fetchWishlistItems = async () => {
        if (!authStore.user) {
            window.location.href = '/login';
        }
        try {
            const response = await $api('/api/frontend/v1/cart?type=wishlist',{
                headers: {
                    authorization: `Bearer ${authStore?.user?.token}`,
                },
            });
            if (response) {
                items.value = response.data.items;
                itemsCount.value = response.data.total_items;
            }
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        } finally {
      console.log('wishlist fatch')
        }
    };
    

    return {
        itemsCount,
        items,
        fetchWishlistItems,
    };
});