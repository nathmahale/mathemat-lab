# Azure DevOps build agent running inside container managed by K8S

## 0. Code tree

```bash
.
├── ./build-agent-docker
│   ├── ./build-agent-docker/docker-pat-secrets.yml # sops encrypted docker login creds
│   ├── ./build-agent-docker/Dockerfile # dockerfile to create ADO agent image
│   └── ./build-agent-docker/start.sh # entrypoint script to download agent software and configure the agent
├── ./build-agent-k8s
│   ├── ./build-agent-k8s/1-ado-secret.yml # sops encrypted k8s secret object definition with ADO PAT token
│   └── ./build-agent-k8s/2-ado-agent-deployment.yml # k8s deployment object
└── ./README.md
```

## 1. k8s cluster creation

- Start `minikube` single node cluster
minikube start --cpus=4 --memory=4g --driver=docker

## 2. Handling secrets

>Security best pratice for handling sensitive tokens using gnupg and sops

- Get PAT from ADO and create a yaml file for k8s secret object

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: azdo-secret
type: Opaque
stringData:
  AZP_TOKEN: "<YOUR_PAT_HERE>"
  AZP_URL: "<https://dev.azure.com/YOUR_ORG_NAME>"
```

- Encrypt file with sops

```bash
# Encrypt with GPG recipient
sops --encrypt --pgp <GPG_KEY_ID> --in-place azdo-secret.yaml
```

- Decrypt secret and apply secret to `minikube` cluster

```bash
sops --decrypt azdo-secret.yaml | kubectl apply -f -

export DOCKERHUB_USER=$(sops --decrypt --extract '["dockerhub"]["username"]' docker-pat-secrets.yml)
export DOCKERHUB_PAT=$(sops --decrypt --extract '["dockerhub"]["pat"]' docker-pat-secrets.yml)
```

## 3. Image build

- Build docker image from [dockerfile](build-agent-docker/Dockerfile)

## 4. Deploy ADO agent

- Deploy the image with this file [deployment](build-agent-k8s/2-ado-agent-deployment.yml)

## n. Foot Notes

[Self-hosted Linux ADO agent](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/docker?view=azure-devops#linux)
