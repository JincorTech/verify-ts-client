#!/bin/bash

set -ex
IMAGE_NAME="jincort/verify-ts-client"
TAG="${1}"
docker build -t ${IMAGE_NAME}:${TAG} -f Dockerfile.prod .
docker push ${IMAGE_NAME}:${TAG}
