import { defineStore } from 'pinia';
import { ref, computed, onMounted, watch } from 'vue';
import { useApi } from 'vue-laravel-sanctum';
import { useAuthStore } from './useAuthStore';

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([]);
    const totalItems = ref(0);
    const totalAmount = ref(0);
    const {$api, loading} = useApi();
    const authStore = useAuthStore();
    const fetchCartItems = async () => {
        if (!authStore.user) {
            const localCart = JSON.parse(localStorage.getItem('cart_items') || '[]');
            cartItems.value = localCart;
            updateTotals();
            return;
        }
        try {
            const response = await $api('/api/frontend/v1/cart?type=cart',{
                headers: {
                    authorization: `Bearer ${authStore?.user?.token}`,
                },
            });
            if (response) {
                cartItems.value = response.data.items;
                totalItems.value = response.data.total_items;
                totalAmount.value = response.data.total_amount;
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const updateTotals = () => {
        totalItems.value = cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
        totalAmount.value = cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const addToCart = async (item) => {
        if (!authStore.user) {
            const existingIndex = cartItems.value.findIndex(i => 
                i.product_id === item.product_id && 
                i.product_variant_price_id === item.product_variant_price_id
            );
            if (existingIndex > -1) {
                cartItems.value[existingIndex].quantity += item.quantity;
                cartItems.value[existingIndex].total = cartItems.value[existingIndex].quantity * cartItems.value[existingIndex].price;
            } else {
                cartItems.value.push({ ...item, product: { title: item.title, weight: item.weight || 0, slug: item.slug } });
            }
            localStorage.setItem('cart_items', JSON.stringify(cartItems.value));
            updateTotals();
            return true;
        }

        try {
            const response = await $api('/api/frontend/v1/cart', {
                method: 'POST',
                data: { ...item, type: 'cart' },
                headers: { authorization: `Bearer ${authStore?.user?.token}` }
            });
            if (response) {
                await fetchCartItems();
                return true;
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            return false;
        }
    };

    const updateQuantity = async (item, action) => {
        const newQuantity = action === 'increase' ? Number(item.quantity) + 1 : Number(item.quantity) - 1;
        if (newQuantity < 1) return;

        if (!authStore.user) {
            const index = cartItems.value.findIndex(i => i.product_id === item.product_id && i.product_variant_price_id === item.product_variant_price_id);
            if (index > -1) {
                cartItems.value[index].quantity = newQuantity;
                cartItems.value[index].total = newQuantity * cartItems.value[index].price;
                localStorage.setItem('cart_items', JSON.stringify(cartItems.value));
                updateTotals();
            }
            return;
        }

        try {
            const response = await $api(`/api/frontend/v1/cart/${item.id}`, {
                method: 'post',
                data: { quantity: newQuantity, _method: 'PUT' },
                headers: { authorization: `Bearer ${authStore?.user?.token}` }
            });
            if (response) {
                await fetchCartItems();
            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const removeFromCart = async (id, product_id, variant_id) => {
        if (!authStore.user) {
            cartItems.value = cartItems.value.filter(i => !(i.product_id === product_id && i.product_variant_price_id === variant_id));
            localStorage.setItem('cart_items', JSON.stringify(cartItems.value));
            updateTotals();
            return;
        }

        try {
            const response = await $api(`/api/frontend/v1/cart/${id}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${authStore?.user?.token}` }
            });
            if (response) {
                await fetchCartItems();
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    onMounted(() => {
        fetchCartItems();
    });

    watch(() => authStore.user, (newVal, oldVal) => {
        fetchCartItems();
    });

    const clearCart = () => {
        cartItems.value = [];
        totalItems.value = 0;
        totalAmount.value = 0;
        if (!authStore.user) {
            localStorage.removeItem('cart_items');
        }
    };

    return {
        totalItems,
        totalAmount,
        cartItems,
        fetchCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };
});