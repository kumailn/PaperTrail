var Review = artifacts.require("./Review.sol");

module.exports = function(deployer) {
    deployer.deploy(Review, {gas: 5000000});
};