import { useState, useRef } from 'react';
import { client, urlFor } from '../../library/client';
import { toast } from 'react-hot-toast';

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ slugProduct, products, commentProduct }) => {
  // Render post...
  const displayComment = commentProduct.comments;

  const [comments, setComments] = useState('');
  const [names, setNames] = useState('');
  const [index, setIndex] = useState(0);

  const authorNameEl = useRef();
  const commentsEl = useRef();

  const {
    onAdd,
    qty,
    increasedQuantity,
    setShowCart,
    decreaseQuantity,
  } = useStateContext();

  const { _id, name, image, details, price, limit } = slugProduct;

  const handleBuyNow = async () => {
    onAdd(slugProduct, qty);
    setShowCart(true);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setComments('');
    setNames('');

    const { value: authorName } = authorNameEl.current;
    const { value: comment } = commentsEl.current;

    const formObj = {
      authorName,
      comment,
    };

    const handlePostComment = async () => {
      formObj._id = _id;

      const response = await fetch('/api/comment', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formObj),
      });

      if (response.statusCode !== 200) {
        return;
      }

      const data = await response.json();
    };
    toast.success(
      'Comment submitted. Refresh after one minutes to see the comment'
    );
    handlePostComment();
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
              onClick={() => handleBuyNow(qty)}
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

      <div className='formContainer'>
        <form className='form' onSubmit={handleOnSubmit}>
          <section className='inputContainer'>
            <label>Name:</label>
            <input
              type='text'
              placeholder='Enter name here'
              name='authorName'
              ref={authorNameEl}
              value={names}
              onChange={(event) => setNames(event.target.value)}
            />
          </section>
          <section className='inputContainer'>
            <label>Comment:</label>
            <textarea
              className='comment '
              type='text'
              placeholder='Enter name here'
              name='comment'
              ref={commentsEl}
              value={comments}
              onChange={(event) => setComments(event.target.value)}
            />
          </section>
          <section>
            <button type='submit' className='btn'>
              Submit
            </button>
          </section>
        </form>

        {displayComment.length > 0 && (
          <div className='commentSection'>
            <div className='headerComment'>
              <h1>Comment Section</h1>
            </div>

            <div className='comment'>
              {displayComment.map((comment) => (
                <div key={comment._id} className='commentCard'>
                  <h3>{comment.authorName}</h3>
                  <p>1st may 2202</p>
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // we destruct slug from params
  // params contains the product `slug`.
  // If the route is like /product/"sneakers", where  "sneakers" is the slug
  const slugQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[_type == "product"]';
  const commentQuery = `*[_type == 'product' && slug.current == '${slug}'][0]{
  'comments': *[_type == 'comment' && product._ref == ^._id]
}`;

  const slugProduct = await client.fetch(slugQuery);
  const products = await client.fetch(productQuery);
  const commentProduct = await client.fetch(commentQuery);

  return {
    // Pass post data to the page via props
    props: {
      slugProduct,
      products,
      commentProduct,
    },
  };
};

export default ProductDetails;
