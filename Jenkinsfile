pipeline {
    agent any
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Fix vulnerabilities') { 
            steps {
                sh 'npm audit fix' 
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run-script build' 
            }
        }
        stage('Test') { 
            steps {
                sh 'npm test' 
            }
        }
    }
}

