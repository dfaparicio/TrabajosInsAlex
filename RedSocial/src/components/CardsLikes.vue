<template>
  <div class="rank-container">

    <q-card class="my-card">
      <q-img :src="item.fotoPerfil" class="card-img" fit="cover">

        <img :src="imgTopLeft" class="like-icon like-top-left" />
        <img :src="imgTopRight" class="like-icon like-top-right" />
        <img :src="imgBottomLeft" class="like-icon like-bottom-left" />
        <img :src="imgBottomRight" class="like-icon like-bottom-right" />

        <div class="absolute-bottom text-subtitle2 text-center">

          <div class="flex items-center">
            <div :class="colorTexto + ' ' + tamañoEmoji">
              {{ item.emoji }}
            </div>

            <div :class="colorTexto + ' ' + tamañoLetra">
              {{ item.title }}
            </div>
          </div>

          <div :class="colorTexto + ' ' + tamañoLetra">
            {{ item.nombreUsuario.toUpperCase() }}
          </div>

        </div>

      </q-img>
    </q-card>
  </div>
</template>

<script setup>
import { QImg, QCard } from "quasar";
import Logo from "@/assets/Logo.png";

const props = defineProps({
  item: Object,
  colorTexto: { type: String, default: "text-white" },
  tamañoLetra: { type: String, default: "text-h6" },
  tamañoEmoji: { type: String, default: "text-h3" },
  imgTopLeft: { type: String, default: Logo },
  imgTopRight: { type: String, default: Logo },
  imgBottomLeft: { type: String, default: Logo },
  imgBottomRight: { type: String, default: Logo },
});
</script>

<style scoped>

.rank-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: clamp(20px, 6vw, 50px);
  transition: transform .3s ease;
}

.my-card {
  width: clamp(200px, 35vw, 250px);
}


.like-icon {
  position: absolute;
  width: clamp(18px, 4vw, 26px);
  height: clamp(18px, 4vw, 26px);
  z-index: 20;
  object-fit: contain;
}

.like-top-left {
  top: clamp(1px, 0.6vw, 2px);
  left: clamp(1px, 0.6vw, 2px);
  transform: rotate(-50deg);
}

.like-top-right {
  top: clamp(1px, 0.6vw, 2px);
  right: clamp(1px, 0.6vw, 2px);
  transform: rotate(50deg);
}

.like-bottom-left {
  bottom: clamp(1px, 0.6vw, 2px);
  left: clamp(1px, 0.6vw, 2px);
  transform: rotate(50deg);
}

.like-bottom-right {
  bottom: clamp(1px, 0.6vw, 2px);
  right: clamp(1px, 0.6vw, 2px);
  transform: rotate(-50deg);
}

</style>
