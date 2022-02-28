#!/bin/bash

function configure_rootless_dockerd() {
  sudo apt-get install -y docker-ce-rootless-extras iptables uidmap
  dockerd-rootless-setuptool.sh install

}

function configure_cgroup_docker() {
  sudo mkdir -p /sys/fs/cgroup/docker
  sudo chmod -R 777 /sys/fs/cgroup/docker
  sudo chmod -R 777 /sys/fs/cgroup/devices
  echo "0-$(($(nproc) - 1))" >/sys/fs/cgroup/cpuset/docker/cpuset.cpus
  echo 0 >/sys/fs/cgroup/cpuset/docker/cpuset.mems
}

function prep() {
  docker volume create jenkins-data
  docker volume create jenkins-docker-certs

  docker network create jenkins
}

function create_dockerfile_jenkins() {

  cat >Dockerfile <<EOF
FROM jenkins/jenkins:2.319.3-jdk11
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/ubuntu/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
EOF

}

function build_docker_jenkins() {
  docker build -t jenkins:v4 .

}

function create_jenkins_docker_container() {
  docker run --name jks-boc --detach \
    --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
    --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
    --publish 49000:8080 --publish 50000:50000 \
    --volume jenkins-data:/var/jenkins_home \
    --volume jenkins-docker-certs:/certs/client:ro \
    --volume "$HOME":/home \
    jenkins:v4

}

function create_docker_dind_container() {
  docker run --name jks-docker --detach --cgroupns host \
    --privileged --network jenkins --network-alias docker \
    --env DOCKER_TLS_CERTDIR=/certs \
    --volume jenkins-docker-certs:/certs/client \
    --volume jenkins-data:/var/jenkins_home \
    --publish 3000:3000 --publish 2376:2376 \
    docker:dind --storage-driver overlay2

}

prep
create_dockerfile_jenkins
build_docker_jenkins
create_docker_dind_container
create_jenkins_docker_container