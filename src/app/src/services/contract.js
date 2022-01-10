const { rpc } = require('../config/index.js')['ethereum'];
const contract = require('@truffle/contract');
const token_artifact = require('../contracts/DeedToken.json');
var Token = contract(token_artifact);

module.exports = function(Web3) {
  this.web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  console.log(`Listening ethereum rpc server on ${rpc}`);
	
  var self = this;
  
  // Bootstrap the DeedToken abstraction for Use.
  Token.setProvider(self.web3.currentProvider);
	
  this.accounts = function(callback) {

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        //console.log("There was an error fetching your accounts.");
        callback(406,"There was an error fetching your accounts.", 0);
        return;
      }

      if (accs.length == 0) {
        //console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        callback(403, "Couldn't get any accounts! Make sure your Ethereum client is configured correctly.", 0);
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(200, null, {accounts:self.accounts});
    });
  },
  this.totalSupply = function(callback) {

	Token.deployed().then(function(instance) {
		  return instance.totalSupply.call();
		}).then(function(result) {
		  callback(200, null, {totalsupply:result.toNumber()});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(503, e.name + ": "+e.message, null);
		});
	},
  this.balanceOf = function(address, callback) {

	Token.deployed().then(function(instance) {
		  return instance.balanceOf.call(address);
		}).then(function(result) {
		  callback(200, null, {balance:result.toNumber()});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(404, e.name + ": "+e.message, null);
		});
	},
  this.mint = function(to, x,y,z, callback) {

	Token.deployed().then(function(instance) {
		  return instance.mint(x, y, z, {from: to});
		}).then(function(result) {
		  callback(200, null, result);
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(400, e.name + ": "+e.message, null);
		});
	},
  this.symbol = function(callback) {

	Token.deployed().then(function(instance) {
		  return instance.symbol.call();
		}).then(function(result) {
		  callback(200, null, {symbol:result});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(503, e.name + ": "+e.message, null);
		});
	},
  this.name = function(callback) {
	  
	Token.deployed().then(function(instance) {
		  return instance.name.call();
		}).then(function(result) {
		  callback(200, null, {name:result});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(503, e.name + ": "+e.message, null);
		});
	},
  this.ownerOf = function(token_id, callback) {
	
	Token.deployed().then(function(instance) {
		  return instance.ownerOf.call(token_id);
		}).then(function(result) {
		  callback(200, null, {address:result});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(404, e.name + ": "+e.message, null);
		});
	},
  this.transfer = function(from, operator, to, token_id, callback) {

	Token.deployed().then(function(instance) {
		  return instance.safeTransferFrom(from, to, token_id, {from: operator});
		}).then(function(result) {
		  callback(200, null, result);
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(400, e.name + ": "+e.message, null);
		});
	},
  this.approve = function(from, to, token_id, callback) {

	Token.deployed().then(function(instance) {
		  return instance.approve(to, token_id, {from: from});
		}).then(function(result) {
		  callback(200, null, result);
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(400, e.name + ": "+e.message, null);
		});
	},
  this.setapproveforall = function(from, to, approved, callback) {

	Token.deployed().then(function(instance) {
		  return instance.setApprovalForAll(to, approved, {from: from});
		}).then(function(result) {
		  callback(200, null, result);
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(400, e.name + ": "+e.message, null);
		});
	},
  this.approved = function(token_id, callback) {
	
	Token.deployed().then(function(instance) {
		  return instance.getApproved.call(token_id);
		}).then(function(result) {
		  callback(200, null, {address:result});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(404, e.name + ": "+e.message, null);
		});
	},
  this.approvedforall = function(owner, operator, callback) {
	
	Token.deployed().then(function(instance) {
		  return instance.isApprovedForAll.call(owner, operator);
		}).then(function(result) {
		  callback(200, null, {approved:result});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(404, e.name + ": "+e.message, null);
		});
	},
  this.burn = function(from, token_id, callback) {
	
	Token.deployed().then(function(instance) {
		  return instance.burn(token_id, {from:from});
		}).then(function(result) {
		  callback(200, null, null);
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(400, e.name + ": "+e.message, null);
		});
	},
  this.tokenbyindex = function(index, callback) {
	
	Token.deployed().then(function(instance) {
		  return instance.tokenByIndex.call(index);
		}).then(function(result) {
		  callback(200, null, {token_id:result});
		}).catch(function(e) {
		  // There was an error! Handle it.
		  callback(400, e.name + ": "+e.message, null);
		});
	}
}