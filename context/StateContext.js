import { useContext, createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //   console.log(cartItems);

  const onAdd = (product, quantity) => {
    // @desc if the product has been already added in the cart.
    const isProductAlreadyInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // @desc Updating the total price
    setTotalPrice(
      (previousTotalPrice) => previousTotalPrice + product.price * quantity
    );

    // @desc Updating the total quantity
    setTotalQuantities(
      (previousTotalQuantities) => previousTotalQuantities + quantity
    );

    // @desc Updating the existing product in the cart already
    if (isProductAlreadyInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity, // @desc Updating the quantity in the cart.
          };
        }

        setCartItems(updatedCartItems);
      });
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  // @desc Increasing the quantity of cart items.
  const increasedQuantity = (limit) => {
    setQty((previousQuantity) => {
      if (previousQuantity === limit) {
        toast.error(`Sorry! Only ${limit} is Available`);
        return limit;
      } else if (previousQuantity > limit) {
        return limit;
      }
      return previousQuantity + 1;
      setQty(1);
    });
  };

  // @desc Decreasing the quantity of cart items.
  const decreaseQuantity = (limit) => {
    setQty((previousQuantity) => {
      if (previousQuantity - 1 <= 0) {
        return 1;
      } else if (previousQuantity > limit) {
        return limit;
      }
      return previousQuantity - 1;
    });
  };

  useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increasedQuantity,
        decreaseQuantity,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
