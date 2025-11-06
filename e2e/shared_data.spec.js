// e2e/shared_data.spec.js

// 🚨 Ligne d'importation OBLIGATOIRE
const { test, expect } = require('@playwright/test');

let authToken = ''; //Stocke le jeton pour le beforeAll/test/afterAll
let bookingIdToDelete = 0; // Stocke l'ID créé dans le test() pour le afterAll()

test.describe('Tests qui nécessitent une authentification (Hooks)', () => {

    // 🚨 HOOK 1 : Connexion et récupération du jeton (UNE SEULE FOIS)
    test.beforeAll(async ({ request }) => {
        console.log("-> 🔑 beforeAll : Récupération du jeton d'authentification...");

        // Simuler une requête API pour obtenir un jeton
        const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: { username: 'admin', password: 'password123' }
        });

        const authBody = await authResponse.json();
        authToken = authBody.token; // Le jeton est stocké ici, et maintenant disponible pour tous les tests
        expect(authToken).toBeDefined();
        console.log("-> Jeton récupéré et prêt pour l'utilisation.");
    });

    // 🚨 TEST CONCRET : Créer une ressource sécurisée en utilisant le jeton
    test('Utiliser le jeton pour créer une réservation et stocker l\'ID', async ({ request }) => {
        console.log("-> ✍️ Test : Création d'une ressource sécurisée...");

        // Requête POST nécessitant une authentification (même si Restful Booker ne le requiert pas pour POST)
        const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname: `SecureUser_${Date.now()}`,
                lastname: "Cleanup",
                totalprice: 150,
                depositpaid: true,
                bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" },
                additionalneeds: "Dinner"
            }
        });

        const createBody = await createResponse.json();

        // Stocke l'ID pour le nettoyage futur
        bookingIdToDelete = createBody.bookingid;

        expect(createResponse.status()).toBe(200);
        expect(bookingIdToDelete).toBeDefined();
        console.log(`-> ID créé pour le nettoyage : ${bookingIdToDelete}`);
    });

    // 🚨 HOOK 2 : Nettoyage de la ressource créée (UNE SEULE FOIS à la fin)
    test.afterAll(async ({ request }) => {
        console.log(`-> 🗑️ afterAll : Suppression de la réservation ID ${bookingIdToDelete} ...`);

        // L'action DELETE nécessite une authentification (utilisation du jeton)
        const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingIdToDelete}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${authToken}` // Authentification via le cookie/jeton
            }
        });

        // Validation du nettoyage : 201 Created/Accepted (Restful Booker renvoie 201)
        expect(deleteResponse.status()).toBe(201);
        console.log("-> Nettoyage réussi. La ressource a été supprimée.");
    });
});