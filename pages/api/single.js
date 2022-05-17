import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data);

    const { image, price, name, quantity, details } = data;

    // console.log(image);

    const singleImg = image[0].asset._ref

      .replace('image-', 'https://cdn.sanity.io/images/o8l6crjb/production/')

      .replace('-png', '.png');

    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          {
            shipping_rate: 'shr_1KzxERL08BYUDEnsanNIllok',
          },
        ],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: name,
                description: details,
                images: [singleImg],
              },
              unit_amount: price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: quantity,
          },
        ],
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');

    if (req.method === 'GET') {
      res.json({ hi: 'ji' });
    }

    res.status(405).end('Method Not Allowed');
  }
}
