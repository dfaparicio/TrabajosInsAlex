<template>
  <div>
    <header>
      <h1>Productos Disponibles</h1>
    </header>

    <main>
      <!-------------- ALERTA > 1000 ------------>
      <div class="alertas" v-if="alerta">
        <p>{{ alerta }}</p>
      </div>

      <div class="contenedor">

        <!-------------- TODO DE PRODUCTOS ------------>
        <div class="productos">
          <div class="todoslosarticulos">
            <div class="articulo" v-for="(prod, index) in productos" :key="index">
              <div class="img"><img :src="prod.imagen" :alt="prod.nombre" /></div>

              <div class="infoarticulo">
                <h3>{{ prod.nombre }}</h3>
                <p>{{ prod.descripcion }}</p>
                <p>COP ${{ prod.precio }}</p>
              </div>

              <div class="cantidad">
                <button class="botonagregar" v-if="!prod.agregado" @click="agregarAlCarrito(prod)">
                  🛒 Agregar al Carrito
                </button>
                <div v-else class="controles-cantidad">
                  <button @click="disminuirCantidad(prod)">➖</button>
                  <span>{{ prod.cantidad }}</span>
                  <button @click="aumentarCantidad(prod)">➕</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-------------- TODO CARRITO ------------>
        <div class="carritofijo">
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
            <button class="pagar" @click="pagar">Pagar</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Tv from "./assets/TV.png";
import Msi from "./assets/MSI.png";
import Mouse from "./assets/MOUSE.png";
import Ryzen from "./assets/RYZEN.png";
import Samsung from "./assets/DISCO.png";
import Tarjeta from "./assets/5090.png";
import Teclado from "./assets/TECLADO.png";
import Zowie from "./assets/ZOWIE.png";
import Loq from "./assets/LOQ.png";


const productos = ref([
  {
    nombre: "AMD Ryzen 7 7700X",
    descripcion: "Procesador de 8 núcleos y alto rendimiento para gaming y trabajo.",
    imagen: Ryzen,
    precio: 250,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Samsung SSD 1TB NVMe",
    descripcion: "Unidad de estado sólido ultrarrápida con lectura de 7000 MB/s.",
    imagen: Samsung,
    precio: 100,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "BenQ ZOWIE XL2586X",
    descripcion: "Monitor gamer de 24.5'' con 540 Hz para máxima fluidez.",
    imagen: Zowie,
    precio: 100,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Logitech G Pro Mecánico",
    descripcion: "Teclado mecánico compacto y preciso para jugadores exigentes.",
    imagen: Teclado,
    precio: 100,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "PNY GeForce RTX 5090 32GB",
    descripcion: "Tarjeta gráfica de última generación con iluminación ARGB.",
    imagen: Tarjeta,
    precio: 100,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Lenovo LOQ 16''",
    descripcion: "Laptop gamer con gran potencia y diseño moderno.",
    imagen: Loq,
    precio: 100,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "LG 55'' 4K UHD",
    descripcion: "Televisor inteligente con 4K UHD y soporte HDR10.",
    imagen: Tv,
    precio: 500,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "MSI Gamer i7 RTX 4060",
    descripcion: "Portátil con procesador i7, 16 GB RAM y GPU RTX 4060.",
    imagen: Msi,
    precio: 500,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Logitech G Pro X Superlight 2",
    descripcion: "Mouse inalámbrico ultraligero con sensor HERO 2.",
    imagen: Mouse,
    precio: 120,
    cantidad: 1,
    agregado: false,
  }
]);

console.log(productos.value)


/////////////// FUNCION AGREGAR ///////////////
function agregarAlCarrito(prod) {
  prod.agregado = true;
  prod.cantidad = 1;
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `${prod.nombre} fue añadido al carrito`,
    imageUrl: prod.imagen,
    customClass: {
      popup: 'toast-carrito'
    },
    showConfirmButton: false,
    timer: 1500
  });
}
/////////////// FUNCION AUMENTAR ///////////////
function aumentarCantidad(prod) {
  prod.cantidad++;
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `Agregaste una unidad más de ${prod.nombre}`,
    imageUrl: prod.imagen,
    customClass: {
      popup: 'toast-carrito'
    },
    showConfirmButton: false,
    timer: 1500
  });

}
/////////////// FUNCION DISMINUIR ///////////////
function disminuirCantidad(prod) {
  if (prod.cantidad > 1) {
    prod.cantidad--;
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: `Quitaste una unidad de ${prod.nombre}`,
      imageUrl: prod.imagen,
      customClass: {
        popup: 'toast-carrito'
      },
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    prod.agregado = false;
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: `${prod.nombre} fue eliminado del carrito`,
      imageUrl: prod.imagen,
      customClass: {
        popup: 'toast-carrito'
      },
      showConfirmButton: false,
      timer: 1500
    });
  }
}

/////////////// CARRITO ///////////////
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

/////////////// ALERTA ENVIO > 1000 ///////////////
const alerta = ref('');

watch(total, (nuevototal) => {
  if (nuevototal > 1000) {
    alerta.value = '¡Felicidades! Has desbloqueado el envío gratis por compras superiores a $1000.'
  } else {
    alerta.value = ''
  }
})

/////////////// LOCALSTORAGE ///////////////
const guardados = localStorage.getItem('productos')
if (guardados) {
  productos.value = JSON.parse(guardados)
}

watch(
  productos,
  (nuevo) => {
    localStorage.setItem('productos', JSON.stringify(nuevo))
  },
  { deep: true }
)



