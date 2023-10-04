import { product } from '../models/product.model.js';
import { recipe } from '../models/recipe.model.js';
import { Op } from 'sequelize';

export const getProducts = async (req, res) => {
    try {
        const products = await product.findAll()
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const getProduct = await product.findOne({ where: { ID_PRODUCTO: id } })

        if (!getProduct) return res.status(404).json({ message: 'El producto no existe' })

        res.json(getProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Nombre_Producto } = req.body;

        const existingProduct = await product.findOne({
            where: {
                [Op.or]: [{ Nombre_Producto }],
            },
        });

        if (existingProduct) {
            return res.status(400).json({
                error: 'Ya existe un producto con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { Nombre_Producto, Precio } = req.body;

    try {
        const newProduct = await product.create({
            Nombre_Producto,
            Precio
        })
        res.json(newProduct);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params

    try {
        const { Nombre_Producto, Precio } = req.body

        const updateProduct = await product.findByPk(id)

        updateProduct.Nombre_Producto = Nombre_Producto
        updateProduct.Precio = Precio

        await updateProduct.save()

        res.json(updateProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleProductStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusProduct = await product.findOne({
            where: { ID_PRODUCTO: id },
        });

        if (!statusProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        };

        statusProduct.Estado = !statusProduct.Estado;

        await statusProduct.save();
        
        return res.json(statusProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        await product.destroy({
            where: { ID_PRODUCTO: id, }
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProductRecipes = async (req, res) => {
    const { ID_PRODUCTO } = req.params
    const recipes = await recipe.findAll({
        where: { ID_PRODUCTO: ID_PRODUCTO }
    });

    res.json(recipes);
};