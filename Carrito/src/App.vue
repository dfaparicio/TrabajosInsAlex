<template>
  <div>
    <!-- ===========================================
        ESTRUCTURA PRINCIPAL DEL LAYOUT
        =========================================== -->
    <q-layout view="hHh Lpp fFf" class="bg-grey-1 hide-scrollbar">
      <!-- hHh = header fijo arriba -->
      <!-- Lpr = drawers laterales -->
      <!-- fFf = footer aparece al final al hacer scroll -->
      <!-- =========================================================
          ENCABEZADO (HEADER)
          ========================================================= -->
      <q-header class="bg-blue-grey-13 text-white">
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
          <q-toolbar-title class="text-center">Carrito de Compras</q-toolbar-title>

          <div class="carrito-btn-wrapper">
            <q-btn flat round dense icon="shopping_cart" @click="drawerRight = !drawerRight" />
            <q-badge v-if="totalproductos > 0" color="red" text-color="white" floating>
              {{ totalproductos }}
            </q-badge>
          </div>
        </q-toolbar>
      </q-header>

      <!-- =========================================================
          DRAWER IZQUIERDO
          ========================================================= -->
      <q-drawer v-model="drawerLeft" :width="220" class="text-white">
        <div class="carrito-header q-pa-sm row items-center justify-between  text-white">
          <q-btn flat round dense icon="arrow_circle_right" color="white" @click="drawerLeft = false" />
          <div class="text-h6 text-center">Opciones</div>
          <div style="width:32px"></div>
        </div>
        <q-list>
          <q-item clickable v-ripple><q-item-section>Inicio</q-item-section></q-item>
          <q-item clickable v-ripple><q-item-section>Productos</q-item-section></q-item>
          <q-item clickable v-ripple><q-item-section>Contacto</q-item-section></q-item>
        </q-list>
      </q-drawer>

      <!-- =========================================================
          DRAWER DERECHO
          ========================================================= -->
      <q-drawer side="right" v-model="drawerRight" bordered :width="300" class="carrito-fijo bg-white">
        <div class="carritofijo q-pa-md">
          <q-btn flat round dense icon="arrow_circle_left" @click="drawerRight = false" color="white" />
          <div class="carro">
            <div class="carrito">
              <h5 class="text-center q-py-lg">Carrito de Compras</h5>
              <p class="info row justify-between">
                <strong>Total de Productos:</strong> <span>{{ totalproductos }}</span>
              </p>
              <p class="info row justify-between">
                <strong>Subtotal:</strong> <span>COP ${{ subtotal }}</span>
              </p>
              <p class="info row justify-between">
                <strong>Impuesto (16%):</strong> <span>COP ${{ impuesto }}</span>
              </p>
              <br />
              <div class="total row justify-between">
                <h5>TOTAL</h5> <span>COP ${{ total }}</span>
              </div>
              <div class="pagar row justify-center q-my-md">
                <q-btn @click="pagar" round color="positive" icon="shopping_cart" />
              </div>
            </div>
          </div>
        </div>
      </q-drawer>

      <!-- =========================================================
          CUERPO PRINCIPAL (MAIN)
          ========================================================= -->
      <q-page-container class="bg-white">
        <q-page>

          <!-- =========================================================
    SECCIÓN DE PRESENTACIÓN / HERO
    ========================================================= -->
          <section class="seccion-presentacion q-pa-xl">
            <div class="row items-center justify-around q-gutter-xl">

              <!-- Imagen -->
              <div class="col-12 col-md-5 text-center">
                <q-img :src="Logo" alt="Tecnología moderna" class="imagen-tecno" spinner-color="primary"
                  transition="fade" />
              </div>

              <!-- Texto -->
              <div class="col-12 col-md-5 text-center text-md-left">
                <h1 class="titulo-principal q-mb-md">
                  Bienvenido a <span class="resaltado">TuTiendaTech</span>
                </h1>
                <p class="descripcion">
                  Esta es la tienda tecnológica donde encontrarás los mejores productos
                  de última generación: laptops, procesadores, periféricos y mucho más.
                  Innovación, calidad y precios increíbles, todo en un solo lugar ⚡
                </p>
                <q-btn color="primary" icon="shopping_cart" label="Explorar Productos" class="q-mt-lg" push glossy />
              </div>
            </div>
          </section>

          <main>
            <q-banner v-if="alerta" class="bg-green-2 text-green-10 q-ma-xl q-pa-md shadow-2" rounded inline-actions>
              <template v-slot:avatar>
                <q-icon name="local_shipping" color="green-8" />
              </template>
              {{ alerta }}
              <template v-slot:action>
                <q-btn flat color="green-9" label="Ver detalles" @click="drawerRight = true" />
              </template>
            </q-banner>

            <div class="contenedor">
              <div class="productos q-pa-xl">
                <div class="todoslosarticulos">
                  <div class="articulo" v-for="(prod, index) in productos" :key="index">
                    <div class="img" row justify-center>
                      <img :src="prod.imagen" :alt="prod.nombre" />
                    </div>

                    <div class="infoarticulo">
                      <h5>{{ prod.nombre }}</h5>
                      <p>{{ prod.descripcion }}</p>
                      <p>COP ${{ prod.precio }}</p>
                    </div>

                    <div class="cantidad">
                      <q-btn class="botonagregar" v-if="!prod.agregado" @click="agregarAlCarrito(prod)" push
                        color="positive" glossy icon="local_grocery_store" label="Agregar" />
                      <div v-else class="controles-cantidad row items-center justify-between q-gutter-md">
                        <q-btn dense round color="negative" glossy icon="remove" @click="disminuirCantidad(prod)" />
                        <span>{{ prod.cantidad }}</span>
                        <q-btn dense round color="positive" glossy icon="add" @click="aumentarCantidad(prod)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </q-page>
      </q-page-container>

      <!-- =========================================================
          PIE DE PÁGINA (FOOTER)
          ========================================================= -->
      <q-footer class="bg-blue-grey-13 text-white text-center q-pa-md shadow-2">
        <div>© 2025 TuTiendaTech — Todos los derechos reservados</div>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Tv from "./assets/TV.png";