/////////////// Carrito ///////////////
watch(
  [totalproductos, subtotal, impuesto, total],
  ([nuevoTotalProductos, nuevoSubtotal, nuevoImpuesto, nuevoTotal]) => {
    const carritoResumen = {
      totalproductos: nuevoTotalProductos,
      subtotal: nuevoSubtotal,
      impuesto: nuevoImpuesto,
      total: nuevoTotal
    };
    localStorage.setItem('carritoResumen', JSON.stringify(carritoResumen));
  }
);

const resumenGuardado = localStorage.getItem('carritoResumen');
if (resumenGuardado) {
  const carritoResumen = JSON.parse(resumenGuardado);
  console.log('Resumen del carrito cargado:', carritoResumen);
}







/////////////// FUNCION PAGAR ///////////////
function pagar() {
  const productosEnCarrito = productos.value.filter(p => p.agregado);

  if (productosEnCarrito.length === 0) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Tu carrito está vacío 🛒',
      showConfirmButton: false,
      timer: 1800,
      background: '#fff',
      customClass: { popup: 'alerta-nueva' }
    });
    return;
  }

  Swal.fire({
    toast: true,
    title: '¿Deseas completar tu compra?',
    html: `Total a pagar: <strong>COP $${total.value}</strong>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, pagar ahora',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    customClass: { popup: 'alerta-pago' },
  }).then((result) => {
    if (result.isConfirmed) {
      productos.value.forEach(p => {
        p.agregado = false;
        p.cantidad = 1;
      });

      localStorage.setItem('productos', JSON.stringify(productos.value));

      Swal.fire({
        toast: true,
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '¡Pago completado!',
        text: 'Gracias por tu compra',
        showConfirmButton: false,
        timer: 1700,
        customClass: { popup: 'alerta-nueva' }
      });
    }
  });
}
</script>

<style>
/* ---------- GLOBAL ---------- */
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

/* ---------- APP---------- */
#app {
  width: 100%;
  max-width: 1920px;
  height: 100vh;
  padding: 0;
  background: white;
  overflow: visible;
}

/* ---------- ENCABEZADO ---------- */
header {
  padding: 40px;
}


/* ---------- CUERPO ---------- */
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

/* ---------- ALERTA > 1000 ---------- */
.alertas {
  width: 40%;
  padding: 16px 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, #fff7d6, #fff3b0);
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  animation: aparecer 1.2s ease, resplandor 2s infinite ease-in-out;
}

.alertas::before {
  content: "🎁";
  font-size: 1.6rem;
  display: inline-block;
  animation: saltito 2s infinite ease-in-out;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes saltito {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

/* ---------- CONTENEDOR PRINCIPAL ---------- */
.contenedor {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 50px;
}

/* ---------- CONTENEDOR PRODUCTOS ---------- */
.productos {
  width: 60%;
  padding-bottom: 100px;
  box-sizing: border-box;
}

.todoslosarticulos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-items: center;
  width: 100%;
  box-sizing: border-box;
}

/* ---------- CONTENEDOR ARTICULO ---------- */
.articulo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  background: #f1f1f1;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  width: 100%;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;

}

.articulo:hover {
  transform: scale(1.1);
  transition: transform 0.8s ease;
  background: #ffffff;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.1),
    0 8px 25px rgba(0, 0, 0, 0.2);
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ---------- INFORMACION ARTICULO ---------- */
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

/* ---------- CANTIDAD - Y + ---------- */
.cantidad {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.cantidad button {
  background: rgb(202, 202, 202);
}

.controles-cantidad {
  display: flex;
  align-items: center;
  gap: 50px;
}

.controles-cantidad button {
  padding: 10px;
  border: none;
  background: rgb(224, 224, 224);
  color: rgb(0, 0, 0);
  border-radius: 50px;
  cursor: pointer;
  font-size: 15px;
}

.controles-cantidad span {
  font-size: 25px;
  min-width: 25px;
  text-align: center;
}

/* ---------- BOTON AGREGAR ---------- */
.botonagregar {
  padding: 10px;
  border: none;
  background: rgb(224, 224, 224);
  color: rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
}

/* ---------- CONTENEDOR CARRITO ---------- */
.carritofijo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  height: 300px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 20px;
  padding: 20px 0 20px 0;
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

/* ---------- CONTENEDOR ALERTAS---------- */
.swal2-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999 !important;
  position: fixed !important;
  right: 5% !important;
  width: 450px !important;
  pointer-events: none !important;
}

.swal2-popup {
  border-radius: 14px !important;
  font-size: 0.95rem !important;
  padding: 14px 16px !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.swal2-image {
  width: 80px !important;
  height: 80px !important;
  border-radius: 8px !important;
  object-fit: contain !important;
}

.alerta-nueva {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  width: 340px !important;
  height: auto !important;
  padding: 15px !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.alerta-pago {
  display: flex;
  flex-direction: column;
  border-radius: 14px !important;
  padding: 20px !important;
  background: rgb(228, 227, 227) !important;
  color: #222 !important;
}

/* ---------- BOTÓN PAGAR ---------- */
.pagar {
  padding: 15px 30px;
  font-weight: 600;
  background-color: #89a7fc;
  color: #ffffff;
  border-radius: 14px;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}

.pagar:hover {
  background-color: #0044ff;
  color: #ffffff;
  transform: scale(1.05);
}

button:focus,
button:active {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
</style>