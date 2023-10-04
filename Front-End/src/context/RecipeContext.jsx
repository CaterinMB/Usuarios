import { createContext, useState, useContext } from 'react'
import { createRecipeRequest, getRecipesRequest, getRecipeRequest, updateRecipeRequest, deleteRecipeRequest, statusRecipeRequest } from '../api/recipe.js'

export const RecipeContext = createContext();

export const useRecipe = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error("useRecipe debe usarse dentro de RecipeProvider")
    }
    return context;
}

export const RecipeProvider = ({ children }) => {

    const [recipe, setRecipe] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedRecipe = localStorage.getItem("recipes");
        if (storedRecipe) {
            setRecipe(JSON.parse(storedRecipe));
            setLoading(false); 
        } else {
            loadRecipe();
        }
    }, []);

    const loadRecipe = async () => {
        try {
            const res = await getRecipesRequest();
            setRecipe(res.data);
            setLoading(false); 
        } catch (error) {
            console.error(error);
            setLoading(false); 
        }
    }

    const createRecipe = async (recipe) => {
        try {
            const res = await createRecipeRequest(recipe);
            console.log(res.data);
            setRecipe(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getRecipes = async (recipe) => {
        try {
            const res = await getRecipesRequest();
            setRecipe(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const toggleRecipeStatus = async (id) => {
        try {
            const res = await statusRecipeRequest(id);

            if (res.status === 200) {
                setRecipe((prevRecipe) =>
                    prevRecipe.map((recipes) =>
                    recipes.ID_RECIPE === id ? { ...recipes, Estado: !recipes.Estado } : recipes
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateRecipe = async (id, recipes) => {
        try {
            await updateRecipeRequest(id, recipes);
            getRecipes();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteRecipe = async (id) => {
        try {
            const res = await deleteRecipeRequest(id)
            if (res.status === 204) setRecipe(recipe.filter(recipes => recipes.ID_RECIPE !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RecipeContext.Provider
            value={{
                recipe,
                createRecipe,
                getRecipes,
                loadRecipe,
                toggleRecipeStatus,
                updateRecipe,
                deleteRecipe,
                isAuthenticated,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};