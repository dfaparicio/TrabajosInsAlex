<template>
  <div class="card-top primero" v-if="data">
    <div class="num">1°</div>
    <div class="nombre">{{ data.usuario }}</div>
    <div class="tiempo">{{ data.tiempo }}</div>
  </div>
</template>

<script setup>
defineProps({
  data: Object
})
</script>

<style scoped>
.card-top {
  width: 240px;
  padding: 22px;
  text-align: center;
  border-radius: 20px;
  margin: 12px auto;

  background: linear-gradient(135deg, rgba(20,20,30,0.75), rgba(10,10,15,0.65));
  backdrop-filter: blur(12px);

  box-shadow:
    inset 0 0 12px rgba(0,0,0,0.7),
    0 0 18px rgba(0,0,0,0.4);

  border: 2px solid rgba(255,255,255,0.08);
  color: #eee;
  transition: 0.25s ease;
}

.card-top:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 0 22px var(--glow);
}

.num {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 12px var(--glow);
}

.nombre {
  font-size: 22px;
  margin-top: 10px;
  color: #dfccff;
  font-weight: 600;
}

.tiempo {
  font-size: 17px;
  opacity: 0.85;
  margin-top: 12px;
}

/* ESTILO DE TOP 1 */
.primero {
  --glow: #e4c35fff;
  border-color: #e4c35faa;
  box-shadow: 0 0 25px #e4c35f55;
}
</style>
