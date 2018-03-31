pragma solidity ^0.4.17;

contract Store {
    //Store the list of ETH addresses
    address[16] public users;
    string fileHash;
    string userAddress;
    string userName;

    function save(string x, string y, string z) public returns (bool) {
        fileHash = x;
        userAddress = y;
        userName = z;
        return true;
    }

    function getFile() public view returns (string) {
        return fileHash;
    }

    function getAll() public view returns (string) {
        return fileHash;
    }

    function getName() public view returns (string) {
        return userName;
    }

}