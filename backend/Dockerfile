FROM node:21

WORKDIR /backend
EXPOSE 3000

COPY . .

RUN npm install
RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]
