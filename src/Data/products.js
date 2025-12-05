export const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'accesorios', name: '🎧 Accesorios' },
  { id: 'hogar-linea', name: '🏠 Hogar' },
  { id: 'software', name: '💻 Software' },
  { id: 'leasing', name: '📦 Arrendamiento' }
]

export const PRODUCTS = [
  {
    id: 'p001',
    name: 'Auriculares Inalámbricos',
    category: 'accesorios',
    description: 'Premium wireless headphones con cancelación de ruido',
    price: 89.99,
    stock: 15,
    emoji: '🎧',
    rental: true,
    rentalPrice: 9.99,
    minMonths: 1
  },
  {
    id: 'p002',
    name: 'Cable USB-C',
    category: 'accesorios',
    description: 'Cable de carga rápida de 2 metros',
    price: 15.99,
    stock: 50,
    emoji: '🔌',
    rental: false
  },
  {
    id: 'p003',
    name: 'Lámpara LED Inteligente',
    category: 'hogar-linea',
    description: 'Lámpara RGB con control por WiFi',
    price: 49.99,
    stock: 20,
    emoji: '💡',
    rental: true,
    rentalPrice: 4.99,
    minMonths: 2
  },
  {
    id: 'p004',
    name: 'Almohada Ergonómica',
    category: 'hogar-linea',
    description: 'Almohada memory foam con soporte cervical',
    price: 39.99,
    stock: 30,
    emoji: '🛏️',
    rental: false
  },
  {
    id: 'p005',
    name: 'Suite Office 365',
    category: 'software',
    description: 'Licencia anual para Word, Excel, PowerPoint',
    price: 69.99,
    stock: 100,
    emoji: '📊',
    rental: true,
    rentalPrice: 8.99,
    minMonths: 1
  },
  {
    id: 'p006',
    name: 'Adobe Creative Cloud',
    category: 'software',
    description: 'Acceso a Photoshop, Illustrator y más',
    price: 79.99,
    stock: 80,
    emoji: '🎨',
    rental: true,
    rentalPrice: 12.99,
    minMonths: 3
  },
  {
    id: 'p007',
    name: 'Laptop de Escritorio',
    category: 'leasing',
    description: 'Dell XPS 15 - Especificaciones Premium',
    price: 999.99,
    stock: 5,
    emoji: '💻',
    rental: true,
    rentalPrice: 99.99,
    minMonths: 6
  },
  {
    id: 'p008',
    name: 'Monitor 4K Profesional',
    category: 'leasing',
    description: 'Monitor Dell 38 pulgadas UltraWide',
    price: 599.99,
    stock: 8,
    emoji: '🖥️',
    rental: true,
    rentalPrice: 49.99,
    minMonths: 3
  }
]
