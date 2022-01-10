const express = require('express');
const contract = require('./routes/contract.js');

module.exports = function (){
	const router = express.Router();
    contract(router);
	
	// ...more api
  
	return router;
};