import Msi from "./assets/MSI.png";
import Mouse from "./assets/MOUSE.png";
import Ryzen from "./assets/RYZEN.png";
import Samsung from "./assets/DISCO.png";
import Tarjeta from "./assets/5090.png";
import Teclado from "./assets/TECLADO.png";
import Zowie from "./assets/ZOWIE.png";
import Loq from "./assets/LOQ.png";
import Logo from "./assets/LOGO.png";

const drawerLeft = ref(false);
const drawerRight = ref(false);

const productos = ref([
  {
    nombre: "AMD Ryzen 7 7700X",
    descripcion:
      "Procesador de 8 núcleos y alto rendimiento para gaming y trabajo.",
    imagen: Ryzen,
    precio: 250,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Samsung SSD 1TB NVMe",
    descripcion:
      "Unidad de estado sólido ultrarrápida con lectura de 7000 MB/s.",
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
    descripcion:
      "Teclado mecánico compacto y preciso para jugadores exigentes.",
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

/////////////// FUNCION AGREGAR ///////////////
function agregarAlCarrito(prod) {
  prod.agregado = true;
  prod.cantidad = 1;
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `${prod.nombre} fue añadido al carrito`,
    imageUrl: prod.imagen,
    customClass: {
      popup: "toast-carrito",
    },
    showConfirmButton: false,
    timer: 1500,
  });
}
/////////////// FUNCION AUMENTAR ///////////////
function aumentarCantidad(prod) {
  prod.cantidad++;
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `Agregaste una unidad más de ${prod.nombre}`,
    imageUrl: prod.imagen,
    customClass: {
      popup: "toast-carrito",
    },
    showConfirmButton: false,
    timer: 1500,
  });
}
/////////////// FUNCION DISMINUIR ///////////////
function disminuirCantidad(prod) {
  if (prod.cantidad > 1) {
    prod.cantidad--;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: `Quitaste una unidad de ${prod.nombre}`,
      imageUrl: prod.imagen,
      customClass: {
        popup: "toast-carrito",
      },
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    prod.agregado = false;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: `${prod.nombre} fue eliminado del carrito`,
      imageUrl: prod.imagen,
      customClass: {
        popup: "toast-carrito",
      },
      showConfirmButton: false,
      timer: 1500,
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
    .reduce((total, prod) => total + prod.precio * prod.cantidad, 0);
});

const impuesto = computed(() => {
  return subtotal.value * 0.16;
});

const total = computed(() => {
  return subtotal.value + impuesto.value;
});

/////////////// ALERTA ENVIO > 1000 ///////////////
const alerta = ref("");

