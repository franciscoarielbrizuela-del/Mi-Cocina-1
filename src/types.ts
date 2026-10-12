export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategoryKey;
  description?: string;
  portions?: string;
  popular?: boolean;
  tag?: string;
}

export type MenuCategoryKey = 
  | 'promos'
  | 'sandwiches'
  | 'pizzanesas'
  | 'empanadas'
  | 'pizzas_molde'
  | 'medias_pizzas'
  | 'pizzas_parrilla'
  | 'pizzas_4_gustos'
  | 'papas_extras'
  | 'bebidas';

export interface Promotion {
  id: string;
  title: string;
  badgeColor: 'red' | 'yellow' | 'green';
  items: string[];
  price: number;
  description: string;
  savings?: string;
}

export interface CartItem {
  id: string;
  title: string;
  unitPrice: number;
  quantity: number;
  notes?: string;
  category?: string;
}

export interface DeliveryDetails {
  orderType: 'delivery' | 'takeaway';
  customerName: string;
  phone: string;
  address: string;
  crossStreets: string;
  notes: string;
  paymentMethod: 'efectivo' | 'transferencia' | 'mercadopago';
  cashAmountWith?: string;
}
