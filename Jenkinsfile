pipeline {
    agent any
    stages {
        stage('Docker build') { 
            steps {
                sh 'docker build -t calculator:v0 .' 
            }
        }
        stage('Docker list image') { 
            steps {
                sh 'docker image ls -a'
            }
        }
    }
}

