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
    filters.priceRange && `Price: $${filters.priceRange.min}-$${filters.priceRange.max}`,
    filters.promotions?.includes('best-sellers') && 'Best Seller',
    filters.availability?.includes('in-stock') && 'In Stock',
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Options de Filtre</h2>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-6 pb-6 border-b">
          <div className="flex flex-wrap gap-2 mb-3">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-gray-700 rounded-full text-sm"
              >
                {filter}
                <button
                  onClick={() => {
                    if (filter.includes('Price')) {
                      onFilterChange({ priceRange: null });
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
                  className="hover:text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Tout effacer
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
        >
          <span>Par Catégories</span>
          {openSections.categories ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {openSections.categories && (
          <div className="space-y-2">
            {['Skin Care', 'Makeup', 'Hair Care', 'Fragrances', 'Nail Care', 'Body Care'].map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category) || false}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...(filters.categories || []), category]
                      : (filters.categories || []).filter(c => c !== category);
                    onFilterChange({ categories: newCategories });
                  }}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Skin Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('skinType')}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
        >
          <span>Par Type de Peau</span>
          {openSections.skinType ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {openSections.skinType && (
          <div className="space-y-2">
            {['Normal', 'Oily', 'Dry', 'Combination', 'Sensitive'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="skinType"
                  checked={filters.skinType === type}
                  onChange={() => onFilterChange({ skinType: type })}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
        >
          <span>Prix</span>
          {openSections.price ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {openSections.price && (
          <div>
            <input
              type="range"
              min="10"
              max="100"
              value={filters.priceRange?.max || 100}
              onChange={(e) => {
                onFilterChange({
                  priceRange: {
                    min: filters.priceRange?.min || 10,
                    max: parseInt(e.target.value)
                  }
                });
              }}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>${filters.priceRange?.min || 10}.00</span>
              <span>${filters.priceRange?.max || 100}.00</span>
            </div>
          </div>
        )}
      </div>

      {/* Review */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('review')}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
        >
          <span>Note</span>
          {openSections.review ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {openSections.review && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <label key={stars} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.reviews?.includes(stars) || false}
                  onChange={(e) => {
                    const newReviews = e.target.checked
                      ? [...(filters.reviews || []), stars]
                      : (filters.reviews || []).filter(r => r !== stars);
                    onFilterChange({ reviews: newReviews });
                  }}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-gray-700">{stars} Étoiles</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Promotions */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('promotions')}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
        >
          <span>Par Promotions</span>
          {openSections.promotions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {openSections.promotions && (
          <div className="space-y-2">
            {['New Arrivals', 'Best Sellers', 'On Sale'].map((promo) => (
              <label key={promo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.promotions?.includes(promo.toLowerCase().replace(' ', '-')) || false}
                  onChange={(e) => {
                    const promoKey = promo.toLowerCase().replace(' ', '-');
                    const newPromotions = e.target.checked
                      ? [...(filters.promotions || []), promoKey]
                      : (filters.promotions || []).filter(p => p !== promoKey);
                    onFilterChange({ promotions: newPromotions });
                  }}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-gray-700">{promo}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between mb-4 font-semibold text-gray-900"
        >
          <span>Disponibilité</span>
          {openSections.availability ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {openSections.availability && (
          <div className="space-y-2">
            {['In Stock', 'Out of Stocks'].map((availability) => (
              <label key={availability} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availability?.includes(availability.toLowerCase().replace(' ', '-')) || false}
                  onChange={(e) => {
                    const availKey = availability.toLowerCase().replace(' ', '-');
                    const newAvailability = e.target.checked
                      ? [...(filters.availability || []), availKey]
                      : (filters.availability || []).filter(a => a !== availKey);
                    onFilterChange({ availability: newAvailability });
                  }}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-gray-700">{availability}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;

