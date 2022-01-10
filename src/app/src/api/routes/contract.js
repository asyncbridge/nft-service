const Web3 = require('web3');
var contract = require('../../services/contract.js');
var contractInstance = new contract(Web3);

function responseHandler(res, statusCode, error, answer)
{
	if (error)
	{
		res.status(statusCode).json({status:"failure", data:{message:error}});
	}
	else
	{
		if(answer)
		{
			res.status(statusCode).json({status:"success", data:answer});
		}
		else
		{
			res.status(statusCode).json({status:"success"});
		}
	}
}

module.exports = function (route){
	route.get('/accounts', (req, res) => {
	  console.log("GET /accounts API");

	  contractInstance.accounts(function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.get('/totalsupply', (req, res) => {
	  console.log("GET /totalsupply API");
	  
	  contractInstance.totalSupply(function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});

	route.get('/balanceof/:address', (req, res) => {
	  console.log("GET /balanceof API");
	  contractInstance.balanceOf(req.params["address"], function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.post('/mint', (req, res) => {
	  console.log("POST /mint API");
	  contractInstance.mint(req.body.to, req.body.x, req.body.y, req.body.z, function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.get('/symbol', (req, res) => {
	  console.log("GET /symbol API");
	  contractInstance.symbol(function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.get('/name', (req, res) => {
	  console.log("GET /name API");
	  
	   contractInstance.name(function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.get('/ownerof/:token_id', (req, res) => {
	  console.log("GET /ownerof API");
	  contractInstance.ownerOf(req.params["token_id"], function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.post('/transfer', (req, res) => {
	  console.log("POST /transfer API");
	  
	  if(req.body.operator == null)
	  {
		  req.body.operator = req.body.from;
	  }
	  
	  contractInstance.transfer(req.body.from, req.body.operator, req.body.to, req.body.token_id, function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.post('/approve', (req, res) => {
	  console.log("POST /approve API");
	  contractInstance.approve(req.body.from, req.body.to, req.body.token_id, function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.post('/setapproveforall', (req, res) => {
	  console.log("POST /setapproveforall API");
	  contractInstance.setapproveforall(req.body.from, req.body.to, req.body.approved, function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.get('/approved/:token_id', (req, res) => {
	  console.log("GET /approved API");
	  contractInstance.approved(req.params["token_id"], function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.get('/approvedforall', (req, res) => {
	  console.log("GET /approvedforall API");
	  contractInstance.approvedforall(req.body.owner, req.body.operator, function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.delete('/burn', (req, res) => {
	  console.log("GET /burn API");
	  contractInstance.burn(req.body.from, req.body.token_id, function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
	
	route.get('/tokenbyindex/:index', (req, res) => {
	  console.log("GET /tokenbyindex API");
	  contractInstance.tokenbyindex(req.params["index"], function (statusCode, error, answer) {
		responseHandler(res, statusCode, error, answer);
	  });
	});
};