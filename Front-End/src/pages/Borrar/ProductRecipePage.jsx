import { useForm } from 'react-hook-form';

function ProductRecipePage() {

    const { register, handleSubmit } = useForm();

    const OnSubmit = handleSubmit(async (values) => {
        console.log(values)
    });
    const onSubmit = handleSubmit(async (values) => {
        console.log(values)
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-400 max-w-md w-full p-8 rounded-md'>

                <h1 className='text-center py-5 font-bold'><strong>Producto</strong></h1>

                <form
                    OnSubmit={OnSubmit}
                >

                    <input
                        type="text"
                        {...register("Nombre_Producto", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Nombre del Producto"
                    />

                    <input
                        type="text"
                        {...register("CategoriaProducto_ID", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Categoria"
                    />

                    <input
                        type="number"
                        {...register("Precio", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Precio"
                    />

                    <input
                        type="file"
                        {...register("Imagen", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Imagen"
                    />

                    <button
                        type='submit'
                        className='px-4 py-2 bg-zinc-400 text-black rounded-md my-3'
                    >
                        Guardar
                    </button>

                </form>
            </div>
            <div className='bg-zinc-400 max-w-md w-full p-8 rounded-md'>
                <h1 className='text-center py-5 font-bold'><strong>Receta</strong></h1>

                <form
                    onSubmit={onSubmit}
                >

                    <input
                        type="text" Insumo_ID
                        {...register("Insumo_ID", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Insumo"
                    />

                    <input
                        type="number"
                        {...register("Cantidad", { required: true })}
                        className='w-full bg-zinc-500 text-while px-2 py-1 rounded-md my-1'
                        placeholder="Cantidad"
                    />

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

export default ProductRecipePage