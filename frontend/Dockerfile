FROM node:21

ARG API_URL
ENV API_URL=${API_URL}

WORKDIR /frontend
EXPOSE 3001

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]
