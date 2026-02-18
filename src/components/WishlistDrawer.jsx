import { useRef, useEffect } from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const WishlistDrawer = () => {
    const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, addToCart } = useShop();
    const drawerRef = useRef(null);
    const backdropRef = useRef(null);

    useEffect(() => {
        if (isWishlistOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, display: 'block' });
            gsap.to(drawerRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' });
        } else {
            document.body.style.overflow = '';
            gsap.to(backdropRef.current, {
                opacity: 0, duration: 0.3, onComplete: () => {
                    if (backdropRef.current) backdropRef.current.style.display = 'none';
                }
            });
            gsap.to(drawerRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
        }
    }, [isWishlistOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={() => setIsWishlistOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] hidden opacity-0"
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl transform translate-x-full"
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Heart className="w-5 h-5 text-rose-500" />
                            Favoris ({wishlist.length})
                        </h2>
                        <button
                            onClick={() => setIsWishlistOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {wishlist.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-300">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Votre liste est vide</h3>
                                    <p className="text-gray-500 mt-1">Sauvegardez vos articles préférés pour plus tard !</p>
                                </div>
                                <button
                                    onClick={() => setIsWishlistOpen(false)}
                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Explorer la boutique
                                </button>
                            </div>
                        ) : (
                            wishlist.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <Link
                                                    to={`/product/${item.id}`}
                                                    onClick={() => setIsWishlistOpen(false)}
                                                    className="font-semibold text-gray-900 truncate hover:text-primary transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="text-gray-400 hover:text-rose-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-primary">${item.price}</span>
                                            <button
                                                onClick={() => {
                                                    addToCart(item);
                                                    removeFromWishlist(item.id);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
                                            >
                                                <ShoppingBag className="w-3 h-3" />
                                                Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WishlistDrawer;
