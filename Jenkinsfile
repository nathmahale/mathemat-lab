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
        stage('npn audit fix with dry-run flag') { 
            steps {
                sh '$ npm audit fix --dry-run --json'
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

