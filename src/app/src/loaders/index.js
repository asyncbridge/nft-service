const expressLoader = require('./express.js');

module.exports.init = async function (expressApp) {
  await expressLoader.init(expressApp);
  console.log('Express Intialized');

  // ... more loaders can be here

  // ... initialize agenda
  // ... or Redis, or whatever you want
};