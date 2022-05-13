import { Product, FooterBanner, HeroBanner } from '../components';
import { client } from '../library/client';

const Home = ({ products, bannerData }) => {
  console.log(bannerData);
  return (
    <>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Beset Selling Product</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => product.name)}
      </div>
      <FooterBanner />
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
