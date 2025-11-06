// global-setup.js

const { request } = require('@playwright/test');
const fs = require('fs');

async function globalSetup(config) {//l'objet config est un argument standard qui est passé par Playwright au moment où il exécute le script globalSetup
    console.log('-> Début du Global Setup : Génération du jeton d\'authentification...');

    // 1. Créer une instance de l'API request
    const apiContext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
    });

    // 2. Requête POST pour obtenir le jeton (token)
    const authResponse = await apiContext.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    const authBody = await authResponse.json();
    const token = authBody.token;

    if (!token) {
        throw new Error('Erreur de connexion dans globalSetup: Jeton non reçu.');
    }

    // 3. Sauvegarder le jeton dans un fichier (simule l'état de session)
    const storageState = {
        cookies: [],
        origins: [{
            origin: 'https://restful-booker.herokuapp.com',
            localStorage: [],
            // Enregistrement du token pour les requêtes futures
            state: { token: token }
        }]
    };

    // Playwright utilise généralement `storageState.json` pour les cookies/sessions
    fs.writeFileSync('storageState.json', JSON.stringify(storageState));
    console.log(`-> Global Setup Terminé : Jeton sauvegardé. Le token est : ${token.substring(0, 10)}...`);
}

module.exports = globalSetup;