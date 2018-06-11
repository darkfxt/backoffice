FROM nginx:1.12.2

ENV NPS_VERSION=1.11.33.4
ENV NGINX_VERSION 1.11.4

ARG APP_ENV=development
ENV STATIC_DIR=/opt/app/build/dist


# copy config to container
COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -i "s@STATIC_DIR@$STATIC_DIR@" /etc/nginx/nginx.conf

RUN mkdir -p /var/ngx_pagespeed_cache && chown -R www-data:www-data /var/ngx_pagespeed_cache

#Expose ports
EXPOSE 80

# Set the default command to execute
# when creating a new container
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
