const usersDAO = require("../dao/usersDAO");
const crypto = require("crypto");

const handleSkills = (oldData, updateData) => {
  if (!oldData.skills || oldData.skills.length === 0) {
    return updateData.skills || [];
  }
  if (!updateData.skills || updateData.skills.length === 0) {
    return [];
  }
  const updateSkillsSet = new Set(updateData.skills);
  const retainedSkills = oldData.skills.filter((skill) =>
    updateSkillsSet.has(skill)
  );

  return Array.from(new Set([...retainedSkills, ...updateData.skills]));
};

const createUser = async (userData) => {
  const existingUser = await usersDAO.getUserByUsername(userData.username);
  if (existingUser) {
    return null;
  }

  userData.id = crypto.randomUUID();
  await usersDAO.addUser(userData);
  return userData.id;
};

const updateUserById = async (id, oldData, updateData) => {
  const updatedSkills = handleSkills(oldData, updateData);
  updateData.skills = updatedSkills;
  await usersDAO.updateUserById(id, updateData);
};

const updateUserByUsername = async (username, oldData, updateData) => {
  const updatedSkills = handleSkills(oldData, updateData);
  updateData.skills = updatedSkills;
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
