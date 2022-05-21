import sanityClient from '@sanity/client';

import { useState } from 'react';

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

export default async function comment(req, res) {
  if (req.method === 'POST') {
    const { _id, current, count, name } = req.body;
    const counts = count + 1;
    // view_count += 1;
    console.log(req.body);

    await client.create({
      _type: 'view',
      product: {
        _type: 'reference',
        _ref: _id,
      },
      name: name,
      slug: current,
      count: counts,
    });

    res.status(200).json({ msg: 'View Count created' });
  }
}
