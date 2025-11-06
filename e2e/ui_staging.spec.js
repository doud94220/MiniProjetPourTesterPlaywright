// e2e/ui_staging.spec.js

const { test, expect } = require('@playwright/test');

test('Vérifier que la navigation utilise l\'URL Staging (Herokuapp)', async ({ page }) => {
    // page.goto('/') va maintenant naviguer vers https://the-internet.herokuapp.com/
    await page.goto('/');

    // Le titre doit contenir le nom du site
    await expect(page).toHaveTitle('The Internet');

    /*
        Vérifier un élément de la page :
            name: 'Welcome': On cherche juste le début du titre.
            exact: false: On dit à Playwright que d'autres caractères peuvent suivre le mot "Welcome" (to the-internet, par exemple).
    */
    await expect(page.getByRole('heading', { name: 'Welcome', exact: false })).toBeVisible();
});