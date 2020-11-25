import React, { useCallback, useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";

type IngredientsTypes = {
	id: string;
	title: string;
	amount: string;
};

type ResponseIngredients = {
	[id: string]: IngredientsTypes;
};

const Ingredients = () => {
	const [userIngredients, setUserIngredients] = useState<IngredientsTypes[]>(
		[]
	);

	useEffect(() => {
		fetch("https://react-hooks-2b229.firebaseio.com/ingredients.json")
			.then<ResponseIngredients>((response) => {
				return response.json();
			})
			.then((body) => {
				const loadedIngredients: IngredientsTypes[] = [];
				for (const key in body) {
					if (Object.prototype.hasOwnProperty.call(body, key)) {
						loadedIngredients.push({
							id: key,
							title: body[key].title,
							amount: body[key].amount,
						});
					}
				}
				setUserIngredients((prevIngredients) => [
					...prevIngredients,
					...loadedIngredients,
				]);
			});
	}, []); // It should set an empty array at 'useEffect' so that it behaviors like 'componentDidMount' class lifecycle hook

	const addIngredientHandler = (ingredient: IngredientsTypes): void => {
		fetch("https://react-hooks-2b229.firebaseio.com/ingredients.json", {
			method: "POST",
			body: JSON.stringify(ingredient),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				// The response type come from 'firebase', in which at the moment is unknown
				return response.json();
			})
			.then((body) => {
				setUserIngredients((prevIngredients) => [
					...prevIngredients,
					{ ...ingredient, id: body.name },
				]);
			});
	};

	const filterIngredientsHandler = useCallback(
		(filteredIngredients: IngredientsTypes[]): void => {
			setUserIngredients(filteredIngredients);
		}, []
	);

	return (
		<div className="App">
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search onLoadIngredients={filterIngredientsHandler} />
				<IngredientsList ingredients={userIngredients} />
			</section>
		</div>
	);
};

export default Ingredients;
