import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8 p-4 text-center text-sm text-gray-600">
      <div className="container mx-auto flex justify-center items-center gap-4">
        <span>&copy; {new Date().getFullYear()} Western Boundary</span>
        <Link
          to="/cart"
          className="text-blue-600 hover:underline hover:text-blue-800 transition"
        >
          View Cart
        </Link>
      </div>
    </footer>
  );
}
