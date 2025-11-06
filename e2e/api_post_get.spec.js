// e2e/api_post_get.spec.js

const { test, expect } = require('@playwright/test');
const BASE_API_URL = 'https://jsonplaceholder.typicode.com/';

// DEFINITION du test qui vérifie que l'opération POST fonctionne et que la réponse est valide.
test('API Hybride : Créer un article et le vérifier immédiatement', async ({ request }) => {

    // 1. --- ÉTAPE POST : Créer un nouvel article ---
    const newPost = {
        title: 'Article Automatisé Playwright',
        body: 'Contenu du test API',
        userId: 13,
    };

    const postResponse = await request.post(`${BASE_API_URL}posts`, {
        data: newPost,
    });

    // Vérification du POST (201 Created)
    await expect(postResponse.status()).toBe(201);

    const postBody = await postResponse.json();

    // 2. Vérification du contenu renvoyé
    expect(postBody.id).toBeDefined();
    expect(postBody.title).toBe(newPost.title);

    // Le test s'arrête ici. Il est "valide" pour une API qui ne persiste pas.
});