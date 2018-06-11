FROM dockerimages/docker-varnish
ENV VARNISH_BACKEND_PORT 80
ENV VARNISH_PORT 8080
# Make our custom VCLs available on the container
ADD default.vcl /etc/varnish/default.vcl
