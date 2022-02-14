FROM node:10-alpine 
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
RUN chown -R node:node /app
USER node
EXPOSE 3000
HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl http://localhost:3000/health -k || exit 1
CMD ["node", "app.js"]