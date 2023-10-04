import { useForm } from 'react-hook-form';
import { useProduct } from '../../context/ProductContext.jsx';
import { useNavigate } from 'react-router-dom'

function ProductFormPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createProduct } = useProduct();
    const navigate = useNavigate()

    const OnSubmit = handleSubmit(async (values) => {
        createProduct(values)
        navigate('/product')
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-400 max-w-md w-full p-8 rounded-md'>
                <h1 className='text-center py-5 font-bold'><strong>Producto</strong></h1>

                <form
                    onSubmit={OnSubmit}
                >

                    <input
                        type="text"
                        {...register("Nombre_Producto", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Nombre del Producto"
                        autoFocus
                    />
                    {
                        errors.Nombre_Producto && (
                            <p className='text-red-600'>El nombre del producto es requerido</p>
                        )
                    }

                    <input
                        type="number"
                        {...register("Precio", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Precio"
                    />
                    {
                        errors.Precio && (
                            <p className='text-red-600'>El precio del producto es requerido</p>
                        )
                    }

                    <input
                        type="text"
                        {...register("CategoriaProducto_ID", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Categoria"
                    />
                    {
                        errors.CategoriaProducto_ID && (
                            <p className='text-red-600'>La categoria del producto es requerido</p>
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

export default ProductFormPage