import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'wmpguy8j',        
  dataset: 'production',
  apiVersion: '2025-04-03',     
  useCdn: true,                
});
export const fetchProducts = async () => {
  return await sanity.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
      "image": images[0].asset->url
    }`
  );
};