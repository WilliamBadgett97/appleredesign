import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import imageUrlBuilder from "@sanity/image-url";
import { SanityClient } from "next-sanity";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21", // Learn more: https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === "production",
};
export const sanityClient = createClient(config);
// Set up the client for fetching data in the getProps page functions
// export const sanityClient = createClient(config);

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
// export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
  return builder.image(source);
}
