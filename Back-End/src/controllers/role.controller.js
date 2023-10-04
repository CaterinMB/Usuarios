import { role } from '../models/role.model.js';
import { user } from '../models/user.model.js';
import { Op } from 'sequelize';

export const getRoles = async (req, res) => {
    try {
        const roles = await role.findAll()
        res.json(roles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRole = async (req, res) => {
    try {
        const { id } = req.params
        const getRole = await role.findOne({
            where: { ID_ROL: id }
        })

        if (!getRole) return res.status(404).json({ message: 'El rol no existe.' })

        res.json(getRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Nombre_Rol } = req.body;

        const existingRole = await role.findOne({
            where: {
                [Op.or]: [{ Nombre_Rol }],
            },
        });

        if (existingRole) {
            return res.status(400).json({
                error: 'Ya existe un rol con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createRoles = async (req, res) => {
    const { Nombre_Rol } = req.body;

    try {
        const newRole = await role.create({
            Nombre_Rol
        })

        res.json(newRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params
        const { Nombre_Rol } = req.body

        const updateRole = await role.findByPk(id)

        updateRole.Nombre_Rol = Nombre_Rol

        await updateRole.save()

        res.json(updateRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleRoleStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusRole = await role.findOne({
            where: { ID_ROL: id },
        });

        if (!statusRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        };

        statusRole.Estado = !statusRole.Estado;

        await statusRole.save();

        return res.json(statusRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params

        await role.destroy({
            where: { ID_ROL: id, }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRoleUser = async (req, res) => {
    const { id } = req.params
    const users = await user.findAll({
        where: { ID_ROL: id }
    });

    res.json(users);
};