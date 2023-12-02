<script setup>
import './css/app.css';

import {getCurrentInstance, onBeforeMount} from 'vue'
import LoginLayout from "@/components/layout/LoginLayout.vue";
import AppLayout from "@/components/layout/AppLayout.vue";

const __ = getCurrentInstance().appContext.config.globalProperties
const loginStore = __.$useLoginStore()
const clientStore = __.$useClientStore()

loginStore.$setForm({
  "correo": "c.quispe@culqi.com",
  "password": "admin123"
})

onBeforeMount(() => {
  loginStore.$ensureUserMustBeLogged()
})

</script>

<template>
  <LoginLayout v-if="!loginStore.isLogged">
    <template #form>
      <form class="bg-white rounded px-8 pt-6 pb-8 mb-4" autocomplete="on">
        <div class="mb-4">
          <label class="block text-lg text-gray-700 mb-2" for="username">Correo Electrónico <span class="text-red-700">*</span></label>
          <input v-model="loginStore.form.correo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text" placeholder="Correo Electrónico">
        </div>
        <div class="mb-6">
          <label class="block text-lg text-gray-700 mb-2" for="password">Contraseña <span class="text-red-700">*</span></label>
          <input v-model="loginStore.form.password"
                 @focus="loginStore.$cleanErrors"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
                 :class="{'border-red-500':loginStore.formErrors.status=='error'}"
                 id="password" type="password" placeholder="******">
          <p v-if="loginStore.formErrors.status=='error'" class="text-red-500 text-xs italic">
            <span class="inline-block w-5 h-5 text-center border-2 border-red-600 rounded-full">‼️</span> Correo o contraseña incorrectos.
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button @click="loginStore.$makeLogin" :disabled="loginStore.onsubmit" class="w-full bg-[#0f1828] text-white font-bold py-2 px-4 rounded-lg" type="button">
            Inicial Sesión
          </button>
        </div>
        <p class="text-center text-gray-500 text-md mt-5">
          ¿Eres nuevo aquí? <a href="#" class="text-[#06a876]">Crea una cuenta</a>
        </p>
      </form>
    </template>
  </LoginLayout>

  <AppLayout v-if="loginStore.isLogged">
    <template #table>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">
            Nombre
          </th>
          <th scope="col" class="px-6 py-3">
            Nombre cargo
          </th>
          <th scope="col" class="px-6 py-3">
            Departamento
          </th>
          <th scope="col" class="px-6 py-3">
            Oficina
          </th>
          <th scope="col" class="px-6 py-3">
            Cuenta
          </th>
          <th scope="col" class="px-6 py-3 text-right">
            Acciones
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b" v-for="item in clientStore.employees" :key="item.id">
          <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap">
            {{ item.nombre }}
          </td>
          <td class="px-6 py-4">
            {{ item.cargo }}
          </td>
          <td class="px-6 py-4">
            {{ item.departamento }}
          </td>
          <td class="px-6 py-4">
            {{ item.oficina }}
          </td>
          <td class="px-6 py-4">
            {{ item.estadoCuenta }}
          </td>
          <td class="px-6 py-4 text-right">
            <button class="bg-green-600 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="bg-blue-600 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 -0.5 25 25" fill="none">
                <path d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z" fill="#ffffff"/>
              </svg>
            </button>
            <button class="bg-red-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </AppLayout>
</template>