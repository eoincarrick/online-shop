import React from 'react';

import { client } from '../../library/client';

const categoryProduct = ({ categoryData }) => {
  return <div>Hello</div>;
};

// export const getStaticPaths = async () => {
//   const query = `*[_type == 'category']{
//   slug{
//       current
//   }
//  }
// `;

//   const slug = await client.fetch(query);
//   console.log(slug);

//   const paths = slug.map((category) => ({
//     params: { slug: category.slug.current },
//   }));

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };

export const getStaticProps = async ({ params: { slug } }) => {
  const categoryQuery = `*[_type == 'category']{_id,image,name,slug{current}}`;

  const categoryData = await client.fetch(categoryQuery);

  return {
    props: {
      categoryData,
      categorySlug,
    },
  };
};

export default categoryProduct;

// export const getStaticPaths = async () => {};
