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
                // Pull the latest code from GitHub
                git branch: 'main', url: 'https://github.com/Arunprakash1177/naga-dashboard.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Make sure we are in the workspace folder
                dir("${WORKSPACE}") {
                    // Set npm to prefer IPv4 to avoid EACCES connect errors
                    sh 'npm config set prefer-ipv4 true'
                    // Install all dependencies
                    sh 'npm install --legacy-peer-deps --force'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir("${WORKSPACE}") {
                    sh "docker build -t ${DOCKERHUB_REPO} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKERHUB_REPO}"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    // Stop and remove old container if exists
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    // Run new container
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:80 ${DOCKERHUB_REPO}"
                }
            }
        }
    }
}
