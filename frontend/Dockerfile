FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npx", "next", "dev", "-H", "0.0.0.0"]
