import Link from 'next/link';

import { urlFor } from '../library/client';

const HeroBanner = ({ bannerData }) => {
  const {
    smallText,
    midText,
    largeText1,
    image,
    buttonText,
    desc,
  } = bannerData;
  console.log(image);
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{smallText}</p>
        <div>
          <h3>{midText}</h3>
          <h1>{largeText1}</h1>
          <img
            src={urlFor(image)}
            alt='sneakers'
            className='hero-banner-image'
          />
        </div>

        <div>
          <Link href={`/product/air-sneakers`}>
            <button type='button'>{buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
