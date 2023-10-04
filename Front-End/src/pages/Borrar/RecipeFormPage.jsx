import { useForm } from 'react-hook-form';
import { useRecipe } from '../context/RecipeContext.jsx';
import { useNavigate } from 'react-router-dom'

function RecipeFormPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createRecipe } = useRecipe();
    const navigate = useNavigate()

    const OnSubmit = handleSubmit(async (values) => {
        createRecipe(values)
        navigate('/recipe')
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-400 max-w-md w-full p-8 rounded-md'>
                <h1 className='text-center py-5 font-bold'><strong>Receta</strong></h1>

                <form
                    onSubmit={OnSubmit}
                >

                    <input
                        type="text"
                        {...register("Productos_ID", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Producto"
                    />
                    {
                        errors.Productos_ID && (
                            <p className='text-red-600'>El producto es requerido</p>
                        )
                    }

                    <input
                        type="text"
                        {...register("Insumo_ID", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Insumo"
                    />
                    {
                        errors.Insumo_ID && (
                            <p className='text-red-600'>El insumo es requerido</p>
                        )
                    }

                    <input
                        type="number"
                        {...register("Cantidad", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Cantidad"
                    />
                    {
                        errors.Cantidad && (
                            <p className='text-red-600'>La cantidad es requerido</p>
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

export default RecipeFormPage