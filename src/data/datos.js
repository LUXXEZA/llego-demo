export const restaurante = {
  nombre: "Restaurante El Istmeño",
  logo: "logo",
  telefono: "+507 6000-0000",
  direccion: "Calle 50, Panama City"
};

export const menu = [
  {
    id: 1,
    categoria: "Entradas",
    nombre: "Ceviche Mixto",
    precio: 8.50,
    descripcion: "Mariscos frescos con limón, cebolla morada y culantro",
    emoji: "",
    disponible: true
  },
  {
    id: 2,
    categoria: "Entradas",
    nombre: "Alitas BBQ",
    precio: 9.00,
    descripcion: "Alitas crujientes bañadas en salsa BBQ ahumada",
    emoji: "",
    disponible: true
  },
  {
    id: 3,
    categoria: "Platos Fuertes",
    nombre: "Filete a la Plancha",
    precio: 14.00,
    descripcion: "Filete de res con papas gratinadas y ensalada fresca",
    emoji: "",
    disponible: true
  },
  {
    id: 4,
    categoria: "Platos Fuertes",
    nombre: "Pollo Parmesano",
    precio: 12.00,
    descripcion: "Pechuga empanizada con salsa de tomate y queso derretido",
    emoji: "",
    disponible: true
  },
  {
    id: 5,
    categoria: "Platos Fuertes",
    nombre: "Pasta Alfredo con Camarones",
    precio: 13.00,
    descripcion: "Fettuccine en salsa alfredo cremosa con camarones salteados",
    emoji: "",
    disponible: true
  },
  {
    id: 6,
    categoria: "Bebidas",
    nombre: "Limonada de Coco",
    precio: 3.50,
    descripcion: "Limonada fresca con leche de coco y hielo",
    emoji: "",
    disponible: true
  },
  {
    id: 7,
    categoria: "Bebidas",
    nombre: "Frappe de Maracuya",
    precio: 4.00,
    descripcion: "Bebida fria de maracuya con crema batida",
    emoji: "",
    disponible: true
  },
  {
    id: 8,
    categoria: "Postres",
    nombre: "Cheesecake de Fresas",
    precio: 5.00,
    descripcion: "Cheesecake cremoso con cobertura de fresas frescas",
    emoji: "",
    disponible: true
  },
  {
    id: 9,
    categoria: "Postres",
    nombre: "Brownie con Helado",
    precio: 4.50,
    descripcion: "Brownie caliente de chocolate con bola de helado de vainilla",
    emoji: "",
    disponible: true
  }
];

export const pedidosSimulados = [
  {
    id: "P001",
    mesa: "Delivery",
    cliente: "Marie Claire",
    direccion: "Ave. Balboa, Edificio Torre del Mar, Apto 5B",
    estado: "preparando",
    tiempo: "10 min",
    items: [
      { nombre: "Filete a la Plancha", cantidad: 2, precio: 14.00 },
      { nombre: "Limonada de Coco", cantidad: 2, precio: 3.50 }
    ],
    total: 35.00
  },
  {
    id: "P002",
    mesa: "Mesa 3",
    cliente: "Katherine",
    direccion: null,
    estado: "listo",
    tiempo: "2 min",
    items: [
      { nombre: "Ceviche Mixto", cantidad: 1, precio: 8.50 },
      { nombre: "Pollo Parmesano", cantidad: 1, precio: 12.00 },
      { nombre: "Frappe de Maracuya", cantidad: 1, precio: 4.00 }
    ],
    total: 24.50
  },
  {
    id: "P003",
    mesa: "Delivery",
    cliente: "Maki",
    direccion: "Calle 50, PH Tower, Piso 20",
    estado: "nuevo",
    tiempo: "justo ahora",
    items: [
      { nombre: "Pasta Alfredo con Camarones", cantidad: 1, precio: 13.00 },
      { nombre: "Alitas BBQ", cantidad: 2, precio: 9.00 },
      { nombre: "Brownie con Helado", cantidad: 1, precio: 4.50 }
    ],
    total: 35.50
  }
];

export const mensajeros = [
  {
    id: 1,
    nombre: "Ricardo Flores",
    telefono: "+507 6111-2222",
    estado: "en ruta",
    pedido: "P001",
    lat: 8.9936,
    lng: -79.5197,
    emoji: ""
  },
  {
    id: 2,
    nombre: "Ana Martinez",
    telefono: "+507 6333-4444",
    estado: "disponible",
    pedido: null,
    lat: 8.9924,
    lng: -79.5210,
    emoji: ""
  }
];

export const ventasSemana = [
  { dia: "Lun", ventas: 320 },
  { dia: "Mar", ventas: 480 },
  { dia: "Mie", ventas: 390 },
  { dia: "Jue", ventas: 520 },
  { dia: "Vie", ventas: 710 },
  { dia: "Sab", ventas: 890 },
  { dia: "Dom", ventas: 650 }
];

export const statsHoy = {
  pedidosTotales: 34,
  ingresos: 487.50,
  ticketPromedio: 14.34,
  pedidosDelivery: 21,
  pedidosMesa: 13,
  mensajerosActivos: 2
};