FROM node:18
WORKDIR /react-app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]