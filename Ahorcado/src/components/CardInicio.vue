<template>
  <div class="fondo">
    <div class="clastitulo">
      <h1 class="titulo">{{ titulo }}</h1>
    </div>
    <div>
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: {
    type: String
  },
});
</script>

<style scoped>
.fondo {
  display: flex;
}

.clastitulo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.titulo {
  font-size: clamp(1.8rem, 6vw, 2rem);
  color: #000000;
  -webkit-text-stroke: clamp(0.5px, 0.4vw, 1.5px) #000;
  text-align: center;
  transform: rotate(-2deg);
  transition: transform 0.1s;
  letter-spacing: clamp(0.5px, 0.4vw, 8px);
  padding: 20px;
}

.titulo:hover {
  transform: rotate(2deg) scale(1.05);
}

.container {
  margin-top: clamp(1rem, 2.5vw, 2.5rem);
}

h1 {
  margin: 0;
}
</style>
