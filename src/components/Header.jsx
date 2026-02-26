import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, wishlistCount, toggleCart, toggleWishlistDrawer } = useShop();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">clothes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Accueil', 'Boutique', 'Nouveautés', 'Promotions'].map((item) => (
            <Link
              key={item}
              to={item === 'Accueil' ? '/' : '/shop'}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Icons / Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2.5 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleWishlistDrawer}
            className="p-2.5 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          <button
            onClick={toggleCart}
            className="p-2.5 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block" />

          <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
            <User className="w-4 h-4" />
            <span>Connexion</span>
          </button>

          <button
            className="lg:hidden p-2.5 hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 lg:hidden shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-2">
            {['Accueil', 'Boutique', 'Nouveautés', 'Promotions'].map((item) => (
              <Link
                key={item}
                to={item === 'Accueil' ? '/' : '/shop'}
                className="px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link
              to="/login"
              className="px-4 py-3 rounded-lg bg-primary/5 text-primary font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Se connecter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

