import { useState } from 'react';
import { client, urlFor } from '../../library/client';
import { toast } from 'react-hot-toast';
import NextCors from 'nextjs-cors';

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import getStripe from '../../library/getStripe';

const ProductDetails = ({ slugProduct, products }) => {
  const [index, setIndex] = useState(0);

  const {
    onAdd,
    qty,
    increasedQuantity,
    error,
    decreaseQuantity,
  } = useStateContext();

  const { name, image, details, price, limit } = slugProduct;

  const handleCheckout = async (qty) => {
    const stripe = await getStripe();
    slugProduct.quantity = qty;
    slugProduct.price = slugProduct.price * qty;

    const response = await fetch('/api/single-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slugProduct),
    });

    if (response.statusCode !== 200) return;

    toast.loading('Redirecting...');

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={urlFor(image && image[index])}
              className='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>({limit})</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={() => decreaseQuantity(limit)}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={() => increasedQuantity(limit)}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(slugProduct, qty)}
            >
              Add to Cart
            </button>
            <button
              type='button'
              className='buy-now'
              onClick={() => handleCheckout(qty)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
   slug {
       current
   }
 }
`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const slugQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[_type == "product"]';

  const slugProduct = await client.fetch(slugQuery);
  const products = await client.fetch(productQuery);

  return {
    props: {
      slugProduct,
      products,
    },
  };
};

export default ProductDetails;
