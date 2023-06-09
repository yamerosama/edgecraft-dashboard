FROM node:18-alpine3.17 as build

# update and install the latest dependencies
# Add non root user to the docker image and set the user
RUN apk update && apk upgrade
# RUN apk update && apk upgrade && adduser -D nuxtuser

# USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the nuxt project content with proper permission for the user nuxtuser
# COPY --chown=nuxtuser:nuxtuser . /app
COPY . /app
# COPY . ./
# install all the project npm dependencies
# build the nuxt project to generate the artifacts in .output directory
RUN yarn install
RUN yarn build
# RUN npm install && npx nuxt build

# we are using multi stage build process to keep the image size as small as possible
FROM node:18-alpine3.17
# update and install latest dependencies, add dumb-init package
# add a non root user
RUN apk update && apk upgrade && apk add dumb-init
# RUN apk update && apk upgrade && apk add dumb-init && adduser -D nuxtuser 

# set non root user
# USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the output directory to the /app directory from 
# build stage with proper permissions for user nuxt user
COPY --from=build /app/.output ./
# COPY --chown=nuxtuser:nuxtuser --from=build /app/.output ./
# expose 8080 on container
EXPOSE 8080

# set app host and port . In nuxt 3 this is based on nitor and you can read
#more on this https://nitro.unjs.io/deploy/node#environment-variables
ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production
# start the app with dumb init to spawn the Node.js runtime process
# with signal support
CMD ["dumb-init","node","/app/server/index.mjs"]
