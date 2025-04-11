import { FC } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/Product';

type ProductCarouselProps = {
  title: string;
  products: Product[];
  onAddToCart: (productId: string) => void;
};

const ProductCarousel: FC<ProductCarouselProps> = ({ title, products, onAddToCart }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4 px-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto px-2 pb-2 scrollbar-hide">
        {products.map((product) => (
          <div key={product._id} className="min-w-[250px] max-w-sm flex-shrink-0">
            <ProductCard
              product={product}
              onAddToCart={() => onAddToCart(product._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
