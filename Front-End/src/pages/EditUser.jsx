import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useRole } from '../context/RoleContext';
import Select from 'react-select';

function EditUser({ onClose, userToEdit }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: userToEdit
    });
    const { updateUser, user } = useUser();
    const [selectedType, setSelectedType] = useState(userToEdit.TipoDocumento);
    const { role } = useRole();

    const typeOptions = [
        { label: 'Seleccione tipo', value: '', isDisabled: true },
        { label: 'Registro civli', value: 'RC' },
        { label: 'Tarjeta de identidad', value: 'TI' },
        { label: 'Cédula de ciudadanía', value: 'CC' },
        { label: 'Cédula de extranjería', value: 'CE' },
        { label: 'Pasaporte', value: 'PB' },
    ];

    const rolOptions = role.map(option => ({
        label: option.Nombre_Rol,
        value: option.ID_ROL
    }));

    const [selectedRole, setSelectedRole] = useState(userToEdit.Rol_ID);

    useEffect(() => {
        register('Documento', {
            required: 'El documento es obligatorio',
            validate: (value) => {
                const duplicateUser = user.find(
                    (users) =>
                        users.Documento === value &&
                        users.ID_USUARIO !== userToEdit.ID_USUARIO
                );

                if (duplicateUser) {
                    return 'Este documento del usuario ya existe.';
                }
                return true;
            },
        });
        register('Email', {
            required: 'El correo es obligatorio',
            validate: (value) => {
                const duplicateEmail = user.find(
                    (users) =>
                        users.Email === value &&
                        users.ID_USUARIO !== userToEdit.ID_USUARIO
                );

                if (duplicateEmail) {
                    return 'Este correo ya existe.';
                }
                return true;
            },
        });
    }, [register, user, userToEdit.ID_USUARIO]);

    const onSubmit = handleSubmit(async (values) => {
        values.TipoDocumento = selectedType;
        values.Rol_ID = selectedRole;

        updateUser(userToEdit.ID_USUARIO, values);
        onClose();
    });

    const onCancel = () => {
        onClose();
    };

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
            color: state.isSelected ? 'white' : '#201E1E',
            '&:hover': {
                backgroundColor: '#e36209',
                color: 'white',
            },
            cursor: state.isDisabled ? 'not-allowed' : 'default',
        }),
    };

    return (
        <div className='max-w-md mx-auto p-4 down'>
            <h1 className="text-3xl font-semibold text-center mb-4">Nuevo Usuario</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-6">
                    <div className='mb-3'>
                        <label htmlFor="TipoDocumento" className="mb-2 block">Tipo de documento: <p className='text-red-600'>*</p></label>
                        <Select
                            options={typeOptions}
                            {...register("TipoDocumento", {
                                required: 'El tipo es obligatorio',
                            })}
                            value={selectedType.find(option => option.value === selectedType)}
                            onChange={(selectedOption) => setSelectedType(selectedOption.value)}
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

                    <div className='mb-3'>
                        <label htmlFor="Documento" className="mb-2 block">Número de identidad: <p className='text-red-600'>*</p></label>
                        <input
                            type="number"
                            {...register("Documento", {
                                required: 'El documento es obligatoria',
                                validate: (value) => {
                                    const parsedValue = parseInt(value);
                                    if (isNaN(parsedValue) || parsedValue < 10000000 || parsedValue > 99999999) {
                                        return 'El número no es valido, debe tener de 8 a 10 caracteres.';
                                    }
                                    return true;
                                }
                            })}
                            className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                            placeholder="Documento"
                        />
                        {errors.Documento && (<p className='text-red-500'>{errors.Documento.message}</p>)}
                    </div>

                </div>
                <div className="mb-6">
                    <div className='mb-3'>
                        <label htmlFor="Nombre_Usuario" className="mb-2 block">Nombres: <p className='text-red-600'>*</p></label>
                        <input
                            type="text"
                            {...register("Nombre_Usuario", {
                                required: 'El nombre es obligatorio',
                                pattern: {
                                    value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                                    message: 'El nombre del usuario debe tener la primera letra en mayúscula y solo letras.'
                                }
                            })}
                            placeholder="Nombre del usuario"
                            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                        />
                        {errors.Nombre_Usuario && <p className="text-red-500">{errors.Nombre_Usuario.message}</p>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="Apellido_Usuario" className="mb-2 block">Apellidos: <p className='text-red-600'>*</p></label>
                        <input
                            type="text"
                            {...register("Apellido_Usuario", {
                                required: 'El apellido es obligatorio',
                                pattern: {
                                    value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                                    message: 'El apellido del usuario debe tener la primera letra en mayúscula y solo letras.'
                                }
                            })}
                            placeholder="Apellido del usuario"
                            className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                        />
                        {errors.Apellido_Usuario && <p className="text-red-500">{errors.Apellido_Usuario.message}</p>}
                    </div>
                </div>

                <div className="mb-6">
                    <div className='mb-3'>
                        <label htmlFor="Email" className="mb-2 block">Correo Electrónico: <p className='text-red-600'>*</p></label>
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

                    <div className='mb-3'>
                        <label htmlFor="Contrasena" className="mb-2 block">Contraseña: <p className='text-red-600'>*</p></label>
                        <input
                            type="text"
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
                </div>

                <div className="mb-3 inferior">
                    <label htmlFor="Rol_ID" className="mb-2 block">Rol: <p className='text-red'>*</p></label>
                    <Select
                        options={rolOptions}
                        {...register("Rol_ID")}
                        value={rolOptions.find(option => option.value === selectedRole)}
                        onChange={(selectedRol) => setSelectedRole(selectedRol.value)}
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
                <div className="mt-4 flex justify-between items-center">
                    <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda'>
                        Confirmar
                    </button>
                    <button type="button" className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded boton-derecha' onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditUser