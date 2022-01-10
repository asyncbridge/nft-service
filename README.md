# nft-service  

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

This is a container service for nft transaction based on Ethereum ERC-721 contract.

## How to build

```bash
./build.sh
```

## How to run

```bash
./run.sh
```

## How to run as production mode of npm  
change MODE environment variable to 1.  

```bash
docker run -p 8080:8080 -it -e MODE=1 aibakevision/nft-service:0.0.1
```

## How to change npm parameters

Open entrypoint.sh and edit it according to follow stack.  
  
```bash
npm run pie-linux
```

### for linux  
- pie-linux  
- stage-linux  
- prod-linux  

### for windows  
- pie-windows  
- stage-windows  
- prod-windows  

### for truffle 
- compile
- deploy

## License and Citation

- This project is made available under the [MIT License](LICENSE).
- Refer to Solidity code. https://www.inflearn.com/course/erc-721/?action=questions&filter=open#curriculum
