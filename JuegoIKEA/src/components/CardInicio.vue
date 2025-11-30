<template>
  <div class="fondo" :style="{ backgroundImage: `url(${fondo})` }">
    <h1 class="titulo">{{ titulo }}</h1>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    default: "El Martillo Valiente e IKEA"
  },
  fondo: {
    type: String,
    default: ""
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Baloo+2:wght@600&family=Fredoka+One&family=Luckiest+Guy&display=swap');

.fondo {
  width: 100%;                 
  min-height: 100vh;           
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  
  align-items: center;
  padding-bottom: 40px;         
}


.titulo {
  font-size: clamp(1.8rem, 6vw, 4rem);
  font-weight: 900;
  color: #ffcc00;
  -webkit-text-stroke: clamp(0.5px, 0.4vw, 1.5px) #000;
  text-align: center;
  font-family: "Luckiest Guy", cursive;
  transform: rotate(-2deg);
  transition: transform 0.1s;
}

.titulo:hover {
  transform: rotate(2deg) scale(1.05);
}

.container {
  margin-top: clamp(1rem, 2.5vw, 2.5rem);
}

h1{
  margin: 0;
}
</style>
