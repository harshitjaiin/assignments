// Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not verified). Return false otherwise
const jwt = require("jsonwebtoken");
function validator(input){
  if(jwt.decode(input)){
    console.log(jwt.decode(input));
    return true;
  }
  else return false;
}


const token = jwt.sign("harshit" , "hash");

console.log(validator(token))