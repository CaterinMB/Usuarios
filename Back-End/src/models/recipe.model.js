import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const recipe = sequelize.define('RECETAS', {
    ID_RECETA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Cantidad: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La cantidad es requerida'
            },
            isInt: {
                msg: 'La cantidad debe ser un número entero'
            },
            min: {
                args: [1],
                msg: 'La cantidad debe ser al menos 1'
            },
            max: {
                args: [25],
                msg: 'La cantidad no puede exceder 25'
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