<template>
  <div>
    <!-- ======= ESTRUCTURA PRINCIPAL DEL LAYOUT ======= -->
    <q-layout view="hHh Lpr fFf" class="bg-grey-1 hide-scrollbar">
      <!-- hHh = header fijo arriba -->
      <!-- Lpr = drawers laterales -->
      <!-- fFf = footer aparece al final al hacer scroll -->

      <!-- ======= ENCABEZADO (HEADER) ======= -->
      <q-header class="bg-blue-grey-13 text-white">
        <q-toolbar>
          <q-btn
            flat
            round
            dense
            icon="menu"
            @click="drawerLeft = !drawerLeft"
          />
          <q-toolbar-title class="text-center text-white">
            TuTiendaTech
          </q-toolbar-title>

          <div class="carrito-btn-wrapper">
            <q-btn
              flat
              round
              dense
              icon="shopping_cart"
              @click="drawerRight = !drawerRight"
            />
            <q-badge
              v-if="totalproductos > 0"
              color="red"
              text-color="white"
              floating
            >
              {{ totalproductos }}
            </q-badge>
          </div>
        </q-toolbar>
      </q-header>

      <!-- ======= DRAWER IZQUIERDO ======= -->
      <q-drawer v-model="drawerLeft" :width="220" class="text-white" bordered>
        <div
          class="carrito-header q-pa-sm row items-center justify-between text-white"
        >
          <q-btn
            flat
            round
            dense
            icon="arrow_circle_right"
            color="white"
            @click="drawerLeft = false"
          />
          <div class="text-h6 text-center">Opciones</div>
          <div style="width: 32px"></div>
        </div>
        <q-list>
          <q-item clickable v-ripple
            ><q-item-section>Inicio</q-item-section></q-item
          >
          <q-item clickable v-ripple
            ><q-item-section>Productos</q-item-section></q-item
          >
          <q-item clickable v-ripple
            ><q-item-section>Contacto</q-item-section></q-item
          >
        </q-list>
      </q-drawer>

      <!-- ======= DRAWER DERECHO ======= -->
      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        :width="300"
        :heigth="200"
        class="carrito-fijo bg-white"
      >
        <div class="carritofijo q-pa-md">
          <q-btn
            flat
            round
            dense
            icon="arrow_circle_left"
            @click="drawerRight = false"
            color="white"
          />
          <div class="carro">
            <div class="carrito">
              <h5 class="text-center q-py-lg">Carrito de Compras</h5>
              <p class="info row justify-between">
                <strong>Total de Productos:</strong>
                <span>{{ totalproductos }}</span>
              </p>
              <p class="info row justify-between">
                <strong>Subtotal:</strong> <span>COP ${{ subtotal }}</span>
              </p>
              <p class="info row justify-between">
                <strong>Impuesto (16%):</strong>
                <span>COP ${{ impuesto }}</span>
              </p>
              <br />
              <div class="total row justify-between">
                <h5>TOTAL</h5>
                <span>COP ${{ total }}</span>
              </div>
              <div class="pagar row justify-center q-my-md">
                <q-btn
                  @click="pagar"
                  round
                  color="positive"
                  icon="shopping_cart"
                />
              </div>
            </div>
          </div>
        </div>
      </q-drawer>

      <!-- ======= CUERPO PRINCIPAL ======= -->
      <q-page-container class="bg-white">
        <q-page>
          <main>
            <q-banner
              v-if="alerta"
              class="bg-green-2 text-green-10 q-ma-md q-pa-md shadow-2"
              rounded
              inline-actions
            >
              <div
                class="alertas column justify-center items-center q-gutter-md"
              >
                <div class="column justify-center items-center">
                  <div>
                    <q-icon size="40px" name="local_shipping" color="green-8" />
                  </div>
                  <div>{{ alerta }}</div>
                </div>
                <div>
                  <q-btn
                    push
                    color="positive"
                    glossy
                    icon-right="arrow_forward"
                    label="Ver detalles"
                    @click="drawerRight = true"
                  />
                </div>
              </div>
            </q-banner>

            <div class="contenedor">
              <div class="productos q-pa-md">
                <div class="todoslosarticulos">
                  <div
                    class="articulo"
                    v-for="(prod, index) in productos"
                    :key="index"
                  >
                    <div class="img" row justify-center>
                      <img :src="prod.imagen" :alt="prod.nombre" />
                    </div>

                    <div class="infoarticulo">
                      <h5>{{ prod.nombre }}</h5>
                      <p>{{ prod.descripcion }}</p>
                      <p>COP ${{ prod.precio }}</p>
                    </div>

                    <div class="cantidad">
                      <q-btn
                        class="botonagregar"
                        v-if="!prod.agregado"
                        @click="agregarAlCarrito(prod)"
                        push
                        color="positive"
                        glossy
                        icon="local_grocery_store"
                        label="Agregar"
                      />
                      <div
                        v-else
                        class="controles-cantidad row items-center justify-between q-gutter-md"
                      >
                        <q-btn
                          dense
                          round
                          color="negative"
                          glossy
                          icon="remove"
                          @click="disminuirCantidad(prod)"
                        />
                        <span>{{ prod.cantidad }}</span>
                        <q-btn
                          dense
                          round
                          color="positive"
                          glossy
                          icon="add"
                          @click="aumentarCantidad(prod)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </q-page>
      </q-page-container>

      <!-- ======= PIE DE PÁGINA  ======= -->
      <q-footer class="bg-blue-grey-13 text-white text-center q-pa-md shadow-2">
        <div>© 2025 TuTiendaTech — Todos los derechos reservados</div>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import "sweetalert2/dist/sweetalert2.min.css";
