<template>
  <CardInicio class="flex justify-center items-center">
    <div class="flex column q-gutter-xl">
      <div class="ordenar flex justify-center q-gutter-xl">
        <div>
          <strong>{{ categoria }}</strong>
        </div>
        <div>
          <strong>{{ nivel }}</strong>
        </div>
        <div>
          <strong>Intentos: {{ intentos }}</strong>
        </div>
        <div>
          <strong>Tiempo: {{ tiempocontado }}</strong>
        </div>
      </div>

      <div class="ordenar row justify-center items-center q-gutter-xl">
        <div class="imagenes">
          <img :src="imgahorcado" alt="Ahorcado" />
        </div>

        <div class="flex column justify-center items-center">
          <div class="bases">
            <div class="slot" v-for="(slot, index) in slots" :key="index">
              {{ slot }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="!juegoterminado" class="teclado">
        <div class="fila" v-for="(fila, index) in teclado" :key="index">
          <button
            v-for="letra in fila"
            :key="letra.letra"
            @click="seleccionarletra(letra)"
            :class="{ verde: letra.mostrarVerde, rojo: letra.mostrarRojo }"
            :disabled="letra.usada"
          >
            {{ letra.letra }}
          </button>
        </div>
      </div>

      <q-dialog v-model="juegoterminado">
        <q-card class="modal-ahorcado column items-center">
          <div>
            <h2 v-if="resultado === 'ganaste'" class="titulo-resultado ganador">
              ¡Ganaste!
            </h2>
            <h2 v-else class="titulo-resultado perdedor">¡Perdiste!</h2>
          </div>

          <div class="q-gutter-md">
            <div class="dato"><span>Categoría:</span> {{ categoria }}</div>
            <div class="dato"><span>Nivel:</span> {{ nivel }}</div>
            <div class="dato"><span>Tiempo:</span> {{ tiempocontado }}</div>
            <div class="dato"><span>Palabra:</span> {{ palabrafinal }}</div>
          </div>

          <div class="flex row q-gutter-md">
            <div>
              <q-btn
                class="btn-jugar"
                @click="juegonuevo"
                label="Jugar de nuevo"
              />
            </div>
            <div>
              <q-btn
                class="btn-categorias"
                @click="iracategorias"
                label="Ir a categorías"
              />
            </div>
          </div>
        </q-card>
      </q-dialog>
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
  dificil: [A0, A1, A2, A4, A5, A6],
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

const crearletra = (letra) => ({
  letra,
  usada: false,
  mostrarVerde: false,
  mostrarRojo: false,
  mostrarChulo: false,
});
const teclado = [
  "QWERTYUIOP".split("").map(crearletra),
  "ASDFGHJKL".split("").map(crearletra),
  "ZXCVBNM".split("").map(crearletra),
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
const stopwatch = useStopwatch(true); // inicia automáticamente

const tiempocontado = computed(
  () =>
    `${String(stopwatch.minutes.value).padStart(2, "0")}:${String(
      stopwatch.seconds.value
    ).padStart(2, "0")}`
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
    guardarpartida();
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
  const usuario = usuarios.find(
    (usuario) => usuario.nick === sesionActiva.value
  );
  if (!usuario) return;

  const newpartida = {
    categoria,
    nivel,
    tiempo: tiempocontado.value,
    fecha: new Date().toLocaleString(),
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

  teclado.forEach((fila) => {
    fila.forEach((letra) => {
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
  gap: clamp(10px, 4vw, 20px);
}

.slot {
  width: clamp(30px, 6vw, 40px);
  height: clamp(30px, 6vw, 40px);
  background: #fff;
  border: 2px solid #333;
  border-radius: 6px;
  font-size: clamp(18px, 4vw, 24px);
  text-align: center;
  line-height: clamp(30px, 6vw, 40px);
}

.fila {
  text-align: center;
}

.fila button {
  margin: clamp(2px, 0.8vw, 4px);
  padding: clamp(10px, 3vw, 15px) clamp(18px, 6vw, 30px);
  font-size: clamp(18px, 6vw, 30px);
  border: none;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
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
  width: clamp(220px, 60vw, 350px);
}

.imagenes img {
  width: 100%;
}

.resultado {
  text-align: center;
}

.text-green {
  color: #0a550a;
}
.text-red {
  color: #550a0a;
}

.btn-jugar {
  background-color: #5f5f5f !important;
}

.btn-categorias {
  background-color: #5f5f5f !important;
}

.modal-ahorcado {
  width: clamp(260px, 85vw, 500px) !important;
  background: #1c1e24 !important;
  border-radius: 14px !important;
  text-align: center !important;
  color: #f5f5f5 !important;
  margin: 0 !important;
  padding: 40px 100px 40px 100px !important;
  gap: 30px !important;
}

.titulo-resultado {
  font-size: clamp(30px, 8vw, 45px) !important;
  letter-spacing: 1.5px !important;
  margin-bottom: clamp(10px, 4vw, 20px) !important;
}

.ganador {
  text-shadow: 0 0 12px rgba(0, 255, 51, 0.9) !important;
}
.perdedor {
  text-shadow: 0 0 14px rgba(255, 40, 40, 0.9) !important;
}

.btn-game {
  background: #2d2f36 !important;
  border: 1px solid #44484f !important;
  padding: clamp(10px, 3vw, 14px) clamp(16px, 5vw, 22px) !important;
  border-radius: 8px !important;
  font-size: clamp(12px, 4vw, 16px) !important;
  text-transform: none !important;
  width: 100% !important;
}

.btn-game:hover {
  background: #3a3c44 !important;
}

.btn-game:active {
  transform: scale(0.95) !important;
}

.modal-ahorcado * {
  color: #f5f5f5 !important;
}
</style>
