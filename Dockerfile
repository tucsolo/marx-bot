FROM node:latest
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
# Uncomment to install jest and test this bot inside the container
# RUN npm install jest
COPY . .
CMD [ "npm", "start" ]
