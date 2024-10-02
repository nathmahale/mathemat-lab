pipeline {
    agent any
    stages {
        stage('Get docker version'){
            steps{
                sh 'docker -v'
            }
        }
        stage('Docker build') { 
            steps {
                sh 'docker build -t calculator:$(git rev-parse --short HEAD) .' 
            }
        }
        stage('Docker list images') { 
            steps {
                sh 'docker images calculator'
            }
        }
    }
}

