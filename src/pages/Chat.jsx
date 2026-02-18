import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, ShoppingBag, X, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useShop } from '../context/ShopContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products as allProducts } from '../data/products';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product'); // Should correspond to product ID in products.js

  // Global Shop Context
  const { cart, addToCart, updateQuantity, removeFromCart, setIsCartOpen } = useShop();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  // Local state for chat-specific sidebar visibility (optional, can sync with global if desired, but keeping separate for chat UX)
  const [showChatSidebar, setShowChatSidebar] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Initial greeting based on context
    let initialMessage = {
      id: 1,
      type: 'agent',
      text: 'Bonjour ! Bienvenue sur Juis. Je suis votre assistant personnel. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
    };

    if (productId) {
      const productOfInterest = allProducts.find(p => p.id === parseInt(productId));
      if (productOfInterest) {
        initialMessage = {
          id: 1,
          type: 'agent',
          text: `Bonjour ! Je vois que vous êtes intéressé par **${productOfInterest.name}**. C'est un excellent choix ! \n\nSouhaitez-vous discuter du prix ou avez-vous des questions spécifiques sur ce produit ?`,
          timestamp: new Date(),
          relatedProduct: productOfInterest
        };
      }
    }

    setMessages([initialMessage]);
  }, [productId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Animate new message
    if (messages.length > 0) {
      const lastMessage = document.querySelector('.message-bubble:last-child');
      if (lastMessage) {
        gsap.fromTo(lastMessage,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
        );
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const agentResponse = generateMockResponse(inputMessage);
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Logic for specific product negotiation
    if (productId && (lowerMessage.includes('prix') || lowerMessage.includes('price') || lowerMessage.includes('cher'))) {
      const product = allProducts.find(p => p.id === parseInt(productId));
      if (product) {
        return {
          id: Date.now(),
          type: 'agent',
          text: `Je peux vous faire une offre spéciale pour le **${product.name}**. \n\nSi vous le commandez maintenant, je peux descendre le prix à **$${(product.price * 0.9).toFixed(2)}** (au lieu de $${product.price}). \n\nCela vous intéresse ?`,
          timestamp: new Date(),
        };
      }
    }

    if (lowerMessage.includes('produit') || lowerMessage.includes('product') || lowerMessage.includes('article')) {
      return {
        id: Date.now(),
        type: 'agent',
        text: 'Voici une sélection de nos meilleurs articles qui pourraient vous plaire :',
        timestamp: new Date(),
        products: allProducts.slice(0, 2), // Show first 2 products as recommendation
      };
    }

    if (lowerMessage.includes('oui') || lowerMessage.includes('d\'accord') || lowerMessage.includes('ok')) {
      // If discussing a product, add it? For now, just dialogue.
      return {
        id: Date.now(),
        type: 'agent',
        text: 'Fantastique ! J\'ajoute l\'article à votre panier avec la réduction appliquée. \n\nVous pouvez finaliser la commande dans le volet de droite.',
        timestamp: new Date(),
      };
    }

    if (lowerMessage.includes('commande') || lowerMessage.includes('panier')) {
      return {
        id: Date.now(),
        type: 'agent',
        text: 'Votre panier est prêt à droite. Cliquez sur "Commander" pour procéder au paiement.',
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now(),
      type: 'agent',
      text: 'Je comprends. N\'hésitez pas à me demander des détails sur nos articles, nos offres en cours, ou à négocier les prix !',
      timestamp: new Date(),
    };
  };

  const handleAddToCartContext = (product, priceOverride = null) => {
    addToCart(product, 1, priceOverride);
    // Usually ShopContext opens drawer, but here we might want to ensure the LOCAL sidebar is open or just let the global one handle it?
    // Let's rely on global state. Since we are on Chat page, we show the chat sidebar which mimics the global cart.
    setShowChatSidebar(true);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.negotiatedPrice || item.price) * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    const orderMessage = {
      id: Date.now(),
      type: 'agent',
      text: `🎉 Merci ! Votre commande d'un montant de **$${calculateTotal().toFixed(2)}** a été validée avec succès. Vous recevrez les détails par email.`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, orderMessage]);
    // In a real app, clear cart or redirect
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 h-[calc(100vh-80px)] flex gap-6">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Chat Header */}
          <div className="bg-white border-b border-gray-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Assistant IA</h1>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm text-gray-500 font-medium">Toujours en ligne</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowChatSidebar(!showChatSidebar)}
              className="lg:hidden p-3 rounded-xl hover:bg-gray-50 text-gray-600 relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] lg:max-w-[70%] ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`message-bubble rounded-2xl p-5 shadow-sm ${message.type === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                      }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>

                    {/* Related Product in Message */}
                    {message.relatedProduct && (
                      <div className="mt-4 bg-gray-50 rounded-xl p-3 flex gap-3 items-center border border-gray-100">
                        <img src={message.relatedProduct.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                        <div>
                          <p className="font-bold text-gray-900">{message.relatedProduct.name}</p>
                          <p className="text-sm text-primary font-bold">${message.relatedProduct.price}</p>
                        </div>
                      </div>
                    )}

                    {/* Product Recommendations */}
                    {message.products && (
                      <div className="mt-4 grid gap-3">
                        {message.products.map((product) => (
                          <div key={product.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-primary/30 transition-colors">
                            <div className="flex gap-4">
                              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
                                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-primary">${product.price}</span>
                                  <button
                                    onClick={() => handleAddToCartContext(product)}
                                    className="px-3 py-1.5 bg-white text-primary text-xs font-bold border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-colors"
                                  >
                                    Ajouter
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 mt-2 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-2 items-center">
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white p-4 border-t border-gray-100">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-primary text-white p-3 rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary/25"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cart Sidebar (Desktop) - Synced with Global Cart */}
        <div className={`
          fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-96 lg:shadow-none lg:bg-transparent lg:flex lg:flex-col
          ${showChatSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="bg-white h-full lg:h-auto lg:rounded-3xl lg:border lg:border-gray-200 lg:shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Votre Panier
              </h2>
              <button onClick={() => setShowChatSidebar(false)} className="lg:hidden p-2 hover:bg-gray-50 rounded-lg text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-gray-500 font-medium">Votre panier est vide</p>
                  <p className="text-sm text-gray-400 mt-1">Commencez une discussion pour ajouter des articles</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-bold text-primary">${item.negotiatedPrice || item.price}</span>
                        {item.negotiatedPrice && item.negotiatedPrice < item.price && (
                          <span className="text-xs text-gray-400 line-through">${item.price}</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-50 text-gray-600">-</button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-50 text-gray-600">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-rose-500 font-medium hover:underline">
                          Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${calculateTotal().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Commander
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Overlay for mobile chat sidebar */}
      {showChatSidebar && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setShowChatSidebar(false)}
        />
      )}
    </div>
  );
};

export default Chat;

