import {defineStore} from 'pinia'
import {ref} from "vue";
import {useLoginStore} from "@/Stores/LoginStore";

export const useClientStore = defineStore('client', () => {
    const base_url = 'https://fepruebatecnicaculqi-backend-production.up.railway.app'
    const userdata = ref({})
    const employees = ref({})
    const $setUserdata = (data) => {
        return userdata.value = data
    }
    const $getEmployees = async () => {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer '+userdata.value.data.token,
            },
        };
        try {
            const response = await fetch(base_url + '/empleados?limit=10&page=1', options);
            const data = await response.json()
            if (data.status == 'error') {
                alert('Hemos tenido problemas al obtener la data')
                let loginStore = useLoginStore()
                loginStore.$ensureUserMustBeLogged()
                return;
            }
            employees.value = data.data
        } catch (error) {
            return error
        }
    }
    
    return {
        base_url, employees,
        $setUserdata, $getEmployees
    }
})