import React, { useCallback, useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

type IngredientsTypes = {
	id: string;
	title: string;
	amount: string;
};

type ResponseIngredients = {
	[id: string]: IngredientsTypes;
};

type SearchProps = {
	onLoadIngredients: (ingredients: IngredientsTypes[]) => void;
};

const Search = React.memo<SearchProps>((props) => {
	const [enteredFilter, setEnteredFilter] = useState("");
	const { onLoadIngredients } = props;
	const inputRef = useRef<HTMLInputElement>(null!); // Needed initialize with null due to Typescript requirements

	const fetchedIngredients = useCallback(function fetchedIngredients(): void {
		// Query for filter on 'firebase' API
		const query =
			enteredFilter.length === 0
				? ""
				: `?orderBy="title"&equalTo="${enteredFilter}"`;

		if (enteredFilter !== "" && enteredFilter === inputRef.current.value) {
			// Only fetch data after the first key entered on the search field
			fetch("https://react-hooks-2b229.firebaseio.com/ingredients.json" + query)
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
					onLoadIngredients(loadedIngredients);
				});
		}
	}, [enteredFilter, onLoadIngredients, inputRef])

	useEffect(() => {
		const timer = setTimeout(() => fetchedIngredients(), 500);
		return () => { // Cleanup function
			clearTimeout(timer);
		};
	}, [fetchedIngredients]);

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input
						ref={inputRef}
						type="text"
						value={enteredFilter}
						onChange={(event) => setEnteredFilter(event.target.value)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
