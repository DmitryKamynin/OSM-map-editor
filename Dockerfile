FROM node:17.4 
WORKDIR /var/www/html
COPY ./ ./ 
RUN yarn install
RUN yarn build
CMD ["yarn","preview"] 
