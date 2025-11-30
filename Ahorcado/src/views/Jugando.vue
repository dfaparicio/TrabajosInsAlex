<template>
  <CardInicio class="flex justify-center items-center">
    <div class="flex column q-gutter-xl">
      <div class=" ordenar flex justify-center q-gutter-xl">
        <div><strong>categoria</strong></div>
        <div><strong>Nivel</strong></div>
        <div><strong>Intentos</strong></div>
      </div>
      <div class=" ordenar row justify-center items-center q-gutter-xl">
        <div><img :src="LocoJugar" alt="" /></div>
        <div class="flex column justify-center items-center">
          <div>
            <div class="bases">
              <div class="slot"></div>
              <div class="slot"></div>
              <div class="slot"></div>
              <div class="slot"></div>
              <div class="slot"></div>
            </div>
          </div>
          <div>alertas</div>
        </div>
      </div>

      <div>
        <div class="teclado">
          <div class="fila">
            <button>Q</button><button>W</button><button>E</button
            ><button>E</button><button>R</button><button>T</button
            ><button>Y</button><button>U</button><button>I</button
            ><button>O</button><button>P</button>
          </div>
          <div class="fila">
            <button>A</button><button>S</button><button>D</button
            ><button>F</button><button>G</button><button>H</button
            ><button>J</button><button>K</button><button>L</button>
          </div>
          <div class="fila">
            <button>Z</button><button>X</button><button>C</button
            ><button>V</button><button>B</button><button>N</button
            ><button>M</button>
          </div>
        </div>
      </div>
    </div>
  </CardInicio>
</template>

<script setup>
import CardInicio from "../components/CardInicio.vue";
import LocoJugar from "../assets/Loco.png";
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
  background: #ffffff;
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

.ordenar{
    margin: 0 !important;
}
</style>