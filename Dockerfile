FROM node:16.10.0

WORKDIR /credit-card-web

COPY . .

RUN yarn

# RUN yarn build

EXPOSE 3000

CMD yarn dev

