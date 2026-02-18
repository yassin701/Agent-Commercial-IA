import { createContext, useState, useEffect, useContext } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
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
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    // Drawers
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleWishlistDrawer = () => setIsWishlistOpen(!isWishlistOpen);

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            if (!prev.find((item) => item.id === product.id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
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
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                            // Update price if override provided, otherwise keep existing
                            price: priceOverride || item.price,
                            negotiatedPrice: priceOverride || item.negotiatedPrice
                        }
                        : item
                );
            }
            return [...prev, {
                ...product,
                quantity,
                price: priceOverride || product.price,
                negotiatedPrice: priceOverride || product.negotiatedPrice // Store specifically for chat logic
            }];
        });
        if (!isCartOpen) setIsCartOpen(true); // Auto open cart
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
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
