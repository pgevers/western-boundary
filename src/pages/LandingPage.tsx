import { useEffect, useState } from 'react';
import HeroImageBlock from '../components/HeroImageBlock';
import ProductCarousel from '../components/ProductCarousel';
import { useCart } from '../context/CartContext';
import { sanity } from '../lib/sanity';

type CMSProduct = {
  _id: string;
  name: string;
  price: number;
  image?: { asset: { url: string } };
};

export default function LandingPage() {
  const { addToCart } = useCart();
  const [featured, setFeatured] = useState<CMSProduct[]>([]);
  const [bestSellers, setBestSellers] = useState<CMSProduct[]>([]);
  const [newArrivals, setNewArrivals] = useState<CMSProduct[]>([]);
  const [goingFast, setGoingFast] = useState<CMSProduct[]>([]);

  useEffect(() => {
    const fetchCarousels = async () => {
      const queries = {
        featured: `*[_type == "product" && featured == true]{ _id, name, price, image { asset->{url} } }`,
        bestSellers: `*[_type == "product" && bestSeller == true]{ _id, name, price, image { asset->{url} } }`,
        newArrivals: `*[_type == "product" && newArrival == true]{ _id, name, price, image { asset->{url} } }`,
        goingFast: `*[_type == "product" && goingFast == true]{ _id, name, price, image { asset->{url} } }`,
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
        console.error('Error loading carousels:', err);
      }
    };

    fetchCarousels();
  }, []);

  const mapProducts = (products: CMSProduct[]) =>
    products.map((p) => ({
      id: p._id,
      name: p.name,
      price: p.price,
      imageUrl: p.image?.asset?.url,
    }));

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
        products={mapProducts(featured)}
        onAddToCart={addToCart}
      />

      <ProductCarousel
        title="Best Sellers"
        products={mapProducts(bestSellers)}
        onAddToCart={addToCart}
      />

      <ProductCarousel
        title="New Arrivals"
        products={mapProducts(newArrivals)}
        onAddToCart={addToCart}
      />
       <ProductCarousel
        title="Won't last long!"
        products={mapProducts(goingFast)}
        onAddToCart={addToCart}
      />
    </>
  );
}
