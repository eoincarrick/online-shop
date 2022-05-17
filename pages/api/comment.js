import sanityClient from '@sanity/client';

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
    console.log(req.body);
    const { _id, authorName, comment } = req.body;

    try {
      await client.create({
        _type: 'comment',
        product: {
          _type: 'reference',
          _ref: _id,
        },
        authorName,
        comment,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json({ msg: 'Comment created' });
  }
}
