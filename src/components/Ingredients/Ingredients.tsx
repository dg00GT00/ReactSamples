import React, { useCallback, useEffect, useReducer } from "react";

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

type HttpState = {
	loading: boolean;
	error: null | string;
};

type HttpActions =
	| { type: "SEND" }
	| { type: "RESPONSE" }
	| { type: "ERROR"; errorData: string }
	| { type: "CLEAR" };

const httpReducer = (
	currentHttpState: HttpState,
	action: HttpActions
): HttpState => {
	switch (action.type) {
		case "SEND":
			return { loading: true, error: null };
		case "RESPONSE":
			return { ...currentHttpState, loading: false };
		case "ERROR":
			return { loading: false, error: action.errorData };
		case "CLEAR":
			return { ...currentHttpState, error: null };
		default:
			throw new Error("Should not be reached");
	}
};

const Ingredients = () => {
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
	});

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
		dispatchHttp({ type: "SEND" });
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
				dispatchHttp({ type: "RESPONSE" });
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
		dispatchHttp({ type: "SEND" });
		fetch(
			`https://react-hooks-2b229.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: "DELETE",
			}
		)
			.then((_) => {
				dispatchHttp({ type: "RESPONSE" });
				dispatch({ type: "DELETE", id: ingredientId });
			})
			.catch((_) =>
				dispatchHttp({ type: "ERROR", errorData: "Something went wrong" })
			);
	};

	return (
		<div className="App">
			{httpState.error && (
				<ErrorModal onClose={() => dispatchHttp({ type: "CLEAR" })}>
					{httpState.error}
				</ErrorModal>
			)}
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={httpState.loading}
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
