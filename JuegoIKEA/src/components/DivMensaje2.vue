<template>
  <div class="comic-bubble" :style="`--bubble-color: ${color}`">
    <p class="bubble-text" :class="textClass">{{ texto }}</p>
  </div>
</template>

<script setup>
defineProps({
  texto: {
    type: String,
    required: true
  },
  textClass: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#ffffff'
  }
})
</script>

<style scoped>
.comic-bubble {
  background-color: var(--bubble-color, #fff);
  padding: 1rem 1.5rem;
  border-radius: 20px;
  border: 3px solid #000;
  box-shadow: 3px 3px 0px #000;
  max-width: 350px;            
  width: auto;                   
}

.bubble-text {
  text-align: center;
  font-size: clamp(0.8rem, 2vw + 0.5rem, 1.5rem);
  letter-spacing: 1px;
  line-height: 1.3;
  text-shadow: none;
}



p{
  margin: 0;
}
</style>