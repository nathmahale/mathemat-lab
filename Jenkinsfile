pipeline {
    agent any
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Perform info level audit') { 
            steps {
                sh 'npm audit --audit-level=info'
            }
        }
        stage('Perform low level audit') { 
            steps {
                sh 'npm audit --audit-level=low'
            }
        }
        stage('Perform moderate level audit') { 
            steps {
                sh 'npm audit --audit-level=moderate'
            }
        }
        stage('Perform high level audit') { 
            steps {
                sh 'npm audit --audit-level=high'
            }
        }
        stage('Perform critical level audit') { 
            steps {
                sh 'npm audit --audit-level=critical'
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

