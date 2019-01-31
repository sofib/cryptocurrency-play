FROM node:10.14-alpine AS builder

RUN mkdir /src
WORKDIR /src

ADD package.json /src
ADD yarn.lock /src

RUN yarn install

ADD . /src

RUN npm run build

FROM node:10.14-alpine AS runner
RUN mkdir -p /service/cryptocurrency-play

COPY --from=builder /src/lib /service/cryptocurrency-play/
COPY --from=builder /src/package.json /service/cryptocurrency-play

WORKDIR /service/cryptocurrency-play
RUN yarn install --production=true
RUN ls -la

ARG EXPOSED_PORT=80
ENV EXPOSED_PORT=$EXPOSED_PORT
EXPOSE $EXPOSED_PORT

CMD ["npm", "run", "api"]