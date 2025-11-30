<template>
  <CardInicio titulo="Estadisticas">
    <div class="top-container">
      <div class="card">
        <h3>1° Lugar</h3>
        <p>Descripción del primer puesto</p>
      </div>
      <div class="card">
        <h3>2° Lugar</h3>
        <p>Descripción del segundo puesto</p>
      </div>
      <div class="card">
        <h3>3° Lugar</h3>
        <p>Descripción del tercer puesto</p>
      </div>
    </div>

    <table class="tabla-ranking">
      <thead>
        <tr>
          <th>Puesto</th>
          <th>Nombre</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>4</td>
          <td>Usuario 4</td>
          <td>850</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Usuario 5</td>
          <td>820</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Usuario 6</td>
          <td>790</td>
        </tr>
      </tbody>
    </table>
  </CardInicio>
</template>

<script setup>
import BotonIniciar from "../components/BotonIniciar.vue";
import CardInicio from "../components/CardInicio.vue";
</script>

<style>
.top-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.card {
  width: 250px;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.card h3 {
  margin: 0;
  font-size: 22px;
  color: #333;
}

.card p {
  margin-top: 10px;
  color: #666;
}

.tabla-ranking {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
}

.tabla-ranking th {
  background: #333;
  color: white;
  padding: 12px;
  text-align: left;
}

.tabla-ranking td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.tabla-ranking tr:hover {
  background: #f1f1f1;
}
</style>