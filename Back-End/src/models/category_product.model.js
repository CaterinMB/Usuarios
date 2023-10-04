import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { product } from './product.model.js';

export const category_product = sequelize.define('CATEGORIA_PRODUCTOS', {
    ID_CATEGORIA_PRODUCTO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Categoria: {
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

category_product.hasMany(product, {
    foreignKey: 'CATEGORIA_PRODUCTO_ID',
    sourceKey: 'ID_CATEGORIA_PRODUCTO'
})

product.belongsTo(category_product, {
    foreignKey: 'CATEGORIA_PRODUCTO_ID',
    targetId: 'ID_CATEGORIA_PRODUCTO'
})