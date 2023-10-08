import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useRole } from '../context/RoleContext';

function CreateUser({ onClose, onCreated }) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { createUser, user } = useUser();
    const [selectedType, setSelectedType] = useState({ label: 'Seleccione tipo', value: '', isDisabled: true });
    const { role } = useRole();
    const [selectRole, setSelectRol] = useState({ label: 'Seleccionar Rol', value: '', isDisable: true });

    const typeOptions = [
        { label: 'Seleccione tipo', value: '', isDisabled: true },
        { label: 'Registro civli', value: 'RC' },
        { label: 'Tarjeta de identidad', value: 'TI' },
        { label: 'Cédula de ciudadanía', value: 'CC' },
        { label: 'Cédula de extranjería', value: 'CE' },
        { label: 'Pasaporte', value: 'PB' },
    ];

    const rolOpcions = role.map(option => ({ label: option.Nombre_Rol, value: option.ID_ROL }));

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '1px solid #201E1E' : '1px solid #201E1E',
            '&:hover': {
                border: '1px solid #201E1E',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#e36209' : state.isFocused ? '#e36209' : 'white',
            color: state.isSelected ? 'white' : state.isFocused ? '#555' : '#201E1E',
            '&:hover': {
                backgroundColor: '#e36209',
                color: 'white',
            },
            cursor: state.isDisabled ? 'not-allowed' : 'default',
        }),
    };

    const onSubmit = handleSubmit(async (values) => {
        const isDocumentoDuplicate = user.some(users => users.Documento === values.Documento);
        const isEmailDuplicate = user.some(users => users.Email === values.Email);

        if (isDocumentoDuplicate) {
            setError('Documento', {
                type: 'manual',
                message: 'El documento del usuario ya existe.'
            });
            return;
        }

        if (isEmailDuplicate) {
            setError('Email', {
                type: 'manual',
                message: 'El correo del usuario ya existe.'
            });
            return;
        }

        if (!selectedType || selectedType.value === '') {
            setError('TipoDocumento', {
                type: 'manual',
                message: 'Debe seleccionar un tipo de documento.'
            });
            return;
        }

        if (!selectRole || selectRole.value === '') {
            setError('Rol_ID', {
                type: 'manual',
                message: 'Debe seleccionar un rol.'
            });
            return;
        }

        values.TipoDocumento = selectedType.value;
        values.Rol_ID = selectRole.value;

        createUser(values);
        onCreated();
        onClose();
    });

    const onCancel = () => {
        onClose();
    };

    return (
        <div className='max-w-md mx-auto p-4 down'>
            <h1 className="text-3xl font-semibold text-center mb-4">Nuevo Usuario</h1>
            <form onSubmit={onSubmit}>

                <div className='columnas inferior'>
                    <div className="mb-1">
                        <label htmlFor="TipoDocumento" className="mb-2 block">Tipo de documento: <strong>*</strong></label>
                        <Select
                            options={typeOptions}
                            {...register("TipoDocumento")}
                            value={selectedType}
                            onChange={(selectedOption) => setSelectedType(selectedOption)}
                            menuPlacement="auto"
                            menuShouldScrollIntoView={false}
                            maxMenuHeight={132}
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#201E1E',
                                },
                            })}
                        />
                        {errors.TipoDocumento && <p className="text-red-500">{errors.TipoDocumento.message}</p>}
                    </div>

                    <div className="mb-1">

                        <label htmlFor="Documento" className="mb-2 block">Número de identidad: <strong>*</strong></label>
                        <input
                            type="number"
                            {...register("Documento", {
                                required: 'El documento es obligatoria',
                                validate: (value) => {
                                    const parsedValue = parseInt(value);
                                    if (isNaN(parsedValue) || parsedValue < 10000000 || parsedValue > 9999999999) {
                                        return 'El número no es valido, debe tener de 8 a 10 caracteres.';
                                    }
                                    return true;
                                }
                            })}
                            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                            placeholder="Documento"
                        />
                        {errors.Documento && (<p className='text-red-500'>{errors.Documento.message}</p>)}
                    </div>

                    <div className="mb-1">
                        <label htmlFor="Nombre_Usuario" className="mb-2 block">Nombres: <strong>*</strong></label>
                        <input
                            type="text"
                            {...register("Nombre_Usuario", {
                                required: 'El nombre es obligatorio',
                                pattern: {
                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                    message: 'El nombre del usuario debe tener la primera letra en mayúscula y solo letras.'
                                }
                            })}
                            placeholder="Nombre del usuario"
                            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                        />
                        {errors.Nombre_Usuario && <p className="text-red-500">{errors.Nombre_Usuario.message}</p>}
                    </div>

                    <div className="mb-1">
                        <label htmlFor="Apellido_Usuario" className="mb-2 block">Apellidos: <strong>*</strong></label>
                        <input
                            type="text"
                            {...register("Apellido_Usuario", {
                                required: 'El apellido es obligatorio',
                                pattern: {
                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                    message: 'El apellido del usuario debe tener la primera letra en mayúscula y solo letras.'
                                }
                            })}
                            placeholder="Apellido del usuario"
                            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                        />
                        {errors.Apellido_Usuario && <p className="text-red-500">{errors.Apellido_Usuario.message}</p>}
                    </div>

                    <div className="mb-1">
                        <label htmlFor="Email" className="mb-2 block">Correo Electrónico: <strong>*</strong></label>
                        <input
                            type="email"
                            {...register("Email", {
                                required: 'El correo es obligatorio',
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                    message: 'El correo electrónico no es válido'
                                }
                            })}
                            placeholder="Correo del usuario"
                            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                        />
                        {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
                    </div>

                    <div className="mb-1">
                        <label htmlFor="Contrasena" className="mb-2 block">Contraseña: <strong>*</strong></label>
                        <input
                            type="password"
                            {...register("Contrasena", {
                                required: 'La contraseña es obligatorio',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*\w).*$/,
                                    message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'La contraseña debe tener al menos 5 caracteres'
                                },
                                maxLength: {
                                    value: 35,
                                    message: 'La contraseña no puede tener más de 35 caracteres'
                                }
                            })}
                            placeholder="Contraseña"
                            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                        />
                        {errors.Contrasena && <p className="text-red-500">{errors.Contrasena.message}</p>}
                    </div>

                    <div className="mb-1">
                        <label htmlFor="Rol_ID" className="mb-2 block">Rol: <strong>*</strong></label>
                        <Select
                            options={[
                                { label: 'Seleccione rol', value: '', isDisabled: true },
                                ...rolOpcions
                            ]}
                            {...register("Rol_ID")}
                            value={selectRole}
                            onChange={(selectedOption) => setSelectRol(selectedOption)}
                            menuPlacement="auto"
                            menuShouldScrollIntoView={false}
                            maxMenuHeight={132}
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#201E1E',
                                },
                            })}
                        />
                        {errors.Rol_ID && <p className="text-red-500">{errors.Rol_ID.message}</p>}
                    </div>
                </div>

                <div className="mt-1 flex justify-between items-center">
                    <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda'>
                        Confirmar
                    </button>
                    <button type="button" className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded boton-derecha' onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser