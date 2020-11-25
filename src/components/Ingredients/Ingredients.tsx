import React, { useCallback, useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
		setIsLoading(true);
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
				setIsLoading(false);
				setUserIngredients((prevIngredients) => [
					...prevIngredients,
					{ ...ingredient, id: body.name },
				]);
			});
	};

	const filterIngredientsHandler = useCallback(
		(filteredIngredients: IngredientsTypes[]): void => {
			setUserIngredients(filteredIngredients);
		},
		[]
	);

	const removeIngredientsHandler = (ingredientId: string): void => {
		setIsLoading(true);
		fetch(
			`https://react-hooks-2b229.firebaseio.com/ingredients/${ingredientId}.son`,
			{
				method: "DELETE",
			}
		)
			.then((response) => {
				setIsLoading(false);
				setUserIngredients((prevIngredients) => {
					return prevIngredients.filter(
						(ingredient) => ingredient.id !== ingredientId
					);
				});
			})
			.catch((error) => setError("Something went wrong!"));
	};

	const clearError = () => {
		setError(null);
		setIsLoading(false);
	};

	return (
		<div className="App">
			{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={isLoading}
			/>
			<section>
				<Search onLoadIngredients={filterIngredientsHandler} />
				<IngredientsList
					ingredients={userIngredients}
					onRemoveItem={removeIngredientsHandler}
				/>
			</section>
		</div>
	);
};

export default Ingredients;
