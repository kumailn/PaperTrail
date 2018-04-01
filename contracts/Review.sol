pragma solidity ^0.4.17;

contract Review {
    string[] public comments;
    //0 = Rejected, 1 = Okay, 2 = Great
    uint[] public rating;
    // Adopting a pet
    string[] public hashes;
    address[] public users;

    function pushAll(string comment, uint rati, string hashf) public returns (bool a) {
        comments.push(comment);
        rating.push(rati);
        hashes.push(hashf);
        users.push(msg.sender);
        return true;
    }

    function pushRating(uint i) public returns (bool a) {
        rating.push(i);
        return true;
    }
    
    function pushHash(string i) public returns (bool a) {
        hashes.push(i);
        return true;
    }

    function pushUser() public returns (bool a) {
        users.push(msg.sender);
        return true;
    }

    function getLength() public view returns (uint) {
        return comments.length;
    }

    function getCommentAtIndex(uint i) public view returns (string a) {
        return(comments[i]);
    }

    function getRatingAtIndex(uint i) public view returns (uint a) {
        return(rating[i]);
    }
    
    function getHashAtIndex(uint i) public view returns (string a) {
        return(hashes[i]);
    }

    function getUserAtIndex(uint i) public view returns (address a) {
        return(users[i]);
    }


}