import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Assertion 1: Vérifier que la navigation a réussi en utilisant le titre de la page
    await expect(page).toHaveTitle(/Playwright/);

    await page.getByRole('heading', { name: 'Playwright enables reliable' }).click();
    // Assertion 2: Vérifier que le texte du titre est visible à l'écran
    const titrePrincipal = page.getByRole('heading', { name: 'Playwright enables reliable' });
    await expect(titrePrincipal).toBeVisible();
    // Note: Le .click() sur un titre est inhabituel, on valide surtout la présence.

    await page.getByRole('link', { name: 'Get started' }).click();
    // Assertion 3: Vérifier que la redirection vers la page de documentation est faite
    // On vérifie que l'URL a changé et contient '/docs/intro'
    await expect(page).toHaveURL(/.*docs\/intro/);

    await page.goto('https://playwright.dev/');
    await page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' }).click();
    // Assertion 4: Vérifier un élément sur la nouvelle page après le clic sur l'image
    // On s'attend à voir un titre ou un élément spécifique sur la page d'arrivée.
    // Exemple : S'il y a un H2 avec le texte "Cross-browser testing"
    await expect(page.getByRole('heading', { name: 'Cross-browser testing' })).toBeVisible();

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: '78k+ stargazers on GitHub' }).click();
    const page1 = await page1Promise;
    // Assertion 5: Vérifier que le nouvel onglet a bien la bonne URL
    // Le nouvel onglet est représenté par la variable 'page1'
    await expect(page1).toHaveURL('https://github.com/microsoft/playwright');
    // Assertion 6: Vérifier un élément dans le nouvel onglet
    // S'assurer que le bouton de "star" est présent sur GitHub.
    await expect(page1.getByRole('button', { name: 'Star' })).toBeVisible();
});