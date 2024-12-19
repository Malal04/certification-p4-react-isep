# React + TypeScript + Vite + Tailwind + Axios + React Router + Docker

Stack de développement React moderne
Cette template offre une configuration complète pour démarrer rapidement un projet React avec les technologies les plus récentes et les plus performantes.

Technologies incluses

- React: Bibliothèque JavaScript pour la création d'interfaces utilisateur
- TypeScript: Superset typé de JavaScript pour un développement plus robuste
- Vite: Outil de build ultra-rapide pour un développement moderne
- Tailwind CSS: Framework CSS utility-first pour un design rapide et flexible
- Axios: Client HTTP basé sur les promesses pour le navigateur et Node.js
- React Router: Bibliothèque de routage pour React
- Docker: Plateforme de conteneurisation pour faciliter le déploiement

## Avantages de cette stack

- Performance optimale: Vite offre des temps de build et de rechargement extrêmement rapides.
- Typage fort: TypeScript améliore la maintenabilité et réduit les erreurs.
- Styling efficace: Tailwind CSS permet un développement rapide de l'interface utilisateur.
- Gestion d'état simplifiée: React Hooks pour une gestion d'état claire et concise.
- Requêtes API faciles: Axios simplifie les appels HTTP et la gestion des réponses.
- Navigation fluide: React Router pour une navigation côté client sans rechargement.
- Déploiement simplifié: Docker facilite la mise en production et la scalabilité.

## Cas d'utilisation idéaux
Cette stack est particulièrement adaptée pour :

- Applications web complexes et évolutives
- Projets nécessitant une performance élevée
- Équipes cherchant à maintenir un code propre et typé
- Startups visant un développement rapide et un déploiement facile

Avec cette configuration, vous disposez d'une base solide pour construire des applications web modernes, performantes et maintenables.

## Pour le lancer le projet pour la promière fois

```js
npm install
npm run dev
```

## Pour construire une image docker et lancer un container à partir de l'image

Assurer vous que vous avez Docker et que l'application est active
Pour construire l'image Docker, il faut se placer à la racine de projet et exécuter
```js
docker build -t react-isep-bootstrap . 
```

Pour lancer un container à partir de l'image précédement créer, il faut juste ouvrir un terminal sur la machine et exécuter
```js
docker run -d --name react-isep-bootstrap -p 81:80 react-isep-bootstrap 
```

L'application devrait être accessible sur le 
```
http://localhost:81 
```