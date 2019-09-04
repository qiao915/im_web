# Latest Ubuntu LTS
FROM registry.cn-hangzhou.aliyuncs.com/juke/nginx-ep

# Conf
COPY ./nginx.conf /usr/local/nginx/conf/nginx.conf

# Copy asset
COPY ./dist /home/www

# Copy config
COPY ./config.sh /
RUN chmod a+x /config.sh
