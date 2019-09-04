#!/bin/bash

# Config
sed --in-place -f - /home/www/config.js <<SED
s@apiUrl:.*@apiUrl:\"${KUICK_API_BASEURL}\",@
s@loginUrl:.*@loginUrl:\"${KUICK_DEAL_LOGIN_URL}\",@
s@registerUrl:.*@registerUrl:\"${KUICK_DEAL_REGISTER_URL}\",@
s@jsSDKDocUrl:.*@jsSDKDocUrl:\"${JS_SDK_DOC_URL}\"@
SED
