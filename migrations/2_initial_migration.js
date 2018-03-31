var Migrations = artifacts.require("./NotSoSimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(NotSoSimpleStorage);
};
