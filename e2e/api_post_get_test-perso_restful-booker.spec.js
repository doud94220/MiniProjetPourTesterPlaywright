// e2e/api_post_get_test-perso_restful-booker.spec.js

const { test, expect } = require('@playwright/test');

// URL de base pour l'API de démonstration
const BASE_API_URL = 'https://restful-booker.herokuapp.com/booking';

test.describe('Scénario Hybride sur Restful Booker : Création API, Validation API (Lecture)', () => {

    test('Créer une réservation via API et vérifier sa présence via API GET', async ({ request }) => {

        // Données uniques pour s'assurer que l'élément est reconnaissable
        const uniqueFirstName = `Edouard_${Date.now()}`;

        // 1. --- ÉTAPE API : CRÉATION (POST) ---
        const newBookingPayload = {
            firstname: uniqueFirstName, // Champ unique pour la validation
            lastname: "Playwright",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2025-01-01",
                checkout: "2025-02-01"
            },
            additionalneeds: "Petit-déjeuner"
        };

        const postResponse = await request.post(BASE_API_URL, {
            data: newBookingPayload, // Utilisation du payload corrigé
        });

        // Valide que la création a été acceptée (Restful Booker renvoie 200 OK)
        await expect(postResponse.status()).toBe(200);
        const postBody = await postResponse.json();
        const createdBookingId = postBody.bookingid;
        expect(createdBookingId).toBeDefined();
        console.log(`[API] Réservation créée avec l'ID: ${createdBookingId}`);

        // 2. --- ÉTAPE API : VÉRIFICATION (GET) ---
        // Le test vérifie que la donnée persiste et est consultable.

        const getResponse = await request.get(`${BASE_API_URL}/${createdBookingId}`);

        // Vérification 1 : Le statut HTTP doit être 200 (OK) pour la récupération
        await expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();

        // Vérification 2 : La réservation récupérée doit contenir le prénom unique
        expect(getBody.firstname).toBe(uniqueFirstName);
        expect(getBody.lastname).toBe("Playwright");

        console.log(`[API] Réservation (ID: ${createdBookingId}) trouvée et validée.`);
    });
});