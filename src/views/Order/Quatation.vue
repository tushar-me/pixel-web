<script setup>
    import AppLayout from "@/components/Layouts/AppLayout.vue";
    import Container from "@/components/Container.vue";
    import { ref, inject } from 'vue';
	// import useAxios from '@/composables/useAxios.js';
	import { toast } from "vue3-toastify";

	const data = inject('data');
	const {loading, error, sendRequest} = useAxios();

const form = ref({
	product_name: null,
	category_name: null,
	email:null,
	phone:null,
	quantity:null,
	message:null,
	product_detail:null,
	city:null,
	address:null,
});

const sendInquery = async() => {
	const response = await sendRequest({
		method:'post',
		url:'/public/save-inquiry',
		data:form.value
	});
	if(response){
		toast.success('Inquery Sent Successfully', {autoClose:500});
		form.value = {};
	}
}

</script>
<template>
    <AppLayout>
        <section >
            <Container>
                <div class="flex py-6 gap-6 ">
                    <div class="w-full max-w-2xl shadow-lg bg-white rounded-lg h-auto mx-auto">
                        <div class="">
                            <h2 class="text-xl font-semibold p-5">Request for Quotations- RFQ</h2>
                            <div class="flex flex-wrap p-5">
                                <div class="w-full mb-3">
                                    <label for="" class="text-lg font-normal">Product Name <span class="text-red-500">*</span></label>
                                    <input v-model="form.name" type="text" class="w-full rounded pl-2 border  py-2 my-3  focus:outline-primary border-gray-300 placeholder:text-base" placeholder="Enter a Specific Product Name, e.g.">
                                </div>
                                <div class="w-full mb-3">
                                    <label for="" class="text-lg font-normal">Product Category</label>

                                   <select v-model="form.category_name" class="w-full p-2 border border-gray-300 rounded">
										<option :value="category?.name" v-for="category in data?.all_categories">{{category?.name}}</option>
							</select>
                                </div>
                                <div class="w-full mb-3">
                                    <label for="" class="text-lg font-normal">About Your Product<span class="text-red-500">*</span></label>
                                    <textarea v-model="form.product_detail" type="text" class="w-full h-44 rounded pl-2 border py-2  focus:outline-primary border-gray-300 placeholder:text-base" 
                                    placeholder="Please indicate your detailed requirements to ensure fast and efficient responses from suppliers"></textarea>
                                </div>
								<div class="w-full lg:w-1/2 mb-3 lg:pe-1">
                                    <label for="" class="text-lg font-normal">Quantity<span class="text-red-500">*</span></label>
                                    <input v-model="form.quantity" type="text" class="w-full rounded pl-2 border py-2 my-3  focus:outline-primary border-gray-300 placeholder:text-base" placeholder="Enter a Specific Product Name, e.g.">
                                </div>
								<div class="w-full lg:w-1/2 mb-3 lg:pl-1">
                                    <label for="" class="text-lg font-normal">Name<span class="text-red-500">*</span></label>
                                    <input v-model="form.name" type="name" class="w-full rounded pl-2 border py-2 my-3  focus:outline-primary border-gray-300 placeholder:text-base" placeholder="Enter a Specific Product Name, e.g.">
                                </div>
                                <div class="w-full lg:w-1/2 mb-3 lg:pe-1">
                                    <label for="" class="text-lg font-normal">Email Address<span class="text-red-500">*</span></label>
                                    <input v-model="form.email" type="email" class="w-full rounded pl-2 border py-2 my-3  focus:outline-primary border-gray-300 placeholder:text-base" placeholder="Enter a Specific Product Name, e.g.">
                                </div>
								<div class="w-full lg:w-1/2  mb-3 lg:pl-1">
                                    <label for="" class="text-lg font-normal">Phone Number<span class="text-red-500">*</span></label>
                                    <input v-model="form.phone" type="text" class="w-full rounded pl-2 border py-2 my-3  focus:outline-primary border-gray-300 placeholder:text-base" placeholder="Enter a Specific Product Name, e.g.">
                                </div>
								<div class="w-full lg:w-1/2  mb-3 lg:pe-1">
                                    <label for="" class="text-lg font-normal">City<span class="text-red-500">*</span></label>
                                    <input v-model="form.city" type="text" class="w-full rounded pl-2 border py-2 my-3  focus:outline-primary border-gray-300 placeholder:text-base" placeholder="Enter a Specific Product Name, e.g.">
                                </div>
								<div class="w-full lg:w-1/2  mb-3 lg:pl-1">
                                    <label for="" class="text-lg font-normal">Street Address<span class="text-red-500">*</span></label>
                                    <input v-model="form.address" type="text" class="w-full rounded pl-2 border py-2 my-3  focus:outline-primary border-gray-300 placeholder:text-base" placeholder="Enter a Specific Product Name, e.g.">
                                </div>
                                <button @click="sendInquery" class="bg-primary text-white text-xl my-3 font-semibold px-7 py-2 rounded">Submit</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Container>
        </section>
    </AppLayout>
</template>