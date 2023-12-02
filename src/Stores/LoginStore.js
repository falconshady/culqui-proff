import {defineStore} from 'pinia'
import {ref} from "vue";
import {useClientStore} from "@/Stores/ClientStore";

export const useLoginStore = defineStore('login', () => {
    const base_url = 'https://fepruebatecnicaculqi-backend-production.up.railway.app'
    const isLogged = ref(false)
    const form = ref({})
    const userdata = ref({})
    const formErrors = ref({status: null, message: null})
    const onsubmit = ref(false)
    const $setForm = (data) => {
        return form.value = data
    }
    const $makeLogin = async () => {
        onsubmit.value = true
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.value)
        };
        try {
            const response = await fetch(base_url + '/auth/login', options);
            const data = await response.json()
            if (data.status != 'error') {
                isLogged.value = true
                userdata.value = data
                localStorage.setItem('isLogged', isLogged.value)
                localStorage.setItem('userdata', btoa(JSON.stringify(userdata.value)))
                let clientStore = useClientStore()
                clientStore.$setUserdata(userdata.value)
                clientStore.$getEmployees()
                return;   
            }
            formErrors.value = data
            onsubmit.value = false
        } catch (error) {
            return error
        }
    }
    const $ensureUserMustBeLogged = () => {
        let loggedUser = Boolean(localStorage.getItem('isLogged'))
        let userdata = localStorage.getItem('userdata')
        if(loggedUser == null || userdata == '[]' || userdata == null){
            localStorage.setItem('isLogged', false)
            localStorage.setItem('userdata', JSON.stringify([]))
            isLogged.value = false
            return;
        }
        if(loggedUser == true){
            let userdata = JSON.parse(atob(localStorage.getItem('userdata')))
            isLogged.value = loggedUser
            userdata.value = userdata
            let clientStore = useClientStore()
            clientStore.$setUserdata(userdata.value)
            clientStore.$getEmployees()
        }
    }
    const $cleanErrors = () => {
        formErrors.value = {status: null, message: null}
    }

    return {
        base_url, isLogged, form, userdata, formErrors, onsubmit,
        $setForm, $makeLogin, $ensureUserMustBeLogged, $cleanErrors
    }
})