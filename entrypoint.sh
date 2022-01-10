truffle migrate --network develop_docker
cd /usr/src/service/app/src
if [ ${MODE} -eq 1 ];then
   npm ci --only=production
fi
npm start
