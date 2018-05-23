echo 'deploy start'
sleep 2s

docker login --username=nowui@aliyun.com --password=shengli.2010 registry.cn-hangzhou.aliyuncs.com

docker build -t registry.cn-hangzhou.aliyuncs.com/nowui/nowui-wss .

docker push registry.cn-hangzhou.aliyuncs.com/nowui/nowui-wss

ssh root@47.96.75.167 docker pull registry.cn-hangzhou.aliyuncs.com/nowui/nowui-wss

ssh root@47.96.75.167 docker stop nowui-wss

ssh root@47.96.75.167 docker rm nowui-wss

ssh root@47.96.75.167 docker run -d --name nowui-wss -p 4000:4000 registry.cn-hangzhou.aliyuncs.com/nowui/nowui-wss
