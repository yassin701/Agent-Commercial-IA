import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, Truck, ShieldCheck, ArrowRight, Minus, Plus, Heart, Share2, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, toggleWishlist, isInWishlist } = useShop();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
        window.scrollTo(0, 0);
    }, [id, products]); // Added products to dependency array to react to data changes

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Chargement de l'article...</p>
                </div>
            </div>
        );
    }

    const isWishlisted = isInWishlist(product.id);
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleQuantityChange = (type) => {
        if (type === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
        if (type === 'increase' && quantity < 10) setQuantity(prev => prev + 1);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-100 py-4">
                <div className="container mx-auto px-4">
                    <nav className="text-sm text-gray-500 flex items-center gap-2">
                        <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
                        <span>/</span>
                        <Link to="/shop" className="hover:text-primary transition-colors">Boutique</Link>
                        <span>/</span>
                        <span className="text-primary font-medium">{product.name}</span>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 mb-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Product Image */}
                        <div className="space-y-6">
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                />
                                {product.discount && (
                                    <span className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                                        Promo
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[product.image, product.image, product.image, product.image].map((img, idx) => (
                                    <button key={idx} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="mb-8">
                                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{product.category}</span>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{product.name}</h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="font-bold text-gray-900">{product.rating}</span>
                                        <span className="text-gray-400 text-sm">({product.review} avis)</span>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <span className={`text-sm font-medium ${product.stock === 'in-stock' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                        {product.stock === 'in-stock' ? 'En Stock' : 'Rupture de stock'}
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-4 mb-8">
                                    <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                                    )}
                                </div>

                                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                    {product.description || "Un style unique et un confort inégalé pour votre quotidien."}
                                </p>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <div className="flex items-center border-2 border-gray-100 rounded-xl">
                                        <button
                                            onClick={() => handleQuantityChange('decrease')}
                                            className="p-4 hover:text-primary transition-colors"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange('increase')}
                                            className="p-4 hover:text-primary transition-colors"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-primary text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-1"
                                    >
                                        Ajouter au panier
                                    </button>
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className={`p-4 rounded-xl border-2 transition-all ${isWishlisted ? 'border-rose-100 bg-rose-50 text-rose-500' : 'border-gray-100 hover:border-gray-300 hover:text-primary'}`}
                                    >
                                        <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Link to={`/chat?product=${product.id}`} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 text-primary font-semibold hover:bg-blue-100 transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                        Négocier le prix
                                    </Link>
                                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                        Partager
                                    </button>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-2 gap-4 py-8 border-t border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Livraison Gratuite</h4>
                                        <p className="text-gray-500 text-xs mt-1">Pour toute commande &gt; $50</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-primary">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Garantie Qualité</h4>
                                        <p className="text-gray-500 text-xs mt-1">Satisfait ou remboursé</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Tabs */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                        {['description', 'details', 'shipping'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab === 'description' ? 'Description' : tab === 'details' ? 'Détails Techniques' : 'Livraison & Retours'}
                            </button>
                        ))}
                    </div>
                    <div className="prose prose-lg text-gray-600 max-w-none">
                        {activeTab === 'description' && (
                            <div>
                                <p>{product.description}</p>
                                <ul className="mt-4 space-y-2">
                                    <li>• Matériaux de qualité supérieure</li>
                                    <li>• Confort optimal</li>
                                    <li>• Durabilité exceptionnelle</li>
                                </ul>
                            </div>
                        )}
                        {activeTab === 'details' && (
                            <div>
                                <p>Composition : Coton, Polyester recyclé, ou Cuir selon le modèle.</p>
                                <p>Entretien : Lavage en machine à 30°C conseillé.</p>
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <p>Livraison standard (3-5 jours ouvrés). Retours gratuits sous 30 jours.</p>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className="border-t border-gray-100 pt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Articles Similaires</h2>
                        <Link to="/shop" className="group flex items-center gap-2 font-semibold text-primary">
                            Voir tout
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;
