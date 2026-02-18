# Guide de Démarrage Rapide

## Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   - L'application sera disponible sur `http://localhost:5173`

## Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.jsx      # En-tête avec navigation responsive
│   ├── Footer.jsx      # Pied de page avec liens
│   ├── ProductCard.jsx # Carte produit avec animations
│   └── FilterSidebar.jsx # Barre latérale de filtres
├── pages/              # Pages de l'application
│   ├── Home.jsx        # Page d'accueil avec hero section
│   ├── Shop.jsx        # Catalogue produits avec filtres
│   ├── Chat.jsx        # Interface de chat avec agent IA
│   └── TrackOrder.jsx  # Suivi de commande avec timeline
├── App.jsx             # Routing principal
└── main.jsx            # Point d'entrée React
```

## Fonctionnalités Principales

### 🏠 Page d'Accueil
- Section hero animée avec GSAP
- Produits phares en grille
- Section services (Livraison, Paiement, Support)

### 🛍️ Catalogue Produits
- Grille responsive de produits
- Barre de recherche en temps réel
- Filtres avancés (catégorie, prix, note, disponibilité)
- Tri des produits
- Pagination

### 💬 Interface de Chat
- Conversation avec l'agent IA
- Panier latéral avec prix négociés
- Support multilingue (FR, EN, AR)
- Intégration de produits dans la conversation
- Animations de messages

### 📦 Suivi de Commande
- Recherche par référence et email
- Timeline visuelle du statut
- Détails complets de la commande
- Adresse de livraison

## Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.js` :
- Primary: `#1a5f3f` (Vert foncé)
- Secondary: `#d4a574` (Beige)
- Accent: `#f5f1eb` (Beige clair)

### Animations GSAP
Les animations sont configurées dans chaque composant. Pour désactiver :
- Retirer les imports `gsap` et `ScrollTrigger`
- Supprimer les appels `gsap.from()` et `gsap.to()`

## Intégration n8n

Pour connecter l'application à n8n :

1. **Créer un workflow n8n**
   - Ajouter un nœud Webhook (POST)
   - Configurer l'URL : `/webhook/chat`

2. **Intégrer Google Sheets**
   - Ajouter un nœud Google Sheets
   - Configurer la lecture/écriture des produits

3. **Intégrer Gemini API**
   - Ajouter un nœud HTTP Request
   - Configurer l'appel à l'API Gemini

4. **Mettre à jour l'URL dans Chat.jsx**
   ```javascript
   const response = await fetch('VOTRE_URL_N8N_WEBHOOK', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message, language, cart }),
   });
   ```

## Déploiement

### Build de production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

### Déployer sur Vercel/Netlify
1. Connecter votre repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

## Support

Pour toute question ou problème :
- Vérifier la console du navigateur pour les erreurs
- Vérifier que toutes les dépendances sont installées
- S'assurer que le port 5173 n'est pas utilisé

