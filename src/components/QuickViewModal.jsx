import { X, Heart, ShoppingBag, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const QuickViewModal = () => {
    const {
        isQuickViewOpen,
        closeQuickView,
        quickViewProduct,
        addToCart,
        toggleWishlist,
        isInWishlist
    } = useShop();

    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isQuickViewOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
            );
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isQuickViewOpen]);

    if (!isQuickViewOpen || !quickViewProduct) return null;

    const isInWishlistState = isInWishlist(quickViewProduct.id);

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            closeQuickView();
        }
    };

    const discountPercentage = quickViewProduct.originalPrice
        ? Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)
        : 0;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div
                ref={contentRef}
                className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative"
            >
                <button
                    onClick={closeQuickView}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Product Image */}
                <div className="w-full md:w-1/2 bg-gray-50 relative">
                    <img
                        src={quickViewProduct.image}
                        alt={quickViewProduct.name}
                        className="w-full h-full object-cover min-h-[300px] md:min-h-[500px]"
                    />
                    {quickViewProduct.discount && (
                        <div className="absolute top-6 left-6 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            -{discountPercentage}%
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                    <div className="mb-auto">
                        <span className="text-sm text-primary font-bold uppercase tracking-wider mb-2 block">
                            {quickViewProduct.category}
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {quickViewProduct.name}
                        </h2>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(quickViewProduct.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                                ({quickViewProduct.review || 0} avis)
                            </span>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {quickViewProduct.description || "Découvrez notre article signature, conçu avec des ingrédients de première qualité pour des résultats exceptionnels. Parfait pour votre routine quotidienne."}
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                            <span className="text-3xl font-bold text-gray-900">
                                ${quickViewProduct.price.toFixed(2)}
                            </span>
                            {quickViewProduct.originalPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                    ${quickViewProduct.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mb-8">
                            {quickViewProduct.stock === 'in-stock' && (
                                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    En stock - Expédition sous 24h
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    addToCart(quickViewProduct);
                                    closeQuickView();
                                }}
                                className="flex-1 bg-primary text-white py-4 px-6 rounded-xl font-bold hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/30"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Ajouter au panier
                            </button>

                            <button
                                onClick={() => toggleWishlist(quickViewProduct)}
                                className={`w-full sm:w-auto p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 font-semibold ${isInWishlistState
                                    ? 'border-red-500 bg-red-50 text-red-500'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isInWishlistState ? 'fill-current' : ''}`} />
                                {isInWishlistState ? 'Retirer' : 'Favoris'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
