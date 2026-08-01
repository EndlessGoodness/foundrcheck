pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        script {
          runCommand('npm ci')
        }
      }
    }

    stage('Lint') {
      steps {
        script {
          runCommand('npm run lint')
        }
      }
    }

    stage('Build') {
      steps {
        script {
          runCommand('npm run build')
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true, fingerprint: true
      deleteDir()
    }
  }
}

def runCommand(String command) {
  if (isUnix()) {
    sh command
  } else {
    bat command
  }
}