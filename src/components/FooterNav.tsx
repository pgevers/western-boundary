import { Home, ShoppingBag, Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FooterNav() {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home />, label: 'Home', path: '/' },
    { icon: <ShoppingBag />, label: 'Shop', path: '/category/Shop All' },
    { icon: <Search />, label: 'Search', path: '/search' },
    { icon: <ShoppingCart />, label: 'Cart', path: '/cart' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white border-t border-gray-800 z-50">
      <nav className="flex justify-around py-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center text-white text-xs hover:text-blue-400"
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
}
