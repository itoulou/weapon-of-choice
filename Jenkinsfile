pipeline {

    agent any

    tools {
        nodejs 'Node-19.3'
    }

    environment {
        NEW_VERSION = '1.0.0'
        // SERVER_CREDENTIALS = credentials('server-credentials')
    }

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                echo "building version ${NEW_VERSION}"
                // sh "docker pull itoulou/weapon-of-choice:fatboy-slim"
                // sh "docker build -t fatboy-slim-wop ."
                // sh "npm install"
                sh "docker-compose up -d --build"
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
                sh "docker ps"
                // sh "docker exec fb-slim-pipeline_master_fatboy-slim-wop_1 npm run pretest"
                // sh "docker exec fb-slim-pipeline_master_fatboy-slim-wop_1 npm run test-unit"
                // sh "npm run pretest"
                // sh "npm run test-unit"
            }
        }

        stage("deploy") {
            steps {
                echo 'deploying the application...'
                withCredentials([
                    usernamePassword(credentialsId: 'server-credentials', usernameVariable: USER, passwordVariable: PWD)
                ]) {
                   echo "gonna  run some script with user: ${USER} and password: ${PWD}"
                }
            }
        }
    }
}