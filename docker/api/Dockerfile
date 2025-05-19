FROM node:22
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]