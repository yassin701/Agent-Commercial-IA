import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
        {product.discount && (
          <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white px-2.5 py-1 rounded-md text-xs font-bold tracking-wide">
            -{discountPercentage}%
          </span>
        )}

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Hover Actions */}
        <div className={`absolute bottom-4 right-4 flex flex-col gap-2 transition-all duration-300 transform ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-soft transition-colors ${isWishlisted ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-700 hover:bg-primary hover:text-white'
              }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="w-10 h-10 bg-white text-gray-700 rounded-xl flex items-center justify-center shadow-soft hover:bg-primary hover:text-white transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-10 h-10 bg-white text-gray-700 rounded-xl flex items-center justify-center shadow-soft hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-gray-900 font-semibold hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-1">{product.category}</p>

        <div className="flex items-center justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

