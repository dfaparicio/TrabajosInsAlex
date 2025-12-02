<template>
  <CardInicio class="flex justify-center items-center">
    <div class="flex column q-gutter-xl">

      <div class="ordenar flex justify-center q-gutter-xl">
        <div><strong>{{ categoria }}</strong></div>
        <div><strong>{{ nivel }}</strong></div>
        <div><strong>Intentos: {{ intentos }}</strong></div>
        <div><strong>Tiempo: {{ tiempocontado }}</strong></div>
      </div>

      <div class="ordenar row justify-center items-center q-gutter-xl">
        <div class="imagenes">
          <img :src="imgahorcado" alt="Ahorcado" />
        </div>

        <div class="flex column justify-center items-center">
          <div class="bases">
            <div class="slot" v-for="(slot, index) in slots" :key="index">{{ slot }}</div>
          </div>
        </div>
      </div>

      <div v-if="!juegoterminado" class="teclado">
        <div class="fila" v-for="(fila, index) in teclado" :key="index">
          <button v-for="letra in fila" :key="letra.letra" @click="seleccionarletra(letra)"
            :class="{ verde: letra.mostrarVerde, rojo: letra.mostrarRojo }" :disabled="letra.usada">
            {{ letra.letra }}
            <span v-if="letra.mostrarChulo">✓</span>
            <span v-if="letra.mostrarX">✗</span>
          </button>
        </div>
      </div>

      <div v-if="juegoterminado" class="resultado flex flex-column items-center q-gutter-md">
        <h2 v-if="resultado === 'ganaste'" class="text-green">¡Ganaste!</h2>
        <h2 v-else class="text-red">¡Perdiste!</h2>

        <div><strong>Categoría:</strong> {{ categoria }}</div>
        <div><strong>Nivel:</strong> {{ nivel }}</div>
        <div><strong>Tiempo:</strong> {{ tiempocontado }}</div>
        <div><strong>Palabra:</strong> {{ palabrafinal }}</div>

        <div class="botones q-gutter-md flex">
          <button class="btn-jugar" @click="juegonuevo">Jugar de nuevo</button>
          <button class="btn-categorias" @click="iracategorias">Ir a categorías</button>
        </div>
      </div>

    </div>
  </CardInicio>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStopwatch } from "vue-timer-hook";
import CardInicio from "../components/CardInicio.vue";
import { Palabras } from "../utils/vectoresinfo.js";

const sesionActiva = ref(localStorage.getItem("usuarioActual") || "");

const route = useRoute();
const router = useRouter();
const categoria = route.query.cat;
const nivel = route.query.niv;

const intentos = ref({ facil: 8, medio: 6, dificil: 5 }[nivel] || 5);
const intentosiniciales = ref(intentos.value);
const palabra = ref("");
const slots = ref([]);

const juegoterminado = ref(false);
const resultado = ref(""); 
const palabrafinal = ref(""); 

import A00 from "../assets/A00.png";
import A0 from "../assets/A0.png";
import A1 from "../assets/A1.png";
import A2 from "../assets/A2.png";
import A3 from "../assets/A3.png";
import A4 from "../assets/A4.png";
import A5 from "../assets/A5.png";
import A6 from "../assets/A6.png";

const imgniveles = {
  facil: [A00, A0, A1, A2, A3, A4, A5, A6],
  medio: [A0, A1, A2, A3, A4, A5, A6],
  dificil: [A0, A1, A2, A3, A4, A5, A6],
};
const imgahorcado = computed(() => {
  const errores = intentosiniciales.value - intentos.value;
  const imgs = imgniveles[nivel] || imgniveles.dificil;
  const index = Math.min(errores, imgs.length - 1);
  return imgs[index];
});

const lista = Palabras[categoria][nivel];
palabra.value = lista[Math.floor(Math.random() * lista.length)].toUpperCase();
slots.value = palabra.value.split("").map(() => "");

const crearletra = letra => ({
  letra,
  usada: false,
  mostrarVerde: false,
  mostrarRojo: false,
  mostrarChulo: false,
  mostrarX: false
});
const teclado = [
  "QWERTYUIOP".split("").map(crearletra),
  "ASDFGHJKL".split("").map(crearletra),
  "ZXCVBNM".split("").map(crearletra)
];

