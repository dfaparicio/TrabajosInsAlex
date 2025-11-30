<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 100vh; overflow: hidden" class="shadow-2 rounded-borders">
      <!-- ========= ENCABEZADO ========= -->
      <q-header bordered class="bg-white">
        <q-toolbar class="text-primary items-center q-gutter-md row justify-center q-pa-md">
          <q-avatar>
            <img :src="LogoPag" />
          </q-avatar>

          <div class="text-h3">IVAverso</div>
        </q-toolbar>
      </q-header>

      <!-- ======== PIE DE PÁGINA ====== -->
      <q-footer bordered class="bg-grey-3 text-primary">
        <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
          <q-tab name="parati" label="Para tí" />
          <q-tab name="tendencias" label="Tendencias" />
        </q-tabs>
      </q-footer>

      <!-- ======= CUERPO  ======= -->
      <q-page-container>
        <q-page>
          <!-- ======= Contenido  ======= -->

          <!-- Botón para abrir el modal -->
          <q-btn label="Agregar publicación" color="primary" @click="abrirModal" />

          <!-- Modal -->
          <q-dialog v-model="showModal">
            <q-card style="min-width: 400px">
              <q-card-section>
                <div class="text-h6">Nueva publicación</div>
              </q-card-section>

              <q-card-section>
                <q-input filled v-model="nuevaPublicacion.nombreUsuario" label="Usuario" readonly />

                <q-input filled v-model="nuevaPublicacion.descripcion" label="Descripción" type="textarea" />

                <!-- SUBIR IMAGEN DESDE ARCHIVO -->
                <q-file filled v-model="archivoImagen" label="Subir imagen desde el dispositivo" accept="image/*"
                  @update:model-value="convertirImagen" />

                <q-select filled v-model="nuevaPublicacion.hashtags" :options="hashtagsOpciones" label="Hashtags"
                  multiple use-chips hide-dropdown-icon />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="negative" v-close-popup />
                <q-btn flat label="Agregar" color="primary" @click="agregarPublicacion" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Contenedor de cards existente -->
          <div v-show="tab === 'parati'">
            <div class="contenedor-cards row q-gutter-md justify-evenly q-pa-lg">
              <CardParaTi v-for="card in infoCards" :key="card.nombreUsuario" :card="card" />
            </div>
          </div>

          <!-- Contenido TENDENCIAS -->
          <div v-show="tab === 'tendencias'" class="column justify-center q-gutter-xl">
            <div>
              <h3 class="text-center">TENDENCIAS</h3>
            </div>

            <div class="row justify-around q-gutter-md">

              <!-- LIKES -->
              <div class=" ordenar column justify-center items-center q-gutter-md">
                <div>
                  <h3 class="q-pb-xl">Likes</h3>
                </div>
                <div>
                  <CardsLikes v-for="(item, i) in Likes" :key="i" :item="item" :imgTopLeft="LikeImg"
                    :imgTopRight="LikeImg" :imgBottomLeft="LikeImg" :imgBottomRight="LikeImg" />
                </div>
              </div>

              <!-- COMENTARIOS -->
              <div class=" ordenar column justify-center items-center q-gutter-md">
                <div>
                  <h3 class="q-pb-xl">Comentarios</h3>
                </div>
                <div>
                  <CardsLikes v-for="(item, i) in Comentarios" :key="i" :item="item" :imgTopLeft="ComentarioImg"
                    :imgTopRight="ComentarioImg" :imgBottomLeft="ComentarioImg" :imgBottomRight="ComentarioImg" />
                </div>
              </div>

              <!-- COMAPRTIDOS -->
              <div class=" ordenar column justify-center items-center q-gutter-md">
                <div>
                  <h3 class="q-pb-xl">Compartidos</h3>
                </div>
                <div>
                  <CardsLikes v-for="(item, i) in Compartidos" :key="i" :item="item" :imgTopLeft="CompartidoImg"
                    :imgTopRight="CompartidoImg" :imgBottomLeft="CompartidoImg" :imgBottomRight="CompartidoImg" />
                </div>
              </div>
            </div>

            <!-- GLOBAL -->
            <div class=" global column justify-center items-center q-gutter-md">
              <div>
                <h3 class="q-pb-xl">Global</h3>
              </div>
              <div class="ordenarglobal">
                <CardsLikes v-for="(item, i) in Global" :key="i" :item="item" :imgTopLeft="GlobalImg"
                  :imgTopRight="GlobalImg" :imgBottomLeft="GlobalImg" :imgBottomRight="GlobalImg" />
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>


