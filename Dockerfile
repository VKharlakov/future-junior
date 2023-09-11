FROM node:18.12.0 as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build
CMD ["npm","run", "start"]
