pipeline {
    agent {
        node{ 
            'docker:dind'
        }
    }
    stages {
        stage('Get docker version'){
            steps{
                sh 'docker -v'
            }
        }
        stage('Docker build') { 
            steps {
                sh 'docker build -t calculator:v2 .' 
            }
        }
        stage('Docker list images') { 
            steps {
                sh 'docker image ls'
            }
        }
    }
}

