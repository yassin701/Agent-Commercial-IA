# Agent Commercial IA - Souk Digitall

Une plateforme complète d'agent commercial IA pour le e-commerce, transposant l'âme du souk marocain traditionnel dans le monde numérique.

## 🚀 Fonctionnalités

- **Agent Conversationnel IA** : Négociation en langage naturel en français, anglais et arabe
- **Gestion du Catalogue Produits** : Recherche en temps réel et vérification de la disponibilité
- **Moteur de Négociation Intelligent** : Négociation automatisée des prix avec règles métier configurables
- **Traitement des Commandes** : Gestion complète des commandes, du panier à la confirmation
- **Support Multilingue** : Détection automatique de la langue et basculement fluide
- **Notifications Automatisées** : Emails de confirmation, factures et mises à jour d'expédition

## 🛠️ Stack Technique

- **React.js** : Framework frontend
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Framework CSS utilitaire
- **Lucide React** : Bibliothèque d'icônes
- **GSAP** : Animations avancées
- **React Router** : Navigation SPA

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 🏗️ Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── Header.jsx      # En-tête avec navigation
│   ├── Footer.jsx      # Pied de page
│   ├── ProductCard.jsx # Carte produit
│   └── FilterSidebar.jsx # Barre latérale de filtres
├── pages/              # Pages de l'application
│   ├── Home.jsx        # Page d'accueil
│   ├── Shop.jsx        # Catalogue produits
│   ├── Chat.jsx        # Interface de chat avec l'agent IA
│   └── TrackOrder.jsx  # Suivi de commande
├── App.jsx             # Composant principal avec routing
└── main.jsx            # Point d'entrée
```

## 🔌 Intégration n8n

Pour connecter l'application à n8n et Google Sheets :

1. Créer un workflow n8n avec un webhook POST `/chat`
2. Configurer l'intégration Google Sheets pour lire/écrire les données
3. Intégrer l'API Gemini pour les réponses IA
4. Configurer Gmail/SMTP pour les notifications

### Exemple de webhook n8n

```javascript
// Dans votre workflow n8n, le webhook doit accepter :
{
  "message": "string",
  "language": "fr|en|ar",
  "cart": [...],
  "productId": "number (optional)"
}

// Et retourner :
{
  "response": "string",
  "products": [...],
  "suggestions": [...]
}
```

## 🎨 Design

Le design s'inspire des souks marocains avec :
- Palette de couleurs : Vert foncé (#1a5f3f) et beige (#d4a574)
- Interface moderne et professionnelle
- Animations fluides avec GSAP
- Responsive design pour mobile et desktop

## 📱 Pages

### Page d'Accueil
- Section hero avec présentation du concept
- Produits phares
- Services (Livraison, Paiement, Support)

### Catalogue Produits
- Grille responsive de produits
- Barre de recherche
- Filtres avancés (catégorie, prix, note, disponibilité)
- Tri des produits

### Interface de Chat
- Fenêtre de conversation avec l'agent IA
- Panier latéral avec prix négociés
- Intégration de produits dans la conversation
- Support multilingue

### Suivi de Commande
- Formulaire de recherche par référence et email
- Timeline visuelle du statut
- Détails complets de la commande

## 🔐 Configuration

### Variables d'environnement

Créer un fichier `.env` :

```env
VITE_N8N_WEBHOOK_URL=https://votre-n8n-instance.com/webhook/chat
VITE_GOOGLE_SHEETS_ID=votre-sheet-id
```

## 📝 Notes

- Les données de produits sont actuellement mockées pour la démo
- L'intégration n8n doit être configurée pour la production
- Les images utilisent Unsplash pour la démo
- Le support multilingue nécessite une configuration supplémentaire dans n8n

## 🚧 Prochaines Étapes

- [ ] Intégration complète avec n8n
- [ ] Connexion à Google Sheets
- [ ] Configuration de l'API Gemini
- [ ] Tests end-to-end
- [ ] Optimisation des performances
- [ ] SEO et meta tags

## 📄 Licence

Ce projet est développé pour Souk Digital.
