pipeline {
    agent 
    {
        docker { image 'node:12-alpine3.15' }
    }
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