import { Notify } from "quasar";

import Tv from "./assets/TV.png";
import Msi from "./assets/MSI.png";
import Mouse from "./assets/MOUSE.png";
import Ryzen from "./assets/RYZEN.png";
import Samsung from "./assets/DISCO.png";
import Tarjeta from "./assets/5090.png";
import Teclado from "./assets/TECLADO.png";
import Zowie from "./assets/ZOWIE.png";
import Loq from "./assets/LOQ.png";
import Asus from "./assets/ASUSROG.png";
import Razer from "./assets/RAZER.png";
import Steel from "./assets/STEELSERIES.png";
import T7900 from "./assets/7900.png";
import T4080 from "./assets/4080.png";
import RazerV3 from "./assets/RAZERV3.png";
import Glorius from "./assets/GLORIUS.png";

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
  },
  {
    nombre: "Razer Blade 16",
    descripcion: "Laptop gamer premium con RTX 4090 y pantalla QHD+ de 240Hz.",
    imagen: Razer,
    precio: 4200,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "ASUS ROG Zephyrus G14",
    descripcion: "Portátil potente y compacto con Ryzen 9 y RTX 4070.",
    imagen: Asus,
    precio: 2500,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "ROG Strix RTX 4080 SUPER 16GB OC",
    descripcion: "GPU de alto rendimiento con trazado de rayos y DLSS 3.",
    imagen: T4080,
    precio: 1200,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "AMD Radeon RX 7900 XT",
    descripcion: "Tarjeta gráfica RDNA 3 con gran potencia y eficiencia.",
    imagen: T7900,
    precio: 950,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "SteelSeries Apex Pro TKL",
    descripcion: "Teclado mecánico premium con switches ajustables OmniPoint.",
    imagen: Steel,
    precio: 200,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Razer DeathAdder V3",
    descripcion: "Ratón ergonómico ultraligero con sensor Focus Pro 30K.",
    imagen: RazerV3,
    precio: 150,
    cantidad: 1,
    agregado: false,
  },
  {
    nombre: "Glorious Model O 2",
    descripcion: "Mouse ultraligero de alto rendimiento para eSports.",
    imagen: Glorius,
    precio: 120,
    cantidad: 1,
    agregado: false,
  },
]);

