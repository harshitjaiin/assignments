// Write a function that takes in a username and password and returns a JWT token with the username encoded. Should return null if the username is not a valid email or if the password is less than 6 characters. Try using the zod library here

const express = require("express");
const jwt = require("jsonwebtoken");
const z = require("zod");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const schema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});
function validator(username, password) {
  const validatedData = schema.safeParse({ username, password });
  if (validatedData.success) {
    const token = jwt.sign(validatedData, "hash");
    return {
      token,
    };
  } else {
    return {
      msg: "Please provide correct inputs",
    };
  }
}

console.log(validator("xcv@lec.om", "passd"));
