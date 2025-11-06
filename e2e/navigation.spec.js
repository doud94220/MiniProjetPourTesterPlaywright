// tests/navigation.spec.js

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage.js');

test('Naviguer et cliquer sur Get Started', async ({ page }) => {
    // 1. INSTANCIATION de l'objet Page
    const homePage = new HomePage(page);

    // 2. Exécution des actions via les méthodes de la Page Object
    await homePage.goto();
    await homePage.checkUrl(); // Assertion sur l'URL via la méthode Page Object

    // 3. Clic et vérification de la nouvelle page (si besoin, on instancierait une autre Page Object ici)
    await homePage.clickGetStarted();

    // Vérification que nous avons bien été redirigés vers la documentation
    await expect(page).toHaveURL(/.*docs\/intro/);
});