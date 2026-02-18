import { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    skinType: null,
    priceRange: { min: 10, max: 100 },
    reviews: [],
    promotions: [],
    availability: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const productsRef = useRef(null);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'SilkSculpt Serum',
      category: 'Skin Care',
      price: 35.00,
      originalPrice: 70.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      skinType: 'Normal',
      review: 5,
    },
    {
      id: 2,
      name: 'SilkSkin Serum',
      category: 'Skin Care',
      price: 42.00,
      originalPrice: 60.00,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      skinType: 'Sensitive',
      review: 4,
    },
    {
      id: 3,
      name: 'Argan Glow',
      category: 'Hair Care',
      price: 28.00,
      originalPrice: 40.00,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 5,
    },
    {
      id: 4,
      name: 'Nephrolepis exaltata',
      category: 'Body Care',
      price: 18.00,
      originalPrice: 20.00,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
      stock: 'low-stock',
      discount: true,
      review: 4,
    },
    {
      id: 5,
      name: 'Smooth Foundation',
      category: 'Makeup',
      price: 25.00,
      originalPrice: 50.00,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1522338247332-0d0b0e5b32db?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 5,
    },
    {
      id: 6,
      name: 'Smooth Body Cream',
      category: 'Body Care',
      price: 30.00,
      originalPrice: 60.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 5,
    },
    {
      id: 7,
      name: 'AquaAura Wellness',
      category: 'Skin Care',
      price: 38.00,
      originalPrice: 76.00,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 4,
    },
    {
      id: 8,
      name: 'Velvet Rose',
      category: 'Fragrances',
      price: 45.00,
      originalPrice: 90.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 5,
    },
    {
      id: 9,
      name: 'Herbal Haven',
      category: 'Hair Care',
      price: 32.00,
      originalPrice: 64.00,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 4,
    },
    {
      id: 10,
      name: 'Essence Body Gel',
      category: 'Body Care',
      price: 22.00,
      originalPrice: 44.00,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1570554886110-0e52fbd0b6c5?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 4,
    },
    {
      id: 11,
      name: 'HydraLuxe Serum',
      category: 'Skin Care',
      price: 40.00,
      originalPrice: 80.00,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 5,
    },
    {
      id: 12,
      name: 'OceanMist Moisturizer',
      category: 'Skin Care',
      price: 35.00,
      originalPrice: 70.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
      review: 5,
    },
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories?.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Skin type filter
    if (filters.skinType) {
      filtered = filtered.filter(product =>
        product.skinType === filters.skinType
      );
    }

    // Price filter
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
      );
    }

    // Review filter
    if (filters.reviews?.length > 0) {
      filtered = filtered.filter(product =>
        filters.reviews.includes(Math.floor(product.rating))
      );
    }

    // Availability filter
    if (filters.availability?.length > 0) {
      filtered = filtered.filter(product => {
        if (filters.availability.includes('in-stock')) {
          return product.stock === 'in-stock';
        }
        if (filters.availability.includes('out-of-stocks')) {
          return product.stock === 'out-of-stock';
        }
        return true;
      });
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);

    // Animate products - wait for DOM update
    setTimeout(() => {
      const productItems = productsRef.current?.querySelectorAll('.product-item');
      if (productItems && productItems.length > 0) {
        // Animate each product
        productItems.forEach((item, index) => {
          gsap.fromTo(item,
            { y: 20 },
            {
              y: 0,
              duration: 0.4,
              delay: index * 0.05,
            }
          );
        });
      }
    }, 0);
  }, [filters, searchQuery, sortBy, products]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      skinType: null,
      priceRange: { min: 10, max: 100 },
      reviews: [],
      promotions: [],
      availability: [],
    });
  };

  const handleAskAgent = (product) => {
    window.location.href = `/chat?product=${product.id}`;
  };

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      
      {/* Page Title */}
      <div className="bg-gradient-to-r from-primary/5 via-white to-primary/5 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4">
            <span className="gradient-text">Boutique</span>
          </h1>
          <nav className="text-gray-600 text-lg">
            <span className="hover:text-primary transition-colors">Accueil</span> / <span className="text-primary font-semibold">Boutique</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-premium border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full md:w-auto flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-3 hover:bg-primary hover:bg-opacity-10 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                  </button>
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Rechercher des produits..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-lg"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-gray-600 font-medium">
                    <span className="text-primary font-bold">{filteredProducts.length}</span> résultats
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 font-medium cursor-pointer"
                  >
                    <option value="default">Tri par défaut</option>
                    <option value="price-low">Prix: Croissant</option>
                    <option value="price-high">Prix: Décroissant</option>
                    <option value="rating">Meilleure note</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <ProductCard product={product} onAskAgent={handleAskAgent} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">Aucun produit trouvé</p>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  &lt;
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  3
                </button>
                <span className="px-4 py-2 text-gray-600">...</span>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  10
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;

