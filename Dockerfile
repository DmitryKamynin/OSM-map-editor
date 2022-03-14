FROM node:17.4 
WORKDIR /var/www/html
COPY ./ ./ 
RUN yarn install
RUN yarn build
RUN mv ./r ./dist/
RUN mv ./r1 ./dist/
RUN mv ./server.js ./

CMD ["node","dist/server.js"]
