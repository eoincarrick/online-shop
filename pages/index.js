import { Product, FooterBanner, HeroBanner } from '../components';
import { client } from '../library/client';

const Home = ({ products, bannerData }) => {
  console.log(products);
  return (
    <>
      <HeroBanner bannerData={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Beset Selling Product</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type =="product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData: banner,
    },
  };
};

export default Home;
