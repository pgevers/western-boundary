import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { trackEvent } from '../lib/analytics';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';
import { sanity } from '../lib/sanity';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" && defined(name) && defined(price)]{
        _id,
        name,
        price,
        image { asset->{url} }
      }`;

      try {
        const result = await sanity.fetch(query);
        console.log('📦 Sanity products:', result);
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products from Sanity:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    addToCart(productId);
    trackEvent('add_to_cart', 'product', product.name, product.price);
    console.log('Adding to cart:', productId);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={{
            id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.image?.asset?.url,
          }}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
