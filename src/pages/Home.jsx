import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShoppingBag, Headphones, Truck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const productsRef = useRef(null);

  // Mock featured products
  const featuredProducts = [
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
    },
    {
      id: 2,
      name: 'Argan Glow',
      category: 'Hair Care',
      price: 28.00,
      originalPrice: 40.00,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
    },
    {
      id: 3,
      name: 'Smooth Foundation',
      category: 'Makeup',
      price: 25.00,
      originalPrice: 50.00,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1522338247332-0d0b0e5b32db?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
    },
    {
      id: 4,
      name: 'Velvet Rose',
      category: 'Fragrances',
      price: 45.00,
      originalPrice: 90.00,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
      stock: 'in-stock',
      discount: true,
    },
  ];

  useEffect(() => {
    // Hero animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroTitle || heroSubtitle || heroButtons || heroImage) {
      const tl = gsap.timeline();
      if (heroTitle) {
        tl.fromTo(heroTitle, { y: 50 }, { y: 0, duration: 1 });
      }
      if (heroSubtitle) {
        tl.fromTo(heroSubtitle, { y: 30 }, { y: 0, duration: 0.8 }, '-=0.5');
      }
      if (heroButtons) {
        tl.fromTo(heroButtons, { y: 20 }, { y: 0, duration: 0.6 }, '-=0.4');
      }
      if (heroImage) {
        tl.fromTo(heroImage, { scale: 0.95 }, { scale: 1, duration: 1 }, '-=0.8');
      }
    }

    // Products animation
    if (productsRef.current) {
      const productItems = productsRef.current.querySelectorAll('.product-item');
      if (productItems.length > 0) {
        productItems.forEach((item, index) => {
          gsap.fromTo(item, 
            { y: 50 },
            {
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }

    // Services animation
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      const serviceItems = servicesSection.querySelectorAll('.service-item');
      if (serviceItems.length > 0) {
        serviceItems.forEach((item, index) => {
          gsap.fromTo(item,
            { y: 30 },
            {
              y: 0,
              duration: 0.6,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }
  }, []);

  const handleAskAgent = (product) => {
    // Navigate to chat with product context
    window.location.href = `/chat?product=${product.id}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-lg mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Agent Commercial IA 24/7</span>
              </div>
              <h1 className="hero-title text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                L'âme du{' '}
                <span className="text-primary">souk marocain</span>
                <br />
                dans le monde numérique
              </h1>
              <p className="hero-subtitle text-lg text-gray-600 mb-8 leading-relaxed">
                Négociez, découvrez et repartez avec le sentiment d'avoir fait une bonne affaire. 
                Notre agent IA intelligent vous accompagne 24h/24 et 7j/7 dans vos achats.
              </p>
              <div className="hero-buttons flex flex-wrap gap-4">
                <Link
                  to="/chat"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center gap-2 group relative z-10"
                  style={{ backgroundColor: '#1a5f3f', color: '#ffffff' }}
                >
                  <span style={{ color: '#ffffff' }}>Commencer vos achats</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" style={{ color: '#ffffff' }} />
                </Link>
                <Link
                  to="/shop"
                  className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200 relative z-10"
                  style={{ backgroundColor: '#ffffff', color: '#1a5f3f', borderColor: '#1a5f3f' }}
                >
                  <span style={{ color: '#1a5f3f' }}>Parcourir les produits</span>
                </Link>
              </div>
            </div>
            <div className="hero-image relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Souk Digital"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Collection</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-4">
              Produits Phares
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Découvrez nos meilleures offres sélectionnées pour vous avec des prix négociables</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <ProductCard product={product} onAskAgent={handleAskAgent} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Voir tous les produits
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Pourquoi Nous Choisir ?</h2>
            <p className="text-gray-600 text-lg">Des services premium pour votre satisfaction</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-item bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-200">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison Gratuite</h3>
              <p className="text-gray-600">Livraison gratuite pour les commandes supérieures à 50$</p>
            </div>
            <div className="service-item bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-200">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Paiement Flexible</h3>
              <p className="text-gray-600">Plusieurs options de paiement sécurisées</p>
            </div>
            <div className="service-item bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-200">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support 24/7</h3>
              <p className="text-gray-600">Nous vous assistons en ligne tous les jours</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

