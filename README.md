# EcoRide

EcoRide est une startup française qui vise à réduire l'impact environnemental des déplacements en encourageant le covoiturage.
Cette application web permet aux voyageurs soucieux de l'environnement de trouver des trajets économiques et pratiques.

# 🔗 Clonage et installation

git clone https://github.com/Johnny9874/EcoRide.git
cd ecoride-backend
npm install   # ou yarn install si vous utilisez Yarn

# 📌 Prérequis

Avant de lancer le projet localement, assurez-vous d’avoir installé sur votre machine :

Node.js >= 18 – environnement d’exécution pour JavaScript côté serveur (permet à votre ordinateur d’exécuter le back-end).
Vérifier : node -v

npm >= 9 – gestionnaire de modules pour Node.js (permet d’installer des librairies ou outils additionnels).
Vérifier : npm -v

PostgreSQL >= 14 – base de données relationnelle, stocke vos données structurées en tables.
Vérifier : psql --version

MongoDB >= 6 – base de données NoSQL, plus flexible pour stocker des documents JSON.
Vérifier : mongo --version

# Modules supplémentaires à installer globalement ou dans le backend :

npm install -g nodemon
npm install bcryptjs jsonwebtoken nodemailer

- nodemon → relance automatiquement le serveur dès qu’un fichier est modifié, pratique en développement.

- bcryptjs → permet de hasher les mots de passe pour les stocker de façon sécurisée.

## 🔒 Hasher les mots de passe

    Qu’est-ce que “hasher” un mot de passe ?
    Hasher un mot de passe signifie transformer le mot de passe en une suite de caractères unique, appelée hash, qui ne peut pas être facilement inversée.
    L’idée : même si quelqu’un vole la base de données, il ne pourra pas retrouver les mots de passe originaux.

    Exemple concret :

    Mot de passe : MonSuperMotDePasse123

    Hash généré par bcrypt : $2a$10$e0MYzXyjpJS7Pd0RVvHwHeFxkRjKf1Eo2O/OTa7e1x0zEoFJfQ5G6

    Chaque hash est unique et très difficile à déchiffrer. Quand un utilisateur se connecte :

    Il saisit son mot de passe.

    L’application hashe ce mot de passe avec le même algorithme.

    Le hash généré est comparé avec celui stocké dans la base.

    Si ça correspond, l’utilisateur est authentifié.

    Hasher n’est pas chiffrer : on ne peut pas retrouver le mot de passe original à partir du hash.

- jsonwebtoken (JWT) → permet de créer des tokens pour authentifier les utilisateurs.

## 🔑 Token (JWT) et authentification

    Qu’est-ce qu’un token ?
    Un token est une clé numérique que le serveur donne à un utilisateur après qu’il s’est connecté correctement.
    Cette clé permet à l’utilisateur de prouver qu’il est authentifié lors de ses prochaines requêtes, sans renvoyer son mot de passe à chaque fois.

    JWT (JSON Web Token) :

    Contient des informations comme l’ID de l’utilisateur, son rôle, ou la date d’expiration.

    Est signé avec une clé secrète (JWT_SECRET) pour que le serveur puisse vérifier qu’il n’a pas été modifié.

    Exemple :

    JWT généré :

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJ1c2VySWQiOiIxMjM0NTYiLCJyb2xlIjoiVVNFUiIsImV4cCI6MTY4NzUxMjAwMH0.
    H0fFh6b3tC-sW1g8lG9u5fKjT0lN5pIox5f8Pfg1gHo


    La première partie → en-tête

    La deuxième partie → payload (données de l’utilisateur)

    La troisième partie → signature (permet de vérifier que le token est authentique)

    Comment ça sert à authentifier ?

    L’utilisateur se connecte avec son email et mot de passe.

    Le serveur vérifie le mot de passe (hash).

    Le serveur envoie un token JWT au client.

    Pour toutes les prochaines requêtes, le client envoie ce token dans les headers.

    Le serveur vérifie le token et permet ou refuse l’accès aux ressources.

    Avantage : pas besoin de stocker de session côté serveur, tout est sécurisé via le token.

- nodemailer → permet d’envoyer des emails depuis votre application.

