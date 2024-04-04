FROM oven/bun:latest as base

FROM base as deps

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install

FROM base as build

WORKDIR /usr/src/app

COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules

RUN bun run build

FROM oven/bun:alpine AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/bun.lockb ./bun.lockb

RUN bun install --production

EXPOSE 3333

CMD [ "bun", "start" ]


