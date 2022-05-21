import React from 'react';

import { Product } from '../../components/index';

import Link from 'next/link';

import { client, urlFor } from '../../library/client';

const categoryProduct = ({ categoryProduct, name }) => {
  return (
    <div className='maylike-products-container track'>
      {categoryProduct.map((item, i) => (
        <Product key={i} product={item} />
      ))}
    </div>
  );
};

const style = {
  display: 'flex',
  // gridTemplateColumns: 'repeat(3, 1fr)',
  // gridGap: '20px',
  // placeContent: 'center',
  // placeItems: 'center',
};
// {
//   categoryProduct.map((item, i) => <Product key={i} product={item} />);
// }

export const getStaticPaths = async () => {
  const slugs = `*[_type == 'product']{
  categories[]{
    _ref,
  }
}
`;
  const id = await client.fetch(slugs);

  const paths = id.map((product) => ({
    params: {
      slug: product.categories[0]._ref,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && references("${slug}")]{
  price,
  image,
  slug,
  name,
  limit,
  details,
}`;

  const categoryProduct = await client.fetch(query);

  return {
    props: {
      categoryProduct,
      name: categoryProduct[0].name,
    },
  };
};

export default categoryProduct;
