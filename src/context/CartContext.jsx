import { createContext, useState, useEffect } from 'react';

// Create the context to share cart data across the app
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cartItems state from localStorage, or empty array if nothing saved
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  // Add an item to the cart, or update quantity if it already exists
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // If product already in cart, increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      // Otherwise, add new product to cart
      return [...prev, product];
    });
  };

  // Update the quantity of a product in the cart (or remove if quantity is 0)
  const updateQuantity = (productId, newQty) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: newQty } : item
        )
        .filter((item) => item.quantity > 0) // remove if quantity drops to 0
    );
  };

  // Clear the cart (used after placing order)
  const clearCart = () => setCartItems([]);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Total number of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price = sum of (unit price × pack size × quantity) for all items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.totalPackPrice || 0) * item.quantity,
    0
  );

  // Provide all cart-related values and functions to the app
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
