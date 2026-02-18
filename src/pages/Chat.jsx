import { useState, useEffect, useRef } from 'react';
import { Send, ShoppingBag, X, Globe, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: 'Bonjour ! Bienvenue sur Souk Digital. Je suis votre agent commercial IA. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  ];

  useEffect(() => {
    // Scroll to bottom when new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Animate chat container
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      gsap.fromTo('.chat-container',
        { y: 20 },
        { y: 0, duration: 0.6 }
      );
    }
  }, []);

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

    // Simulate API call to n8n webhook
    try {
      // In production, this would call your n8n webhook
      // const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: inputMessage, language, cart }),
      // });
      // const data = await response.json();

      // Mock response for demo
      setTimeout(() => {
        const agentResponse = generateMockResponse(inputMessage);
        setMessages(prev => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const generateMockResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('produit') || lowerMessage.includes('product')) {
      return {
        id: Date.now(),
        type: 'agent',
        text: 'Voici quelques produits qui pourraient vous intéresser :',
        timestamp: new Date(),
        products: [
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
        ],
      };
    }
    
    if (lowerMessage.includes('prix') || lowerMessage.includes('price') || lowerMessage.includes('réduction')) {
      return {
        id: Date.now(),
        type: 'agent',
        text: 'Je peux vous proposer une réduction de 10% sur votre commande ! Que pensez-vous de cette offre ?',
        timestamp: new Date(),
      };
    }

    if (lowerMessage.includes('commande') || lowerMessage.includes('order') || lowerMessage.includes('panier')) {
      return {
        id: Date.now(),
        type: 'agent',
        text: 'Parfait ! Voulez-vous que je finalise votre commande ? Je peux vous proposer une réduction supplémentaire de 5% si vous confirmez maintenant.',
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now(),
      type: 'agent',
      text: 'Je comprends. Pouvez-vous me donner plus de détails sur ce que vous recherchez ? Je suis là pour vous aider à trouver les meilleurs produits au meilleur prix.',
      timestamp: new Date(),
    };
  };

  const handleAddToCart = (product, negotiatedPrice = null) => {
    const cartItem = {
      ...product,
      negotiatedPrice: negotiatedPrice || product.price,
      quantity: 1,
    };
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, cartItem];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
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
      text: `Excellent ! Votre commande a été confirmée. Total : $${calculateTotal().toFixed(2)}. Vous recevrez un email de confirmation sous peu. Merci pour votre confiance !`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, orderMessage]);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-accent">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Chat avec l'Agent IA</h1>
            <p className="text-gray-600">Négociez et achetez avec notre agent commercial intelligent</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Section */}
            <div className="lg:col-span-2">
              <div className="chat-container bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[700px] border border-gray-200">
                {/* Chat Header */}
                <div className="bg-primary text-white px-6 py-4" style={{ backgroundColor: '#1a5f3f' }}>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1a5f3f' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white leading-tight">Agent Commercial IA</h3>
                      <p className="text-sm text-white flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>En ligne</span>
                        <span className="text-white/70">•</span>
                        <span className="text-white/90">Répond instantanément</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        {message.products && (
                          <div className="mt-4 grid grid-cols-1 gap-4">
                            {message.products.map((product) => (
                              <div key={product.id} className="bg-white rounded-lg p-4">
                                <div className="flex gap-4">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                                    <p className="text-sm text-gray-600">{product.category}</p>
                                    <p className="text-lg font-bold text-primary mt-2">
                                      ${product.price.toFixed(2)}
                                    </p>
                                    <button
                                      onClick={() => handleAddToCart(product)}
                                      className="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors"
                                    >
                                      Ajouter au panier
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <span className="text-xs text-gray-500 mt-2 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Tapez votre message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Sidebar */}
            <div className={`lg:col-span-1 ${showCart ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Panier</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="lg:hidden p-1 hover:bg-accent rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Votre panier est vide</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-accent rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-600">{item.category}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div>
                                {item.negotiatedPrice !== item.price ? (
                                  <>
                                    <span className="text-sm font-bold text-primary">
                                      ${item.negotiatedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xs text-gray-400 line-through ml-2">
                                      ${item.price.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-sm font-bold text-primary">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                                >
                                  -
                                </button>
                                <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-xs text-red-600 hover:text-red-700 mt-1"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-primary">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Confirmer la commande
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;

