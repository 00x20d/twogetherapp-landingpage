# Build stage
FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Run stage
FROM oven/bun:1-slim
WORKDIR /app

RUN groupadd -r app && useradd -r -g app app

COPY package.json bun.lockb* ./
RUN bun install --production --frozen-lockfile

COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/server ./server

USER app

ENV NODE_ENV=production
ENV PORT=3002

EXPOSE 3002

CMD ["bun", "run", "server/index.js"]