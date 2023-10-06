const Usuarios = require("../model/usuario.model");


async function crearUsuario(req, res) {
    try {
        const dataUsuarios = req.body;
        await Usuarios.sync();
        const createUsuario = await Usuarios.create({
            usuario: dataUsuarios.usuario,
            contraseña: dataUsuarios.contraseña,
            email: dataUsuarios.email,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Usuario cargado",
        });
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

async function actualizarUsuario(req, res) {
    try {
        const id = req.params.usuario_id;
        const dataUsuarios = req.body;

        const [updateCount] = await Usuarios.update(
            {
                usuario: dataUsuarios.usuario,
                contraseña: dataUsuarios.contraseña,
                email: dataUsuarios.email,
            },
            {
                where: {
                    usuario_id: id,
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
    eliminarUsuario
};