function seleccionarletra(letra) {
  if (letra.usada || juegoterminado.value) return;
  letra.usada = true;

  const acierto = palabra.value.includes(letra.letra);
  if (acierto) {
    palabra.value.split("").forEach((char, i) => {
      if (char === letra.letra) slots.value[i] = letra.letra;
    });
  } else {
    intentos.value--;
  }

  letra.estado = acierto ? "correcta" : "incorrecta";
  aplicarnivel(letra);
  verificarestado();
}

function aplicarnivel(letra) {
  const correcto = letra.estado === "correcta";
  if (nivel === "facil") {
    letra.mostrarVerde = correcto;
    letra.mostrarChulo = correcto;
    letra.mostrarRojo = !correcto;
    letra.mostrarX = !correcto;
  }
  if (nivel === "medio" && correcto) {
    letra.mostrarVerde = true;
    letra.mostrarChulo = true;
  }
}

// Cronómetro
const stopwatch = useStopwatch(false);
setTimeout(() => stopwatch.start(), 2000);
const tiempocontado = computed(() =>
  `${String(stopwatch.minutes.value).padStart(2, "0")}:${String(stopwatch.seconds.value).padStart(2, "0")}`
);

function pausartiempo() {
  stopwatch.pause();
}

function verificarestado() {
  if (slots.value.join("") === palabra.value) {
    pausartiempo();
    resultado.value = "ganaste";
    juegoterminado.value = true;
    palabrafinal.value = palabra.value;
    guardarpartida(); // Guardar partida ganada
  }
  if (intentos.value <= 0) {
    pausartiempo();
    resultado.value = "perdiste";
    juegoterminado.value = true;
    palabrafinal.value = palabra.value;
  }
}

function guardarpartida() {
  if (!sesionActiva.value) return;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(usuario => usuario.nick === sesionActiva.value);
  if (!usuario) return;

  const newpartida = {
    categoria,
    nivel,
    tiempo: tiempocontado.value,
    fecha: new Date().toLocaleString()
  };

  usuario.partidas.push(newpartida);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function nuevapalabra() {
  const lista = Palabras[categoria][nivel];
  palabra.value = lista[Math.floor(Math.random() * lista.length)].toUpperCase();
  slots.value = palabra.value.split("").map(() => "");
  intentos.value = { facil: 8, medio: 6, dificil: 5 }[nivel] || 5;
  intentosiniciales.value = intentos.value;

  teclado.forEach(fila => {
    fila.forEach(letra => {
      letra.usada = false;
      letra.mostrarVerde = false;
      letra.mostrarRojo = false;
      letra.mostrarChulo = false;
      letra.mostrarX = false;
    });
  });

  stopwatch.reset();
  stopwatch.start();

  juegoterminado.value = false;
  resultado.value = "";
  palabrafinal.value = "";
}

function juegonuevo() {
  nuevapalabra();
}

function iracategorias() {
  router.push("/categorias");
}
</script>

<style>
.bases {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
}

.slot {
  width: 40px;
  height: 40px;
  background: #fff;
  border: 2px solid #333;
  border-radius: 6px;
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
}

.fila {
  margin: 5px 0;
  text-align: center;
}

.fila button {
  margin: 3px;
  padding: 15px 30px;
  font-size: 30px;
  border: none;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}

.fila button:active {
  background: #ddd;
}

.verde {
  background-color: #8dff8d !important;
  color: #0a550a !important;
}

.rojo {
  background-color: #ff8d8d !important;
  color: #550a0a !important;
}

.imagenes {
  width: 350px;
  height: auto;
}

.imagenes img {
  width: 100%;
  height: 100%;
}

.teclado {
  margin: 0 !important;
}

.resultado {
  margin-top: 20px;
  text-align: center;
}

.text-green {
  color: #0a550a;
}

.text-red {
  color: #550a0a;
}

.botones button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-jugar {
  background-color: #8dff8d;
  color: #0a550a;
  border: none;
}

.btn-categorias {
  background-color: #ff8d8d;
  color: #550a0a;
  border: none;
}
</style>
