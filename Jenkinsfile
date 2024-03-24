pipeline {
    agent any
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('npm audit report') { 
            steps {
                sh 'npm audit report'
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

