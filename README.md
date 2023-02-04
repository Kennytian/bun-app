# bun-app

## Build a docker image
```shell
docker build -t bun-app .
```

## Run
```shell
docker run --rm --name bun -d -p 3003:3000 bun-app
```

## Test
```shell
curl http://localhost:3003
```

## Develop
```shell
npm i -g bun

bun install

bun start
```