FROM node:16

WORKDIR /usr/src/d

VOLUME /app/node_modules/bcrypt/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]