watch(total, (nuevototal) => {
  if (nuevototal > 1000) {
    alerta.value =
      "¡Felicidades! Has desbloqueado el envío gratis por compras superiores a $1000.";
  } else {
    alerta.value = "";
  }
});

/////////////// LOCALSTORAGE ///////////////
const guardados = localStorage.getItem("productos");
if (guardados) {
  const productosGuardados = JSON.parse(guardados);

  // Mezcla productos del código actual + guardados
  const nombresGuardados = productosGuardados.map(p => p.nombre);
  const nuevos = productos.value.filter(p => !nombresGuardados.includes(p.nombre));

  productos.value = [...productosGuardados, ...nuevos];
}


watch(
  productos,
  (nuevo) => {
    localStorage.setItem("productos", JSON.stringify(nuevo));
  },
  { deep: true }
);

/////////////// Carrito ///////////////
watch(
  [totalproductos, subtotal, impuesto, total],
  ([nuevoTotalProductos, nuevoSubtotal, nuevoImpuesto, nuevoTotal]) => {
    const carritoResumen = {
      totalproductos: nuevoTotalProductos,
      subtotal: nuevoSubtotal,
      impuesto: nuevoImpuesto,
      total: nuevoTotal,
    };
    localStorage.setItem("carritoResumen", JSON.stringify(carritoResumen));
  }
);

const resumenGuardado = localStorage.getItem("carritoResumen");
if (resumenGuardado) {
  const carritoResumen = JSON.parse(resumenGuardado);
  console.log("Resumen del carrito cargado:", carritoResumen);
}

/////////////// FUNCION PAGAR ///////////////
function pagar() {
  const productosEnCarrito = productos.value.filter((p) => p.agregado);

  if (productosEnCarrito.length === 0) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: "Tu carrito está vacío 🛒",
      showConfirmButton: false,
      timer: 1800,
      background: "#fff",
      customClass: { popup: "alerta-nueva" },
    });
    return;
  }

  Swal.fire({
    toast: true,
    title: "¿Deseas completar tu compra?",
    html: `Total a pagar: <strong>COP $${total.value}</strong>`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, pagar ahora",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    customClass: { popup: "alerta-pago" },
  }).then((result) => {
    if (result.isConfirmed) {
      productos.value.forEach((p) => {
        p.agregado = false;
        p.cantidad = 1;
      });

      localStorage.setItem("productos", JSON.stringify(productos.value));

      Swal.fire({
        toast: true,
        toast: true,
        position: "top-end",
        icon: "success",
        title: "¡Pago completado!",
        text: "Gracias por tu compra",
        showConfirmButton: false,
        timer: 1700,
        customClass: { popup: "alerta-nueva" },
      });
    }
  });
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  color: black;
}

::-webkit-scrollbar {
  display: none;
}

.q-footer {
  position: static !important;
  bottom: auto !important;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

html,
body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  background: white;
}

/* ---------- APP---------- */
#app {
  width: 100%;
  max-width: 1920px;
  min-height: 100%;
  padding: 0;
  background: white;
  overflow: visible;
}

/* ---------- CONTENEDOR PRINCIPAL DE PRODUCTOS ---------- */
.todoslosarticulos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

/* ---------- TARJETA INDIVIDUAL ---------- */
.articulo {
  width: 100%;
  max-width: 330px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* ---------- IMAGEN ---------- */
.articulo .img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 180px;
}

.articulo .img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

/* ---------- INFORMACIÓN ---------- */
.infoarticulo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.infoarticulo h5 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
  line-height: 1.3;
  min-height: 45px;
}

.infoarticulo p {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.4;
  margin: 0;
}

.infoarticulo p:nth-child(3) {
  font-weight: 600;
  color: #0011ff;
  padding-top: 10px;
}

.articulo .infoarticulo h5 {
  margin: 0;
}

.articulo .infoarticulo p {
  margin: 0;
}

/* ---------- CANTIDAD CARRITO---------- */
.carrito-btn-wrapper {
  position: relative;
  display: inline-block;
}

.carrito-btn-wrapper .q-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50%;
  z-index: 10;
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

/* ---------- PRESENTACION---------- */
.seccion-presentacion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.imagen-tecno {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 20px;
  object-fit: contain;
}

.titulo-principal {
  font-weight: 700;
  color: #1a1a1a;
}

.resaltado {
  color: #027be3;
  /* azul Quasar */
}

.descripcion {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}
</style>