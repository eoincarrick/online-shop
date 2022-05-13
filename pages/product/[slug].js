import { client, urlFor } from '../../library/client';

const ProductDetails = ({ slugProduct, product }) => {
  const { name, image, details, price } = slugProduct;
  console.log(name);
  return (
    <div>
      <div className='product-detail-container'>
        <div className='image-container'>
          <img src={urlFor(image && image[0])} alt='' />
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
  const product = await client.fetch(productQuery);

  console.log(slugProduct);

  return {
    props: {
      slugProduct,
      product,
    },
  };
};

export default ProductDetails;
