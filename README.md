# EcoRide

La startup "EcoRide" fraichement crée en France, a pour objectif de réduire l'impact environnemental des déplacements en encourageant le covoiturage. 
EcoRide prône une approche écologique et souhaite se faire connaître au travers d’un projet porté par José, le directeur technique, d’une application web.

L’ambition "EcoRide" est de devenir la principale plateforme de covoiturage pour les voyageurs soucieux de l'environnement et ceux qui recherchent une solution économique pour leurs déplacements. 
Il est important à souligner que la plateforme de covoiturage doit gérer uniquement les déplacements en voitures.

# Afin de déployer l'application en local veuillez suivre ces démarches ci-dessous :

✅ Prérequis
Assurez-vous d’avoir les outils suivants installés sur votre machine :
    • Node.js : version 18 ou plus
    • npm : version 9 ou plus
    • PostgreSQL : version 14 ou plus
    • MongoDB : version 6 ou plus

Vérifiez les installations avec les commandes suivantes :

node -v
npm -v
psql --version
mongo --version

🔄 Clonage du projet

git clone https://github.com/Johnny9874/EcoRide.git
cd ecoride-backend
npm install ou yarn install

Assurez-vous de vous situer dans le dossier ecoride-backend avant d’installer les dépendances.

🔐 Configuration du fichier .env

Créez un fichier .env à la racine d'ecoride-backend avec ce contenu :

PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/ecoride
MONGO_URI=mongodb://localhost:27017/ecoride
JWT_SECRET=ma_cle_ultra_secrete

🧬 Configuration de PostgreSQL avec Prisma

Initialisez la base de données avec :

npx prisma migrate dev --name init
npx prisma generate

💡 La base de données sera automatiquement peuplée si un fichier seed.ts est prévu.

📦 Lancement du serveur et configuration MongoDB

Lancez le serveur en développement avec :

npm run dev

ou si vous utilisez nodemon :

npx nodemon server.js

L’API sera disponible à l’adresse :

http://localhost:3000/api

Pour tester l’API, vous pouvez utiliser Postman.
🛠️ Outils pour le développement local des bases de données :
    • PostgreSQL : pgAdmin
    • MongoDB : MongoDB Compass

# Création de la base de donnée SQL et insértion de donnée test

Afin de crée la base de donnée installer postgreSQL comme précisé en haut, installer également pgAdmin 4 afin de mieux visualiser les tables et les données inséré.

Faites click droit sur Databases et selectionner Create et Database...

Laisser PostgreSQL en tant qu'user, et nommé la base ecoride.

Puis dans EcoRide/prisma/schema.prisma, vous pouvez voir les différent modèle assigné à chaque table de notre base postgreSQL. 

Dès que l'on a fini de définir nos modèles : on peut exécuter npx prisma migrate dev --name "nom décrivant la migration réalisé" pour migrer nos modèle et npx prisma generate pour générer un nouveau client Prisma servant a intéragir avec les tables de notre base de donnée depuis notre code.

Un dossier migrations sera alors crée avec à l'intérieur toutes nos migrations réalisé avec succès. Ce sont des fichiers SQL contenant les scripts visant à généré nos tables postgreSQL.

Maintenant que nos modèles ont été migré vers notre base de données postgreSQL, vous pouvez vérifier depuis pgAdmin 4 en allant dans Databases/ecoride/Schemas/public/Tables et vous y trouverai toutes nos tables.

Passons maintenant à l'insertion de donnée test pour s'assurer que tout fonctionne, j'ai crée un fichier seed.js dans ecoride/ecoride-backend/src/db/prisma.

Ce fichier importe notre client Prisma nous permettant d'intéragir avec notre bdd depuis notre code et on stock cette connexion au client dans une constance prisma.

Puis on déclare une fonction main() asynchronne qui contient l'insertion de donnée dans chaque table crée précédement sous forme d'objet.

On appelle ensuite cette fonction en fessant attention à bien gérer les potentiel ereur avec la méthode catch().

Afin d'exécuter ce fichier et voir si l'insertion à marcher, exécuter : 

node seed.js 

Assurez vous de faire ceci avant : 

cd EcoRide\ecoride-backend\src\db\prisma

