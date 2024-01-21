const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { usersController } = require("./src/controller/users.controller");

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const result = await usersController(event);

  return {
    statusCode: result.statusCode,
    body: result.body,
    headers,
  };
};
