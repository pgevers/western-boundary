import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { sanity } from './sanity';

const builder = imageUrlBuilder(sanity);

export function urlFor(source: any): ImageUrlBuilder {
  return builder.image(source);
}
