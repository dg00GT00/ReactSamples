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
		setUserIngredients((prevIngredients) => [
			...prevIngredients,
			{ ...ingredient, id: Math.random() },
		]);
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
