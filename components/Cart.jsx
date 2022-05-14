import { useStateContext } from '../context/StateContext';

import { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import toast from 'react-hot-toast';

import { urlFor } from '../library/client';

const Cart = () => {
  const cartRef = useRef();

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
  } = useStateContext();
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={200} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button type='button' className='btn'>
                Start shopping now
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'></div>
      </div>
    </div>
  );
};

export default Cart;
