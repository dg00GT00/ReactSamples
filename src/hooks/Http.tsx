import { useCallback, useReducer } from "react";

type HttpState = {
	loading: boolean;
	error: null | string;
	data?: null | string;
	requestId?: null | string;
};

type HttpActions =
	| { type: "SEND"; requestId?: string }
	| { type: "RESPONSE"; responseData: string }
	| { type: "ERROR"; errorData: string }
	| { type: "CLEAR" };

const httpReducer = (
	currentHttpState: HttpState,
	action: HttpActions
): HttpState => {
	switch (action.type) {
		case "SEND":
			return { loading: true, error: null, data: null, requestId: action.requestId };
		case "RESPONSE":
			return { ...currentHttpState, loading: false, data: action.responseData };
		case "ERROR":
			return { loading: false, error: action.errorData };
		case "CLEAR":
			return { ...currentHttpState, error: null };
		default:
			throw new Error("Should not be reached");
	}
};

type HttpReturn = HttpState & {
	sendRequest: (
		url: string,
		method: string,
		body?: string,
		requestId?: string
	) => void;
};

export const useHttp = (): HttpReturn => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
		data: null,
		requestId: null,
	});

	const sendRequest = useCallback(
		(url: string, method: string, body?: string, requestId?: string): void => {
			dispatchHttp({ type: "SEND", requestId });
			fetch(url, {
				method,
				body,
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((body) => {
					dispatchHttp({ type: "RESPONSE", responseData: body });
				})
				.catch((_) =>
					dispatchHttp({ type: "ERROR", errorData: "Something went wrong" })
				);
		},
		[]
	);

	return {
		loading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
        sendRequest: sendRequest,
        requestId: httpState.requestId
	};
};
