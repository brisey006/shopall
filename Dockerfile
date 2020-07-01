FROM node:12

WORKDIR /usr/src/app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
