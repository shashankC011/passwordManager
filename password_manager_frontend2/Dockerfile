FROM node:22-alpine

COPY package.json /frontend
COPY src /frontend/src
COPY public /frontend/public
COPY tsconfig.json /frontend

WORKDIR /frontend

RUN npm install

CMD ["npm","start"]