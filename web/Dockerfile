FROM node:18-alpine AS development

WORKDIR /web

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn global add typescript 

# Copy everything but node_modules
COPY . ./
COPY --from=server ./dist /server/dist
# COPY public ./public
# COPY *config* ./
# COPY src ./src
# COPY *.html ./

CMD ["yarn", "dev", "--host"]

FROM development AS builder

RUN yarn build

FROM nginx:1.13-alpine

# RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
# RUN pip3 install pip --upgrade
# RUN pip3 install certbot-nginx
# RUN mkdir /etc/letsencrypt


# COPY nginx.conf /etc/nginx/nginx.conf
# COPY test.crt /
# COPY test.key /
# COPY test.conf /etc/nginx/sites-available/
# COPY test.conf /etc/nginx/conf.d/test.conf
# RUN cat >> etc/hosts
COPY --from=builder /web/dist /usr/share/nginx/html