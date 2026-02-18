import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange, onClearAll }) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    skinType: true,
    price: true,
    review: true,
    promotions: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const activeFilters = [
    filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 200) && `Prix: $${filters.priceRange.min}-$${filters.priceRange.max}`,
    filters.promotions?.includes('best-sellers') && 'Best Seller',
    filters.availability?.includes('in-stock') && 'In Stock',
  ].filter(Boolean);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filtres</h2>
        <button
          onClick={onClearAll}
          className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Tout effacer
        </button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-semibold"
              >
                {filter}
                <button
                  onClick={() => {
                    if (filter.includes('Prix')) {
                      onFilterChange({ priceRange: { min: 0, max: 200 } });
                    } else if (filter === 'Best Seller') {
                      onFilterChange({
                        promotions: filters.promotions?.filter(p => p !== 'best-sellers') || []
                      });
                    } else if (filter === 'In Stock') {
                      onFilterChange({
                        availability: filters.availability?.filter(a => a !== 'in-stock') || []
                      });
                    }
                  }}
                  className="hover:text-primary-dark"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between mb-3 font-semibold text-gray-900 hover:text-primary transition-colors"
        >
          <span>Catégories</span>
          {openSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.categories && (
          <div className="space-y-2.5">
            {['Skin Care', 'Makeup', 'Hair Care', 'Fragrances', 'Body Care'].map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(category) || false}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...(filters.categories || []), category]
                        : (filters.categories || []).filter(c => c !== category);
                      onFilterChange({ categories: newCategories });
                    }}
                    className="peer w-4 h-4 border-2 border-gray-300 rounded text-primary focus:ring-primary focus:ring-offset-0 transition-all checked:border-primary"
                  />
                </div>
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-sm">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-3 font-semibold text-gray-900 hover:text-primary transition-colors"
        >
          <span>Prix</span>
          {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.price && (
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={filters.priceRange?.max || 200}
              onChange={(e) => {
                onFilterChange({
                  priceRange: {
                    min: filters.priceRange?.min || 0,
                    max: parseInt(e.target.value)
                  }
                });
              }}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-sm text-gray-500 font-medium mt-3">
              <span>$0</span>
              <span className="text-primary">${filters.priceRange?.max || 200}</span>
            </div>
          </div>
        )}
      </div>

      {/* Review */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('review')}
          className="w-full flex items-center justify-between mb-3 font-semibold text-gray-900 hover:text-primary transition-colors"
        >
          <span>Note</span>
          {openSections.review ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.review && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.reviews?.includes(stars) || false}
                  onChange={(e) => {
                    const newReviews = e.target.checked
                      ? [...(filters.reviews || []), stars]
                      : (filters.reviews || []).filter(r => r !== stars);
                    onFilterChange({ reviews: newReviews });
                  }}
                  className="peer w-4 h-4 border-2 border-gray-300 rounded text-primary focus:ring-primary focus:ring-offset-0 transition-all checked:border-primary"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                  <span className="text-gray-400 text-xs ml-1 group-hover:text-gray-600">& Plus</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;

