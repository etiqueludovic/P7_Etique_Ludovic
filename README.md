

# Projet 7 OpenClassRoom

Cloner le git

```bash
  npm run install
```

# Front End

Dans un terminal 

```bash
  cd frontend
```
```bash
  npm run install
```


# Back end

Dans un terminal

```bash
  cd backend
```
```bash
  npm run install
```

# mySql

Voir dans le dossier backend/migrations pour voir la structure.
Chaque table doit être en InnoDB.

contraintes de clé étrangère pour "comments" : en CACASDE post_id sur table messages colonne id
contraintes de clé étrangère pour "comments" : en CACASDE user_name sur table user colonne username


contraintes de clé étrangère pour "messages" : en CACASDE userId sur table user colonne id
contraintes de clé étrangère pour "messages" : en CACASDE username sur table user colonne username
contraintes de clé étrangère pour "messages" : en CACASDE profil_image sur table user colonne profil_image
