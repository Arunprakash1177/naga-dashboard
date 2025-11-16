pipeline {
    agent any

    environment {
        IMAGE_NAME = "naga-dashboard"
        DOCKERHUB_REPO = "arunprakash1177/naga-dashboard"
        CONTAINER_NAME = "naga"
        PORT = "8080"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Arunprakash1177/naga-dashboard.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps --force'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKERHUB_REPO}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        // Docker login
                        def loginStatus = sh(
                            script: """echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin""",
                            returnStatus: true
                        )

                        if (loginStatus != 0) {
                            error "Docker login failed! Please check your credentials or token."
                        }

                        // Push image
                        def pushStatus = sh(
                            script: "docker push ${DOCKERHUB_REPO}:latest",
                            returnStatus: true
                        )

                        if (pushStatus != 0) {
                            error "Docker push failed!"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // Logout from Docker Hub to avoid leaving credentials in memory
            sh "docker logout || true"
        }
    }
}
