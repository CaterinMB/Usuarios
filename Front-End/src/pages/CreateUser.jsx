import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useRole } from '../context/RoleContext';
import { useState } from 'react';

function CreateUser({ onClose }) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { createUser, user } = useUser();
    const { role } = useRole();
    const [selectRole, setSelectRol] = useState({ label: 'Seleccionar Rol', value: '', isDisable: true });

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

        if (!selectRole || selectRole.value === '') {
            setError('ID_ROL', {
                type: 'manual',
                message: 'Debes seleccionar un rol para el usuario.'
            });
            return;
        }

        values.ID_ROL = selectRole.value;

        createRole(values);
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
                <div className="mb-4">

                    <label htmlFor="TipoDocumento" className="mb-2 block">Tipo de Documento</label>
                    <select
                        {...register("TipoDocumento", { required: true })}
                        className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                    >
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                    </select>
                    {errors.TipoDocumento && <p className="text-red-500">{errors.TipoDocumento.message}</p>}

                    <label htmlFor="Nombre_Insumo" className="mb-2 block">Nombre del Usuario:</label>
                    <input
                        type="text"
                        {...register("Nombre_Rol", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Nombre del Rol"
                        autoFocus
                    />
                    <input
                        type="text"
                        {...register("Nombre_Insumo", {
                            required: 'Este campo es obligatorio',
                            pattern: {
                                value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                                message: 'El nombre del insumo debe tener la primera letra en mayúscula y solo letras.'
                            }
                        })}
                        placeholder="Nombre del insumo"
                        className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                    />
                    {errors.Nombre_Insumo && <p className="text-red-500">{errors.Nombre_Insumo.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Cantidad_Insumo" className="mb-2 block">Cantidad del insumo:</label>
                    <input
                        type="number"
                        {...register("Cantidad_Insumo", {
                            required: 'Este campo es obligatorio',
                            validate: (value) => {
                                const parsedValue = parseInt(value);
                                if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9999) {
                                    return 'La cantidad del insumo debe ser un número entero entre 0 y 9999.';
                                }
                                return true;
                            }
                        })}
                        placeholder="Cantidad del insumo"
                        className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                    />
                    {errors.Cantidad_Insumo && <p className="text-red-500">{errors.Cantidad_Insumo.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Medida_Insumo" className="mb-2 block">Medida del insumo:</label>
                    <Select
                        options={measureOptions}
                        {...register("Medida_Insumo")}
                        value={selectedMeasure}
                        onChange={(selectedOption) => setSelectedMeasure(selectedOption)}
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
                    {errors.Medida_Insumo && <p className="text-red-500">{errors.Medida_Insumo.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Stock_Minimo" className="mb-2 block">Stock mínimo:</label>
                    <input
                        type="number"
                        {...register("Stock_Minimo", {
                            required: 'Este campo es obligatorio',
                            validate: (value, { Cantidad_Insumo }) => {
                                const parsedValue = parseInt(value);
                                const parsedCantidadInsumo = parseInt(Cantidad_Insumo);

                                if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 9999) {
                                    return 'El stock mínimo debe ser un número entero entre 0 y 9999.';
                                }

                                if (parsedValue > parsedCantidadInsumo) {
                                    return `El stock mínimo no puede ser mayor que la cantidad de insumo (${parsedCantidadInsumo}).`;
                                }

                                return true;
                            }
                        })}
                        placeholder="Stock mínimo"
                        className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                    />
                    {errors.Stock_Minimo && <p className="text-red-500">{errors.Stock_Minimo.message}</p>}
                </div>
                <div className="mb-4 inferior">
                    <label htmlFor="CATEGORIA_INSUMO_ID" className="mb-2 block">Categoría del insumo:</label>
                    <Select
                        options={[
                            { label: 'Seleccionar categoría', value: '', isDisabled: true },
                            ...categoryOptions
                        ]}
                        {...register("CATEGORIA_INSUMO_ID")}
                        value={selectedCategory}
                        onChange={(selectedOption) => setSelectedCategory(selectedOption)}
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
                    {errors.CATEGORIA_INSUMO_ID && <p className="text-red-500">{errors.CATEGORIA_INSUMO_ID.message}</p>}
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
    )
}

export default CreateUser