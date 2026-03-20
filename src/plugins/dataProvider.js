import { ref } from 'vue';
import axios from 'axios';
export function createDataProvider() {
    const data = ref(null);
    const getData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/pixels`);
        if (response) {
            data.value = response.data;
        }
    };
    getData();
    return {
        data
    };
}