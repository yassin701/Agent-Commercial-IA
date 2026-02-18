import { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock order data
  const mockOrder = {
    id: 'ORD-2024-001234',
    email: 'client@example.com',
    status: 'shipped',
    statusHistory: [
      { status: 'confirmed', date: '2024-01-15T10:00:00', label: 'Commande confirmée' },
      { status: 'processing', date: '2024-01-15T14:30:00', label: 'En traitement' },
      { status: 'shipped', date: '2024-01-16T09:00:00', label: 'Expédiée' },
      { status: 'delivered', date: null, label: 'Livrée' },
    ],
    items: [
      {
        id: 1,
        name: 'Green Detox Elixir',
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=100&h=100&fit=crop',
        price: 8.50,
        quantity: 2,
      },
      {
        id: 2,
        name: 'Berry Blast Energy',
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=100&h=100&fit=crop',
        price: 9.00,
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: 'Ahmed Benali',
      street: '123 Rue Mohammed V',
      city: 'Casablanca',
      postalCode: '20000',
      country: 'Maroc',
    },
    total: 26.00,
    shippingDate: '2024-01-16',
    estimatedDelivery: '2024-01-20',
  };

  useEffect(() => {
    // Animate page elements
    const trackForm = document.querySelector('.track-form');
    if (trackForm) {
      gsap.fromTo('.track-form',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderNumber || !email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In production, this would call your n8n webhook to fetch order from Google Sheets
      // const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ orderNumber, email }),
      // });
      // const data = await response.json();

      if (orderNumber === 'ORD-2024-001234' && email === 'client@example.com') {
        setOrder(mockOrder);
        // Animate order details after state update
        setTimeout(() => {
          const orderDetails = document.querySelector('.order-details');
          if (orderDetails) {
            gsap.fromTo('.order-details',
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
            );
          }
        }, 0);
      } else {
        alert('Commande non trouvée. Veuillez vérifier votre numéro de commande et votre email.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status, currentStatus) => {
    const statusOrder = ['confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    if (statusIndex < currentIndex) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (statusIndex === currentIndex) {
      return <Clock className="w-6 h-6 text-primary animate-pulse" />;
    } else {
      return <div className="w-6 h-6 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status, currentStatus) => {
    const statusOrder = ['confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    if (statusIndex < currentIndex) {
      return 'text-green-600';
    } else if (statusIndex === currentIndex) {
      return 'text-primary';
    } else {
      return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Title */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Suivi de Commande</h1>
          <nav className="text-gray-600">
            <span>Accueil</span> / <span className="text-primary">Suivi de Commande</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search Form */}
          {!order && (
            <div className="track-form bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rechercher votre commande</h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de référence
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="ORD-2024-001234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  <Search className="w-5 h-5" />
                  {isLoading ? 'Recherche...' : 'Rechercher la commande'}
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-4 text-center">
                <strong>Démo:</strong> Utilisez "ORD-2024-001234" et "client@example.com"
              </p>
            </div>
          )}

          {/* Order Details */}
          {order && (
            <div className="order-details space-y-6">
              {/* Order Status Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Statut de la commande</h2>
                <div className="relative">
                  {order.statusHistory.map((historyItem, index) => (
                    <div key={index} className="flex gap-4 mb-6 last:mb-0">
                      <div className="flex-shrink-0">
                        {getStatusIcon(historyItem.status, order.status)}
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-gray-200 last:border-0">
                        <div className="ml-4">
                          <h3 className={`font-semibold ${getStatusColor(historyItem.status, order.status)}`}>
                            {historyItem.label}
                          </h3>
                          {historyItem.date && (
                            <p className="text-sm text-gray-600 mt-1">
                              {new Date(historyItem.date).toLocaleString('fr-FR')}
                            </p>
                          )}
                          {historyItem.status === 'shipped' && (
                            <p className="text-sm text-gray-600 mt-2">
                              <strong>Date d'expédition:</strong> {new Date(order.shippingDate).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                          {historyItem.status === 'delivered' && !historyItem.date && (
                            <p className="text-sm text-gray-600 mt-2">
                              <strong>Livraison estimée:</strong> {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails de la commande</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Numéro de commande:</span>
                    <span className="font-semibold">{order.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date de commande:</span>
                    <span className="font-semibold">
                      {new Date(order.statusHistory[0].date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Articles</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                          <p className="text-lg font-bold text-primary mt-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t mt-6 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Adresse de livraison</h2>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.postalCode} {order.shippingAddress.city}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Search Again */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setOrder(null);
                    setOrderNumber('');
                    setEmail('');
                  }}
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Rechercher une autre commande
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackOrder;

