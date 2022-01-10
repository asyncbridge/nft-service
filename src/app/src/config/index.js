const currentStack = process.env.stack;
const apiPrefix = '/api/v1/nft';
console.log(`stack is ${currentStack}.`);

module.exports = {
  pie: {
	api: {
		prefix: apiPrefix
	},
	express: {
		host: '0.0.0.0',
		port: 8080
	},
    ethereum: {
        rpc: 'HTTP://172.20.192.1:7545'
    }
  },
  stage: {
	api: {
		prefix: apiPrefix
	},
	express: {
		host: '0.0.0.0',
		port: 8080
	},
    ethereum: {
      rpc: 'http://0.0.0.0:7545'
    }
  },
  prod: {
	api: {
		prefix: apiPrefix
	},
	express: {
		host: '0.0.0.0',
		port: 8080
	},
    ethereum: {
      rpc: 'http://0.0.0.0:7545'
    }
  }
}[currentStack];
