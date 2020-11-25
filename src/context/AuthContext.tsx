import React, { FunctionComponent, useState } from "react";

export const AuthContext = React.createContext({
	isAuth: false,
	login: () => {}
});

const AuthContextProvider: FunctionComponent = (props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const loginHandler = (): void => {
		setIsAuthenticated(true);
	};

	return (
		<AuthContext.Provider
			value={{ login: loginHandler, isAuth: isAuthenticated }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;