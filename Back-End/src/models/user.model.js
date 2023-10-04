import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const user = sequelize.define('USUARIOS', {
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TipoDocumento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El tipo de documento es requerido'
            }, noSpecialCharacters(value) {
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
    Documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El número de identificacion es requerido'
            },
            len: {
                args: [8, 10],
                msg: 'El campo de número de identificacion debe ser mayor de 8 y menos de 10.'
            },
            isNumeric: {
                msg: 'El campo de número de identificacion debe contener solo números'
            },
            isValidFormat(value) {
                const numericRegex = /^[0-9]+$/;
                if (!numericRegex.test(value.toString())) {
                    throw new Error('El campo de número de identificacion debe contener solo números');
                }
            }
        }
    },
    Nombre_Usuario: {
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
            },
            len: {
                args: [5, 25],
                msg: 'El nombre debe tener de 5 a 25 caracteres.'
            }
        }
    },
    Apellido_Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El apellido es requerido'
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
            },
            len: {
                args: [5, 25],
                msg: 'El apellido debe tener de 5 a 25 caracteres.'
            }
        }
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El correo es requerido'
            },
            isEmail: {
                msg: 'El correo electrónico debe ser válido y contener el símbolo "@"'
            }
        }
    },
    Contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La contraseña es requerida'
            }
            // len: {
            //     args: [8, 25],
            //     msg: 'La contraseña debe tener al menos 8 caracteres y menos de 25'
            // },
            // isComplexPassword(value) {
            //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
            //     if (!passwordRegex.test(value)) {
            //         throw new Error('La contraseña debe contener al menos una mayúscula, una minúscula, un carácter especial y un número');
            //     }
            // }
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