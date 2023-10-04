import { createContext, useState, useContext } from 'react'
import { createProductRequest, getProductsRequest, getProductRequest, updateProductRequest, deleteProductRequest, statusProductRequest } from '../api/product.js'

export const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct debe usarse dentro de ProductProvider")
    }
    return context;
}

export const ProductProvider = ({ children }) => {

    const [product, setProduct] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        const storedProduct = localStorage.getItem("products");
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
            setLoading(false); 
        } else {
            loadProduct();
        }
    }, []);

    const loadProduct = async () => {
        try {
            const res = await getProductsRequest();
            setProduct(res.data);
            setLoading(false); 
        } catch (error) {
            console.error(error);
            setLoading(false); 
        }
    }

    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product);
            console.log(res.data);
            setProduct(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getProducts = async (product) => {
        try {
            const res = await getProductsRequest();
            setProduct(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const toggleProductStatus = async (id) => {
        try {
            const res = await statusProductRequest(id);

            if (res.status === 200) {
                setProduct((prevProduct) =>
                    prevProduct.map((products) =>
                    products.ID_PRODUCTO === id ? { ...products, Estado: !products.Estado } : products
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async (id, products) => {
        try {
            await updateProductRequest(id, products);
            getProducts();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id)
            if (res.status === 204) setProduct(product.filter(products => products.ID_PRODUCTO !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProductContext.Provider
            value={{
                product,
                createProduct,
                getProducts,
                loadProduct,
                toggleProductStatus,
                updateProduct,
                deleteProduct,
                isAuthenticated,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};