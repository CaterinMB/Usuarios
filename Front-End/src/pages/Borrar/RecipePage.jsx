import { useEffect } from 'react';
import { useRecipe } from '../context/RecipeContext';
//import RecipeCard from '../components/RecipeCard';

function RecipePage() {
    const { getRecipes, recipe } = useRecipe();

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <div>
            <h1>Recetas</h1>
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
                    {/* {recipe && recipe.map((recip) => (
                        //<RecipeCard recip={recip} key={recip.ID_RECETA} />
                    ))} */}
                </tbody>
            </table>
        </div>
    )
}

export default RecipePage