/////////////// FUNCION AGREGAR ///////////////
function agregarAlCarrito(prod) {
  prod.agregado = true;
  prod.cantidad = 1;

  Notify.create({
    message: `${prod.nombre} fue añadido al carrito`,
    caption: "Agregado correctamente",
    color: "positive",
    position: "top-right",
    timeout: 1800,
    icon: "shopping_cart",
  });
}

/////////////// FUNCION AUMENTAR ///////////////
function aumentarCantidad(prod) {
  prod.cantidad++;

  Notify.create({
    message: `Agregaste una unidad más de ${prod.nombre}`,
    caption: `Total: ${prod.cantidad}`,
    color: "positive",
    position: "top-right",
    timeout: 1500,
    icon: "add_circle",
  });
}

/////////////// FUNCION DISMINUIR ///////////////
function disminuirCantidad(prod) {
  if (prod.cantidad > 1) {
    prod.cantidad--;

    Notify.create({
      message: `Quitaste una unidad de ${prod.nombre}`,
      caption: `Total: ${prod.cantidad}`,
      color: "info",
      position: "top-right",
      timeout: 1500,
      icon: "remove_circle",
    });
  } else {
    prod.agregado = false;

    Notify.create({
      message: `${prod.nombre} fue eliminado del carrito`,
      caption: "Producto removido",
      color: "negative",
      position: "top-right",
      timeout: 1500,
      icon: "delete",
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
  return Number((subtotal.value * 0.16).toFixed(2));
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
  productos.value = JSON.parse(guardados);
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
    Notify.create({
      message: "Tu carrito está vacío 🛒",
      color: "info",
      position: "top-right",
      timeout: 1500,
      icon: "info",
    });
    return;
  }

  Notify.create({
    message: `Total a pagar: COP $${total.value}`,
    caption: "Haz clic para confirmar el pago",
    color: "yellow",
    position: "top-right",
    timeout: 0,
    icon: "payment",
    actions: [
      {
        label: "Pagar",
        color: "green",
        handler: () => {
          productos.value.forEach((p) => {
            p.agregado = false;
            p.cantidad = 1;
          });
          localStorage.setItem("productos", JSON.stringify(productos.value));

          Notify.create({
            message: "¡Pago completado!",
            color: "positive",
            position: "top-right",
            timeout: 1500,
            icon: "check_circle",
            avatar: productosEnCarrito[0].imagen,
          });
        },
      },
      {
        label: "Cancelar",
        color: "red",
        handler: () => {
          Notify.create({
            message: "Pago cancelado",
            color: "negative",
            position: "top-right",
            timeout: 1200,
            icon: "close",
          });
        },
      },
    ],
  });
}

/////////////// WATCH PARA SCROLL CARRITO ///////////////
watch(drawerRight, (nuevoValor) => {
  if (nuevoValor === true) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});
</script>

<style>
/* ---------- RESET Y BASE ---------- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: black;
}

html,
body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background: white;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}

/* ---------- APP ---------- */
#app {
  width: 100%;
  max-width: 1920px;
  min-height: 100%;
  background: white;
}

/* ---------- HEADER, FOOTER Y LAYOUT ---------- */
.q-footer {
  position: static !important;
  bottom: auto !important;
}

/* ---------- PRESENTACIÓN ---------- */
.seccion-presentacion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.imagen-tecno {
  width: 100%;
  max-width: 800px;
  border-radius: 20px;
  object-fit: contain;
}

.titulo-principal {
  font-weight: 700;
  color: #1a1a1a;
}

.resaltado {
  color: #027be3;
}

.descripcion {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
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

/* ---------- IMAGEN DEL PRODUCTO ---------- */
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

/* ---------- INFORMACIÓN DEL PRODUCTO ---------- */
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
  margin: 0;
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

/* ---------- BOTONES DE CANTIDAD EN CARRITO ---------- */
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

.cantidad .controles-cantidad {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 600px) {
  .q-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .q-banner_avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>