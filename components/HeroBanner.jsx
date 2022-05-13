import Link from 'next/link';

import { UrlFor } from '../library/client';

const HeroBanner = ({ bannerData }) => {
  console.log(bannerData);
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{bannerData.smallText}</p>
        <div>
          <h3>{bannerData.midText}</h3>
          <h1>{bannerData.largeText1}</h1>
          <img
            src={UrlFor(bannerData.image)}
            alt='sneakers'
            className='hero-banner-image'
          />
        </div>

        <div>
          <Link href={`/product/${bannerData.product}`}>
            <button type='button'>{bannerData.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{bannerData.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeroBanner;
