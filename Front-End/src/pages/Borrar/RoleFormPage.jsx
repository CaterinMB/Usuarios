import { useForm } from 'react-hook-form';
import { useRole } from '../context/RoleContext.jsx'
import { useNavigate } from 'react-router-dom'

function RoleFormPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createRole } = useRole();
    const navigate = useNavigate()

    const OnSubmit = handleSubmit(async (values) => {
        createRole(values)
        navigate('/role')
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-400 max-w-md w-full p-8 rounded-md'>
                <h1 className='text-center py-5 font-bold'><strong>Rol</strong></h1>

                <form
                    onSubmit={OnSubmit}
                >

                    <input
                        type="text"
                        {...register("Nombre_Rol", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Nombre del Rol"
                        autoFocus
                    />
                    {
                        errors.Nombre_Rol && (
                            <p className='text-red-600'>El nombre del rol es requerido</p>
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

export default RoleFormPage