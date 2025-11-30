import { computed } from "vue";
import cardsParatiData from "./cards.js";

export const TopEmojis = [
  { emoji: "🥇", title: "Primer Lugar" },
  { emoji: "🥈", title: "Segundo Lugar" },
  { emoji: "🥉", title: "Tercer Lugar" }
];

function obtenerPublicacionesGuardadas() {
  return JSON.parse(localStorage.getItem("publicaciones")) || [];
}

export const allCards = computed(() => {
  const base = cardsParatiData.value;
  const guardadas = obtenerPublicacionesGuardadas();

  const mapa = new Map();

  base.forEach(c => mapa.set(c.id || c.nombreUsuario, c));
  guardadas.forEach(c => mapa.set(c.id || c.nombreUsuario, c));

  return Array.from(mapa.values());
});

export const Likes = computed(() => {
  const ordenar = allCards.value
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return ordenar.map((user, index) => ({
    ...user,
    ...TopEmojis[index]
  }));
});

export const Comentarios = computed(() => {
  const ordenar = allCards.value
    .slice()
    .sort((a, b) => b.comentarios - a.comentarios)
    .slice(0, 3);

  return ordenar.map((user, index) => ({
    ...user,
    ...TopEmojis[index]
  }));
});

export const Compartidos = computed(() => {
  const ordenar = allCards.value
    .slice()
    .sort((a, b) => b.compartidos - a.compartidos)
    .slice(0, 3);

  return ordenar.map((user, index) => ({
    ...user,
    ...TopEmojis[index]
  }));
});

export const Global = computed(() => {
  const ordenar = allCards.value
    .slice()
    .sort(
      (a, b) =>
        (b.likes + b.comentarios + b.compartidos) -
        (a.likes + a.comentarios + a.compartidos)
    );

  return ordenar.map((user, index) => ({
    ...user,
    ...(index < 3 ? TopEmojis[index] : {})
  }));
});
