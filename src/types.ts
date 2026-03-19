export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  sizes: number[];
  colors: string[];
  techSpecs: {
    grip: string;
    cushion: string;
    support: string;
  };
  category: 'performance' | 'collector';
  stock: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt: any; // Firestore Timestamp
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: any; // Firestore Timestamp
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  createdAt: any;
}

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  createdAt: any;
  isAdmin: boolean;
}
