import { MenuItem, MenuCategoryKey, Promotion } from '../types';

export const BUSINESS_INFO = {
  name: 'MI COCINA ROTISERÍA',
  subtitle: 'Delivery',
  phone: '341-3894354',
  phoneClean: '3413894354',
  whatsappNumber: '341-5091804',
  whatsappClean: '543415091804',
  whatsappUrl: 'https://wa.me/543415091804',
  deliveryHours: '20:30 a 23:00 hs',
  deliveryCost: 2000,
  address: 'Zona de Cobertura Rosario / Alrededores',
  legalNotice: 'Los precios pueden variar sin previo aviso. Volante entregado en mano o bajo puerta - No arrojar en la vía pública.',
};

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: 'PROMO 1',
    badgeColor: 'red',
    items: ['1 Carlitos', '1 Torpedo', '1 Pizza de Muzza'],
    price: 26000,
    description: 'El combo favorito de la casa: sándwiches calientes y pizza fundida.',
    savings: '¡Ahorrá $9.000!'
  },
  {
    id: 'promo-2',
    title: 'PROMO 2',
    badgeColor: 'yellow',
    items: ['2 Pizzas de Muzza', '1 Carlitos'],
    price: 27000,
    description: 'Ideal para compartir con amigos o familia en casa.',
    savings: '¡Super rendidora!'
  },
  {
    id: 'promo-3',
    title: 'PROMO 3',
    badgeColor: 'green',
    items: ['1 Pizza Muzzarella', '1 Torpedo', '1 Porción de Papas'],
    price: 26000,
    description: 'La combinación perfecta: pizza crocante, torpedo relleno y papas fritas.',
    savings: '¡La más pedida!'
  }
];

export const CATEGORIES: { key: MenuCategoryKey; name: string; icon: string; count?: number }[] = [
  { key: 'promos', name: 'Promociones', icon: '🔥' },
  { key: 'sandwiches', name: 'Sandwiches', icon: '🥖' },
  { key: 'pizzanesas', name: 'Pizzanesas y Familiares', icon: '🍕' },
  { key: 'empanadas', name: 'Empanadas', icon: '🥟' },
  { key: 'pizzas_molde', name: 'Pizzas al Molde (8 porc.)', icon: '🍕' },
  { key: 'medias_pizzas', name: 'Medias Pizzas (4 porc.)', icon: '🍕' },
  { key: 'pizzas_parrilla', name: 'Pizzas Parrilla (12 porc.)', icon: '🔥' },
  { key: 'pizzas_4_gustos', name: 'Pizzas Parrilla 4 Gustos', icon: '⭐' },
  { key: 'papas_extras', name: 'Papas y Extras', icon: '🍟' },
  { key: 'bebidas', name: 'Bebidas', icon: '🥤' }
];

