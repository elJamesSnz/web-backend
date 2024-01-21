const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = "users";
const INDEX_NAME = "username-index";

const addUser = async (userData) => {
  await dynamoDb
    .put({
      TableName: USERS_TABLE,
      Item: userData,
    })
    .promise();
};

const getUserById = async (id) => {
  const result = await dynamoDb
    .get({
      TableName: USERS_TABLE,
      Key: {
        id: id,
      },
    })
    .promise();

  return result.Item;
};

const getAllUsers = async () => {
  const result = await dynamoDb
    .scan({
      TableName: USERS_TABLE,
    })
    .promise();

  return result.Items;
};

const getUserByUsername = async (username) => {
  const result = await dynamoDb
    .query({
      TableName: USERS_TABLE,
      IndexName: INDEX_NAME,
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
    })
    .promise();

  return result.Items.length ? result.Items[0] : null;
};

const updateUserById = async (id, updateData) => {
  const updateExpression = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  if (updateData.newUsername) {
    const existingUser = await getUserByUsername(updateData.newUsername);
    if (existingUser) {
      throw new Error("Nuevo usuario ya en uso");
    }
    updateData.username = updateData.newUsername;
  }

  Object.keys(updateData).forEach((key) => {
    if (key === "newUsername" || key === "id") return;
    updateExpression.push(`#${key} = :${key}`);
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = updateData[key];
  });

  await dynamoDb
    .update({
      TableName: USERS_TABLE,
      Key: { id },
      UpdateExpression: "set " + updateExpression.join(", "),
      ExpressionAttributeNames: updateExpression.length
        ? expressionAttributeNames
        : undefined,
      ExpressionAttributeValues: expressionAttributeValues,
    })
    .promise();
};

const updateUserByUsername = async (username, updateData) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  await updateUserById(user.id, updateData);
};

const deleteUserById = async (id) => {
  await dynamoDb
    .delete({
      TableName: USERS_TABLE,
      Key: {
        id: id,
      },
    })
    .promise();
};

const deleteUserByUsername = async (username) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  await deleteUserById(user.id);
};

module.exports = {
  addUser,
  getUserById,
  updateUserById,
  updateUserByUsername,
  deleteUserById,
  deleteUserByUsername,
  getUserByUsername,
  getAllUsers,
};
