import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';

export const supplies = sequelize.define('INSUMOS', {
    ID_INSUMO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Insumo: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('El nombre del insumo debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            },
        },
    },
    Cantidad_Insumo: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
            isInt: true, 
            min: 0, 
            max: 9999, 
        },
    },
    Medida_Insumo: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            customValidate(value) {
                if (!/^[A-Za-z\s()]+$/.test(value)) {
                    throw new Error('La medida del insumo puede contener letras, espacios y paréntesis.');
                }
            },
        },
    },
    Stock_Minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 0,  
            max: 9999, 
        },
    },
    Estado: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    }
}, {
    timestamps: false
});