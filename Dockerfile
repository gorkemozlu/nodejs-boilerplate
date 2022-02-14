FROM node:10-alpine 
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
RUN chown -R node:node /app
USER node
EXPOSE 11130
HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl http://localhost:11130/health -k || exit 1
CMD ["node", "app.js"]