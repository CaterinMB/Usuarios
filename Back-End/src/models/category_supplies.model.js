import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';
import { supplies } from "./supplies.model.js";

export const category_supplies = sequelize.define('CATEGORIA_INSUMOS', {
    ID_CATEGORIA_INSUMO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Categoria: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
            customValidate(value) {
                if (!/^[A-ZÁ-Ú][a-zá-ú\s]*[a-zá-ú]$/.test(value)) {
                    throw new Error('El nombre de la categoria debe tener solo la primera letra en mayúscula y las siguientes en minúscula.');
                }
            },
        },
    },
    Estado: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    }
}, {
    timestamps: false
});

category_supplies.hasMany(supplies, {
    foreignKey: 'CATEGORIA_INSUMO_ID',
    sourcekey: 'ID_CATEGORIA_INSUMO'
});

supplies.belongsTo (category_supplies, {
    foreignKey: 'CATEGORIA_INSUMO_ID',
    target: 'ID_CATEGORIA_INSUMO'
});

