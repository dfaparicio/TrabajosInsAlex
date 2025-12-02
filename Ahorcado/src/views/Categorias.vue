<template>
  <CardInicio titulo="Selecciona las categorias, sin miedo.." class="column justify-center items-center">
    <div class="column q-gutter-xl">
      <div class="categoriaimg q-ma-none">
        <div><img :src="LocoJugar"></div>

        <div class="cards q-ma-none">
          <CardPequeña :imagen="Animales" titulo="animales" :selected="categoria === 'animales'"
            @select="seleccionarcat" />

          <CardPequeña :imagen="Instrumentos" titulo="instrumentos" :selected="categoria === 'instrumentos'"
            @select="seleccionarcat" />

          <CardPequeña :imagen="Deportes" titulo="deportes" :selected="categoria === 'deportes'"
            @select="seleccionarcat" />

          <CardPequeña :imagen="Videojuegos" titulo="videojuegos" :selected="categoria === 'videojuegos'"
            @select="seleccionarcat" />

          <CardPequeña :imagen="Peliculas" titulo="peliculas" :selected="categoria === 'peliculas'"
            @select="seleccionarcat" />

          <CardPequeña :imagen="Ciencia" titulo="ciencia" :selected="categoria === 'ciencia'"
            @select="seleccionarcat" />
        </div>
      </div>

      <div class="flex justify-center q-ma-none q-pt-xl">
        <BotonIniciar :to="`/niveles?cat=${categoria}`">Siguiente, RAPIDOOO!!</BotonIniciar>
      </div>
    </div>
  </CardInicio>
</template>

<script setup>
import { ref } from "vue";
import BotonIniciar from "../components/BotonIniciar.vue";
import CardInicio from "../components/CardInicio.vue";
import CardPequeña from "../components/CardPequeña.vue";

import Animales from "../assets/Animales.png";
import Instrumentos from "../assets/Instrumentos.png";
import Deportes from "../assets/Deportes.png";
import Videojuegos from "../assets/Videojuegos.png";
import Peliculas from "../assets/Peliculas.png";
import Ciencia from "../assets/Ciencia.png";

import LocoJugar from "../assets/LocoJugar.png";

const categoria = ref("");

function seleccionarcat(cat) {
  categoria.value = cat.toLowerCase();
  console.log("Seleccionaste:", categoria.value);
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 50px;
}

.categoriaimg {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
</style>