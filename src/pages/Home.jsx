import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { gsap } from 'gsap';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';

const Home = () => {
  // Use first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Hero Animations
    const ctx = gsap.context(() => {
      // Staggered text reveal
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Image fade in and scale
      gsap.from('.hero-image', {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'power2.out'
      });

      // Floating card pop-in
      gsap.from('.floating-card', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
        ease: 'back.out(1.7)'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Content */}
            <div className="max-w-2xl">
              <div className="hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Nouvelle Collection Sport & Mode</span>
              </div>

              <h1 className="hero-text text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                Style, Confort & <span className="text-primary">Performance</span> <br className="hidden lg:block" />
                au quotidien.
              </h1>

              <p className="hero-text text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Découvrez nos dernières collections de sneakers, t-shirts et kits sportifs.
                L'alliance parfaite entre design urbain et technicité.
              </p>

              <div className="hero-text flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary border border-transparent rounded-2xl hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/25"
                >
                  Découvrir la Collection
                  <ArrowRight className="w-5 h-5 ml-2 -mr-1" />
                </Link>
                <Link
                  to="/chat"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                >
                  Personal Shopper IA
                </Link>
              </div>

              <div className="hero-text mt-10 flex items-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Qualité Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-500" />
                  <span>Livraison Rapide</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hero-image">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-transparent rounded-[2.5rem] transform rotate-3 scale-105 opacity-50 blur-2xl"></div>
              <img
                src="/images/hero_custom.jpg"
                alt="Apparel Collection"
                className="relative w-full rounded-[2rem] shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-500 object-cover aspect-[4/5]"
              />

              {/* Floating Card */}
              <div className="floating-card absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 max-w-xs animate-float hidden md:block">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Nouvel Arrivage</p>
                    <p className="text-xs text-gray-500">Sneakers & Kits</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  "Le kit pro est incroyable, hyper confortable !"
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Sélection du moment</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Nos Meilleures Ventes</h2>
            </div>
            <Link
              to="/shop"
              className="group flex items-center gap-2 font-semibold text-gray-600 hover:text-primary transition-colors"
            >
              Voir tout le catalogue
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Truck,
                title: "Livraison OFFERTE",
                desc: "Partout au Maroc pour les commandes +500 DH"
              },
              {
                icon: ShieldCheck,
                title: "Garantie Satisfait",
                desc: "30 jours pour changer d'avis, retours gratuits"
              },
              {
                icon: Headphones,
                title: "Support Client 24/7",
                desc: "Une question ? Notre agent IA vous répond instantanément"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

