import { useEffect } from 'react';
import { useProduct } from '../context/ProductContext';

function ProductPage() {
    const { getProducts, product } = useProduct();

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h1>Productos</h1>
            <table className="table-auto mx-auto w-full">
                <thead>
                    <tr className="bg-[#201E1E] text-white">
                        <th className="border border-gray-400 px-4 py-2">Nombre</th>
                        <th className="border border-gray-400 px-4 py-2">Precio</th>
                        <th className="border border-gray-400 px-4 py-2">Categoria</th>
                        <th className="border border-gray-400 px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.map((product) => (
                        <div key={product.ID_PRODUCTO}>
                            <p>Nombre: {product.Nombre_Producto}</p>
                            <p>Precio: {product.Precio}</p>
                            <p>Categoria: {product.CategoriaProducto_ID}</p>
                            <p>Estado: {product.Estado}</p>
                        </div>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductPage