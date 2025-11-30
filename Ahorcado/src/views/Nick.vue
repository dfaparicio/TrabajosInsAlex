<template>
  <CardInicio titulo="¡Desafía al Ahorcado Maldito!"
    class="flex column justify-center items-center text-center q-gutter-md">
    <div class="row justify-center items-center q-gutter-md q-pb-xl">
      <div><img :src="Saludando" /></div>
      <div class="column justify-center">
        <p class="text-h5">
          Solo los valientes pueden jugar.
          <br />
          Regístrate para convertirte en un verdadero desafiante y enfrenta al
          espíritu maldito.
          <br />
          ¿Tienes el valor y la astucia para ganar? ¡Demuestra que eres el
          mejor!
        </p>

        <div class="row justify-center items-center q-gutter-xl">
          <q-input v-model="nick" label="Ingresa tu nick" filled class="input-redondo input-label input-centro"
            style="width: 50%" />

          <q-btn round dense icon="check" @click="registrarOIniciar" />
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <BotonIniciar to="/jugar">A Jugar</BotonIniciar>
    </div>
  </CardInicio>
</template>

<script setup>
import { ref } from "vue";
import { Notify } from "quasar";

import BotonIniciar from "../components/BotonIniciar.vue";
import CardInicio from "../components/CardInicio.vue";
import Saludando from "../assets/Saludando.png";

const nick = ref("");

function registrarOIniciar() {
  const valor = nick.value.trim();

  const sesionActiva = localStorage.getItem("usuarioActual");
  if (sesionActiva) {
    Notify.create({
      message: `Ya estás conectado como: ${sesionActiva}`,
      caption: "Para cambiar de desafiante, primero cierra sesión...",
      color: null,
      textColor: null,
      classes: "bg-white text-red-5 text-bold shadow-10 grito-notify",
      icon: "block",
      position: "top",
      timeout: 2500,
      html: true
    });
    return;
  }

  if (!valor) {
    Notify.create({
      message: "¡¡¡ESCRIBE TU NICK AHORA!!! 😱",
      caption: "Las sombras no tienen paciencia...",
      color: null,
      textColor: null,
      classes: "bg-white text-red-5 text-bold shadow-10 grito-notify",
      icon: "priority_high",
      position: "top",
      timeout: 2500,
      html: true
    });
    return;
  }

  if (valor.length < 3) {
    Notify.create({
      message: "¡TU NICK ES DEMASIADO CORTO! 😤",
      caption: "El espíritu exige algo más digno...",
      color: null,
      textColor: null,
      classes: "bg-white text-red-5 text-bold shadow-10 grito-notify",
      icon: "report",
      position: "top",
      timeout: 2500,
      html: true
    });
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existente = usuarios.find(u => u.nick === valor);

  if (existente) {
    localStorage.setItem("usuarioActual", existente.nick);

    Notify.create({
      message: `Volviste, ${existente.nick}...`,
      caption: "El ahorcado ya escuchó tus pasos 👁️",
      color: null,
      textColor: null,
      classes: "bg-white text-red-5 text-bold shadow-10 grito-notify",
      icon: "psychology",
      position: "top",
      timeout: 2500,
      html: true
    });

    return;
  }

  const nuevoUsuario = {
    nick: valor,
    partidas: []
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActual", valor);

  Notify.create({
    message: `Nuevo desafiante creado: ${valor}`,
    caption: "Que los espíritus te acompañen...",
    color: null,
    textColor: null,
    classes: "bg-white text-red-5 text-bold shadow-10 grito-notify",
    icon: "skull",
    position: "top",
    timeout: 2800,
    html: true
  });
}
</script>




<style>
.input-redondo .q-field__control {
  border-radius: 20px !important;
}

.input-label .q-field__label {
  font-size: 1.3rem !important;
  font-weight: bold !important;
  padding: 2px 8px !important;
  background: #000000 !important;
  border-radius: 6px !important;
  color: #c2bdbd !important;
  border-radius: 20px !important;
}

.input-centro .q-field__native {
  text-align: center !important;
  font-size: 1.5rem !important;
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
  0%   { transform: translate(0,0) rotate(0deg); }
  10%  { transform: translate(-3px,2px) rotate(-2deg); }
  20%  { transform: translate(4px,-3px) rotate(1deg); }
  30%  { transform: translate(-2px,4px) rotate(-1deg); }
  40%  { transform: translate(3px,-2px) rotate(2deg); }
  50%  { transform: translate(-4px,1px) rotate(-1deg); }
  60%  { transform: translate(2px,-3px) rotate(1deg); }
  70%  { transform: translate(-1px,3px) rotate(-2deg); }
  80%  { transform: translate(3px,-1px) rotate(2deg); }
  90%  { transform: translate(-2px,2px) rotate(-1deg); }
  100% { transform: translate(0,0) rotate(0deg); }
}

@keyframes glitchColorLoco {
  0%   { text-shadow: 2px 0 red, -2px 0 blue, 0 2px lime; }
  20%  { text-shadow: -2px 1px blue, 2px -1px lime, 1px 0 red; }
  40%  { text-shadow: 3px -2px lime, -3px 2px red, 0 0 blue; }
  60%  { text-shadow: -1px 3px red, 1px -2px blue, 2px 0 lime; }
  80%  { text-shadow: 2px -1px lime, -2px 1px blue, 0 3px red; }
  100% { text-shadow: 3px 0 red, -3px 0 blue, 1px -1px lime; }
}

@keyframes zoomLoco {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}

</style>