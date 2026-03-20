<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import {useApi} from 'vue-laravel-sanctum'
    import {ref, onMounted, computed} from 'vue';
    import {useAuthStore} from  '@/stores/useAuthStore.js';
    import useAxios from '@/composables/useAxios.js';
    import { toast } from 'vue3-toastify';
    const route = useRoute();
    const router = useRouter();
    const {$api} = useApi();
    const product = ref(null);
    const getProduct = async () => {
        const response = await $api(`/api/frontend/v1/product/${route?.params?.slug}`);
        if(response) {
            product.value = response.data
        }
    }

    const authStore = useAuthStore();
    const {sendRequest} = useAxios();

    const image = ref(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            form.value.image = file;
            image.value = URL.createObjectURL(file);
        }
    };

    const form = ref({
        product_id: computed(() => product?.value?.id),
        author_name:  authStore.user?.user?.name,
        rating: null,
        review: null,
        title: null,
        image: null,
    });

const onSubmit = async () => {
    const response = await sendRequest({
        url: '/frontend/v1/save-customer-review',
        method: 'POST',
        data: form.value,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response?.data) {
        toast.success('Review Added Successfully', { autoclose: 500 });
        router.back();
    }
}
onMounted(() => {
    getProduct();
})
</script>
<template>
    <AppLayout>
        <Container class="py-10">
            {{ form }}
            <div class="flex flex-col gap-5 pt-5 w-full max-w-4xl mx-auto">
                <div class="w-full flex gap-3">
                    <img class="size-20 object-contain" :src="product?.cover_image_url">
                    <div>
                        <h3 class="text-base font-normal">{{ product?.title }}</h3>
                    </div>
                </div>
                <div class="w-full">
                    <label for="rating" class="block text-sm mb-1">Rating</label>
                    <div class="rating">
                        <input v-model="form.rating" type="radio" id="star5" name="rating" value="5" />
                        <label class="star" for="star5" title="Awesome" aria-hidden="true">
                            <Icon name="carbon:star-filled" />
                        </label>
                        <input v-model="form.rating" type="radio" id="star4" name="rating" value="4" />
                        <label class="star" for="star4" title="Great" aria-hidden="true">
                            <Icon name="carbon:star-filled" />
                        </label>
                        <input v-model="form.rating" type="radio" id="star3" name="rating" value="3" />
                        <label class="star" for="star3" title="Very good" aria-hidden="true">
                            <Icon name="carbon:star-filled" />
                        </label>
                        <input v-model="form.rating" type="radio" id="star2" name="rating" value="2" />
                        <label class="star" for="star2" title="Good" aria-hidden="true">
                            <Icon name="carbon:star-filled" />
                        </label>
                        <input v-model="form.rating" type="radio" id="star1" name="rating" value="1" />
                        <label class="star" for="star1" title="Bad" aria-hidden="true">
                            <Icon name="carbon:star-filled" />
                        </label>
                    </div>
                </div>
                <div class="w-full">
                    <label for="review" class="block text-sm mb-1">Review Message</label>
                    <textarea v-model="form.review"
                        class="w-full h-20 rounded border border-gray-600 bg-transparent p-2"></textarea>
                </div>
                <div class="w-1/2">
                        <label for="image" class="text-xs block mb-1">Cover Image</label>
                        <label for="cover_image"
                            class="w-52 h-36 flex items-center 
                            justify-center gap-3 p-2 border border-dashed border-common rounded-md text-common cursor-pointer">
                            <input type="file" id="cover_image" hidden @change="handleImageUpload">
                            <img v-if="image" :src="image" class="w-full h-full object-cover">
                            <div v-else>
                                <p class="text-xs">Upload Image</p>
                            </div>
                        </label>
                    </div>
                <div class="text-center">
                    <button class="w-1/2 mx-auto bg-primary py-2 text-white" @click="onSubmit">Save Review</button>
                </div>
            </div>
        </Container>
    </AppLayout>
</template>
>
<style scoped>
.rating {
    border: none;
    float: left;
}

.rating>label {
    color: rgba(192, 188, 188, 0.94);
    float: right;
    margin-left: 5px;
}

.rating>label>svg {
    font-size: 32px;
}

.rating>input {
    display: none;
}

.rating>input:checked~label>svg,
.rating:not(:checked)>label:hover,
.rating:not(:checked)>label:hover~label {
    color: #E50102;
    fill: #E50102;
}

.rating>input:checked+label:hover,
.rating>input:checked~label:hover,
.rating>label:hover~input:checked~label,
.rating>input:checked~label:hover~label {
    color: #E50102;
}
</style>