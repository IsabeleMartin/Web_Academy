# Estágio de construção da aplicação
FROM node:18.16 AS build

WORKDIR /appbuild

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY ./src ./src
COPY ./prisma ./prisma

RUN npm ci
RUN npm run build

# Estágio de execução da aplicação
FROM node:18.16-slim

WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y openssl

COPY package.json .
COPY package-lock.json .
COPY .env .
COPY ./prisma ./prisma
COPY --from=build /appbuild/dist ./dist

RUN npm ci --omit=dev

EXPOSE 4444

CMD npm start
