import Link from 'next/link';

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>SMALL TEXT</p>
        <div>
          <h3>MID TEXT</h3>
          <img src='' alt='sneakers' className='hero-banner-image' />
        </div>

        <div>
          <Link href='/product/ID'>
            <button type='button'>BUTTON TEXT</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
