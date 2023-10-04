import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const role_permission = sequelize.define('DETALLE_ROLES', {
    ID_ROL_PERMISOS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El estado es requerido'
            }
        }
    }
}, {
    timestamps: false
});