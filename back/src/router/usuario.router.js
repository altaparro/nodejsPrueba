const router2 = require("express").Router()
const { faker } = require("@faker-js/faker")
const Usuarios = require("../model/usuario.model");
const { request } = require("express");

router2.get("/usuarios", async (req, res) => {
    const usuarios = await Usuarios.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: usuarios
    })
});

router2.get("/usuarios/:usuario_id", async (req, res) => {
    const id = req.params.usuario_id;
    const usuario = await Usuarios.findOne({
        where: {
           usuario_id: id,
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: usuario
    })
});

router2.post("/usuarios", async(req, res) => {
    const dataUsuarios = req.body
    await Usuarios.sync()
    const createUsuario = await Usuarios.create({
        usuario: dataUsuarios.usuario,
        contraseña: dataUsuarios.contraseña,
        email: dataUsuarios.email,
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "usuario cargado",
    })

});

router2.put("/usuarios/:usuario_id", async (req, res) => {
    const id = req.params.usuario_id;
    const dataUsuarios = req.body;
    const updateUsuario = await Usuarios.update(
        {
            usuario: dataUsuarios.usuario,
            contraseña: dataUsuarios.contraseña,
            email: dataUsuarios.email,
    }, 
    {
        where: {
           usuario_id: id 
        },
    }
    );
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateUsuario
    })
});

router2.patch

router2.delete("/usuarios/:usuario_id", async (req, res) => {
    const id= req.params.usuario_id;
    const deleteUsuario = await Usuarios.destroy({
        where: {
            usuario_id: id,
        }
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: deleteUsuario,
    })
});

module.exports = router2; // ver si hay que poner router2