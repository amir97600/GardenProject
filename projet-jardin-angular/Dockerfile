FROM node:lts-bullseye AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ./node_modules/.bin/ng build

FROM nginx:latest

WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/projet-jardin-angular/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
