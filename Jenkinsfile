// Jenkinsfile

pipeline {
    agent any // Exécuter sur n'importe quel agent disponible

    stages {
        stage('Checkout Code') {
            steps {
                // Cloner le code source depuis votre dépôt Git
                checkout scm
            }
        }

        stage('Install Dependencies & Browsers') {
            steps {
                // Utiliser la bonne version de Node.js
                // NOTE: La configuration exacte dépend du plugin Jenkins Node.js
                bat 'npm install' 
                
                // CRUCIAL : Télécharger les binaires des navigateurs (Chromium, Firefox, WebKit)
                bat 'npx playwright install --with-deps' 
            }
        }

        stage('Run API Auth Tests') {
            steps {
                // 1. Exécuter le test API/Hooks
                // Ceci déclenche le globalSetup, crée le jeton et exécute shared_data.spec.js

                // Expose les secrets stockés dans Jenkins en tant que variables d'environnement
                withCredentials([usernamePassword(credentialsId: 'booker-api-creds', 
                                         passwordVariable: 'BOOKER_PASSWORD', 
                                         usernameVariable: 'BOOKER_USERNAME')
                ]) {
                    // bat 'npx playwright test --project=API_AUTH'
                    bat 'npx playwright test e2e/shared_data.spec.js --project=API_AUTH --reporter=html' 
                }
            }
        }

        stage('Run UI Staging Tests') {
            steps {
                // 2. Exécuter les tests UI Staging
                // Ceci utilise l'URL de base : https://the-internet.herokuapp.com
                // bat 'npx playwright test --project=STAGING_UI'
                bat 'npx playwright test e2e/ui_staging.spec.js --project=STAGING_UI --reporter=html'
            }
        }

        stage('Publish Report') {
            // Exécuté même si un test échoue (always())
            steps {
                // Archiver le rapport HTML généré par Playwright
                archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true, allowEmptyArchive: true
                // Vous pouvez aussi utiliser le plugin Jenkins 'HTML Publisher'
            }
        }
    }
}