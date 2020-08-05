#!groovy

// Testing pipeline

pipeline {
    agent {
        label 'hamlet-latest'
    }
    options {
        timestamps ()
        buildDiscarder(
            logRotator(
                numToKeepStr: '10'
            )
        )
        disableConcurrentBuilds()
        durabilityHint('PERFORMANCE_OPTIMIZED')
        parallelsAlwaysFailFast()
        quietPeriod 60
    }

    environment {
        DOCKER_BUILD_DIR = "${env.DOCKER_STAGE_DIR}/${BUILD_TAG}"
    }

    stages {
        // intergov required for running full test suite
        stage('Setup') {
            steps {
                dir("${env.DOCKER_BUILD_DIR}/test/tradetrust-website") {
                    script {
                        def repoTradeTrustWebSite = checkout scm
                        env["GIT_COMMIT"] = repoTradeTrustWebSite.GIT_COMMIT
                    }
                }
            }
        }


        stage('Build')  {
            when {
                branch 'master'
            }
            steps {
                build job: '../cotp-devnet/build-clients/master', parameters: [
                    string(name: 'branchref_tradetrustwebsite', value: "${GIT_COMMIT}")
                ]
            }
         }

    }
}
