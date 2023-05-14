// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient, groq } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION // "2023-05-03"
const client = createClient({
  projectId,
  dataset,
})


const query = groq`*[_type == 'listproducts'] {
  _id,
  "imageUrl": image[0].asset._ref,
  ...
} | order(_createdAt asc)`

type Data = {
   products: Product[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const products = await client.fetch(query)
    res.status(200).json({products})
}
