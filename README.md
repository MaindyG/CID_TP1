# 📝 TP1 – Gestion d’une application de suivi de séries et films

## Lancement de l'application 

### Cloner le projet 
```
git clone https://github.com/MaindyG/CID_TP1.git
```

### Ouvrir le dossier TP1
```
cd tp1
```

### [AU BESOIN] Installer les dependances
```
npm install
```

### Lancer l'application 
```
npm run dev
```


## Routes POSTMAN implementées
> ⚠️ La route PATCH /episodes/:id n'a pas été implementé donc le test PATCH /episodes/:id Valide Mise à jour de l'état watched n'a pas été fait  


### 1 - Retourner tout les médias
```
GET http://localhost:3000/api/medias
```

### 2 - Retourne les medias d'une annee specifique
```
GET http://localhost:3000/api/medias?year=2020
```

### 3 - Ajouter un film 
```
POST http://localhost:3000/api/medias/films
```
##### Avec ces valeurs
```
{
    "title": "Let O",
    "genre": "Comedy",
    "year": 2020,
    "rating":3,
    "duration":100,
    "watched":false,
    "role":"admin"
}
```

### 4 - (Retourne une erreur) Ajouter un film sans titre 
```
POST http://localhost:3000/api/medias/films
```
##### Avec ces valeurs
```
{
    "genre": "Comedy",
    "year": 2020,
    "rating":3,
    "duration":100,
    "watched":false,
    "role":"admin"
}
```

### 5 - (Retourne une erreur) Ajouter un film en etant user 
```
POST http://localhost:3000/api/medias/films
```
##### Avec ces valeurs
```
 {
    "title":"Okay",
    "genre": "Comedy",
    "year": 2020,
    "rating":3,
    "duration":100,
    "watched":false,
    "role":"user"
}
```

### 6 - (Retourne une erreur) Ajouter un film avec un titre qui possède un character invalide
```
POST http://localhost:3000/api/medias/films
```
##### Avec ces valeurs
```
 {
    "title":"A@",
    "genre": "Comedy",
    "year": 2020,
    "rating":3,
    "duration":100,
    "watched":false,
    "role":"admin"
}
```

#### 7 -  Ajouter une serie 
```
POST http://localhost:3000/api/medias/series
```
##### Avec ces valeurs
```
 {
    "title": "LOL",
    "genre": "Comedy",
    "year": 2020,
    "rating":3,
    "status":"En_cours",
    "role":"admin"
}
```

### 8 - Ajouter une saison dans une serie
```
POST http://localhost:3000/api/medias/series/seasons 
```
##### Avec ces valeurs (Remplacez le id par le id de la serie)
```
 {
    "id":"300", 
    "seasonNumber" : 2,
    "releaseDate":"2022-02-02",
    "role":"admin"
}
```

### 9 - Ajouter un episode a une saison
```
POST http://localhost:3000/api/episodes
```
##### Avec ces valeurs (Remplacez le id de la serie et le id de la saison )
```
 {
    "serieId":"300", 
    "seasonId": "5893",
    "title":"Pilot",
    "duration" : 32,
    "episodeNumber":1
}
```

### 10 - Retourne la dernière action enregistrée
```
GET http://localhost:3000/api/logs
```

