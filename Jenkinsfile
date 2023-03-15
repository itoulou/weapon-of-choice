pipeline {

    agent any

    tools {
        nodejs 'Node-19.3'
    }

    environment {
        NEW_VERSION = '1.0.0'
        // SERVER_CREDENTIALS = credentials('server-credentials')
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        // DB_STAGING_USERNAME   = credentials('db-username-staging')
        // DB_STAGING_PASSWORD   = credentials('db-password-staging')

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
                script {
                    sh "export ${AWS_ACCESS_KEY_ID}"
                    sh "export ${AWS_SECRET_ACCESS_KEY}"
                    def login="\$(aws ecr get-login-password --region eu-west-2)"
                    echo "${login} | docker login --username AWS --password-stdin 118531441366.dkr.ecr.eu-west-2.amazonaws.com/ivan-devops-training/fatboy-staging"
                    sh "docker tag fb-wop-image:latest ivan-devops-training/fatboy-staging:latest"
                    sh "docker push ivan-devops-training/fatboy-staging:latest"
                }
            }
        }

        stage("create staging env") {
            steps {
                echo "set up env vars"
                // sh """
                // TF_VAR_access_key=${AWS_ACCESS_KEY_ID}\
                // TF_VAR_secret_key=${AWS_SECRET_ACCESS_KEY}\
                // TF_VAR_db_username=${DB_STAGING_USERNAME}\
                // TF_VAR_db_password=${DB_STAGING_PASSWORD}\
                // terraform -chdir=./deployment/staging init
                // terraform -chdir=./deployment/staging plan
                // """
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