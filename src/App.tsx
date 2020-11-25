import React, { Suspense, SuspenseProps } from "react";

import Ingredients from "./components/Ingredients/Ingredients";

const App: React.FunctionComponent<SuspenseProps> = (props) => {
	return (
        <Suspense fallback={"loading..."}>
            <Ingredients />
        </Suspense>
    );
};

export default App;
