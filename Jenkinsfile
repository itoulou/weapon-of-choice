pipeline {

    agent any

    tools {
        nodejs 'Node-19.3'
    }

    environment {
        NEW_VERSION = '1.0.0'
        // SERVER_CREDENTIALS = credentials('server-credentials')
        AWS_ACCESS_KEY_ID     = credentials('aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        DB_STAGING_USERNAME   = credentials('db-username-staging')
        DB_STAGING_USERNAME   = credentials('db-password-staging')

    }

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                echo "building version ${NEW_VERSION}"
                // sh "docker pull itoulou/weapon-of-choice:fatboy-slim"
                sh "docker-compose up -d --build"
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
                sh "docker ps"
                sh "docker exec fatboy-slim-wop npm run pretest"
                sh "docker exec fatboy-slim-wop npm run test-unit"
            }
        }

        stage("push image to DockerHub") {
            steps {
                echo 'tag and push image...'
                sh "docker tag fb-wop-image:latest itoulou/weapon-of-choice:latest"
                sh "docker push itoulou/weapon-of-choice:latest"
            }
        }

        stage("create staging env") {
            steps {
                echo "set up env vars"
                sh "docker exec -it fatboy-slim-wop /bin/sh"
                sh """
                TF_VAR_access_key=${AWS_ACCESS_KEY_ID}
                TF_VAR_secret_key=${AWS_SECRET_ACCESS_KEY}
                TF_VAR_db_username=${DB_STAGING_USERNAME}
                TF_VAR_db_password=${DB_STAGING_PASSWORD}
                terraform -chdir=./deployment/staging plan
                """
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