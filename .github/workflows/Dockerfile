FROM node:19.2-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock .env ./
RUN yarn add @mui/icons-material --network-timeout 500000 # https://github.com/yarnpkg/yarn/issues/8754
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:1.19-alpine AS server
WORKDIR /usr/share/nginx
COPY --from=builder /app/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/.env .
COPY --from=builder /app/build ./html
RUN apk add --update nodejs npm
RUN npm install -g cra-envs@1.2.8
CMD sh -c "npx embed-environnement-variables && nginx -g 'daemon off;'"