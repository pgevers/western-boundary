import { FC } from 'react';
import { trackEvent } from '../lib/analytics';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (productId: string) => void;
  showCTA?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart, showCTA = true }) => {
  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-4 flex flex-col hover:shadow-xl transition">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-lg font-semibold text-center mb-1">{product.name}</h2>
      <p className="text-gray-700 text-center mb-4">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(product.price)}
      </p>
      {showCTA && onAddToCart && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
            trackEvent('add_to_cart', 'product_card', product.name, product.price);
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
