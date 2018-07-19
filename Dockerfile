# Get Environment from docker compose file
ARG ENV

FROM node:8.11.1
RUN npm install pm2@latest -g

ENV NODE_ENV $ENV

COPY . /opt/app/
EXPOSE 5000
ENTRYPOINT ["./opt/app/start.sh"]
