FROM node

ARG app_env
ENV APP_ENV $app_env

COPY package.json /package.json
COPY .babelrc /.babelrc
COPY webpack /webpack
COPY src /src
COPY dist /dist

EXPOSE 8080

RUN yarn

# CMD if [ ${APP_ENV} = production ]; \
#     then \
#     yarn install -g http-server && \
#     yarn run build && \
#     cd build && \
#     hs -p 3000; \
#     else \
#     yarn start; \
#     fi

RUN yarn start