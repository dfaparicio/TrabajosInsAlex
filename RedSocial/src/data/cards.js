import { ref } from "vue";

const cardsParatiData = ref([
  {
    nombreUsuario: "recibo_master",
    fotoPerfil: "https://cdn-icons-png.flaticon.com/512/14330/14330320.png",
    imagenPublicacion: "https://media-cdn.tripadvisor.com/media/photo-s/11/8a/89/72/scontrino.jpg",
    descripcion: "🔥 Recibo de 1.8 metros. Encontré un yogur de sabor 'galaxia'.",
    hashtags: ["#ReciboLargo", "#SuperMercado", "#TicketInfluencer"],
    likes: 842,
    comentarios: 10000,
    compartidos: 57
  },
  {
    nombreUsuario: "ticket_hunter",
    fotoPerfil: "https://cdn-icons-png.flaticon.com/512/1998/1998592.png ",
    imagenPublicacion: "https://media-cdn.tripadvisor.com/media/photo-s/12/bd/d2/f3/este-es-el-voucher-de.jpg",
    descripcion: "Compré solo una gaseosa y el recibo salió de 40 cm 😂",
    hashtags: ["#ReciboRaro", "#SoloUnaCosa", "#WTF"],
    likes: 502,
    comentarios: 88,
    compartidos: 21
  },
  {
    nombreUsuario: "cuponqueen",
    fotoPerfil: "https://cdn-icons-png.flaticon.com/512/4540/4540789.png",
    imagenPublicacion: "https://media-cdn.tripadvisor.com/media/photo-s/15/fe/5c/51/photo0jpg.jpg",
    descripcion: "Apliqué 12 cupones y el recibo parecía un pergamino 😅",
    hashtags: ["#Cupones", "#AhorroTotal", "#TicketMega"],
    likes: 1330,
    comentarios: 310,
    compartidos: 98
  },
  {
    nombreUsuario: "mercado_pro",
    fotoPerfil: "https://cdn-icons-png.flaticon.com/512/10507/10507320.png",
    imagenPublicacion: "https://img.restaurantguru.com/r418-Chifa-Fung-Shing-menu.jpg",
    descripcion: "Compré ingredientes para una receta y terminé con 32 items 🙃",
    hashtags: ["#CocinaFail", "#ReciboGigante"],
    likes: 5000,
    comentarios: 5000,
    compartidos: 19
  }
]);

export const nombresEstilo = [
  "factura_freak",
  "ticket_king",
  "cupon_ninja",
  "supermercado_warrior",
  "recibo_sensei",
  "ofertas_monster",
  "ticketlover",
  "carrito_pro",
  "cuenta_extrema",
  "gasto_hunter",
  "promo_master",
  "descuento_queen",
  "mercado_joker",
  "ticketwizard",
  "recibo_champion",
  "cupon_maniac",
  "oferta_legend",
  "compra_geek",
  "lista_loca",
  "economia_vip",
  "shopping_guru",
  "bolsa_misteriosa",
  "carrito_rapido",
  "ticket_samurai",
  "recibo_doctor",
  "factura_nerd",
  "mercado_hero",
  "super_tiquete",
  "cupon_rider",
  "compra_meme"
];

export const fotosPerfilRandom = [
  "https://cdn-icons-png.flaticon.com/512/4841/4841256.png",
  "https://cdn-icons-png.flaticon.com/512/3069/3069172.png",
  "https://cdn-icons-png.flaticon.com/512/2977/2977402.png",
  "https://cdn-icons-png.flaticon.com/512/809/809052.png",
  "https://cdn-icons-png.flaticon.com/512/1864/1864472.png"
];

export default cardsParatiData;