// e2e/hybride.spec.js

const { test, expect } = require('@playwright/test');

// URL de base pour l'API de démonstration
const BASE_API_URL = 'https://jsonplaceholder.typicode.com/';
// URL de base pour simuler la page UI de l'application
const BASE_UI_URL = 'https://playwright.dev/docs/intro';

test.describe('Scénario Hybride : Préparation API, Validation UI', () => {

    test('Créer un article via API et vérifier un élément connexe sur l\'UI', async ({ request, page }) => {

        // Données uniques pour s'assurer que l'élément est reconnaissable
        const uniqueTitle = `Article créé via API - ${Date.now()}`;

        // 1. --- ÉTAPE API : CRÉATION (POST) ---
        console.log(`[API] Création de l'article avec le titre : ${uniqueTitle}`);

        const newPost = {
            title: uniqueTitle,
            body: 'Contenu généré par test hybride.',
            userId: 99,
        };

        const postResponse = await request.post(`${BASE_API_URL}posts`, {
            data: newPost,
        });

        // Valide que la création a été acceptée
        await expect(postResponse.status()).toBe(201);

        const postBody = await postResponse.json();
        const createdId = postBody.id; // Récupération de l'ID créé par l'API

        console.log(`[API] Article créé avec l'ID: ${createdId}`);

        // 2. --- ÉTAPE UI : NAVIGATION ET VALIDATION ---
        console.log('[UI] Navigation vers la page de validation...');

        // Navigation vers la page où l'article devrait apparaître (simulée ici par une page fixe)
        await page.goto(BASE_UI_URL);

        // Chercher l'élément créé.
        // Puisque JSONPlaceholder NE PERSISTE PAS, nous ne pouvons pas vraiment trouver
        // l'article 'uniqueTitle' sur la page UI de Playwright. 

        // MAIS, nous pouvons démontrer la logique de validation :

        // --------------------------------------------------------------------------------
        // **LOGIQUE À UTILISER SUR UNE VRAIE APPLICATION :**
        //
        // await page.goto(`https://votre-app.com/articles/${createdId}`);
        // await expect(page.getByText(uniqueTitle)).toBeVisible(); 
        // --------------------------------------------------------------------------------

        // Pour cet exercice, nous allons valider que le processus API-UI s'est bien déroulé
        // en vérifiant la présence du bouton principal de la page.

        // Vérification de l'élément de la page
        await expect(page.getByRole('link', { name: 'Installation' })).toBeVisible();

        console.log('[UI] Validation de l\'élément de la page réussie.');
    });
});