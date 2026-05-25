FROM node:18-alpine

WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of the code
COPY . .

# expose port
EXPOSE 3000

# start the app
CMD ["node", "server.js"]
