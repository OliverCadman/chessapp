FROM node:18-alpine

LABEL maintainer = "o.cadman@live.co.uk"

WORKDIR /app
COPY ./app /app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