Et vous pourrez par la suite retourner sur pgAdmin 4, Databases/ecoride/Schemas/public/Tables et clique droit sur une des tables, View/Edit Data, All Rows et vous pourrez voir que les données test ajouté depuis seed.js ont bien été inséré dans leur tables respectif dans la section Data Output !

# Création de la base de donnée NoSQL et insertion de donnée test 

Pour la partie NoSQL, je pars sur le cloud MongoDB Atlas avec Mongoose en tant qu'ODM. 

On commence par crée un clusters puis on nomme le cluster ecoride puis on récupére l'URL de connection depuis Atlas et on la stock dans une variable dans le fichier .env ! 

On installe ensuite notre ODM depuis ecoride-backend en exécutant cette commande : 

npm install mongoose

Installer également le module dotenv a la racine du projet afin de charger vos variable d'environnement.

Puis importé ce module dans un fichier responsable de la connection a la base de donnée MongoDB et charger vos variables d'environnement depuis ce fichier via 

dotenv.config(); 

Faites également attention a bien rajouter "type": "module", dans package.json et 

"scripts": {
    "dev": "nodemon ecoride-backend/src/db/mongoose/index.js"
  }

Dès que c'est bon exécuter npm run dev depuis la racine (ou se trouve votre package.json) et vous aurez le message suivant : MongoDB Atlas connecté !

Afin de vérifier si l'insertion de donnée test fonctionne, j'ai crée un fichier un modèle appelé User.js qui crée une collection appelé users avec plusieurs champ tel que id, email, pseudo, role, credits, createdAt.

Puis dans index.js, j'ai initalisé une fonction anonyme qui attends que la connection a la base de donnée soit faites pour ensuite initialiser un nouveau user sous forme d'objet via le modèle User qu'on a importé au debut du fichier index.js.

On y entre un email et un pseudo et on utilise un try/catch pour gerer les potentiel erreur lors de l'insertion et on ferme le process après insertion.

Et si on retourne sur Atlas, vous verrez : 

{"_id":{"$oid":"68949ff3634597bebed0183c"},"email":"test@example.com","pseudo":"TestUser","role":"USER","credits":{"$numberInt":"20"},"createdAt":{"$date":{"$numberLong":"1754570739329"}},"__v":{"$numberInt":"0"}}

Ainsi l'insertion de donnée test sur Atlas a été un succès.
# PS

Si vous souhaitez visualiser les fichiers PDF depuis votre éditeur de code en l'occurence VisualStudio Code, il va falloir installer l'extension "PDF Preview" d'analyticsignal.com !

# Afin de déployer l'application en local veuillez suivre ces démarches ci-dessous :

✅ Prérequis
Assurez-vous d’avoir les outils suivants installés sur votre machine :
    • Node.js : version 18 ou plus
    • npm : version 9 ou plus
    • PostgreSQL : version 14 ou plus
    • MongoDB : version 6 ou plus

Vérifiez les installations avec les commandes suivantes :

node -v
npm -v
psql --version
mongo --version

🔄 Clonage du projet

git clone https://github.com/Johnny9874/EcoRide.git
cd ecoride-backend
npm install ou yarn install

Assurez-vous de vous situer dans le dossier ecoride-backend avant d’installer les dépendances.

🔐 Configuration du fichier .env

Créez un fichier .env à la racine d'ecoride-backend avec ce contenu :

PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/ecoride
MONGO_URI=mongodb://localhost:27017/ecoride
JWT_SECRET=ma_cle_ultra_secrete

🧬 Configuration de PostgreSQL avec Prisma

Initialisez la base de données avec :

npx prisma migrate dev --name init
npx prisma generate

💡 La base de données sera automatiquement peuplée si un fichier seed.ts est prévu.

📦 Lancement du serveur et configuration MongoDB

Lancez le serveur en développement avec :

npm run dev

ou si vous utilisez nodemon :

npx nodemon server.js

L’API sera disponible à l’adresse :

http://localhost:3000/api

Pour tester l’API, vous pouvez utiliser Postman.
🛠️ Outils pour le développement local des bases de données :
    • PostgreSQL : pgAdmin
    • MongoDB : MongoDB Compass

# Création de la base de donnée SQL et insértion de donnée test

Afin de crée la base de donnée installer postgreSQL comme précisé en haut, installer également pgAdmin 4 afin de mieux visualiser les tables et les données inséré.

Faites click droit sur Databases et selectionner Create et Database...

