#!/bin/bash

# Arrêter le script en cas d'erreur
set -e

# Variables à personnaliser
IMAGE_NAME="alexandre/mealappclient"  # Nom de l'image Docker
IMAGE_TAG="latest"                 # Tag de l'image (par défaut : latest)

# Étape 1 : Connexion au registre Docker
echo "Connexion au registre Docker..."
docker login

# Étape 2 : Construction de l'image Docker
echo "Construction de l'image Docker..."
docker build -t "$IMAGE_NAME:$IMAGE_TAG" .

# Étape 3 : Pousser l'image vers le registre
echo "Pousser l'image vers le registre Docker..."
docker push "$IMAGE_NAME:$IMAGE_TAG"

# Fin du script
echo "L'image Docker a été poussée avec succès : $IMAGE_NAME:$IMAGE_TAG"
