import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { trackEvent } from '../lib/analytics';
import type { Product } from '../types/Product';
import { urlFor } from '../lib/sanityImage';

type ProductCardProps = {
  product: Product;
  onAddToCart?: (productId: string) => void;
  showCTA?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart, showCTA = true }) => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);

  const validImages = product.images?.filter(img => img?.asset?._ref) || [];

  const currentImage = validImages[imageIndex] || validImages[0];
  const imageUrl = currentImage
    ? urlFor(currentImage).width(400).height(300).url()
    : 'https://via.placeholder.com/400x300?text=No+Image';

  const displayPrice =
    product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setImageIndex((prev) => (prev + 1) % validImages.length),
    onSwipedRight: () =>
      setImageIndex((prev) =>
        prev === 0 ? validImages.length - 1 : prev - 1
      ),
    trackMouse: true,
  });

  const handleCardClick = () => {
    if (product.slug?.current) {
      navigate(`/product/${product.slug.current}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      {...swipeHandlers}
      className="bg-white text-black rounded-2xl shadow-md p-4 flex flex-col transform transition-all duration-200 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={currentImage?.alt || product.name}
        className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300"
      />

      {product.brand && (
        <p className="text-xs text-gray-500 uppercase tracking-wide text-center mb-1">
          {product.brand}
        </p>
      )}

      <h2 className="text-lg font-semibold text-center mb-1">{product.name}</h2>

      <p className="text-gray-700 text-center mb-4">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(displayPrice)}
      </p>

      {showCTA && onAddToCart && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product._id);
            trackEvent('add_to_cart', 'product_card', product.name, displayPrice);
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
