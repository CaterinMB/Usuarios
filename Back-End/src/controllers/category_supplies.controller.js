import { category_supplies } from "../models/category_supplies.model.js";
import { supplies } from "../models/supplies.model.js";

export const getCategory_supplies = async (req, res) => {
    try {
        const arrayCategory_supplies = await category_supplies.findAll()
        res.json(arrayCategory_supplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getOneCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;
        const oneCategory_supplies = await category_supplies.findOne({
            where: {
                ID_CATEGORIA_INSUMO: id
            }
        });

        if (!oneCategory_supplies) return res.status(404).json({ message: 'Este id no existe' });
        res.json(oneCategory_supplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createCategory_supplies = async (req, res) => {
    
    try {
        const { Nombre_Categoria } = req.body
        const newCategory_supplies = await category_supplies.create({
            Nombre_Categoria : Nombre_Categoria,
            Estado: true
        });
        res.json(newCategory_supplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const disableCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;

        const categorySupply = await category_supplies.findOne({
            where: {
                ID_CATEGORIA_INSUMO: id
            }
        });

        if (!categorySupply) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }

        const updatedCategorySupply = await categorySupply.update({ Estado: !categorySupply.Estado });

        res.json(updatedCategorySupply);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
 
export const updateCategory_supplies = async (req, res) => {

    try {
        const { id } = req.params;
        const { Nombre_Categoria} = req.body

        const updateCategory_supplies = await category_supplies.findByPk(id)
        updateCategory_supplies.Nombre_Categoria = Nombre_Categoria;
        await updateCategory_supplies.save();

        res.json(updateCategory_supplies);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;

        await category_supplies.destroy({
            where: {
                ID_CATEGORIA_INSUMO: id,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSupplies_Category = async (req, res) => {
    const { id } = req.params;
    const arraySupplies = await supplies.findAll({
        where: {
            CATEGORIA_INSUMO_ID: id
        }
    });
    res.json(arraySupplies);
}