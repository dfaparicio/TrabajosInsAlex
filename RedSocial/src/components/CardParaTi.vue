<template>
  <div class="cardParati">
    <div class="nombre margin">
      <img :src="infoCard.fotoPerfil" alt="perfil" class="perfil" />
      <p>@{{ infoCard.nombreUsuario }}</p>
    </div>

    <div class="img margin">
      <img :src="infoCard.imagenPublicacion" alt="recibo" class="recibo" />
    </div>

    <div class="descripcion margin">
      <p>{{ infoCard.descripcion }}</p>
    </div>

    <div class="hashtags">
      <span v-for="(tag, i) in infoCard.hashtags" :key="i" class="hashtag">
        {{ tag }}
      </span>
    </div>

    <hr />

    <div class="interaccion">
      <div class="like" :class="{ active: infoCard.liked }" @click="toggleLike">
        👍 {{ infoCard.likes }}
      </div>

      <div class="comentario" @click="abrirComentario">
        💬 {{ infoCard.comentarios.length }}
      </div>

      <q-dialog v-model="modalComentario" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Nuevo comentario</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="nuevoComentario"
              autofocus
              @keyup.enter="guardarComentario"
              placeholder="Escribe un comentario..."
            />
          </q-card-section>

          <q-card-section>
            <div v-if="infoCard.comentarios.length === 0" class="text-grey-6">
              No hay comentarios aún...
            </div>

            <div v-else class="column q-gutter-sm">
              <div
                v-for="comentario in infoCard.comentarios"
                :key="comentario.id"
                class="q-pa-sm bg-grey-2 rounded-borders row items-start q-gutter-sm"
              >
                <img
                  :src="comentario.foto"
                  class="rounded-circle"
                  style="width: 40px; height: 40px; object-fit: cover"
                />

                <div class="column">
                  <strong>{{ comentario.nombre }}</strong>
                  <div>{{ comentario.texto }}</div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat label="Agregar" @click="guardarComentario" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="compartido" @click="compartir">
        🔄 {{ infoCard.compartidos }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { Loading } from "quasar";
import { nombresEstilo, fotosPerfilRandom } from "../data/cards.js";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

//CREA ARRAY
const infoCard = reactive({
  ...props.card,
  comentarios: Array.isArray(props.card.comentarios)
    ? props.card.comentarios
    : [],
});

if (!infoCard.id) {
  infoCard.id = infoCard.nombreUsuario;
}

const cardsGuardadas = reactive(
  JSON.parse(localStorage.getItem("cards") || "{}")
);

if (cardsGuardadas[infoCard.id]) {
  Object.assign(infoCard, cardsGuardadas[infoCard.id]);

  if (!Array.isArray(infoCard.comentarios)) {
    infoCard.comentarios = [];
  }
}

//COMPARTIR
const emit = defineEmits(["compartido", "like-change"]);

function compartir() {
  Loading.show({ message: "Compartiendo...", spinnerSize: 60 });

  setTimeout(() => {
    infoCard.compartidos++;
    emit("compartido", infoCard.id);
    Loading.hide();
  }, 1200);
}

//COMENTARIOS
const modalComentario = ref(false);
const nuevoComentario = ref("");

function abrirComentario() {
  modalComentario.value = true;
}

function nombreAleatorio() {
  const index = Math.floor(Math.random() * nombresEstilo.length);
  return nombresEstilo[index];
}

function getFotoRandom() {
  const i = Math.floor(Math.random() * fotosPerfilRandom.length);
  return fotosPerfilRandom[i];
}

function guardarComentario() {
  const texto = nuevoComentario.value.trim();
  if (!texto) return;

  infoCard.comentarios.push({
    id: crypto.randomUUID(),
    texto,
    nombre: nombreAleatorio(),
    foto: getFotoRandom(),
    fecha: new Date().toISOString(),
  });

  nuevoComentario.value = "";
  modalComentario.value = false;
}

//LIKE
function toggleLike() {
  infoCard.liked = true;
  infoCard.likes++;

  emit("like-change", {
    id: infoCard.id,
    liked: infoCard.liked,
    likes: infoCard.likes,
  });
}

watch(
  infoCard,
  (nuevo) => {
    const cardsGuardadas = JSON.parse(localStorage.getItem("cards")) || {};

    cardsGuardadas[infoCard.id] = { ...nuevo };

    localStorage.setItem("cards", JSON.stringify(cardsGuardadas));
  },
  { deep: true }
);
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.contenedor-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  justify-content: center;
}

.cardParati {
  width: 300px;
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cardParati .margin {
  margin-bottom: 10px;
}

.nombre {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.nombre img {
  width: 40px;
}

.perfil {
  background-color: rgb(183, 183, 183);
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

p {
  margin: 0;
}

.img {
  display: grid;
  justify-content: center;
  align-items: center;
}

.recibo {
  width: 100%;
  width: 270px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
}

.hashtags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.interaccion {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1.2rem;
  padding: 10px 0;
  margin-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.like {
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  user-select: none;
  transform-origin: center;
}

.like.active {
  color: #1877f2;
  animation: pop 0.25s ease;
}

.comentario {
  font-size: 20px;
  cursor: pointer;
  color: #555;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  user-select: none;
  transition: 0.2s ease;
  padding: 6px 10px;
  border-radius: 8px;
}

.comentario:hover {
  transform: scale(1.1);
  background: rgba(24, 119, 242, 0.1);
  color: #1877f2;
}

.compartido {
  font-size: 20px;
  cursor: pointer;
  color: #555;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  user-select: none;
  transition: 0.2s ease;
  padding: 6px 10px;
  border-radius: 8px;
}

.compartido:hover {
  transform: scale(1.1);
  background: rgba(0, 200, 83, 0.1);
  color: #00c853;
}

.compartido:active {
  transform: scale(0.92);
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
