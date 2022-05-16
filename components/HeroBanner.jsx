import Link from 'next/link';

import { urlFor } from '../library/client';

const HeroBanner = ({ bannerData }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{bannerData.smallText}</p>
        <div>
          <h3>{bannerData.midText}</h3>
          <h1>{bannerData.largeText1}</h1>
          <img
            src={urlFor(bannerData.image)}
            alt='sneakers'
            className='hero-banner-image'
          />
        </div>

        <div>
          <Link href={`/product/air-sneakers`}>
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
