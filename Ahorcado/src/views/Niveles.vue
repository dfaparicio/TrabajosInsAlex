<template>
  <CardInicio
    titulo="Elige el nivel, no seas miedoso.."
    class="column justify-center items-center"
  >
    <div class="Niveles">
      <div class="Nivelescon">
        <div>
            <img :src="LocoJugar" alt="">
        </div>
        <div class="cards">
          <CardMediana
            color=""
            :imagen="Facil"
            titulo="Fácil"
            parrafo="Palabras de 4-6 letras + 8 intentos"
          />
          <CardMediana
            color=""
            :imagen="Medio"
            titulo="Medio"
            parrafo="Palabras de 7-9 letras + 6 intentos"
          />
          <CardMediana
            color=""
            :imagen="Dificil"
            titulo="Difícil"
            parrafo="Palabras de +10 letras + 5 intentos"
          />
        </div>
      </div>

      <div class="column justify-center">
        <div><BotonIniciar to="/jugando">AH JUGARRRR !!</BotonIniciar></div>
      </div>
    </div>
  </CardInicio>
</template>

<script setup>
import BotonIniciar from "../components/BotonIniciar.vue";
import CardInicio from "../components/CardInicio.vue";
import CardMediana from "../components/CardMediana.vue";

import Facil from "../assets/Facil.png";
import Medio from "../assets/Medio.png";
import Dificil from "../assets/Dificil.png";
import LocoJugar from "../assets/Loco.png";
</script>

<style>
.cards {
  margin: 0 !important;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 50px;
}

.Niveles{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.Nivelescon{
display: flex;
justify-content: center;
align-items: center;
gap: 50px;
}
</style>