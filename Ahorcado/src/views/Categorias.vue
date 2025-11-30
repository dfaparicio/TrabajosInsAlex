<template>
  <CardInicio
    titulo="Selecciona las categorias, sin miedo.."
    class="column justify-center items-center"
  >
    <div class="column q-gutter-xl">
      <div class="categoriaimg q-ma-none">
        <div><img :src="LocoJugar" class="flex justify-center items-center"></div>
        <div class="cards q-ma-none">
          <CardPequeña color="" :imagen="Animales" titulo="Animales" />
          <CardPequeña color="" :imagen="Instrumentos" titulo="Instrumentos" />
          <CardPequeña color="" :imagen="Deportes" titulo="Deportes" />
          <CardPequeña color="" :imagen="Videojuegos" titulo="Videojuegos" />
          <CardPequeña color="" :imagen="Peliculas" titulo="Peliculas" />
          <CardPequeña color="" :imagen="Ciencia" titulo="Ciencia" />
        </div>
      </div>
      <div class="flex justify-center q-ma-none q-pt-xl">
        <BotonIniciar to="/niveles">Siguiente, RAPIDOOO!!</BotonIniciar>
      </div>
    </div>
  </CardInicio>
</template>

<script setup>
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
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 50px;
}

.categoriaimg{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
</style>