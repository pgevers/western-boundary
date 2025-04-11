import { useParams } from 'react-router-dom';
import { sanity } from '../lib/sanity';
import { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { useCart } from '../context/CartContext';
import { urlFor } from '../lib/sanityImage';

type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  brand?: string;
  description?: string;
  slug?: { current: string };
  images?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  }[];
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      const query = `*[_type == "product" && slug.current == $slug][0]{
        _id,
        name,
        price,
        salePrice,
        brand,
        description,
        slug,
        images[]{
          asset,
          alt
        }
      }`;

      try {
        const result = await sanity.fetch(query, { slug });
        if (result) {
          setProduct(result);
          trackEvent('view_item', 'pdp', result.name, result.salePrice || result.price);
        }
      } catch (err) {
        console.error('❌ Failed to fetch product from Sanity:', err);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return <div className="p-4">Loading...</div>;
  }

  const displayPrice =
    product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

  const validImages = product.images?.filter((img) => img.asset?._ref) || [];
  const mainImage = validImages[mainImageIndex];

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left column: thumbnail vertical carousel */}
      <div className="flex flex-row md:flex-col gap-2 md:w-1/5">
        {validImages.map((img, idx) => (
          <button
            key={idx}
            className={`border rounded overflow-hidden ${
              idx === mainImageIndex ? 'border-blue-600' : 'border-gray-300'
            }`}
            onClick={() => setMainImageIndex(idx)}
          >
            <img
              src={urlFor(img).width(100).height(100).fit('crop').url()}
              alt={img.alt || `Thumbnail ${idx + 1}`}
              className="object-cover w-20 h-20"
            />
          </button>
        ))}
      </div>

      {/* Right column: main image + info */}
      <div className="flex-1">
        {mainImage && (
          <img
            src={urlFor(mainImage).width(800).height(600).fit('max').url()}
            alt={mainImage.alt || product.name}
            className="w-full max-h-[500px] object-cover rounded mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

        {product.brand && (
          <p className="text-sm text-gray-500 uppercase mb-1">{product.brand}</p>
        )}

        <p className="text-xl text-gray-700 mb-4">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(displayPrice)}
        </p>

        <p
          className="text-gray-600 mb-6"
          dangerouslySetInnerHTML={{ __html: product.description || '' }}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          onClick={() => {
            addToCart(product._id);
            trackEvent('add_to_cart', 'pdp', product.name, displayPrice);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
