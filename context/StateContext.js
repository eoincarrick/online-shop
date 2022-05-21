import { useContext, createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [error, setError] = useState(false);
  // @desc this "showCart" is exported here and  used in '../components/Navbar.jsx'
  const [showCart, setShowCart] = useState(false);
  // @desc this "cartItems" is exported here and  used in '../components/Cart.jsx'
  const [cartItems, setCartItems] = useState([]);
  // @desc this "totalPrice" is exported here and  used in '../components/Cart.jsx'
  const [totalPrice, setTotalPrice] = useState(0);
  // @desc this "totalQuantities" is exported here and  used in '../components/Cart.jsx' && '../components/Navbar.jsx'
  const [totalQuantities, setTotalQuantities] = useState(0);
  // @desc this "qty" is exported here and  used in '../pages/product/[slug].js'
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    // @desc checking if the "cartItems._id" === "product._id"
    // @desc and the "find()" return the first element or product or items that meet the condition below.
    const isProductAlreadyInCart = cartItems.find(
      // @desc "isProductAlreadyInCart" return a value
      // @desc and in this case, it returns an Object
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
    // @desc "isProductAlreadyInCart" return a boolean
    if (isProductAlreadyInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          console.log('found', cartProduct);
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity, // @desc Updating the quantity in the cart.
          };
        } else {
          console.log(`else returned ${cartProduct}`);
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }

        // @desc Updating cartItems by setting the "setCartItems" to "updatedCartItems"
        setCartItems(updatedCartItems);
      });
    } else {
      console.log(`shoot`);
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id); // @desc Finding a item or return a found item.
    const newCartItems = cartItems.filter((item) => item._id !== product._id); // @desc For removing an item.

    setTotalPrice(
      (previousTotalPrice) =>
        previousTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (previousTotalQuantities) =>
        previousTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    console.log('newCartItems', ...newCartItems);

    if (value === 'increase') {
      console.log('increased');
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'decrease') {
      console.log('decreased');
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  // @desc Increasing the quantity of cart items.

  // @desc Decreasing the quantity of cart items.
  const increasedQuantity = () => {
    setQty((previousQuantity) => previousQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQty((previousQuantity) => {
      if (previousQuantity - 1 < 1) return 1;

      return previousQuantity - 1;
    });
  };

  useEffect(() => {}, []);

  return (
    <Context.Provider
      // Exporting this values to be used globally or outside this state.
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setError,
        error,
        increasedQuantity,
        decreaseQuantity,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