<script setup>
import { ref, reactive } from "vue";
import LogoPag from "./assets/Logo.png";
import CardsLikes from "./components/CardsLikes.vue";
import LikeImg from "./assets/Likes.png";
import ComentarioImg from "./assets/Comentarios.png";
import CompartidoImg from "./assets/Compartidos.png";
import GlobalImg from "./assets/Global.png";
import { Likes, Comentarios, Compartidos, Global } from "./data/CardsTop.js";

// ANDRES
import CardParaTi from "./components/CardParaTi.vue";
import cardsParatiData from "./data/cards.js";
import { nombresEstilo, fotosPerfilRandom } from "./data/cards.js";


const guardadas = JSON.parse(localStorage.getItem("publicaciones"));
const infoCards = ref(guardadas || [...cardsParatiData.value]);

const tab = ref("parati");
const showModal = ref(false);

const nuevaPublicacion = reactive({
  nombreUsuario: "",
  fotoPerfil: "",
  descripcion: "",
  imagenPublicacion: "",
  hashtags: [],
  likes: 0,
  liked: false,
  compartidos: 0,
  comentarios: [],
  id: "",
});

const hashtagsString = ref("");
const archivoImagen = ref(null);

function abrirModal() {
  showModal.value = true;
}

function limpiarFormulario() {
  nuevaPublicacion.nombreUsuario = "";
  nuevaPublicacion.fotoPerfil = "";
  nuevaPublicacion.descripcion = "";
  nuevaPublicacion.imagenPublicacion = "";
  nuevaPublicacion.hashtags = [];
  hashtagsString.value = "";
}

function nombreAleatorio() {
  const index = Math.floor(Math.random() * nombresEstilo.length);
  return nombresEstilo[index];
}

function getFotoRandom() {
  const i = Math.floor(Math.random() * fotosPerfilRandom.length);
  return fotosPerfilRandom[i];
}

function agregarPublicacion() {
  nuevaPublicacion.nombreUsuario = nombreAleatorio();
  nuevaPublicacion.fotoPerfil = getFotoRandom();
  nuevaPublicacion.hashtags = [...nuevaPublicacion.hashtags];

  infoCards.value.push({ ...nuevaPublicacion });

  localStorage.setItem("publicaciones", JSON.stringify(infoCards.value));

  limpiarFormulario();
  showModal.value = false;
}

function convertirImagen() {
  const file = archivoImagen.value;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    nuevaPublicacion.imagenPublicacion = reader.result;
  };
  reader.readAsDataURL(file);
}

const hashtagsOpciones = ref([
  "#ReciboLargo",
  "#TicketMega",
  "#Cupones",
  "#AhorroTotal",
  "#SuperMercado",
  "#WTF",
  "#CocinaFail",
]);
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: black;
}

html,
body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: white;
}

#app {
  width: 100%;
  max-width: 1920px;
  min-height: 100%;
  background: white;
}

.q-avatar {
  width: 50px;
  height: 50px;
}

.q-dialog .q-card {
  border-radius: 18px;
  padding: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
}

.q-dialog .text-h6 {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #2b2b2b;
}

.q-dialog .q-input,
.q-dialog .q-file {
  margin-bottom: 15px;
}

.q-dialog .q-btn {
  font-weight: 600;
  border-radius: 10px;
}

.q-dialog .q-btn[color="primary"] {
  background: #2962ff;
  color: white;
}

.q-dialog .q-btn[color="negative"] {
  color: #d32f2f;
}

.q-card-section {
  padding-top: 10px;
  padding-bottom: 10px;
}

.q-card-actions {
  padding: 10px 15px;
}

h3 {
  font-size: clamp(2rem, 4vw, 3rem);
}

.text-h3 {
  font-size: clamp(2rem, 4vw, 3rem);
}

.ordenar {
  margin: 0 !important;
}


.ordenarglobal{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>
