
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { MatchedCandidate } from "@/hooks/shortlists/types";

interface CartContextType {
  cartItems: MatchedCandidate[];
  addToCart: (candidate: MatchedCandidate) => void;
  removeFromCart: (candidateId: string) => void;
  clearCart: () => void;
  isInCart: (candidateId: string) => boolean;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<MatchedCandidate[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("candidateCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart:", e);
        localStorage.removeItem("candidateCart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("candidateCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (candidate: MatchedCandidate) => {
    if (!isInCart(candidate.id)) {
      setCartItems((prev) => [...prev, candidate]);
      toast({
        title: "Added to cart",
        description: `${candidate.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Already in cart",
        description: `${candidate.name} is already in your cart.`,
      });
    }
  };

  const removeFromCart = (candidateId: string) => {
    const candidate = cartItems.find(item => item.id === candidateId);
    setCartItems((prev) => prev.filter((item) => item.id !== candidateId));
    if (candidate) {
      toast({
        title: "Removed from cart",
        description: `${candidate.name} has been removed from your cart.`,
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All candidates have been removed from your cart.",
    });
  };

  const isInCart = (candidateId: string) => {
    return cartItems.some((item) => item.id === candidateId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