Laisser PostgreSQL en tant qu'user, et nommé la base ecoride.

Puis dans EcoRide/prisma/schema.prisma, vous pouvez voir les différent modèle assigné à chaque table de notre base postgreSQL. 

Dès que l'on a fini de définir nos modèles : on peut exécuter npx prisma migrate dev --name "nom décrivant la migration réalisé" pour migrer nos modèle et npx prisma generate pour générer un nouveau client Prisma servant a intéragir avec les tables de notre base de donnée depuis notre code.

Un dossier migrations sera alors crée avec à l'intérieur toutes nos migrations réalisé avec succès. Ce sont des fichiers SQL contenant les scripts visant à généré nos tables postgreSQL.

Maintenant que nos modèles ont été migré vers notre base de données postgreSQL, vous pouvez vérifier depuis pgAdmin 4 en allant dans Databases/ecoride/Schemas/public/Tables et vous y trouverai toutes nos tables.

Passons maintenant à l'insertion de donnée test pour s'assurer que tout fonctionne, j'ai crée un fichier seed.js dans ecoride/ecoride-backend/src/db/prisma.

Ce fichier importe notre client Prisma nous permettant d'intéragir avec notre bdd depuis notre code et on stock cette connexion au client dans une constance prisma.

Puis on déclare une fonction main() asynchronne qui contient l'insertion de donnée dans chaque table crée précédement sous forme d'objet.

On appelle ensuite cette fonction en fessant attention à bien gérer les potentiel ereur avec la méthode catch().

Afin d'exécuter ce fichier et voir si l'insertion à marcher, exécuter : 

node seed.js 

Assurez vous de faire ceci avant : 

cd EcoRide\ecoride-backend\src\db\prisma

Et vous pourrez par la suite retourner sur pgAdmin 4, Databases/ecoride/Schemas/public/Tables et clique droit sur une des tables, View/Edit Data, All Rows et vous pourrez voir que les données test ajouté depuis seed.js ont bien été inséré dans leur tables respectif dans la section Data Output !

# Création de la base de donnée NoSQL et insertion de donnée test 

Pour la partie NoSQL, je pars sur le cloud MongoDB Atlas avec Mongoose en tant qu'ODM. 

On commence par crée un clusters puis on nomme le cluster ecoride puis on récupére l'URL de connection depuis Atlas et on la stock dans une variable dans le fichier .env ! 

On installe ensuite notre ODM depuis ecoride-backend en exécutant cette commande : 

npm install mongoose

Installer également le module dotenv a la racine du projet afin de charger vos variable d'environnement.

Puis importé ce module dans un fichier responsable de la connection a la base de donnée MongoDB et charger vos variables d'environnement depuis ce fichier via 

dotenv.config(); 

Faites également attention a bien rajouter "type": "module", dans package.json et 

"scripts": {
    "dev": "nodemon ecoride-backend/src/db/mongoose/index.js"
  }

Dès que c'est bon exécuter npm run dev depuis la racine (ou se trouve votre package.json) et vous aurez le message suivant : MongoDB Atlas connecté !

Afin de vérifier si l'insertion de donnée test fonctionne, j'ai crée un fichier un modèle appelé User.js qui crée une collection appelé users avec plusieurs champ tel que id, email, pseudo, role, credits, createdAt.

Puis dans index.js, j'ai initalisé une fonction anonyme qui attends que la connection a la base de donnée soit faites pour ensuite initialiser un nouveau user sous forme d'objet via le modèle User qu'on a importé au debut du fichier index.js.

On y entre un email et un pseudo et on utilise un try/catch pour gerer les potentiel erreur lors de l'insertion et on ferme le process après insertion.

Et si on retourne sur Atlas, vous verrez : 

{"_id":{"$oid":"68949ff3634597bebed0183c"},"email":"test@example.com","pseudo":"TestUser","role":"USER","credits":{"$numberInt":"20"},"createdAt":{"$date":{"$numberLong":"1754570739329"}},"__v":{"$numberInt":"0"}}

Ainsi l'insertion de donnée test sur Atlas a été un succès.
# PS

Si vous souhaitez visualiser les fichiers PDF depuis votre éditeur de code en l'occurence VisualStudio Code, il va falloir installer l'extension "PDF Preview" d'analyticsignal.com !