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
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh "docker tag ${IMAGE_NAME} ${DOCKERHUB_REPO}:latest"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                                                 usernameVariable: 'DOCKER_USER', 
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "docker push ${DOCKERHUB_REPO}:latest"
            }
        }

        stage('Deploy Container') {
            steps {
                // Stop & remove old container if exists
                sh """
                    if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    fi
                """

                // Run new container
                sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:80 ${DOCKERHUB_REPO}:latest"
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
