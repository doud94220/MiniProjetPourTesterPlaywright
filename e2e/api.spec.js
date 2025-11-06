// tests/api.spec.js

const { test, expect } = require('@playwright/test');

// Les API de test utilisent souvent une URL de base différente
const BASE_API_URL = 'https://jsonplaceholder.typicode.com/';

// DEFINITION de l'API : Ce test vérifie que l'opération de lecture (GET) fonctionne sur une ressource connue.
test('API GET : Vérifier la lecture d\'un article existant (ID 1)', async ({ request }) => {

    const ARTICLE_ID = 1; // Un ID connu pour être dans l'API de démo

    // 1. Exécution de la requête GET
    const getResponse = await request.get(`${BASE_API_URL}posts/${ARTICLE_ID}`);

    // 2. Vérification du statut (200 OK)
    await expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    // 3. Assertion de contenu
    expect(getBody.id).toBe(ARTICLE_ID);
    expect(getBody.userId).toBe(1); // Vérifie que l'article 1 appartient bien à l'utilisateur 1
    expect(getBody.title).toBeDefined();
});