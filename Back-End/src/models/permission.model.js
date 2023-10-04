import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { role_permission } from './role_permission.model.js';

export const permission = sequelize.define('PERMISOS', {

    ID_PERMISO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Permiso: {
        type: DataTypes.STRING,
        allowNull: false,
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
    _Url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La URL es requerida'
            },
            isUrl: {
                msg: 'La URL debe tener un formato válido'
            },
            len: {
                args: [1, 255],
                msg: 'La URL debe tener entre 1 y 255 caracteres'
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

permission.hasOne(role_permission, {
    foreignKey: 'Permiso_ID',
    sourceKey: 'ID_PERMISO'
})

role_permission.belongsTo(permission, {
    foreignKey: 'Permiso_ID',
    targetKey: 'ID_PERMISO'
})