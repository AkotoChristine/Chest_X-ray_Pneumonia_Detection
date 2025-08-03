FROM node:18 AS build

WORKDIR /obeseapp

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm install -g vite


RUN npm run build

FROM nginx:1.23


COPY --from=build /pnuemoscan/dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
