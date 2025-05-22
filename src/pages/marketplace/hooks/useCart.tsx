import { create } from 'zustand';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  cartItemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  cartItems: [],
  cartItemCount: 0,
  
  addToCart: (product, quantity = 1) => {
    const { cartItems } = get();
    const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Product already in cart, update quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      
      set({
        cartItems: updatedItems,
        cartItemCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
      });
    } else {
      // Product not in cart, add it
      const updatedItems = [...cartItems, { product, quantity }];
      
      set({
        cartItems: updatedItems,
        cartItemCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
      });
    }
  },
  
  removeFromCart: (productId) => {
    const { cartItems } = get();
    const updatedItems = cartItems.filter(item => item.product.id !== productId);
    
    set({
      cartItems: updatedItems,
      cartItemCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
    });
  },
  
  updateQuantity: (productId, quantity) => {
    const { cartItems } = get();
    
    if (quantity <= 0) {
      // If quantity is 0 or negative, remove the item
      return get().removeFromCart(productId);
    }
    
    const updatedItems = cartItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    set({
      cartItems: updatedItems,
      cartItemCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
    });
  },
  
  clearCart: () => {
    set({
      cartItems: [],
      cartItemCount: 0,
    });
  },
}));