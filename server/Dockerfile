FROM node:18-alpine AS development

WORKDIR /server

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile && yarn global add typescript

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

RUN tsc
RUN npx prisma generate

CMD [ "node", "dist/index.js" ]