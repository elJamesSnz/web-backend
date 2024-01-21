const usersDAO = require("../dao/usersDAO");
const crypto = require("crypto");

const createUser = async (userData) => {
  const existingUser = await usersDAO.getUserByUsername(userData.username);
  if (existingUser) {
    return null;
  }

  userData.id = crypto.randomUUID();
  await usersDAO.addUser(userData);
  return userData.id;
};

const updateUserById = async (id, updateData) => {
  await usersDAO.updateUserById(id, updateData);
};

const updateUserByUsername = async (username, updateData) => {
  await usersDAO.updateUserByUsername(username, updateData);
};

const deleteUserById = async (id) => {
  await usersDAO.deleteUserById(id);
};

const deleteUserByUsername = async (username) => {
  await usersDAO.deleteUserByUsername(username);
};

const getUserById = async (id) => {
  return await usersDAO.getUserById(id);
};

const getUserByUsername = async (username) => {
  return await usersDAO.getUserByUsername(username);
};

const getAllUsers = async () => {
  return await usersDAO.getAllUsers();
};

module.exports = {
  createUser,
  updateUserById,
  updateUserByUsername,
  deleteUserById,
  deleteUserByUsername,
  getUserById,
  getUserByUsername,
  getAllUsers,
};
