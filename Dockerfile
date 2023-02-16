FROM oven/bun:latest
WORKDIR /app

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

COPY . .

CMD ["bun", "start"]
