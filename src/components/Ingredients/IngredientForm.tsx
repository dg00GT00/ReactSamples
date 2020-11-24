import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

type IngredientState = {
	title?: string;
	amount?: string;
};

const IngredientForm = React.memo((props) => {
	const [inputState, changeState] = useState<IngredientState>({
		title: "",
		amount: "",
	});

	const submitHandler: React.FormEventHandler = (event) => {
		event.preventDefault();
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
							value={inputState.title}
							onChange={(event) =>
								changeState((previousInputState) => ({
									...previousInputState,
									title: event.target.value,
								}))
							}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={inputState.amount}
							onChange={(event) =>
								changeState((previousInputState) => ({
									...previousInputState,
									amount: event.target.value,
								}))
							}
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
