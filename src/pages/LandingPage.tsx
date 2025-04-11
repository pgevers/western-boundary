import { useEffect, useState } from 'react';
import HeroImageBlock from '../components/HeroImageBlock';
import ProductCarousel from '../components/ProductCarousel';
import { useCart } from '../context/CartContext';
import { sanity } from '../lib/sanity';
import type { Product } from '../types/Product';

export default function LandingPage() {
  const { addToCart } = useCart();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [goingFast, setGoingFast] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCarousels = async () => {
      const queryFields = `
        _id,
        name,
        price,
        salePrice,
        brand,
        slug,
        images[]{ asset, alt }
      `;

      const queries = {
        featured: `*[_type == "product" && featured == true]{ ${queryFields} }`,
        bestSellers: `*[_type == "product" && bestSeller == true]{ ${queryFields} }`,
        newArrivals: `*[_type == "product" && newArrival == true]{ ${queryFields} }`,
        goingFast: `*[_type == "product" && goingFast == true]{ ${queryFields} }`,
      };

      try {
        const [f, b, n, g] = await Promise.all([
          sanity.fetch(queries.featured),
          sanity.fetch(queries.bestSellers),
          sanity.fetch(queries.newArrivals),
          sanity.fetch(queries.goingFast),
        ]);
        setFeatured(f);
        setBestSellers(b);
        setNewArrivals(n);
        setGoingFast(g);
      } catch (err) {
        console.error('❌ Error loading carousels:', err);
      }
    };

    fetchCarousels();
  }, []);

  return (
    <>
      <HeroImageBlock
        imageUrl="/hero-truck.jpg"
        heading="Build Your Rig"
        subheading="Toyota accessories and upgrades built for the trail."
        ctaText="Shop Now"
        onClick={() => (window.location.href = '/category/Shop All')}
      />

      <ProductCarousel
        title="Featured Accessories"
        products={featured}
        onAddToCart={addToCart}
      />

      <ProductCarousel
        title="Best Sellers"
        products={bestSellers}
        onAddToCart={addToCart}
      />

      <ProductCarousel
        title="New Arrivals"
        products={newArrivals}
        onAddToCart={addToCart}
      />

      <ProductCarousel
        title="Won’t Last Long!"
        products={goingFast}
        onAddToCart={addToCart}
      />
    </>
  );
}
