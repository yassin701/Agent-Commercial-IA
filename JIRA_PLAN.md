# Jira Implementation Plan: Agent Commercial IA

## Epic
**Title:** Expérience Frontend
**Description:** Développer l’interface React incluant la page d’accueil, le catalogue produits, l’interface de chat, le panier latéral et le suivi de commande.

## User Story
**Title:** Interface de Chat Multilingue (React)
**Description:** En tant qu'utilisateur, je veux une interface de chat fluide qui supporte le français, l'anglais et l'arabe (RTL support).

### Sub-tasks to be Created
1.  **Chat UI Layout Implementation**
    *   Description: Create the main chat container and layout structure using React components. Ensure it fits within the application's overall design.
2.  **Chat Input Component**
    *   Description: Develop the input field for users to type messages, including a submit button and handling of enter key.
3.  **Message Bubble Components**
    *   Description: Create distinct visual components for user messages and agent responses. styling should differentiate the source clearly.
4.  **RTL/LTR Language Support**
    *   Description: Implement dynamic direction switching (LTR for English/French, RTL for Arabic) based on the selected language.
5.  **n8n Webhook Integration**
    *   Description: Set up the service to send user messages to the n8n webhook and handle the response stream/result.
