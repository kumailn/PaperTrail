pragma solidity ^0.4.17;

contract Store {
    //Store the list of ETH addresses
    address[16] public users;
    string[] papers;
    string fileHash;
    string userAddress;
    string userName;

    function save(string x, string y, string z) public returns (bool) {
        fileHash = x;
        userAddress = y;
        userName = z;
        papers.push(x);
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

    function addPaper(string _hash) public{
        papers.push(_hash);
    }
    
    function getPaperAtIndex(uint index) public view returns (string paper) {
        if (index < papers.length){
            return papers[index];
        }
        return "nul";
    }

    function getLen() public view returns (uint) {
        return papers.length;
    }

}