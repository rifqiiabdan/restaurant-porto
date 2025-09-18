import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  address: string;
  phone: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  checkout: (payload: { address: string; phone: string }) => Order | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "cart_items";
const ORDERS_KEY = "orders";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const data = localStorage.getItem(CART_KEY);
      if (data) setItems(JSON.parse(data));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextType["addItem"] = (item, quantity) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const checkout: CartContextType["checkout"] = ({ address, phone }) => {
    if (!user) return null;
    const order: Order = {
      id: `${Date.now()}`,
      userEmail: user.email,
      items,
      total: subtotal,
      address,
      phone,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as Order[];
      const updated = [order, ...existing];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
      clearCart();
      return order;
    } catch {
      return null;
    }
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
