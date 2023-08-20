import { useState } from "react";
// import { Card } from 'react-bootstrap';

const Recipes = () => {
    const [search, setSearch] = useState("")
    const [recipe, setRecipes] = useState({
        search: "",
        list: []
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit= async (e) => {
        e.preventDefault(); //prevent automatic page refresh

        try {
            setLoading(true);
            if (search.trim()==="") {
                setRecipes ({ search, list: []})
                return
            }

            const response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            if (!response.ok) {
                throw new Error('Network response was not okay');
            }
            const data = await response.json();

            if (data.meals) {
                const filteredRecipes = data.meals.filter((recipe) => 
                recipe.strMeal.toLowerCase().includes(search.toLowerCase())
                );
                setRecipes({search, list: filteredRecipes})
            } else {
                setRecipes({search, list: []})
            } 
        } catch (error) {
            console.error("Error Fetching Data", error)
        }
        finally {
            setLoading(false);
        }
    }
    
    const handleInputChange = (e) => {
        setSearch(e.target.value); //allows user to input search data
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={search} onChange={handleInputChange} />
                <button type="submit">Search!</button>
            </form>
            {loading ===true && <p>Loading Recipes!</p>}
            { <ul>
                {recipe.list.map((recipe,idMeal) => (
                    <li key={idMeal}>{recipe.strMeal} <br /> <img className="mealImage" src={recipe.strMealThumb} alt="Meal"/> <br /> <a href={recipe.strYoutube}>Youtube</a></li>
                    // <Card key={idMeal}>
                    //     <Card.Body>
                    //         <Card.Title>{recipe.strMeal}</Card.Title>
                    //     </Card.Body>
                    // </Card>
                    //Weird issue here, still troubleshooting
                ))}
            </ul> }
        </div>
    )

}

export default Recipes