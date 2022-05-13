import { useContext, createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{ showCart, cartItems, totalPrice, totalQuantity, quantity }}
    >
      {children}
    </Context.Provider>
  );
};
