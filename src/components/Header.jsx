import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, GitCompare, User, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { gsap } from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    // No animation needed - header is always visible
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" style={{ marginTop: 0, paddingTop: 0, paddingBottom: 0 }}>
      {/* Top Bar */}
      <div className="header-top bg-primary text-white" style={{ marginTop: 0, paddingTop: 0, paddingBottom: '0.75rem', paddingLeft: 0, paddingRight: 0 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>Appelez-nous: +212-XXX-XXX-XXX</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>Inscrivez-vous et obtenez 20% de réduction sur votre première commande.</span>
              <Link to="/signup" className="text-secondary hover:text-white font-semibold px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300">
                S'inscrire maintenant →
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-300 hover:scale-110">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-300 hover:scale-110">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-300 hover:scale-110">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="header-main bg-white" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="container mx-auto px-4" style={{ paddingTop: 0 }}>
          <div className="flex items-center justify-between h-20" style={{ paddingTop: 0, marginTop: 0 }}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-dark transition-colors duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">Souk Digital</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
                Accueil
              </Link>
              <Link to="/shop" className="px-4 py-2 text-primary bg-gray-50 rounded-lg font-semibold">
                Boutique
              </Link>
              <Link to="/skincare" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
                Soins Visage
              </Link>
              <Link to="/makeup" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
                Maquillage
              </Link>
              <Link to="/haircare" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
                Soins Cheveux
              </Link>
              <Link to="/about" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
                À Propos
              </Link>
              <Link to="/blog" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
                Blog
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
                <Heart className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">0</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <GitCompare className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <User className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                onClick={() => navigate('/chat')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-accent rounded-full transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Accueil
              </Link>
              <Link to="/shop" className="text-primary font-semibold">
                Boutique
              </Link>
              <Link to="/skincare" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Soins Visage
              </Link>
              <Link to="/makeup" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Maquillage
              </Link>
              <Link to="/haircare" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Soins Cheveux
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">
                À Propos
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Blog
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

