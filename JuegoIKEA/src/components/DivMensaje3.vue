<template>
  <div class="comic-bubble" :class="bgClass" :style="{ color: color }">
    <p class="bubble-text" :class="textClass">{{ texto }}</p>
  </div>
</template>

<script setup>
defineProps({
  texto: {
    type: String,
    required: true,
  },
  textClass: {
    type: String,
    default: "text-black",
  },
  bgClass: {
    type: String,
    default: "bg-white",
  },
  color: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.comic-bubble {
  background-color: var(--bubble-color, #fff);
  padding: 5px 10px;
  border-radius: 10px;
  max-width: 90%;            
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
