import React, { useCallback, useEffect, useMemo, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientsList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import { useHttp } from "../../hooks/Http";

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
	const { loading, error, data, sendRequest, requestId } = useHttp();

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
		sendRequest(
			"https://react-hooks-2b229.firebaseio.com/ingredients.json",
			"POST",
			JSON.stringify(ingredient)
		);
	};

	useEffect(() => {
		dispatch({ type: "DELETE", id: requestId! }); // 'requestId' makes reference to the ingredients id
	}, [data, requestId]);

	const filterIngredientsHandler = useCallback(
		(filteredIngredients: IngredientsTypes[]): void => {
			dispatch({ type: "SET", ingredients: filteredIngredients });
		},
		[]
	);

	const removeIngredientsHandler = useCallback(
		(ingredientId: string): void => {
			sendRequest(
				`https://react-hooks-2b229.firebaseio.com/ingredients/${ingredientId}.json`,
				"DELETE",
				undefined,
				ingredientId
			);
		},
		[sendRequest]
	);

	const ingredientsList = useMemo(() => {
		return (
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={loading}
			/>
		);
	}, [userIngredients, removeIngredientsHandler]);

	return (
		<div className="App">
			{error && (
				<ErrorModal onClose={() => dispatchHttp({ type: "CLEAR" })}>
					{error}
				</ErrorModal>
			)}
			{ingredientsList}
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
