import { user } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import { Op } from 'sequelize';

export const getUsers = async (req, res) => {
    try {
        const users = await user.findAll()
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const getUser = await user.findOne({ where: { ID_USUARIO: id } });

        if (!getUser) return res.status(404).json({ message: 'El usuario no existe' })

        res.json(getUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Documento, Email } = req.body;

        const existingUser = await user.findOne({
            where: {
                [Op.or]: [{ Documento }, { Email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                error: 'Ya existe un usuario con la misma cédula o correo electrónico.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { TipoDocumento, Documento, Apellido_Usuario, Nombre_Usuario, Contrasena, Email, Rol_ID } = req.body;

    try {
        const passwordHast = await bcrypt.hash(Contrasena, 10)

        const newUser = await user.create({
            TipoDocumento,
            Documento,
            Nombre_Usuario,
            Apellido_Usuario,
            Rol_ID,
            Email,
            Contrasena: passwordHast,
            Estado: true
        });

        const token = await createAccessToken({ id: newUser.id });

        res.cookie('token', token);
        res.json({
            message: "Usuario creado correctamente",
            Nombre: newUser.Nombre_Usuario,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params

    try {
        const { Apellido_Usuario, Nombre_Usuario, Contrasena, Email, Rol_ID } = req.body

        const updateUser = await user.findByPk(id)

        updateUser.Nombre_Usuario = Nombre_Usuario
        updateUser.Apellido_Usuario = Apellido_Usuario
        updateUser.Rol_ID = Rol_ID
        updateUser.Contrasena = Contrasena
        updateUser.Email = Email

        await updateUser.save();

        return res.json(updateUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleUserStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusUser = await user.findOne({
            where: { ID_USUARIO: id },
        });

        if (!statusUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        };

        statusUser.Estado = !statusUser.Estado;

        await statusUser.save();

        return res.json(statusUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        await user.destroy({
            where: { ID_USUARIO: id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ------------------------ ESTEFANIA ---------------- LOGIN --- LOGOUT --- PROFILE ----------------------//

export const login = async (req, res) => {
    const { Email, Contrasena } = req.body
    try {

        const userFound = await Usuario.findOne({ where: { Email } });
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(Contrasena, userFound.Contrasena)

        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ ID_USUARIO: userFound.ID_USUARIO });
        res.cookie('token', token);

        res.json({
            id: userFound.ID_USUARIO,
            usuario: userFound.Nombre_Usuario,
            email: userFound.Email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const UserFound = await Usuario.findById(req.Usuario.id)

    if (!UserFound) return res.status(400).json({ message: "User not found" });

    return res.json({
        id: UserFound.ID_USUARIO,
        usuario: UserFound.Nombre_Usuario,
        email: UserFound.Email,
        createdAt: UserFound.createdAt,
        updatedAt: UserFound.updatedAt
    });
}