# ⚙️ Configuration

Créez un fichier .env à la racine de ecoride-backend :

DATABASE_URL=postgresql://user:password@localhost:5432/ecoride
MONGO_URI=mongodb://localhost:27017/ecoride
JWT_SECRET=ma_cle_ultra_secrete


DATABASE_URL → URL de connexion à votre base PostgreSQL.

MONGO_URI → URL de connexion à votre base MongoDB.

JWT_SECRET → clé secrète utilisée pour générer et vérifier les tokens JWT.

💡 Pour tester avec vos bases hébergées (Render et MongoDB Atlas), remplacez DATABASE_URL et MONGO_URI par leurs URLs correspondantes.

# 🗄️ Base de données SQL (PostgreSQL avec Prisma)

Prisma → ORM (Object-Relational Mapping) qui traduit les requêtes de votre code en instructions SQL pour PostgreSQL.

Initialiser la base et générer le client Prisma :

npx prisma migrate dev --name init
npx prisma generate --schema=prisma/schema.prisma


seed.js (si présent) → script pour insérer des données de test automatiquement.

node seed.js

Vérification via pgAdmin : Databases → ecoride → Schemas → public → Tables.

# 🗄️ Base de données NoSQL (MongoDB)

Créez un cluster sur MongoDB Atlas ou utilisez votre Mongo local.

Ajoutez l’URL de connexion dans .env.

Installez les dépendances MongoDB si nécessaire :

npm install mongoose dotenv


Mongoose → bibliothèque qui facilite la connexion et la manipulation de MongoDB depuis Node.js.

# ▶️ Lancer le serveur

npm run dev   # pour le développement avec nodemon
npm start     # pour la production


L’API sera disponible : http://localhost:3000/api

Live URL front-end : https://ecoride-1-rdi9.onrender.com

Live URL back-end : https://ecoride-43lc.onrender.com

# 🧩 Endpoints API

MongoDB (NoSQL)

GET	/api/users/	  =>  Liste des utilisateurs
GET	/api/users/:id	=>  Détail d’un utilisateur
POST	/api/users/	=>  Créer un utilisateur
PUT	/api/users/:id	=>  Modifier un utilisateur

PostgreSQL (SQL avec Prisma)

GET	/api/sql/carpools/	=>  Liste des covoiturages
GET	/api/sql/carpools/:id	=>  Détail d’un covoiturage
POST	/api/sql/carpools/	=>  Créer un covoiturage
PUT	/api/sql/carpools/:id	=>  Modifier un covoiturage
DELETE	/api/sql/carpools/:id	=>  Supprimer un covoiturage

Même structure pour feedbacks, preferences, reservations, users, vehicles.

# Exemples de requêtes avec Postman

GET http://localhost:3000/api/users/

POST http://localhost:3000/api/sql/carpools/
Body JSON: { "driverId": 1, "vehicleId": 2, "departure": "Paris", "arrival": "Lyon" }

Attention à bien mettre content-type et application/json dans postman sinon ça ne marchera pas !

# 🔗 Relations entre tables

User → possède plusieurs Vehicles, Carpools, Reservations, Preferences.

Vehicle → appartient à un User, utilisé dans plusieurs Carpools.

Carpool → appartient à un User (driver), utilise un Vehicle, contient plusieurs Reservations.

Reservation → appartient à un User, lié à un Carpool, peut avoir un Feedback.

Feedback → appartient à une Reservation.

Preference → appartient à un User.

# 🌱 Git Workflow recommandé

Travailler sur dev :

git checkout dev
# modifier README.md ou fonctionnalités
git add .
git commit -m "Message de commit"
git push origin dev


Merge vers main après tests :

git checkout main
git merge dev
git push origin main

# 📑 Bonnes pratiques

Ne pas commiter les fichiers sensibles (.env, node_modules).

Vérifier les migrations Prisma avant merge.

Toujours tester les endpoints API via Postman ou un outil similaire.

# 💡 Astuce : 

Afin de visualiser des PDF dans VS Code, installer l’extension PDF Preview.
Screenshots des maquettes front-end et mobile peuvent être ajoutés ici ou dans un dossier /docs ou /livrable à la racine du projet.