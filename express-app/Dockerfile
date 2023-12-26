FROM node:18
WORKDIR /express-app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]