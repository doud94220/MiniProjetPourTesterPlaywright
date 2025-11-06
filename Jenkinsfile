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
                sh 'npm install' 
                
                // CRUCIAL : Télécharger les binaires des navigateurs (Chromium, Firefox, WebKit)
                sh 'npx playwright install --with-deps' 
            }
        }

        stage('Run API Auth Tests') {
            steps {
                // 1. Exécuter le test API/Hooks
                // Ceci déclenche le globalSetup, crée le jeton et exécute shared_data.spec.js
                sh 'npx playwright test --project=API_AUTH' 
            }
        }

        stage('Run UI Staging Tests') {
            steps {
                // 2. Exécuter les tests UI Staging
                // Ceci utilise l'URL de base : https://the-internet.herokuapp.com
                sh 'npx playwright test --project=STAGING_UI' 
            }
        }

        stage('Publish Report') {
            // Exécuté même si un test échoue (always())
            steps {
                // Archiver le rapport HTML généré par Playwright
                archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
                // Vous pouvez aussi utiliser le plugin Jenkins 'HTML Publisher'
            }
        }
    }
}