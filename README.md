# EcoRide

EcoRide est une startup française qui a pour objectif de réduire l'impact environnemental des déplacements en encourageant le covoiturage.
L’application web vise à devenir la plateforme principale pour les voyageurs soucieux de l'environnement et ceux cherchant une solution économique pour leurs trajets en voiture.

# Prérequis

Assurez-vous d’avoir les outils suivants installés sur votre machine :

Node.js >= 18
npm >= 9
PostgreSQL >= 14
MongoDB >= 6

Vérifiez avec :

node -v
npm -v
psql --version
mongo --version

Et n'oublier pas d'installer nodemon sur votre machine afin que le serveur se relance automatiquement à chaque sauvegarde réaliser après fait des changements.

Et nodemailer pour envoyer des emails.

Et bcryptjs → pour hasher et vérifier les mots de passe ;

jsonwebtoken → pour créer et vérifier les tokens JWT.

Via : npm install bcryptjs jsonwebtoken => Dans le dossier backend.

# Clonage et installation

git clone https://github.com/Johnny9874/EcoRide.git
cd ecoride-backend
npm install   # ou yarn install

# Configuration

Créez un fichier .env à la racine de ecoride-backend :

PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/ecoride
MONGO_URI=mongodb://localhost:27017/ecoride
JWT_SECRET=ma_cle_ultra_secrete

# Base de données SQL avec Prisma

Initialiser la base et générer le client Prisma :

npx prisma migrate dev --name init
npx prisma generate


# Insertion de données test (si seed.js présent) :

node seed.js

Vérifiez avec pgAdmin : Databases/ecoride/Schemas/public/Tables.

# Base de données NoSQL (MongoDB)

Créez un cluster sur MongoDB Atlas.
Récupérez l’URL de connexion et mettez-la dans .env.

# Installez les dépendances :

npm install mongoose dotenv

# Lancer le serveur MongoDB :

npm run dev


# Vérifiez l’insertion de données test dans Atlas.

Lancer le serveur
npm run dev

API disponible : http://localhost:3000/api

# API RESTful

# MongoDB (NoSQL) :

GET /api/users/ → liste des utilisateurs
GET /api/users/:id → un utilisateur précis
PUT /api/users/:id → modifier un utilisateur
POST /api/users/ → créer un utilisateur

Assurez-vous de mettre Content-Type: application/json dans les headers pour toutes les requêtes POST et PUT.

# PostgreSQL (SQL avec Prisma)

Ici, vous trouverez tout les endpoints CRUD des différente table: 

# carpools endpoint

GET /api/sql/carpools/ → liste des covoiturages <br>
GET /api/sql/carpools/:id → covoiturage spécifique <br>
POST /api/sql/carpools/ → créer un covoiturage <br>
PUT /api/sql/carpools/:id → modifier un covoiturage <br>
DELETE /api/sql/carpools/:id → supprimer un covoiturage <br>

# feedbacks endpoint

GET /api/sql/feedbacks/ → liste des feedbacks <br>
GET /api/sql/feedbacks/:id → feedbacks spécifique <br>
POST /api/sql/feedbacks/ → créer un feedbacks <br>
PUT /api/sql/feedbacks/:id → modifier un feedbacks <br>
DELETE /api/sql/feedbacks/:id → supprimer un feedbacks <br>

# preferences endpoint

GET /api/sql/preferences/ → liste des preferences <br>
GET /api/sql/preferences/:id → preferences spécifique <br>
POST /api/sql/preferences/ → créer une preferences <br>
PUT /api/sql/preferences/:id → modifier une preferences <br>
DELETE /api/sql/preferences/:id → supprimer une preferences <br>

# reservations endpoint

GET /api/sql/reservations/ → liste des reservations <br>
GET /api/sql/reservations/:id → reservation spécifique <br>
POST /api/sql/reservations/ → créer une reservation <br>
PUT /api/sql/reservations/:id → modifier une reservation <br>
DELETE /api/sql/reservations/:id → supprimer une reservation <br>

# users endpoint

GET /api/sql/users/ → liste des users <br>
GET /api/sql/users/:id → user spécifique <br>
POST /api/sql/users/ → créer un user <br>
PUT /api/sql/users/:id → modifier un user <br>
DELETE /api/sql/users/:id → supprimer un user <br>

# vehicles endpoint

GET /api/sql/vehicles/ → liste des vehicles <br>
GET /api/sql/vehicles/:id → vehicle spécifique <br>
POST /api/sql/vehicles/ → créer un vehicle <br>
PUT /api/sql/vehicles/:id → modifier un vehicle <br>
DELETE /api/sql/vehicles/:id → supprimer un vehicle <br>

# Relation entre table

Ici, vous pouvez visualisé les relations de chacune des tables présent dans ce projet.

# User

Peut posséder plusieurs Vehicles (User.id → Vehicle.ownerId)

Peut créer plusieurs Carpools (User.id → Carpool.driverId)

Peut avoir plusieurs Reservations (User.id → Reservation.userId)

Peut avoir plusieurs Preferences (User.id → Preference.driverId)

# Vehicle

Appartient à un User (Vehicle.ownerId → User.id)

Peut être utilisé pour plusieurs Carpools (Vehicle.id → Carpool.vehicleId)

# Carpool

Appartient à un User en tant que driver (Carpool.driverId → User.id)

Utilise un Vehicle (Carpool.vehicleId → Vehicle.id)

Peut avoir plusieurs Reservations (Carpool.id → Reservation.carpoolId)

# Reservation

Appartient à un User (Reservation.userId → User.id)

Liée à un Carpool (Reservation.carpoolId → Carpool.id)

Peut avoir un Feedback (Reservation.id → Feedback.reservationId)

# Feedback

Appartient à une Reservation (Feedback.reservationId → Reservation.id)

# Preference

Appartient à un User (Preference.driverId → User.id)

# Workflow Git recommandé

Travailler sur dev :

git checkout dev

.modifier README.md

git add README.md
git commit -m "Update README"
git push origin dev


Merger vers main après validation :

git checkout main
git merge dev
git push origin main

Toujours faire les changements sur dev, tester, puis fusionner vers main pour garder la branche principale stable.

# Bonnes pratiques

Ne pas commiter les fichiers sensibles (.env, node_modules).

Vérifier les migrations Prisma avant de merger.

Toujours tester les endpoints API via Postman ou un outil similaire.

# 💡 Astuce : pour visualiser les PDF dans VS Code, installer l’extension PDF Preview.