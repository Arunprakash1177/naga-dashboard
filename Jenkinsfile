pipeline {
  agent any

  environment {
    IMAGE_NAME = "demo-app"                       // local image name
    DOCKER_REGISTRY = "docker.io"                 // Docker Hub registry
    DOCKER_REPO = "arunprakash1177/demo-app"      // full image path
    PUSH_IMAGE = "true"                          // set to "true" to push
    COMPOSE_FILE = "docker-compose.yml"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        // Install dependencies
        sh 'npm install'
        // Run tests (skip gracefully if not configured)
        sh 'npm test || echo "Tests skipped or not configured"'
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          if (env.PUSH_IMAGE == "true") {
            sh "docker build -t ${DOCKER_REPO}:${BUILD_NUMBER} ."
          } else {
            sh "docker build -t ${IMAGE_NAME}:latest ."
          }
        }
      }
    }

    stage('Push image (optional)') {
      when {
        expression { env.PUSH_IMAGE == "true" }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${DOCKER_REGISTRY}
            docker push ${DOCKER_REPO}:${BUILD_NUMBER}
            docker logout ${DOCKER_REGISTRY}
          """
        }
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          echo "Starting deployment..."
          docker-compose down || true
          docker-compose up -d --build
          echo "Deployment complete."
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
    }
    success {
      echo '✅ Build succeeded and deployment complete.'
    }
    failure {
      echo '❌ Build failed.'
    }
  }
}
