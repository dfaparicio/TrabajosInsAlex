<template>
  <div>
    <header>
      <h1>Carrito de Compras</h1>
    </header>

    <main>
      <div class="alertas">
        <p>Alertas</p>
      </div>

      <div class="contenedor">
        <div class="productos">
          <h1>Productos Disponibles</h1>

          <div class="articulo" v-for="(prod, index) in productos" :key="index">
            <div class="img"><img :src="prod.imagen" :alt="prod.nombre" /></div>

            <div class="infoarticulo">
              <h3>{{ prod.nombre }}</h3>
              <p>{{ prod.descripcion }}</p>
              <p>COP ${{ prod.precio }}</p>
            </div>

            <div class="cantidad">
              <button v-if="!prod.agregado" @click="agregarAlCarrito(prod)">
                Agregar al Carrito
              </button>
              <div v-else class="controles-cantidad">
                <button @click="disminuirCantidad(prod)">-</button>
                <span>{{ prod.cantidad }}</span>
                <button @click="aumentarCantidad(prod)">+</button>
              </div>
            </div>
          </div>
        </div>

        <div class="carrito">
          <h2>Carrito de Compras</h2>
          <p class="info">
            <strong>Total de Productos:</strong>
            <span>{{ totalproductos }}</span>
          </p>
          <p class="info">
            <strong>Subtotal:</strong>
            <span> COP ${{ subtotal }}</span>
          </p>
          <p class="info">
            <strong>Impuesto (16%):</strong>
            <span>COP ${{ impuesto }}</span>
          </p>
          <br />
          <div class="total">
            <h2>TOTAL</h2>
            <span>COP ${{ total }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Swal from 'sweetalert2';

import Tv from "./assets/TV.png";
import Msi from "./assets/MSI.png";
import Mouse from "./assets/MOUSE.png";
import Ryzen from "./assets/RYZEN.png";
import Samsung from "./assets/DISCO.png";

const productos = ref([
  {
    nombre: "TV LG 55'' 4K UHD",
    descripcion:
      "Televisor inteligente LG con resolución 4K UHD, HDR10 y compatibilidad con asistentes de voz.",
    imagen: Tv,
    precio: 500,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Portátil Gamer MSI",
    descripcion:
      "Laptop gamer MSI con procesador Intel i7, 16GB RAM y tarjeta gráfica RTX 4060.",
    imagen: Msi,
    precio: 500,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Logitech G Pro X Superlight 2",
    descripcion:
      "Mouse inalámbrico, sondeo de 8 k, ligero, interruptores híbridos LIGHTFORCE, sensor HERO 2, 888 IPS, 44 000 DPI, 5 botones programables, carga USB-C, PC/Mac",
    imagen: Mouse,
    precio: 120,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Procesador AMD Ryzen 7 7700X",
    descripcion:
      "Procesador de alto rendimiento con 8 núcleos, 16 hilos y frecuencia máxima de 5.4 GHz.",
    imagen: Ryzen,
    precio: 250,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Disco SSD Samsung 1TB NVMe",
    descripcion:
      "Unidad de estado sólido Samsung con velocidades de lectura de hasta 7000 MB/s.",
    imagen: Samsung,
    precio: 100,
    cantidad: 1,
    agregado: false,
  },
]);

function agregarAlCarrito(prod) {
  prod.agregado = true;
  prod.cantidad = 1;
}

function aumentarCantidad(prod) {
  prod.cantidad++;
}

function disminuirCantidad(prod) {
  if (prod.cantidad > 1) {
    prod.cantidad--;
  } else {
    prod.agregado = false;
  }
}

const totalproductos = computed(() => {
  return productos.value
    .filter((prod) => prod.agregado)
    .reduce((total, prod) => total + prod.cantidad, 0);
});

const subtotal = computed(() => {
  return productos.value
  .filter((prod) => prod.agregado)
  .reduce((total, prod) => total + prod.precio * prod.cantidad, 0)
})

const impuesto = computed(() => {
  return subtotal.value * 0.16;
})

const total = computed(() => {
  return subtotal.value + impuesto.value;
})

</script>



<style>
* {
  margin: 0;
  padding: 0;
  color: black;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* ---------- CONTENEDOR PRINCIPAL ---------- */
#app {
  width: 100%;
  max-width: 1920px;
  height: 100vh;
  padding: 0;
  background: white;
}

header {
  padding: 20px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.alertas {
  width: 70%;
  border: 1px solid black;
}

.contenedor {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.productos {
  width: 70%;
  border: 1px solid black;
  padding: 10px;
}

.productos h1 {
  padding-bottom: 20px;
}

.articulo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  overflow: hidden;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.infoarticulo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
}

.infoarticulo h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.infoarticulo p {
  width: 85%;
  color: #555;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.infoarticulo strong,
.infoarticulo p:last-child {
  color: #007bff;
  font-weight: 600;
}

.cantidad {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.cantidad button {
  border: 1px solid black;
  background: transparent;
}

.controles-cantidad {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controles-cantidad button {
  padding: 5px 10px;
  border: none;
  background-color: #0026ff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.controles-cantidad span {
  font-size: 20px;
  min-width: 20px;
  text-align: center;
}

.carrito {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  height: 300px;
  border: 1px solid black;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.info span {
  font-weight: bold;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.total span {
  font-size: 20px;
  font-weight: bold;
}
</style>
