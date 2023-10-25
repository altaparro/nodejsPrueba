const Usuarios = require("../model/usuario.model");
const bcrypt = require("bcrypt");

async function crearUsuario(req, res) {
  try {
    const dataUsuarios = req.body;

    // Verificar si el usuario o el email ya existen, recorriendo la base
    const usuarioExistente = await Usuarios.findOne({
      where: { usuario: dataUsuarios.usuario },
    });
    const emailExistente = await Usuarios.findOne({
        where: { email: dataUsuarios.email },
      });

    if (usuarioExistente || emailExistente) {
      return res.status(409).json({
        ok: false,
        status: 409,
        message: "El usuario o el email ya existe",
      });
    } else {
      const hashedPassword = await bcrypt.hash(dataUsuarios.password, 8);

      await Usuarios.sync();

      const createUsuario = await Usuarios.create({
        usuario: dataUsuarios.usuario,
        password: hashedPassword,
        email: dataUsuarios.email,
        rol: dataUsuarios.rol,
      });

      res.status(201).json({
        ok: true,
        status: 201,
        message: "Usuario cargado",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al crear el usuario",
    });
  }
}

async function obtenerUsuarioPorID(req, res) {
  try {
    const id = req.params.usuario_id;
    const usuario = await Usuarios.findOne({
      where: {
        usuario_id: id,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener el usuario",
    });
  }
}

async function obtenerTodosLosUsuarios(req, res) {
  const userId = req.userId;
  try {
    const usuarios = await Usuarios.findAll();

    res.status(200).json({
      ok: true,
      status: 200,
      body: usuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener todos los usuarios",
    });
  }
}
// actualiza usuario propio de quien loguea luego agregar para un admin que modifique todos

async function actualizarUsuario(req, res) {
  const userId = req.userId; // Obten el ID del usuario autenticado desde el token
  console.log(userId);
  const dataUsuarios = req.body;
  const hashedPassword = await bcrypt.hash(dataUsuarios.password, 8);

  try {
    const [updateCount] = await Usuarios.update(
      {
        usuario: dataUsuarios.usuario,
        password: hashedPassword,
        email: dataUsuarios.email,
        rol: dataUsuarios.rol,
      },
      {
        where: {
          usuario_id: userId, // Utiliza el ID del usuario del token
        },
      }
    );

    if (updateCount === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al actualizar el usuario",
    });
  }
}

async function actualizarUsuarioPorID(req, res) {
 
  
  const dataUsuarios = req.body;
  const hashedPassword = await bcrypt.hash(dataUsuarios.password, 8);

  try {
    const [updateCount] = await Usuarios.update(
      {
        usuario_id: dataUsuarios.usuario_id,
        usuario: dataUsuarios.usuario,
        password: hashedPassword,
        email: dataUsuarios.email,
        rol: dataUsuarios.rol,
      },
      {
        where: {
          usuario_id: dataUsuarios.usuario_id, 
        },
      }
    );

    if (updateCount === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al actualizar el usuario",
    });
  }
}


async function eliminarUsuario(req, res) {
  try {
    const id = req.params.usuario_id;

    const deleteCount = await Usuarios.destroy({
      where: {
        usuario_id: id,
      },
    });

    if (deleteCount === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Usuario no encontrado",
      });
    }

    res.status(204).json({
      ok: true,
      status: 204,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al eliminar el usuario",
    });
  }
}

module.exports = {
  crearUsuario,
  obtenerUsuarioPorID,
  obtenerTodosLosUsuarios,
  actualizarUsuario,
  actualizarUsuarioPorID,
  eliminarUsuario,
};
