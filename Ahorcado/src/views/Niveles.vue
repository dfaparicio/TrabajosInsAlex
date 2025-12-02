<template>
  <CardInicio titulo="Elige el nivel, no seas miedoso.." class="column justify-center items-center">
    <div class="Niveles">
      <div class="Nivelescon">
        <div>
          <img :src="LocoJugar" alt="">
        </div>
        <div class="cards">
          <CardMediana :imagen="Facil" titulo="facil" parrafo="Palabras de 4-6 letras + 7 intentos"
            @select="seleccionarniv" :selected="nivel === 'facil'" />

          <CardMediana :imagen="Medio" titulo="medio" parrafo="Palabras de 7-9 letras + 6 intentos"
            @select="seleccionarniv" :selected="nivel === 'medio'" />

          <CardMediana :imagen="Dificil" titulo="dificil" parrafo="Palabras de +10 letras + 5 intentos"
            @select="seleccionarniv" :selected="nivel === 'dificil'" />
        </div>
      </div>

      <div class="column justify-center">
        <div>
          <BotonIniciar :to="`/jugando?cat=${categoria}&niv=${nivel}`">
            AH JUGARRRR !!
          </BotonIniciar>

        </div>
      </div>
    </div>
  </CardInicio>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import BotonIniciar from "../components/BotonIniciar.vue";
import CardInicio from "../components/CardInicio.vue";
import CardMediana from "../components/CardMediana.vue";

import Facil from "../assets/Facil.png";
import Medio from "../assets/Medio.png";
import Dificil from "../assets/Dificil.png";
import LocoJugar from "../assets/Loco.png";

const route = useRoute();
const categoria = route.query.cat; 

const nivel = ref(""); 

function seleccionarniv(niv) {
  nivel.value = niv.toLowerCase();
  console.log("Nivel elegido:", nivel.value);
}
</script>


<style>
.cards {
  margin: 0 !important;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 50px;
}

.Niveles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.Nivelescon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>