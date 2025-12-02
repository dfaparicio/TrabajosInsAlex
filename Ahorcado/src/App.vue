<template>
  <q-layout view="hHh Lpr fFf" style="height: 100vh; width: 100vw">
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="text-white menu-btn" />
        <q-toolbar-title class="text-center text-white">
          AHORCADO
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="600" behavior="mobile">
      <div style="
          display: flex;
          flex-direction: column;
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        ">
        <q-scroll-area style="flex: 1">
          <q-list padding>
            <q-item clickable v-ripple to="/nick">
              <q-item-section avatar><q-icon name="person" /></q-item-section>
              <q-item-section>Nick</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/jugar">
              <q-item-section avatar><q-icon name="sports_esports" /></q-item-section>
              <q-item-section>Jugar</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/categorias">
              <q-item-section avatar><q-icon name="category" /></q-item-section>
              <q-item-section>Categorías</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/estadisticas">
              <q-item-section avatar><q-icon name="bar_chart" /></q-item-section>
              <q-item-section>Estadísticas</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-item clickable v-ripple @click="cerrarSesion" style="background-color: #f5f5f5">
          <q-item-section avatar>
            <q-icon name="logout" color="red" />
          </q-item-section>
          <q-item-section>
            <span style="color: red">Cerrar Sesión</span>
          </q-item-section>
        </q-item>
      </div>

      <q-img class="absolute-top img-oscura" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent column justify-center items-center">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class=" texto text-weight-bold text-white">{{ usuarioActual }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script setup>
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { useRouter } from "vue-router";

const drawer = ref(false);
const $q = useQuasar();
const router = useRouter();

const usuarioActual = ref(localStorage.getItem("usuarioActual") || null);

router.afterEach(() => {
  usuarioActual.value = localStorage.getItem("usuarioActual");
});

// Cada vez que navegas por tu app, Vue toma el usuario actualizado del localStorage y lo muestra en el drawer.

function cerrarSesion() {

  if (!usuarioActual.value) {
    Notify.create({
      message: "No hay sesión activa",
      caption: "Primero inicia sesión.",
      color: "white",
      textColor: "red-7",
      classes: "text-bold text-h6 shadow-10 grito-notify",
      icon: "warning",
      position: "top",
      timeout: 1500
    });
    return;
  }

  drawer.value = false;

  $q.loading.show({
    message: `
      <div style="color: black; font-size: 25px; letter-spacing: 3px; text-align: center;">
        Cerrando sesión...<br>
        <span style="font-size: 15px;">Las sombras se retiran...</span>
      </div>
    `,
    html: true,
    spinnerColor: "red-5",
    backgroundColor: "white",
  });

  setTimeout(() => {
    localStorage.removeItem("usuarioActual");

    usuarioActual.value = null;

    $q.loading.hide();

    Notify.create({
      message: "Sesión finalizada",
      caption: "El espíritu te deja ir... por ahora.",
      color: "white",
      textColor: "red-7",
      classes: "text-bold text-h6 shadow-10 grito-notify",
      icon: "logout",
      position: "top",
      timeout: 2000
    });

    router.replace("/nick");

  }, 2500);
}


</script>



<style>
@import url("https://fonts.googleapis.com/css2?family=Bangers&family=Permanent+Marker&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: black;
  font-family: "Bangers", "Permanent Marker", sans-serif;
}

html,
body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: white;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}

#app {
  width: 100%;
  max-width: 1920px;
  min-height: 100%;
  background: white;
}

.menu-btn .q-icon {
  color: white !important;
}

.texto {
  letter-spacing: 4px;
}

.img-oscura img {
  filter: brightness(0.35);
}

.grito-notify {
  animation: temblorLoco 0.1s infinite, glitchColorLoco 0.15s infinite alternate, zoomLoco 0.4s infinite alternate !important;
  letter-spacing: 5px !important;
  font-size: 25px !important;
  background: rgba(0, 0, 0, 0.7) !important;
  padding: 12px 24px !important;
  border-radius: 12px !important;
  text-transform: uppercase !important;
  text-align: center !important;
  display: inline-block !important;
  max-width: 90% !important;
}

@keyframes temblorLoco {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  10% {
    transform: translate(-3px, 2px) rotate(-2deg);
  }

  20% {
    transform: translate(4px, -3px) rotate(1deg);
  }

  30% {
    transform: translate(-2px, 4px) rotate(-1deg);
  }

  40% {
    transform: translate(3px, -2px) rotate(2deg);
  }

  50% {
    transform: translate(-4px, 1px) rotate(-1deg);
  }

  60% {
    transform: translate(2px, -3px) rotate(1deg);
  }

  70% {
    transform: translate(-1px, 3px) rotate(-2deg);
  }

  80% {
    transform: translate(3px, -1px) rotate(2deg);
  }

  90% {
    transform: translate(-2px, 2px) rotate(-1deg);
  }

  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes glitchColorLoco {
  0% {
    text-shadow: 2px 0 red, -2px 0 blue, 0 2px lime;
  }

  20% {
    text-shadow: -2px 1px blue, 2px -1px lime, 1px 0 red;
  }

  40% {
    text-shadow: 3px -2px lime, -3px 2px red, 0 0 blue;
  }

  60% {
    text-shadow: -1px 3px red, 1px -2px blue, 2px 0 lime;
  }

  80% {
    text-shadow: 2px -1px lime, -2px 1px blue, 0 3px red;
  }

  100% {
    text-shadow: 3px 0 red, -3px 0 blue, 1px -1px lime;
  }
}

@keyframes zoomLoco {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
