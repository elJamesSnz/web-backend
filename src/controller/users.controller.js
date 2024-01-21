const usersSchema = require("../validation/users.validationSchema");
const userService = require("../service/users.service");

const usersController = async (event) => {
  const httpMethod = event.requestContext.http.method;
  let statusCode = 200;
  let responseBody = {};

  try {
    let data = event.body ? JSON.parse(event.body) : {};

    switch (httpMethod) {
      case "DELETE":
        let userToDelete;
        if (data.id) {
          userToDelete = await userService.getUserById(data.id);
        } else if (data.username) {
          userToDelete = await userService.getUserByUsername(data.username);
        }

        if (!userToDelete) {
          statusCode = 404;
          const identifier = data.username
            ? `username {${data.username}}`
            : `ID {${data.id}}`;
          responseBody = {
            status: 404,
            msg: `Usuario con ${identifier} no encontrado`,
          };
        } else {
          if (data.id) {
            await userService.deleteUserById(data.id);
          } else {
            await userService.deleteUserByUsername(data.username);
          }
          responseBody = {
            status: 200,
            msg: `Usuario ${data.username || data.id} eliminado`,
          };
        }
        break;

      case "GET":
        if (
          event.queryStringParameters &&
          event.queryStringParameters.username
        ) {
          const user = await userService.getUserByUsername(
            event.queryStringParameters.username
          );
          responseBody = user
            ? {
                status: 200,
                msg: "Usuario recuperado con username",
                data: user,
              }
            : {
                status: 404,
                msg: `Usuario con username {${event.queryStringParameters.username}} no encontrado`,
                data: null,
              };
        } else if (
          event.queryStringParameters &&
          event.queryStringParameters.id
        ) {
          const user = await userService.getUserById(
            event.queryStringParameters.id
          );
          responseBody = user
            ? { status: 200, msg: "Usuario recuperado con id", data: user }
            : {
                status: 404,
                msg: `Usuario con id {${event.queryStringParameters.id}} no encontrado`,
                data: null,
              };
        } else {
          const users = await userService.getAllUsers();
          responseBody = {
            status: 200,
            msg: "Todos los usuarios recuperados",
            data: users,
          };
        }
        break;
      case "POST":
        const validationResult = usersSchema.validate(data);
        if (validationResult.error) {
          statusCode = 400;
          responseBody = {
            status: 400,
            msg: validationResult.error.details[0].message,
          };
          break;
        }

        const userToCreate = await userService.getUserByUsername(data.username);
        if (userToCreate) {
          statusCode = 400;
          responseBody = {
            status: 400,
            msg: `Usuario con username {${data.username}} ya en uso`,
          };
        } else {
          const userId = await userService.createUser(data);
          responseBody = {
            status: 201,
            msg: "Usuario creado",
            data: { id: userId },
          };
        }
        break;

      case "PUT":
        let userToUpdate;
        if (data.id) {
          userToUpdate = await userService.getUserById(data.id);
        } else if (data.username) {
          userToUpdate = await userService.getUserByUsername(data.username);
        }

        if (!userToUpdate) {
          statusCode = 404;
          const identifier = data.username
            ? `username {${data.username}}`
            : `ID {${data.id}}`;
          responseBody = {
            status: 404,
            msg: `Usuario con ${identifier} no encontrado`,
          };
        } else {
          if (data.newUsername) {
            const existingUser = await userService.getUserByUsername(
              data.newUsername
            );
            if (existingUser) {
              responseBody = {
                status: 400,
                msg: `El nuevo username {${data.newUsername}} ya está en uso`,
              };
              break;
            }
          }

          if (data.id) {
            await userService.updateUserById(data.id, userToUpdate, data);
            responseBody = {
              status: 200,
              msg: `Usuario con id {${data.id}} actualizado`,
            };
          } else {
            await userService.updateUserByUsername(
              data.username,
              userToUpdate,
              data
            );
            responseBody = {
              status: 200,
              msg: `Usuario con username {${data.username}} actualizado`,
            };
          }
        }
        break;

      default:
        statusCode = 400;
        responseBody = {
          status: 400,
          msg: `Método ${httpMethod} no soportado`,
        };
        break;
    }
  } catch (err) {
    console.error(err);
    statusCode = 500;
    responseBody = {
      status: 500,
      msg: "Error Interno del Servidor",
      error: err.toString(),
    };
  }

  return {
    statusCode,
    body: JSON.stringify(responseBody),
  };
};

module.exports = { usersController };
