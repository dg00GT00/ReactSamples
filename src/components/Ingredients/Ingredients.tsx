import React, { useCallback, useEffect, useReducer, useState } from "react";

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

type IngredientsActions =
	| { type: "SET"; ingredients: IngredientsTypes[] }
	| { type: "ADD"; ingredients: IngredientsTypes }
	| { type: "DELETE"; id: string };

const ingredientReducer = (
	currentIngredients: IngredientsTypes[],
	action: IngredientsActions
): IngredientsTypes[] => {
	switch (action.type) {
		case "SET":
			return action.ingredients;
		case "ADD":
			return [...currentIngredients, action.ingredients];
		case "DELETE":
			return currentIngredients.filter((ing) => ing.id !== action.id);
		default:
			throw new Error("Should not get there!");
	}
};

const Ingredients = () => {
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
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
				dispatch({ type: "SET", ingredients: loadedIngredients });
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
				dispatch({
					type: "ADD",
					ingredients: { ...ingredient, id: body.name },
				});
			});
	};

	const filterIngredientsHandler = useCallback(
		(filteredIngredients: IngredientsTypes[]): void => {
			dispatch({ type: "SET", ingredients: filteredIngredients });
		},
		[]
	);

	const removeIngredientsHandler = (ingredientId: string): void => {
		setIsLoading(true);
		fetch(
			`https://react-hooks-2b229.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: "DELETE",
			}
		)
			.then((response) => {
				setIsLoading(false);
				dispatch({ type: "DELETE", id: ingredientId });
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
