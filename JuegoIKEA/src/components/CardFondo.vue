<template>
  <div class="fondo" :style="{ backgroundImage: `url(${imagen})` }">
    <h1 class="titulo text-center" :class="`text-${textcolor}`">{{ titulo }}</h1>
    <slot></slot>
  </div>
</template>


<script setup>
defineProps({
  imagen: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  textcolor: {
    type: String,
    default: 'black',
  }
});
</script>


<style scoped>
.fondo {
  width: 100%;
  min-height: 100vh;  
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}


.titulo {
  text-align: center;
  font-size: clamp(1.3rem, 4vw, 4rem);
  font-family: "Luckiest Guy", cursive;
  text-shadow: none;
}

h1{
  margin: 0;
}
</style>
