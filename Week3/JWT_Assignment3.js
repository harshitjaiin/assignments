// Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED. Return false otherewise

const key = "hash";
const jwt = require('jsonwebtoken');

function tokeniser(input){
  try{
    const verified = jwt.verify(input , key);
    return {
      "msg" : "success"
    }
  }
  catch{
    return {
      "msg" : "failure"
    }
  }

}

const token = jwt.sign({username: "Harshit"} , key);
console.log(tokeniser(token));