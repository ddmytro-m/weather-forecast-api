FROM node:22
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./

ARG MODE=production
ENV MODE=$MODE

CMD ["npm", "run", "dev"]