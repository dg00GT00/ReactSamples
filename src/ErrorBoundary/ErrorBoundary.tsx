import * as React from "react";

type ErrorState = {
	hasError: boolean;
	errorMessage: string;
};

class ErrorBoundary extends React.Component<{}, ErrorState> {
	state: ErrorState = {
		hasError: false,
		errorMessage: "",
	};

	componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
		this.setState({ hasError: true, errorMessage: error.message });
    };
    
	render() {
		if (this.state.hasError) {
			return <h1>{this.state.errorMessage}</h1>;
		} else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;
