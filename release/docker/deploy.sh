#!/usr/bin/env bash
# -*- encoding UTF-8 -*-
# Author: wcw@kuick.cn

export PGRDIR=$(cd `dirname $0`; pwd)
source ${PGRDIR}/env.sh

export DOCKER_IMAGE_URL=$1

export DOCKER_OPTS="-p $DOCKER_INSTANCE_PORT:80"

# only set DOCKER_IMAGE_URL if not set
[ -z "$DOCKER_IMAGE_URL" ] && DOCKER_IMAGE_URL=`cat /home/admin/${DOCKER_IMAGE_NAME}/docker_url`

echo step1. pull  ${DOCKER_IMAGE_URL}
docker pull $DOCKER_IMAGE_URL

echo step2. rm  ${DOCKER_INSTANCE_NAME}
docker rm -f ${DOCKER_INSTANCE_NAME}

echo step3. run ${DOCKER_INSTANCE_NAME}
docker run --name=${DOCKER_INSTANCE_NAME} --hostname=${DOCKER_INSTANCE_NAME} -d --restart=always ${DOCKER_OPTS} $DOCKER_IMAGE_URL
