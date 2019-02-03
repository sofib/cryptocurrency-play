FROM node:10.14-alpine AS builder

RUN apk add --update \
    make \
    g++ \
    python \
  && rm -rf /var/cache/apk/*

RUN mkdir /src
WORKDIR /src

ADD package.json /src
ADD yarn.lock /src

RUN yarn install

ADD . /src

RUN npm run build

FROM node:10.14-alpine AS runner
RUN apk add --update \
    make \
    g++ \
    python \
  && rm -rf /var/cache/apk/*

RUN mkdir -p /service/cryptocurrency-play/lib

COPY --from=builder /src/lib /service/cryptocurrency-play/lib/
COPY --from=builder /src/package.json /service/cryptocurrency-play/
COPY --from=builder /src/yarn.lock /service/cryptocurrency-play/

WORKDIR /service/cryptocurrency-play

RUN yarn install --production=true

# temporary, to have data to work with
RUN yarn run cli

ARG EXPOSED_PORT=80
ENV EXPOSED_PORT=$EXPOSED_PORT
EXPOSE $EXPOSED_PORT

RUN mkdir /sidecar
VOLUME ["/sidecar"]

CMD ["npm", "run", "api"]
