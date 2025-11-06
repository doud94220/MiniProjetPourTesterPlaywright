// pages/HomePage.js

const { expect } = require('@playwright/test');

// Définition de la classe pour la Page d'Accueil
class HomePage {
    // Le constructeur reçoit l'objet 'page' de Playwright
    constructor(page) {
        this.page = page;
        // Déclaration des Locators ici (CENTRALISATION)
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.titleHeading = page.getByRole('heading', { name: 'Playwright enables reliable' });
    }

    // Méthode pour naviguer vers la page
    async goto() {
        await this.page.goto('https://playwright.dev/');
    }

    // Méthode pour cliquer sur le lien "Get Started"
    async clickGetStarted() {
        await this.getStartedLink.click();
    }

    // Méthode pour vérifier l'URL de la page
    async checkUrl() {
        await expect(this.page).toHaveURL('https://playwright.dev/');
    }

    // Autres méthodes d'interaction...
}

// Export de la classe pour utilisation dans les fichiers de test
module.exports = { HomePage };