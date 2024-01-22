const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { usersController } = require("./src/controller/users.controller");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
    "Content-Type": "application/json",
  };

  if (event.requestContext.http.method == "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }

  const result = await usersController(event);

  return {
    statusCode: result.statusCode,
    headers,
    body: result.body,
  };
};
