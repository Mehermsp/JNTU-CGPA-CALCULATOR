FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/build ./build

ENV NODE_ENV=production
ENV PORT=10000

EXPOSE 10000
CMD ["sh", "-c", "serve -s build -l ${PORT}"]
