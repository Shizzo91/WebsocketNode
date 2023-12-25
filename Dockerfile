FROM node:21
LABEL authors="joel.basquitt"

WORKDIR /home/app

COPY ./ ./

CMD ["npm", "run", "prod"]