// tests/api_post_get.spec.js

const { test, expect } = require('@playwright/test');

// URL de base pour l'API de démonstration
const BASE_API_URL = 'https://jsonplaceholder.typicode.com/';

// DEFINITION de l'API - Le describe sert à regrouper les 2 tests
test.describe('API POST/GET - Création et vérification d\'un article', () => {

    let createdPostId; // Variable pour stocker l'ID de l'article créé

    test('1. POST : Créer un nouvel article', async ({ request }) => {
        // --- 1. Préparation de la requête POST ---
        const newPost = {
            title: 'Article Automatisé Playwright',
            body: 'Ceci est un article créé via un test d\'automatisation API.',
            userId: 13,
        };

        // --- 2. Exécution de la requête POST ---
        const response = await request.post(`${BASE_API_URL}posts`, {
            data: newPost, // Les données sont envoyées dans le corps de la requête
        });

        // --- 3. Assertions sur la Création (POST) ---
        // Vérifie le statut HTTP 201 (Created)
        await expect(response.status()).toBe(201);

        // Récupère le corps de la réponse en JSON
        const responseBody = await response.json();

        // Stocke l'ID généré par l'API pour l'utiliser dans le test GET
        createdPostId = responseBody.id;

        // Assertion : Vérifie que l'ID a été généré
        expect(createdPostId).toBeDefined();

        // Assertion : Vérifie que le titre est bien celui envoyé
        expect(responseBody.title).toBe(newPost.title);
    });

    // Ce test doit s'exécuter APRES le POST pour pouvoir utiliser l'ID généré
    test('2. GET : Vérifier l\'existence de l\'article créé', async ({ request }) => {
        // On suppose que l'ID a été stocké par le test précédent.
        // Bien que cela fonctionne ici, en général, on met les deux dans le même bloc 'test'
        // ou on utilise des hooks (beforeEach) pour garantir l'exécution séquentielle.

        // Assertion initiale : S'assurer que l'ID est bien disponible
        expect(createdPostId).toBeDefined();

        // --- 1. Exécution de la requête GET ---
        // On utilise l'ID obtenu du POST pour cibler l'article
        const response = await request.get(`${BASE_API_URL}posts/${createdPostId}`);

        // --- 2. Assertions sur la Récupération (GET) ---
        // Vérifie le statut HTTP 200 (OK)
        await expect(response.status()).toBe(200);

        // Récupère le corps de la réponse
        const responseBody = await response.json();

        // Assertion : Vérifie que l'ID de l'article récupéré correspond à l'ID créé
        expect(responseBody.id).toBe(createdPostId);

        // Assertion : Vérifie le contenu du titre de l'article récupéré
        expect(responseBody.title).toBe('Article Automatisé Playwright');
    });

});