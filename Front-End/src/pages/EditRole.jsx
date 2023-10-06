import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRole } from '../context/RoleContext';

function EditRole({ onClose, roleToEdit }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: roleToEdit
    });
    const { updateRole, role } = useRole();
    const [duplicateError, setDuplicateError] = useState('');

    const onSubmit = handleSubmit(async (values) => {
        if (values.Nombre_Rol !== roleToEdit.Nombre_Rol) {
            const duplicateRole = role.some(rol =>
                rol.ID_ROL !== roleToEdit.ID_ROL &&
                rol.Nombre_Rol === values.Nombre_Rol
            );

            if (duplicateRole) {
                setDuplicateError('Este rol ya existe.');
                return;
            } else {
                setDuplicateError('');
            }
        }

        updateRole(roleToEdit.ID_ROL, values);
        onClose();
    });

    const onCancel = () => {
        onClose();
    };

    return (
        <div className='max-w-md mx-auto p-4 down'>
            <h1 className="text-3xl font-semibold text-center mb-4">Editar Rol</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4 inferior">
                    <label htmlFor="Nombre_Categoria" className="mb-2 block">Nombre del rol:</label>
                    <input
                        type="text"
                        {...register("Nombre_Rol", {
                            required: 'Este campo es requerido',
                            pattern: {
                                value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/,
                                message: 'El nombre del rol debe tener la primera letra en mayúscula y solo letras.'
                            }
                        })}
                        className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
                        placeholder="Nombre del Rol"
                        autoFocus
                    />
                    {duplicateError && <p className="text-red-500">{duplicateError}</p>}
                    {errors.Nombre_Rol && <p className="text-red-500">{errors.Nombre_Rol.message}</p>}
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

export default EditRole