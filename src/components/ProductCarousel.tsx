import { FC } from 'react';
import ProductCard from './ProductCard';
import { trackEvent } from '../lib/analytics';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type ProductCarouselProps = {
  title: string;
  products: Product[];
  onAddToCart: (productId: string) => void;
};

const ProductCarousel: FC<ProductCarouselProps> = ({ title, products, onAddToCart }) => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    // Track view/select item
    trackEvent('view_item', 'carousel', product.name, product.price);
    
    // 🔄 Navigate to product page
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product.id);
    trackEvent('add_to_cart', 'carousel', product.name, product.price);
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4 px-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto px-2 pb-2 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] max-w-sm flex-shrink-0">
            <div
              onClick={() => handleProductClick(product)}
              className="cursor-pointer"
            >
              <ProductCard
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
