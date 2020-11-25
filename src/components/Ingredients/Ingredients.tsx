import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";

type IngredientsTypes = {
	id: number;
	title: string;
	amount: number;
};

function Ingredients() {
	const [userIngredients, setUserIngredients] = useState<IngredientsTypes[]>(
		[]
	);

	const addIngredientHandler = (ingredient: IngredientsTypes): void => {
		fetch("https://react-hooks-2b229.firebaseio.com/ingredients.json", {
			method: "POST",
			body: JSON.stringify({ ingredient }),
			headers: {
				"Content-Type": "application/json",
			},
		})
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            setUserIngredients((prevIngredients) => [
                ...prevIngredients,
                { ...ingredient, id: body.name },
            ]);
        });
	};

	return (
		<div className="App">
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search />
				<IngredientsList ingredients={userIngredients} />
			</section>
		</div>
	);
}

export default Ingredients;
