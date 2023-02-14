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
curl http://localhost:3000

curl -X POST http://localhost:3000/send -d '{"mobile":"13800138000"}'

curl -X POST http://localhost:3000/verify -d '{"mobile":"13800138000", "code":"123456"}'
```

## Develop
```shell
npm i -g bun

bun install

bun start
```
