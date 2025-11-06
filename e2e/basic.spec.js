// tests/basic.spec.js

/*
    Importez la fonction 'test' et 'expect' depuis la bibliothèque de Playwright :
    - expect : C'est la fonction qui vous permet de créer des assertions (ex: expect(locator).toBeVisible()).
    C'est l'équivalent de l'objet assert ou chai que vous utiliseriez avec Mocha.
    - test : C'est la fonction principale fournie par le framework @playwright/test.
*/
const { test, expect } = require('@playwright/test');

/*
    Définissez un groupe de tests (équivalent à 'describe' dans Mocha) :
    Dans Playwright, le framework est conçu pour que toutes ses fonctionnalités de test (grouper, définir un test, ignorer, cibler)
    soient des méthodes attachées à la même fonction test que vous importez explicitement.
    Ceci rend votre code plus clair et moins dépendant des variables globales (ce qui est une bonne pratique en développement moderne) :
        test.describe(...) pour le regroupement
        test(...) pour le cas de test
        test.skip(...) pour ignorer un test
        test.only(...) pour exécuter seulement ce test
**/
test.describe('Test de la page d\'accueil', () => {

    // Définissez votre cas de test (équivalent à 'it' dans Mocha)
    test('Le titre de la page doit être correct', async ({ page }) => {
        // La variable 'page' est automatiquement fournie par Playwright
        // C'est l'équivalent du WebDriver pour Selenium.

        // 1. Navigation : Aller à une URL
        await page.goto('https://playwright.dev/');

        // 2. Localisation (Locators) : Sélectionner l'élément par son rôle/texte
        // Playwright encourage les localisateurs lisibles et robustes
        const titre = page.locator('h1');

        // 3. Assertion : Vérifier l'attente
        // Utilisation de l'attente automatique (Auto-waiting) de Playwright
        await expect(titre).toContainText('Playwright');
    });

    // Vous pouvez ajouter d'autres tests ici...
});