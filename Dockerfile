FROM node:18-alpine AS build

WORKDIR /app

COPY package.json

RUN npm install --frozen-lockfile

COPY . .

ARG REACT_APP_API_URL=http://localhost:3000/api # for local testing using docker
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm build

FROM nginx:1.25-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
