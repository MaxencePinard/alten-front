# alten-front

## Installation

Si vous n'avez pas installé node, rendez-vous sur https://nodejs.org/en/download/prebuilt-installer et suivez les instructions pour l'installation.\
Si vous n'avez pas installé angular, ouvrez l'invité de commande et exécutez la commande `npm install -g @angular/cli`

## Back-end

Avant de lancer l'application front-end, assurez-vous d'avoir lancé l'application back-end : https://github.com/MaxencePinard/alten-back

## Application de développement

Dans l'invité de commande, placez-vous à la racine du projet, exécutez `npm install`, puis lancez une des commandes suivantes :\
`ng serve` pour l'application par défaut\
`ng serve --configuration=fr` pour la configuration en français\
`ng serve --configuration=en` pour la configuration en anglais\
Ensuite, dans le navigateur, rendez-vous sur `http://localhost:4200/`.

## Build

Pour créer un build `ng build`, placez-vous à la racine du projet et lancez une des commandes suivantes :
`ng build` pour l'application par défaut\
`ng build --configuration=fr` pour la configuration en français\
`ng build --configuration=en` pour la configuration en anglais

## Serve Build

`npm i -g serve`\
`cd dist`\
`serve`
