import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const cartContext = createContext(null);

export const CartProvider = ({ children }) => {

  // ✅ INITIALIZE cart from localStorage
  const [cartItem, setCartItem] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cartItem");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Invalid cart data:", error);
      return [];
    }
  });

  // ✅ SAVE cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      setCartItem(
        cartItem.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success("Product quantity increased!");
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product added to cart!");
    }
  };

  // ✅ UPDATE QUANTITY
  const updateQuantity = (productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newQty = item.quantity;

            if (action === "increase") {
              newQty++;
              toast.success("Product quantity increased!");
            }

            if (action === "decrease") {
              newQty--;
              toast.success("Product quantity decreased!");
            }

            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // ✅ DELETE ITEM
  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Product removed from cart!");
  };

  return (
    <cartContext.Provider
      value={{ cartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
