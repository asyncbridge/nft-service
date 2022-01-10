FROM aibakevision/nft-service-base-truffle:0.0.1

RUN cd /usr/src && mkdir service
ADD ./src /usr/src/service
ADD entrypoint.sh /usr/src/service

WORKDIR /usr/src/service

# truffle compile
RUN truffle compile 

# preapre express.js 
RUN cd /usr/src/service/app/src && npm install

WORKDIR /usr/src/service

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8080
ENTRYPOINT ["/bin/bash", "entrypoint.sh"]
