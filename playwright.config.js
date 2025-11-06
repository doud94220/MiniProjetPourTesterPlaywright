// playwright.config.js

module.exports = {
    // 1. Référence au script à exécuter au démarrage
    globalSetup: require.resolve('./global-setup'),

    // Option par défaut
    testDir: './e2e',
    timeout: 30 * 1000,

    // Définit l'URL de base par défaut
    use: {
        // URL par défaut : l'API Restful Booker pour les tests API purs
        baseURL: 'https://restful-booker.herokuapp.com',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'API_AUTH',
            // Utilise l'URL de base par défaut (Restful Booker)
            use: {
                baseURL: 'https://restful-booker.herokuapp.com',
                // 2. Indique au projet de charger le fichier d'état sauvegardé
                storageState: 'storageState.json',
            },
        },
        {
            name: 'STAGING_UI',
            // Surcharge l'URL pour simuler une interface utilisateur Staging
            use: {
                baseURL: 'https://the-internet.herokuapp.com', // 🚨 CORRECTION : Utilisation d'une URL de démo UI réelle
            },
        },
    ],
};