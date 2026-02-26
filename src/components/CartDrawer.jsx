import { useRef, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useShop();
    const drawerRef = useRef(null);
    const backdropRef = useRef(null);

    const total = Array.isArray(cart) ? cart.reduce((sum, item) => {
        const price = item.negotiatedPrice || item.price || 0;
        return sum + price * (item.quantity || 0);
    }, 0) : 0;

    useEffect(() => {
        if (isCartOpen) {
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
    }, [isCartOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={() => setIsCartOpen(false)}
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
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            Panier ({cart.length})
                        </h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Votre panier est vide</h3>
                                    <p className="text-gray-500 mt-1">Trouvez votre style parmi nos collections !</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                                >
                                    Continuer mes achats
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => {
                                const price = item.negotiatedPrice || item.price;
                                return (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-rose-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-primary disabled:opacity-50"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-primary"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">${(price * item.quantity).toFixed(2)}</p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-xs text-gray-400">${price} / unité</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Sous-total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Livraison</span>
                                    <span className="text-emerald-500 font-medium">Gratuite</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Link
                                to="/track-order"
                                onClick={() => setIsCartOpen(false)}
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                            >
                                Commander
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
