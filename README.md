# Projet Personnal-Budget-Manager

Ce projet est une API REST permettant de gérer son budget personnel.  

## Stack technique

- [NodeJS](http://nodejs.org/en/download) (v12 minimal)
- [PostgreSQL](https://www.postgresql.org/download)(v12 minimal)
- [Sqitch](https://sqitch.org/download/)(v1)

Ces outils sont nécessaires à l'installation et au fonctionnement de l'API.  
A installer avant de continuer.

## Installation

Cloner le dépôt en local

```bash
git clone https://github.com/laurentSavarit/personnal-budget-manager.git
```

Puis dans le dossier local, installer les dépendances npm.

```bash
npm install
```

Mettre en place les fichiers .env et sqitch.conf en s'appuyant sur les fichiers . example fournis dans le dépôt.  

Enfin, créer une base de données PostgreSQL et d"ployer le projet sqitch.

```bash
createdb personnal_budget_manager
sqitch deploy db:pg:personnal_budget_manager
```

Configurer PostgreSQL (ou fournir les variables d'environnement nécessaires) pour que les commandes  `createdb` et `sqitch` puissent s'executer correctement.

détailler toutes l'installation, du clone au start

## Données de démonstration

Afin de mettre en place quelques données de test depuis le dossier du dépôt lancer:

```bash
psql -d personnal_budget_manager -f ./data/pbmSeed.sql
```

## Lancement

```bash
npm start
```
