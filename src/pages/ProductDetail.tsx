import { useParams } from 'react-router-dom';
import { sanity } from '../lib/sanity';
import { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { useCart } from '../context/CartContext';

type Product = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: {
    asset: {
      url: string;
    };
  };
};


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();


  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
  
      const query = `*[_type == "product" && _id == $id][0]{
        _id,
        name,
        price,
        description,
        image { asset->{url} }
      }`;
  
      try {
        const result = await sanity.fetch(query, { id });
        if (result) {
          setProduct(result);
          trackEvent('view_item', 'pdp', result.name, result.price);
        }
      } catch (err) {
        console.error('Failed to fetch product from Sanity:', err);
      }
    };
  
    fetchProduct();
  }, [id]);
  

  if (!product) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {product.image?.asset?.url && (
  <img
    src={product.image.asset.url}
    alt={product.name}
    className="w-full max-h-[400px] object-cover rounded mb-6"
  />
)}

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-600 mb-6">{product.description || 'No description available.'}</p>

      <button
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  onClick={() => {
    if (!product) return;
    addToCart(product._id);
    trackEvent('add_to_cart', 'pdp', product.name, product.price);
  }}
>
  Add to Cart
</button>
    </div>
  );
}
