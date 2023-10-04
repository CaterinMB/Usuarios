import { useForm } from 'react-hook-form';
import { useRole } from '../context/RoleContext';

function CreateRole({ onClose }) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { createRole, role } = useRole();

  const onSubmit = handleSubmit(async (values) => {
    const isNameDuplicate = role.some(rol => rol.Nombre_Rol === values.Nombre_Rol);

    if (isNameDuplicate) {
      setError('Nombre_Rol', {
        type: 'manual',
        message: 'El nombre del rol ya existe.'
      });
      return;
    }

    createRole(values);
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  return (
    <div className='max-w-md mx-auto'>
      <h1 className="text-3xl font-semibold text-center mb-4">Nuevo Rol</h1>
      <form onSubmit={onSubmit}>
        <div className='contenedor'>
          <div className="mb-4 inferior">
            <label htmlFor="Nombre_Categoria" className="mb-2 block">Nombre del rol:</label>
            <input
              type="text"
              {...register("Nombre_Rol", { required: 'Este campo es requerido', pattern: { value: /^[A-ZÁÉÍÓÚ][a-záéíóú\s]*[a-záéíóú]$/, message: 'El nombre del rol debe tener la primera letra en mayúscula y solo letras.' } })}
              className='w-full bg-white text-[#201E1E] border-[#201E1E] border rounded-md py-2 px-4'
              placeholder="Nombre del Rol"
              autoFocus
            />
            {errors.Nombre_Rol && <p className="text-red-500">{errors.Nombre_Rol.message}</p>}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button type="submit" className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded boton-izquierda-2' onClick={onSubmit}>
            Confirmar
          </button>
          <button type="button" className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded boton-derecha-2' onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateRole