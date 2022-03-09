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
                sh 'docker build -t calculator:v1 .' 
            }
        }
        stage('Docker list images') { 
            steps {
                sh 'docker image ls'
            }
        }
    }
}