export const MENU_ITEMS: MenuItem[] = [
  // 🥖 SANDWICHES
  {
    id: 'carlitos-comun',
    name: 'Carlitos común',
    price: 8500,
    category: 'sandwiches',
    description: 'Tostado tradicional rosarino con abundante jamón cocido, queso fundido y manteca crocante.',
    popular: true
  },
  {
    id: 'carlitos-especial',
    name: 'Carlitos especial',
    price: 10000,
    category: 'sandwiches',
    description: 'Jamón, queso, huevo y rodajas de tomate en pan tostado crujiente al punto justo.'
  },
  {
    id: 'carlitos-pollo',
    name: 'Carlitos de pollo',
    price: 11000,
    category: 'sandwiches',
    description: 'Pollo desmenuzado casero sazonado, queso derretido y salsa especial.'
  },
  {
    id: 'torpedo-comun',
    name: 'Torpedo común',
    price: 12000,
    category: 'sandwiches',
    description: 'Pan torpedo artesanal gigante, jamón, queso y aderezos especiales de la casa.'
  },
  {
    id: 'torpedo-3-hamb-mila-suprema',
    name: 'Torpedo con 3 hamb., mila o suprema',
    price: 16000,
    category: 'sandwiches',
    description: '¡Extra contundente! Podés elegir entre 3 medallones de carne, milanesa casera o suprema de pollo tierna.'
  },
  {
    id: 'torpedo-hamb-mila-con-papas',
    name: 'Torpedo con hamb., mila o supremas (con papas)',
    price: 20000,
    category: 'sandwiches',
    description: 'Torpedo gigante a elección acompañado de abundante porción de papas fritas doradas y crujientes.',
    popular: true,
    tag: 'Recomendado'
  },

  // 🍕 PIZZANESAS Y FAMILIARES
  {
    id: 'pizzanesa-especial-2-papas',
    name: 'Pizzanesa especial p/ 2 personas (con papas)',
    price: 27000,
    category: 'pizzanesas',
    portions: 'Para 2 personas',
    description: 'Milanesa gigante cubierta con salsa de tomate casera, muzzarella abundante, jamón, morrones y lluvia de orégano. Viene con papas fritas.',
    popular: true,
    tag: 'Para compartir'
  },
  {
    id: 'pizzanesa-roquefort-napolitana',
    name: 'Pizzanesa de roquefort o napolitana',
    price: 27000,
    category: 'pizzanesas',
    portions: 'Para 2 personas',
    description: 'Elegí entre un suave y cremoso queso roquefort gratinado o el toque fresco napolitano con rodajas de tomate y ajo.'
  },
  {
    id: 'pizzanesa-comun-2-papas',
    name: 'Pizzanesa común p/ 2 personas (con papas)',
    price: 23000,
    category: 'pizzanesas',
    portions: 'Para 2 personas',
    description: 'Gran milanesa con salsa de tomate casera, muzzarella y porción abundante de papas fritas.'
  },
  {
    id: 'familiar-milanesa-papas',
    name: 'Familiar de milanesa (con papas)',
    price: 14000,
    category: 'pizzanesas',
    description: 'Sándwich familiar en pan fresco de panadería con milanesa tierna, lechuga, tomate y papas fritas.'
  },
  {
    id: 'familiar-suprema-papas',
    name: 'Familiar de suprema (con papas)',
    price: 13000,
    category: 'pizzanesas',
    description: 'Sándwich familiar de suprema de pollo rebozada a mano con guarnición de papas fritas.'
  },
  {
    id: 'hamburguesa-especial-papas',
    name: 'Hamburguesa especial (con papas)',
    price: 12000,
    category: 'pizzanesas',
    description: 'Medallón casero de carne premium, queso, jamón, huevo a la plancha, tomate, lechuga y papas fritas.'
  },

  // 🥟 EMPANADAS
  {
    id: 'empanadas-unidad',
    name: 'Empanadas por unidad',
    price: 2500,
    category: 'empanadas',
    description: 'Relleno jugoso y masa dorada. Sabores: Carne suave/a cuchillo, Pollo, Jamón y Queso, Humita, Verdura.'
  },
  {
    id: 'empanadas-media-docena',
    name: 'Empanadas ½ docena (6 unidades)',
    price: 12000,
    category: 'empanadas',
    description: 'Elegí tus 6 sabores favoritos. Horneadas al momento para conservar todo el relleno jugoso.'
  },
  {
    id: 'empanadas-docena',
    name: 'Empanadas por docena (12 unidades)',
    price: 21000,
    category: 'empanadas',
    description: '12 empanadas surtidas a tu gusto. ¡Ideal para reuniones familiares y cenas con amigos!',
    popular: true,
    tag: 'Mejor precio'
  },

  // 🍕 PIZZAS AL MOLDE (8 porciones)
  {
    id: 'pizza-molde-muzza',
    name: 'Pizza muzzarella al molde (8 porciones)',
    price: 14500,
    category: 'pizzas_molde',
    portions: '8 porciones',
    description: 'Masa alta y esponjosa, salsa de tomates seleccionados, muzzarella fundida de primera y aceitunas.'
  },
  {
    id: 'pizza-molde-especial',
    name: 'Pizza especial al molde (8 porciones)',
    price: 15500,
    category: 'pizzas_molde',
    portions: '8 porciones',
    description: 'Muzzarella, jamón cocido natural, morrones asados en tiras y aceitunas verdes.'
  },
  {
    id: 'pizza-molde-napolitana',
    name: 'Pizza napolitana al molde (8 porciones)',
    price: 15500,
    category: 'pizzas_molde',
    portions: '8 porciones',
    description: 'Muzzarella, rodajas finas de tomate fresco, provenzal suave y orégano aromático.'
  },
  {
    id: 'pizza-molde-cantimpalo',
    name: 'Pizza cantimpalo al molde (8 porciones)',
    price: 15500,
    category: 'pizzas_molde',
    portions: '8 porciones',
    description: 'Muzzarella gratinada cubierta con rodajas crocantes de cantimpalo estacionado.'
  },
  {
    id: 'pizza-molde-fugazzetta',
    name: 'Pizza fugazzetta al molde (8 porciones)',
    price: 15500,
    category: 'pizzas_molde',
    portions: '8 porciones',
    description: 'Cebolla tierna dorada a la perfección sobre un manto espeso de queso muzzarella.'
  },

  // 🍕 MEDIAS PIZZAS AL MOLDE (4 porciones)
  {
    id: 'media-pizza-molde-muzza',
    name: '½ Pizza muzzarella al molde (4 porciones)',
    price: 8000,
    category: 'medias_pizzas',
    portions: '4 porciones',
    description: 'Media porción al molde con salsa y abundante muzzarella fundida.'
  },
  {
    id: 'media-pizza-molde-especial',
    name: '½ Pizza especial al molde (4 porciones)',
    price: 9000,
    category: 'medias_pizzas',
    portions: '4 porciones',
    description: 'Media porción con salsa, muzzarella, jamón cocido y morrones.'
  },
  {
    id: 'media-pizza-molde-cantimpalo',
    name: '½ Pizza cantimpalo al molde (4 porciones)',
    price: 9000,
    category: 'medias_pizzas',
    portions: '4 porciones',
    description: 'Media porción con generoso queso muzzarella y cantimpalo especiado.'
  },

  // 🔥 PIZZAS A LA PARRILLA (12 porciones)
  {
    id: 'parrilla-muzzarella',
    name: 'Muzzarella a la parrilla (12 porciones)',
    price: 18500,
    category: 'pizzas_parrilla',
    portions: '12 porciones',
    description: 'Masa fina a las brasas, crocante con sabor ahumado inconfundible y lluvia de muzzarella.'
  },
  {
    id: 'parrilla-especial',
    name: 'Especial a la parrilla (12 porciones)',
    price: 20000,
    category: 'pizzas_parrilla',
    portions: '12 porciones',
    description: 'Muzzarella fundida a las brasas, jamón seleccionado, morrones dulces y aceitunas.'
  },
  {
    id: 'parrilla-napolitana',
    name: 'Napolitana a la parrilla (12 porciones)',
    price: 20000,
    category: 'pizzas_parrilla',
    portions: '12 porciones',
    description: 'Sabor parrillero único con rodajas de tomate natural, ajo suave, perejil y muzzarella.'
  },
  {
    id: 'parrilla-fugazzetta',
    name: 'Fugazzetta a la parrilla (12 porciones)',
    price: 20000,
    category: 'pizzas_parrilla',
    portions: '12 porciones',
    description: 'Cebolla caramelizada con orégano y abundante queso sobre masa a la brasa.'
  },
  {
    id: 'parrilla-cantimpalo',
    name: 'Cantimpalo a la parrilla (12 porciones)',
    price: 21500,
    category: 'pizzas_parrilla',
    portions: '12 porciones',
    description: 'Rodajas de cantimpalo tostadas con toque crocante ahumado y queso muzzarella.'
  },
  {
    id: 'parrilla-pollo-crema',
    name: 'Pollo y crema a la parrilla (12 porciones)',
    price: 21500,
    category: 'pizzas_parrilla',
    portions: '12 porciones',
    description: 'Pollo desmenuzado en salsa suave de crema de leche y queso gratinado a la parrilla.',
    popular: true,
    tag: 'Especialidad'
  },
  {
    id: 'parrilla-media-napo-media-panceta',
    name: 'Media napolitana y media panceta y huevo (12 porc.)',
    price: 21500,
    category: 'pizzas_parrilla',
    portions: '12 porciones',
    description: 'Lo mejor de dos mundos: mitad napolitana clásica y mitad panceta crocante con huevo picado.'
  },

  // 🍕 PIZZAS A LA PARRILLA 4 GUSTOS
  {
    id: 'combo-4g-1',
    name: '4 Gustos: Combo 1 (12 porciones)',
    price: 21500,
    category: 'pizzas_4_gustos',
    portions: '12 porciones',
    description: 'Combinación 1: Cantimpalo + Napolitana + Especial + Cebolla. 4 sabores distintos en una misma pizza gigante a la parrilla.',
    tag: '4 en 1'
  },
  {
    id: 'combo-4g-2',
    name: '4 Gustos: Combo 2 (12 porciones)',
    price: 21500,
    category: 'pizzas_4_gustos',
    portions: '12 porciones',
    description: 'Combinación 2: Muzzarella + Especial + Panceta + Cantimpalo. Explosión de sabores para fanáticos del queso y fiambres.',
    popular: true,
    tag: 'Favorita'
  },
  {
    id: 'combo-4g-3',
    name: '4 Gustos: Combo 3 (12 porciones)',
    price: 21500,
    category: 'pizzas_4_gustos',
    portions: '12 porciones',
    description: 'Combinación 3: Napolitana + Cebolla + Especial + 4 quesos. Toque gourmet y variedad en cada porción.',
    tag: '4 en 1'
  },

  // 🍟 PAPAS Y EXTRAS
  {
    id: 'papas-fritas-porcion',
    name: 'Porción de papas fritas',
    price: 7500,
    category: 'papas_extras',
    description: 'Papas cortadas estilo bastón tradicional, fritas al momento bien doradas y crujientes.'
  },
  {
    id: 'papas-con-cheddar',
    name: 'Papas con cheddar',
    price: 8500,
    category: 'papas_extras',
    description: 'Porción generosa de papas bastón bañadas en suave y abundante salsa de queso cheddar caliente.'
  },
  {
    id: 'papas-completas',
    name: 'Papas completas (cheddar, verdeo, panceta)',
    price: 9000,
    category: 'papas_extras',
    description: 'Bandeja completa con queso cheddar fundido, trocitos crocantes de panceta dorada y verdeo fresco picado.',
    popular: true,
    tag: 'Imperdible'
  },

  // 🥤 BEBIDAS
  {
    id: 'coca-cola-15',
    name: 'Coca-Cola Sabor Original 1.5L',
    price: 4000,
    category: 'bebidas',
    description: 'Botella de 1.5 litros bien fría para acompañar tu cena.'
  },
  {
    id: 'sprite-15',
    name: 'Sprite Lima-Limón 1.5L',
    price: 4000,
    category: 'bebidas',
    description: 'Gaseosa refrescante 1.5L bien fría.'
  },
  {
    id: 'cerveza-quilmes-1l',
    name: 'Cerveza Quilmes Clásica 1L',
    price: 4500,
    category: 'bebidas',
    description: 'Cerveza nacional de litro bien helada lista para servir.'
  }
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);
};
