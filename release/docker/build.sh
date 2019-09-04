#!/usr/bin/env bash
# -*- encoding UTF-8 -*-
# Author: wcw@kuick.cn

export PGRDIR=$(cd `dirname $0`; pwd)
export WORKSPACE=${PGRDIR}/../../
export NPM_OPTS="--python=/usr/alibaba/install/python-3.5.0/bin/python3 --registry=https://registry.npm.taobao.org"

echo step 1 install modules
cd $WORKSPACE && npm $NPM_OPTS install -d

echo step 2 build dist
cd $WORKSPACE && npm $NPM_OPTS run build
