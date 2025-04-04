import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { sanity } from '../lib/sanity';
import { Product } from '../types/Product';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  console.log('cart context:', cart);
  useEffect(() => {
    const fetchProducts = async () => {
      if (cart.length === 0) return setProducts([]);

      const ids = cart.map((item) => item.productId);
      console.log('🧾 Cart product IDs:', ids);
      const query = `*[_type == "product" && _id in $ids]{
        _id,
        name,
        price,
        image { asset->{url} }
      }`;
      console.log('🧾 Cart product IDs:', ids);
      const result = await sanity.fetch(query, { ids });
      console.log('📦 Sanity fetch result:', result);
      setProducts(result);
    };

    fetchProducts();
  }, [cart]);

  const getQuantity = (id: string) =>
    cart.find((item) => item.productId === id)?.quantity || 0;

  const getTotal = () =>
    products.reduce((total, product) => {
      const qty = getQuantity(product._id);
      return total + product.price * qty;
    }, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {products.map((product) => (
              <li key={product._id} className="py-4 flex items-center gap-4">
                {product.image?.asset?.url && (
                  <img
                    src={product.image.asset.url}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-500">
                    ${product.price.toFixed(2)} × {getQuantity(product._id)}
                  </p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${getTotal().toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
