<template>
  <div class="w-full h-screen">
    <div class="grid grid-cols-2 gap-4">
      <div class="h-screen">
        <div class="bg-login-left-upper h-[65%]"></div>
        <div class="h-[35%] bg-[#0f1828] text-white p-10 border-t-2 border-t-[#02a672]">
          <div><img src="/images/logo_white.svg" alt="Culqui"></div>
          <div class="text-6xl pt-8">
            Dale más power ⚡  a tus <br> empleados hoy 💪
          </div>
          <div class="pt-8">Te ayudamos a gestionarlos de manera más sencilla</div>
        </div>
      </div>
      <div class="flex justify-items-center self-center w-[450px] h-[450px] bg-white mx-auto">
        <div class="w-full">
          <div class="w-full text-[#0f1828] text-center text-2xl font-bold">Inicia Sesión</div>
          <slot name="form"></slot>
        </div>
        <p class="absolute w-3/12 bottom-0 p-5 text-center text-gray-500 text-xs">
          &copy;2023 Culqui. Todos los derechos reservados
        </p>
      </div>
    </div>
  </div>
</template>