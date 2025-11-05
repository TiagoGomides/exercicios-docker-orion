FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
FROM base AS deps-dev
RUN npm ci
COPY . .
FROM base AS deps-prod
RUN npm ci --omit=dev
COPY . .
FROM node:22-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npx", "nodemon", "--legacy-watch", "src/index.js"]
FROM node:22-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps-prod /app/node_modules ./node_modules
COPY ./src ./src
COPY package*.json ./
EXPOSE 3000
CMD ["node", "src/index.js"]
