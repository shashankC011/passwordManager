FROM node:22-alpine

COPY dist /backend/dist
COPY src /backend/src
COPY tsconfig.json /backend
COPY package.json /backend

WORKDIR /backend

RUN npm install

CMD ["node","main.js"]