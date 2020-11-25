import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

type IngredientsTypes = {
	id: number;
	title: string;
	amount: number;
};

type IngredientFromProps = {
	onAddIngredient: (ingredient: IngredientsTypes) => void;
};

const IngredientForm = React.memo<IngredientFromProps>((props) => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");

	const submitHandler: React.FormEventHandler = (event) => {
		event.preventDefault();
		props.onAddIngredient({
			id: 0, // This id is only a placeholder. It will be overridden by Ingredient component
			title: enteredTitle,
			amount: +enteredAmount,
		});
		// ...
	};

	return (
		<section className="ingredient-form">
			<Card>
				<form onSubmit={submitHandler}>
					<div className="form-control">
						<label htmlFor="title">Name</label>
						<input
							type="text"
							id="title"
							value={enteredTitle}
							onChange={(event) => setEnteredTitle(event.target.value)}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={enteredAmount}
							onChange={(event) => setEnteredAmount(event.target.value)}
						/>
					</div>
					<div className="ingredient-form__actions">
						<button type="submit">Add Ingredient</button>
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;
