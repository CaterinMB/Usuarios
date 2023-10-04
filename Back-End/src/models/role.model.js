import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { user } from './user.model.js';
import { role_permission } from './role_permission.model.js';

export const role = sequelize.define('ROLES', {
    ID_ROL: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Rol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            noSpecialCharacters(value) {
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                if (specialCharacters.test(value)) {
                    throw new Error('Este campo no puede contener caracteres especiales');
                }
            },
            noNumbers(value) {
                if (/[0-9]/.test(value)) {
                    throw new Error('Este campo no puede contener números');
                }
            }
        }
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

role.hasMany(user, {
    foreignKey: 'Rol_ID',
    sourceKey: 'ID_ROL'
})

user.belongsTo(role, {
    foreignKey: 'Rol_ID',
    targetId: 'ID_ROL'
})

role.hasOne(role_permission, {
    foreignKey: 'Rol_ID',
    sourceKey: 'ID_ROL'
})

role_permission.belongsTo(role, {
    foreignKey: 'Rol_ID',
    targetKey: 'ID_ROL'
})