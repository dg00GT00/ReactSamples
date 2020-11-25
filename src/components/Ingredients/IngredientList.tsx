import React from "react";

import "./IngredientList.css";

type IngredientsProps = {
	ingredients: {
		id: string;
		title: string;
		amount: string;
	}[];
	onRemoveItem?: (id: string) => void;
};

const IngredientList: React.FunctionComponent<IngredientsProps> = (props) => {
	return (
		<section className="ingredient-list">
			<h2>Loaded Ingredients</h2>
			<ul>
				{props.ingredients.map((ig) => (
					<li key={ig.id} onClick={props?.onRemoveItem?.bind(this, ig.id)}>
						<span>{ig.title}</span>
						<span>{ig.amount}x</span>
					</li>
				))}
			</ul>
		</section>
	);
};

export default IngredientList;
