// e2e/profile.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Tests du Profil Utilisateur', () => {

    // --- 🚨 HOOK : Exécuté avant CHAQUE test dans ce describe ---
    test.beforeEach(async ({ page }) => { //L'objet page provient de l'injection de dépendances du framework Playwright !
        console.log("-> Exécution du beforeEach : Connexion de l'utilisateur...");

        // 1. Aller à la page de login
        await page.goto('https://the-internet.herokuapp.com/login');

        // 2. Remplir les champs
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'SuperSecretPassword!');

        // 3. Soumettre le formulaire
        await page.click('button[type="submit"]');

        // Assertion de validation (pour s'assurer que le login a réussi avant de continuer)
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
        console.log("-> Connexion réussie.");
    });
    // -----------------------------------------------------------

    // Test 1 : L'utilisateur est connecté et voit le bouton "Logout"
    test('Le bouton de déconnexion est visible après le login', async ({ page }) => {
        console.log("-> Exécution du Test 1...");
        // Le beforeEach a déjà navigué et logué l'utilisateur

        const logoutButton = page.getByRole('link', { name: 'Logout' });
        await expect(logoutButton).toBeVisible();
        console.log("-> Test 1 Terminé.");
    });

    // Test 2 : La déconnexion fonctionne
    test('La déconnexion réussit et retourne à la page de login', async ({ page }) => {
        console.log("-> Exécution du Test 2...");
        // Le beforeEach a logué l'utilisateur

        // Action : Déconnexion
        await page.getByRole('link', { name: 'Logout' }).click();

        // Validation : Vérifier qu'on est sur la page de login
        await expect(page).toHaveURL(/.*login/);

        // Validation : Vérifier le message de déconnexion
        await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
        console.log("-> Test 2 Terminé.");
    });
});