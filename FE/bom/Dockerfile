FROM node:16.16.0 as build-stage
ENV WDS_SOCKET_PORT=443
WORKDIR /var/jenkins_home/workspace/thundervolt/FE/bom

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /var/jenkins_home/workspace/thundervolt/FE/bom/build /usr/share/nginx/html
#COPY --from=build-stage /var/jenkins_home/workspace/thundervolt/FE/bom/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
EXPOSE 3000

# CMD ["nginx", "-g","daemon off;"]
CMD ["npm", "start"]