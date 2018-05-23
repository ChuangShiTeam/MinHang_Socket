FROM registry.cn-hangzhou.aliyuncs.com/sblockchain/node:latest
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN apk update
ENV PORT=4000
CMD ["node", "index.js"]
EXPOSE 4000
