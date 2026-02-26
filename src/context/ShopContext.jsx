import { createContext, useState, useEffect, useContext } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const savedWishlist = localStorage.getItem('wishlist');
            const parsed = savedWishlist ? JSON.parse(savedWishlist) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('Error parsing wishlist from localStorage:', e);
            return [];
        }
    });

    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            const parsed = savedCart ? JSON.parse(savedCart) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('Error parsing cart from localStorage:', e);
            return [];
        }
    });

    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Derived counts
    const cartCount = Array.isArray(cart) ? cart.reduce((total, item) => total + (item.quantity || 0), 0) : 0;
    const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;

    // Drawers
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleWishlistDrawer = () => setIsWishlistOpen(!isWishlistOpen);

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            const currentWishlist = Array.isArray(prev) ? prev : [];
            if (!currentWishlist.find((item) => item.id === product.id)) {
                return [...currentWishlist, product];
            }
            return currentWishlist;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => (Array.isArray(prev) ? prev : []).filter((item) => item.id !== productId));
    };

    const toggleWishlist = (product) => {
        if (wishlist.find((item) => item.id === product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const addToCart = (product, quantity = 1, priceOverride = null) => {
        setCart((prev) => {
            const currentCart = Array.isArray(prev) ? prev : [];
            const existingItem = currentCart.find((item) => item.id === product.id);
            if (existingItem) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                            price: priceOverride || item.price,
                            negotiatedPrice: priceOverride || item.negotiatedPrice
                        }
                        : item
                );
            }
            return [...currentCart, {
                ...product,
                quantity,
                price: priceOverride || product.price,
                negotiatedPrice: priceOverride || product.negotiatedPrice
            }];
        });
        if (!isCartOpen) setIsCartOpen(true); // Auto open cart
    };

    const removeFromCart = (productId) => {
        setCart((prev) => (Array.isArray(prev) ? prev : []).filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            (Array.isArray(prev) ? prev : []).map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const openQuickView = (product) => {
        setQuickViewProduct(product);
        setIsQuickViewOpen(true);
    };

    const closeQuickView = () => {
        setIsQuickViewOpen(false);
        setQuickViewProduct(null);
    };

    const value = {
        wishlist,
        cart,
        cartCount,
        wishlistCount,
        isCartOpen,
        toggleCart,
        setIsCartOpen,
        isWishlistOpen,
        toggleWishlistDrawer,
        setIsWishlistOpen,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        quickViewProduct,
        isQuickViewOpen,
        openQuickView,
        closeQuickView,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
