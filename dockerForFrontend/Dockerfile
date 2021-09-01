FROM node:14-slim

WORKDIR /home/app

COPY ./app/package.json .
COPY ./app/package-lock.json .

RUN npm install  --silent && npm install react-scripts@3.4.1 -g --silent

COPY ./app .

EXPOSE 3000

CMD ["npm", "start"]