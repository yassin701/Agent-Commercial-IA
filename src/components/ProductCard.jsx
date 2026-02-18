import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { gsap } from 'gsap';

const ProductCard = ({ product, onAskAgent }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(`.product-card-${product.id}`, {
      y: -5,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(`.product-card-${product.id}`, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`product-card-${product.id} group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        {product.discount && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
            -{discountPercentage}%
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center gap-3 pb-4 transition-all duration-300 ${isHovered ? 'visible' : 'invisible'}`} style={{ pointerEvents: isHovered ? 'auto' : 'none' }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Add to favorites:', product.name);
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-200 group/btn cursor-pointer"
            style={{ backgroundColor: '#ffffff', pointerEvents: 'auto' }}
          >
            <Heart className="w-5 h-5 group-hover/btn:text-white transition-colors duration-200" style={{ color: '#1f2937' }} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Quick view:', product.name);
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-200 group/btn cursor-pointer"
            style={{ backgroundColor: '#ffffff', pointerEvents: 'auto' }}
          >
            <Eye className="w-5 h-5 group-hover/btn:text-white transition-colors duration-200" style={{ color: '#1f2937' }} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Add to cart:', product.name);
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-200 group/btn cursor-pointer"
            style={{ backgroundColor: '#ffffff', pointerEvents: 'auto' }}
          >
            <ShoppingBag className="w-5 h-5 group-hover/btn:text-white transition-colors duration-200" style={{ color: '#1f2937' }} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</span>
        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-medium">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock Badge */}
        <div className="mb-4">
          {product.stock === 'in-stock' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              En Stock
            </span>
          )}
          {product.stock === 'low-stock' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Stock Faible
            </span>
          )}
          {product.stock === 'out-of-stock' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Rupture
            </span>
          )}
        </div>

        {/* Ask Agent Button */}
        <button
          onClick={() => onAskAgent && onAskAgent(product)}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
        >
          Demander à l'agent
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

