FROM node:20-alpine AS base
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN apk add --no-cache bash
COPY package.json package-lock.json* ./

FROM base AS deps
RUN npm ci --omit=dev

FROM base AS deps-dev
ENV NODE_ENV=development
RUN npm ci

FROM node:20-alpine AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

FROM node:20-alpine AS dev
WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY --from=deps-dev /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
