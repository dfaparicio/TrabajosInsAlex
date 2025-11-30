<template>
  <button class="boton" @click="onClick">
    {{ texto }}
  </button>
</template>

<script setup>
const { texto, onStart } = defineProps({
  texto: {
    type: String,
    default: "Comenzar historia"
  },
  onStart: {
    type: Function,
    required: true
  }
})

function onClick() {
  onStart()
}
</script>

<style scoped>
.boton {
  background: #ffeb3b;
  color: #000;
  font-weight: 900;
  font-size: clamp(1rem, 3vw, 2rem);
  padding: clamp(0.6rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem);
  border: clamp(2px, 0.6vw, 4px) solid #000;
  border-radius: clamp(15px, 4vw, 30px);
  cursor: pointer;
  box-shadow: clamp(3px, 1vw, 6px) clamp(3px, 1vw, 6px) 0px #000;
  transition: 0.15s ease;
  font-family: "Luckiest Guy", cursive;
  letter-spacing: clamp(0.5px, 0.4vw, 1px);
}

.boton:hover {
  transform: translateY(-4px) rotate(-1deg);
  background: #fff176;
  box-shadow: clamp(5px, 1.3vw, 8px) clamp(5px, 1.3vw, 8px) 0px #000;
}

.boton:active {
  transform: translateY(3px) rotate(1deg);
  box-shadow: clamp(2px, 0.7vw, 3px) clamp(2px, 0.7vw, 3px) 0px #000;
}
</style>
