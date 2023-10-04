import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext.jsx';
import { useRole } from '../context/RoleContext.jsx';
import { useNavigate } from 'react-router-dom'

function UserFormPage() {

    const { role } = useRole();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useUser();
    const navigate = useNavigate()

    const OnSubmit = handleSubmit(async (value) => {
        createUser(value)
        navigate('/user')
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-400 max-w-md w-full p-8 rounded-md'>
                <h1 className='text-center py-5 font-bold'><strong>Usuario</strong></h1>

                <form
                    onSubmit={OnSubmit}
                >

                    <select
                    {...register("Rol_ID", { required: true })}
                    className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                    placeholder="Rol"
                    >
                        {role.map((roles) => (
                            <SelectItem key={roles.ID_ROL} value={roles.Nombre_Rol}>
                                {roles.Nombre_Rol}
                            </SelectItem>
                        ))}
                    </select>
                    {
                        errors.Rol_ID && (
                            <p className='text-red-600'>El rol es requerido</p>
                        )
                    }

                    <select
                        {...register("TipoDocumento", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                    >
                        <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                        <option value="Cedula de Extrajeria">Cédula de Extranjería</option>
                        <option value="Pasaporte">Pasaporte</option>
                    </select>
                    {
                        errors.TipoDocumento && (
                            <p className='text-red-600'>El tipo de documento es requerido</p>
                        )
                    }

                    <input
                        type="number"
                        {...register("Documento", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="N° de Documento"
                    />
                    {
                        errors.Documento && (
                            <p className='text-red-600'>El documento es requerido</p>
                        )
                    }

                    <input
                        type="text"
                        {...register("Nombre_Usuario", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Nombre del Usuario"
                    />
                    {
                        errors.Nombre_Usuario && (
                            <p className='text-red-600'>El nombre del usuario es requerido</p>
                        )
                    }

                    <input
                        type="text"
                        {...register("Apellido_Usuario", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Apellido del Usuario"
                    />
                    {
                        errors.Apellido_Usuario && (
                            <p className='text-red-600'>El apellido del usuario es requerido</p>
                        )
                    }

                    <input
                        type="email"
                        {...register("Email", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Correo del Usuario"
                    />
                    {
                        errors.Email && (
                            <p className='text-red-600'>El correo es requerido</p>
                        )
                    }

                    <input
                        type="password"
                        {...register("Contrasena", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Contraseña del Usuario"
                    />
                    {
                        errors.Contrasena && (
                            <p className='text-red-600'>La contraseña es requerido</p>
                        )
                    }

                    <button
                        type='submit'
                        className='px-4 py-2 bg-zinc-400 text-black rounded-md my-3'
                    >
                        Guardar
                    </button>

                </form>
            </div>
        </div>
    )
}

export default UserFormPage