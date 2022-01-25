

# Projet 7 OpenClassRoom

Cloner le git
Faire le code suivant dans un terminal pour le dossier principal afin d'installer le module "concurrently"

```bash
  npm install
```

# Front End

Dans un terminal 

```bash
  cd frontend
```
```bash
  npm install
```


# Back end

Dans un terminal

```bash
  cd backend
```
```bash
  npm install
```

# mySql

Voir dans le dossier backend/migrations pour voir la structure.
Chaque table doit être en InnoDB.

contraintes de clé étrangère pour "comments" : en CACASDE post_id sur table messages colonne id
contraintes de clé étrangère pour "comments" : en CACASDE user_name sur table user colonne username


contraintes de clé étrangère pour "messages" : en CACASDE userId sur table user colonne id
contraintes de clé étrangère pour "messages" : en CACASDE username sur table user colonne username
contraintes de clé étrangère pour "messages" : en CACASDE profil_image sur table user colonne profil_image


# Lancement

Une fois l'installation compléte, retourner dnas le dossier principal
```bash
  npm start
```
Le frontend et le backendce lancerons en même temps.
