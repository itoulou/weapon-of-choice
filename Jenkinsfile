pipeline {

    agent any

    tools {
        nodejs 'Node-19.3'
    }

    environmnet {
        NEW_VERSION = '1.0.0'
        SERVER_CREDENTIALS = credentials('server-credentials')
    }

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                echo "building version ${NEW_VERSION}"
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
            }
        }

        stage("deploy") {
            steps {
                echo 'deploying the application...'
                withCredentials([
                    usernamePassword(credentials: 'server-credentials', usernameVariable: USER, passwordVariable: PASSWORD)
                ]) {
                    sh "some script ${USER} ${PASSWORD}"
                }
            }
        }
    }
}